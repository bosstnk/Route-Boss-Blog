import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw/server";
import { API } from "@/test/msw/handlers";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { showToast } from "@/shared/components/common/showToast";
import LogIn from "./LogIn";

vi.mock("@/shared/components/common/showToast", () => ({
  showToast: vi.fn(),
}));

// component เล็กๆ ไว้ "แอบดู" ค่าใน AuthContext ว่า login สำเร็จจริงไหม
function AuthProbe() {
  const { isAuthenticated, profile } = useAuth();
  return <p data-testid="auth">{isAuthenticated ? `Hi ${profile?.name}` : "guest"}</p>;
}

function renderLogIn() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <LogIn />
        <AuthProbe />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("LogIn (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("กด Log in ทั้งที่ช่องว่าง → แสดง error และไม่ยิง request", async () => {
    const user = userEvent.setup();
    const loginSpy = vi.fn();
    server.use(
      http.post(`${API}/auth/login`, () => {
        loginSpy();
        return HttpResponse.json({ token: "fake-jwt-token" });
      })
    );
    renderLogIn();

    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(screen.getByText("Please enter your email address")).toBeInTheDocument();
    expect(screen.getByText("Please enter a password")).toBeInTheDocument();
    expect(loginSpy).not.toHaveBeenCalled();
  });

  it("พิมพ์ใหม่ในช่องที่ error → error ของช่องนั้นหายไป", async () => {
    const user = userEvent.setup();
    renderLogIn();

    await user.click(screen.getByRole("button", { name: "Log in" }));
    await user.type(screen.getByLabelText("Email"), "s");

    expect(screen.queryByText("Please enter your email address")).not.toBeInTheDocument();
    expect(screen.getByText("Please enter a password")).toBeInTheDocument();
  });

  it("กรอกถูก → ส่ง email/password ไป API, เก็บ token, โหลด profile", async () => {
    const user = userEvent.setup();
    let sentBody;
    server.use(
      http.post(`${API}/auth/login`, async ({ request }) => {
        sentBody = await request.json();
        return HttpResponse.json({ token: "fake-jwt-token" });
      })
    );
    renderLogIn();

    await user.type(screen.getByLabelText("Email"), "somchai@example.com");
    await user.type(screen.getByLabelText("Password"), "12345678");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(await screen.findByText("Hi Somchai Jaidee")).toBeInTheDocument();
    expect(sentBody).toEqual({ email: "somchai@example.com", password: "12345678" });
    expect(localStorage.getItem("token")).toBe("fake-jwt-token");
  });

  it("server ตอบ 401 → แสดง toast error และยังเป็น guest", async () => {
    const user = userEvent.setup();
    server.use(
      http.post(`${API}/auth/login`, () =>
        HttpResponse.json({ message: "Invalid email or password" }, { status: 401 })
      )
    );
    renderLogIn();

    await user.type(screen.getByLabelText("Email"), "somchai@example.com");
    await user.type(screen.getByLabelText("Password"), "wrongpass1");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(await screen.findByRole("button", { name: "Log in" })).toBeEnabled();
    expect(showToast).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Invalid email or password", type: "error" })
    );
    expect(screen.getByTestId("auth")).toHaveTextContent("guest");
    expect(localStorage.getItem("token")).toBeNull();
  });

  it("server ตอบ 400 + errors → แสดง error ใต้ช่องตามที่ server ส่งมา", async () => {
    const user = userEvent.setup();
    server.use(
      http.post(`${API}/auth/login`, () =>
        HttpResponse.json(
          { message: "Validation failed", errors: { email: "Please enter a valid email address" } },
          { status: 400 }
        )
      )
    );
    renderLogIn();

    await user.type(screen.getByLabelText("Email"), "somchai@example.com");
    await user.type(screen.getByLabelText("Password"), "12345678");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(await screen.findByText("Please enter a valid email address")).toBeInTheDocument();
    expect(showToast).not.toHaveBeenCalled();
  });

  it("ระหว่างรอ server → ปุ่มเปลี่ยนเป็น Logging in... และกดไม่ได้", async () => {
    const user = userEvent.setup();
    let release;
    server.use(
      http.post(`${API}/auth/login`, async () => {
        await new Promise((resolve) => (release = resolve)); // ค้างไว้จนกว่าเราจะปล่อย
        return HttpResponse.json({ token: "fake-jwt-token" });
      })
    );
    renderLogIn();

    await user.type(screen.getByLabelText("Email"), "somchai@example.com");
    await user.type(screen.getByLabelText("Password"), "12345678");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(screen.getByRole("button", { name: "Logging in..." })).toBeDisabled();

    release();
    expect(await screen.findByText("Hi Somchai Jaidee")).toBeInTheDocument();
  });
});
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw/server";
import { API } from "@/test/msw/handlers";
import { AuthProvider } from "@/context/AuthContext";
import SignUp from "./SignUp";

function renderSignUp() {
  return render(
    <MemoryRouter initialEntries={["/signup"]}>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-success" element={<h1>Registration success</h1>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
}

async function fillForm(user, email = "Somchai@Example.com ") {
  await user.type(screen.getByLabelText("Name"), "Somchai Jaidee");
  await user.type(screen.getByLabelText("Username"), "somchai");
  await user.type(screen.getByLabelText("Email"), email);
  await user.type(screen.getByLabelText("Password"), "12345678");
}

describe("SignUp (integration)", () => {
  it("สมัครสำเร็จ → email ถูกแปลงเป็นตัวเล็ก + ไปหน้า /signup-success", async () => {
    const user = userEvent.setup();
    let sentBody;
    server.use(
      http.post(`${API}/auth/register`, async ({ request }) => {
        sentBody = await request.json();
        return HttpResponse.json({ token: "fake-jwt-token" }, { status: 201 });
      })
    );
    renderSignUp();

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(await screen.findByRole("heading", { name: "Registration success" })).toBeInTheDocument();
    expect(sentBody.email).toBe("somchai@example.com");
  });

  it("email ซ้ำ (409) → แสดง error ใต้ช่อง Email และยังอยู่หน้าเดิม", async () => {
    const user = userEvent.setup();
    server.use(
      http.post(`${API}/auth/register`, () =>
        HttpResponse.json(
          { message: "Validation failed", errors: { email: "Email already exists" } },
          { status: 409 }
        )
      )
    );
    renderSignUp();

    await fillForm(user, "somchai@example.com");
    await user.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(await screen.findByText("Email already exists")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Registration success" })).not.toBeInTheDocument();
  });

  it("server ล่ม (network error) → แสดงข้อความ server error", async () => {
    const user = userEvent.setup();
    server.use(http.post(`${API}/auth/register`, () => HttpResponse.error()));
    renderSignUp();

    await fillForm(user, "somchai@example.com");
    await user.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(
      await screen.findByText("Unable to connect to the server. Please try again.")
    ).toBeInTheDocument();
  });
});
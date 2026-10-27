import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import App from "./App";

function renderApp(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("App routing (integration)", () => {
  it("guest เปิด /member-profile → Page Not Found", async () => {
    renderApp("/member-profile");

    expect(await screen.findByText("Page Not Found")).toBeInTheDocument();
  });

  it("มี token เปิด /login → ถูกพาไปหน้าแรก (เห็นบทความ)", async () => {
    localStorage.setItem("token", "fake-jwt-token");
    renderApp("/login");

    expect(await screen.findByText("Latest articles")).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: "The Art of Mindfulness" })).toBeInTheDocument();
  });
});
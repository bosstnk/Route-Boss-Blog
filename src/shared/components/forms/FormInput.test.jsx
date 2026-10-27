import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FormInput from "./FormInput";

describe("FormInput", () => {
  it("label ผูกกับ input (หาเจอด้วย getByLabelText)", () => {
    render(<FormInput label="Email" name="email" value="" onChange={() => {}} />);

    expect(screen.getByLabelText("Email")).toHaveAttribute("name", "email");
  });

  it("มี error → แสดงข้อความใต้ช่อง", () => {
    render(
      <FormInput
        label="Email"
        name="email"
        value=""
        onChange={() => {}}
        error="Please enter your email address"
      />
    );

    expect(screen.getByText("Please enter your email address")).toBeInTheDocument();
  });

  it("ไม่มี error → ไม่มีข้อความ error", () => {
    render(<FormInput label="Email" name="email" value="" onChange={() => {}} />);

    expect(screen.queryByText(/please enter/i)).not.toBeInTheDocument();
  });
});
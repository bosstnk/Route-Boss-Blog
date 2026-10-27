import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("แสดงข้อความ และกดแล้วเรียก onClick", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Log in</Button>);
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disabled → กดไม่ได้", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button disabled onClick={handleClick}>Log in</Button>);
    const button = screen.getByRole("button", { name: "Log in" });
    await user.click(button);

    expect(button).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });
});
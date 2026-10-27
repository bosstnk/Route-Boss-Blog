import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryFilter from "./CategoryFilter";

const categories = ["Highlight", "Cat", "Dog", "General", "Inspiration", "Travel"];
// visibleCount = 4 → pill: Highlight, Cat, Dog, General | ซ่อนใน More: Inspiration, Travel

describe("CategoryFilter", () => {
  it("โชว์ pill 4 อัน + ปุ่ม More", () => {
    render(<CategoryFilter categories={categories} activeCategory="Highlight" onChange={() => {}} />);

    expect(screen.getByRole("button", { name: "Cat" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "More" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Travel" })).not.toBeInTheDocument();
  });

  it("คลิก pill → เรียก onChange พร้อมชื่อหมวด", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<CategoryFilter categories={categories} activeCategory="Highlight" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Dog" }));

    expect(onChange).toHaveBeenCalledWith("Dog");
  });

  it("เปิด More → เลือกหมวดที่ซ่อน → เรียก onChange แล้ว menu ปิด", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<CategoryFilter categories={categories} activeCategory="Highlight" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "More" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await user.click(screen.getByRole("menuitem", { name: "Travel" }));

    expect(onChange).toHaveBeenCalledWith("Travel");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("กด Escape → menu ปิด", async () => {
    const user = userEvent.setup();
    render(<CategoryFilter categories={categories} activeCategory="Highlight" onChange={() => {}} />);

    await user.click(screen.getByRole("button", { name: "More" }));
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("หมวดที่ active อยู่ในกลุ่มซ่อน → ปุ่ม More เปลี่ยนเป็นชื่อหมวดนั้น", () => {
    render(<CategoryFilter categories={categories} activeCategory="Travel" onChange={() => {}} />);

    expect(screen.getByRole("button", { name: "Travel" })).toHaveAttribute("aria-haspopup", "menu");
    expect(screen.queryByRole("button", { name: "More" })).not.toBeInTheDocument();
  });
});
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

function renderSearchBar(props) {
  return render(
    <SearchBar
      keyword="cat"
      setKeyword={() => {}}
      showDropdown={true}
      setShowDropdown={() => {}}
      suggestions={[]}
      isLoading={false}
      onSelect={() => {}}
      {...props}
    />
  );
}

describe("SearchBar", () => {
  it('ไม่มีผลลัพธ์ → แสดง "No results"', () => {
    renderSearchBar({ suggestions: [] });

    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  it("กำลังโหลด → ไม่แสดง dropdown", () => {
    renderSearchBar({ isLoading: true });

    expect(screen.queryByText("No results")).not.toBeInTheDocument();
  });

  it("คลิก suggestion → onSelect ได้ id ของโพสต์", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderSearchBar({
      suggestions: [
        { id: 7, title: "Understanding Cat Behavior" },
        { id: 9, title: "Cat Food 101" },
      ],
      onSelect,
    });

    await user.click(screen.getByRole("button", { name: "Cat Food 101" }));

    expect(onSelect).toHaveBeenCalledWith(9);
  });
});
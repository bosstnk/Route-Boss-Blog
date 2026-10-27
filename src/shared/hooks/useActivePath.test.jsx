import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import useActivePath from "./useActivePath";

function renderAt(path) {
  return renderHook(() => useActivePath(), {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>
    ),
  });
}

describe("useActivePath", () => {
  it("path ที่ขึ้นต้นตรงกัน → true", () => {
    const { result } = renderAt("/admin/article-management/create");

    expect(result.current.isActive("/admin/article-management")).toBe(true);
    expect(result.current.isActive("/admin/category-management")).toBe(false);
  });
});
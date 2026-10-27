import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import usePasswordVisibility from "./usePasswordVisibility";

describe("usePasswordVisibility", () => {
  it("กด toggle แล้ว inputType เปลี่ยน password ↔ text", () => {
    const { result } = renderHook(() => usePasswordVisibility());

    expect(result.current.inputType).toBe("password");

    act(() => result.current.toggleVisibility());

    expect(result.current.isVisible).toBe(true);
    expect(result.current.inputType).toBe("text");
  });
});
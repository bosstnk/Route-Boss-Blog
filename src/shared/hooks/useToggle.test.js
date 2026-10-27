import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useToggle } from "./useToggle";

describe("useToggle", () => {
  it("เริ่มต้นเป็น false", () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.isShow).toBe(false);
  });

  it("switchToggle สลับค่า, reset กลับเป็น false", () => {
    const { result } = renderHook(() => useToggle());

    act(() => result.current.switchToggle());
    expect(result.current.isShow).toBe(true);

    act(() => result.current.switchToggle());
    expect(result.current.isShow).toBe(false);

    act(() => result.current.switchToggle());
    act(() => result.current.reset());
    expect(result.current.isShow).toBe(false);
  });
});
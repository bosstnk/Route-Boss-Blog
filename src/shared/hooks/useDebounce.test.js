import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useDebounce from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // ให้เราคุมเวลาเอง ไม่ต้องรอจริง
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("คืนค่าใหม่หลังผ่านไปครบ delay เท่านั้น", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      { initialProps: { value: "c" } }
    );

    rerender({ value: "ca" }); // ผู้ใช้พิมพ์ต่อ

    act(() => vi.advanceTimersByTime(399));
    expect(result.current).toBe("c"); // ยังไม่ครบ 400ms

    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe("ca"); // ครบแล้ว
  });

  it("พิมพ์รัวๆ → timer เริ่มนับใหม่ทุกครั้ง", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      { initialProps: { value: "c" } }
    );

    rerender({ value: "ca" });
    act(() => vi.advanceTimersByTime(300));
    rerender({ value: "cat" }); // พิมพ์อีกตัวก่อนครบ 400 → timer เดิมถูก clear
    act(() => vi.advanceTimersByTime(300));

    expect(result.current).toBe("c"); // ผ่านมา 600ms แล้ว แต่ยังไม่เปลี่ยน

    act(() => vi.advanceTimersByTime(100));
    expect(result.current).toBe("cat"); // ข้าม "ca" ไปเลย
  });
});
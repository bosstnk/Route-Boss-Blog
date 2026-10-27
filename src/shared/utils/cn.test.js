import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("ตัด class ที่เป็น false/undefined ทิ้ง", () => {
    const isActive = false;
    expect(cn("rounded", isActive && "bg-white", undefined)).toBe("rounded");
  });

  it("class ที่ชนกัน ตัวหลังชนะ", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });
});
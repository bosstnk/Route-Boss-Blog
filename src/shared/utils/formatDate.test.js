import { describe, it, expect } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("แปลง ISO เป็น 'DD Month YYYY'", () => {
    // ใช้เวลาเที่ยงวัน UTC → ไม่ว่าเครื่องจะอยู่ timezone ไหน ก็ยังเป็นวันที่ 5
    expect(formatDate("2024-03-05T12:00:00.000Z")).toBe("05 March 2024");
  });
});
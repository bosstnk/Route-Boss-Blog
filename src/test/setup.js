import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "./msw/server";

// jsdom ไม่มี IntersectionObserver (ArticleSection.jsx ใช้ทำ infinite scroll)
class FakeIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = FakeIntersectionObserver;

// เปิด MSW ก่อน test ไฟล์นี้เริ่ม
beforeAll(() => server.listen({ onUnhandledFrame: "error" }));

// หลังทุก test: ล้างหน้าจอ, ล้าง handler ที่ test เพิ่มเอง, ล้าง localStorage
afterEach(() => {
  cleanup();
  server.resetHandlers();
  localStorage.clear();
});

// ปิด MSW เมื่อจบไฟล์
afterAll(() => server.close());
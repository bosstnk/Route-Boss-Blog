import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw/server";
import { API } from "@/test/msw/handlers";
import jwtInterceptor from "./jwtinterceptor";

describe("jwtInterceptor", () => {
  beforeEach(() => {
    jwtInterceptor(); // ติดตั้ง interceptor ลง axios ตัวกลาง (เหมือนใน main.jsx)
  });

  afterEach(() => {
    // axios เป็นตัวเดียวทั้งแอป → ต้องถอด interceptor ออก ไม่งั้นจะซ้อนกันทุก test
    axios.interceptors.request.clear();
    axios.interceptors.response.clear();
    vi.unstubAllGlobals();
  });

  it("มี token → แนบ Authorization: Bearer <token>", async () => {
    localStorage.setItem("token", "fake-jwt-token");
    let authHeader;
    server.use(
      http.get(`${API}/user`, ({ request }) => {
        authHeader = request.headers.get("Authorization");
        return HttpResponse.json({});
      })
    );

    await axios.get(`${API}/user`);

    expect(authHeader).toBe("Bearer fake-jwt-token");
  });

  it("ไม่มี token → ไม่แนบ header", async () => {
    let authHeader;
    server.use(
      http.get(`${API}/user`, ({ request }) => {
        authHeader = request.headers.get("Authorization");
        return HttpResponse.json({});
      })
    );

    await axios.get(`${API}/user`);

    expect(authHeader).toBeNull();
  });

  it("ได้ 401 นอกหน้า /login → ลบ token และพาไป /login", async () => {
    localStorage.setItem("token", "expired-token");
    const replace = vi.fn();
    // jsdom เปลี่ยนหน้าจริงไม่ได้ → เอา location ปลอมมาแทนชั่วคราว
    vi.stubGlobal("location", { pathname: "/member-profile", replace });
    server.use(http.get(`${API}/user`, () => new HttpResponse(null, { status: 401 })));

    await expect(axios.get(`${API}/user`)).rejects.toThrow();

    expect(localStorage.getItem("token")).toBeNull();
    expect(replace).toHaveBeenCalledWith("/login");
  });

  it("ได้ 401 ตอนอยู่หน้า /login → ไม่ redirect ซ้ำ", async () => {
    localStorage.setItem("token", "expired-token");
    const replace = vi.fn();
    vi.stubGlobal("location", { pathname: "/login", replace });
    server.use(http.get(`${API}/user`, () => new HttpResponse(null, { status: 401 })));

    await expect(axios.get(`${API}/user`)).rejects.toThrow();

    expect(replace).not.toHaveBeenCalled();
    expect(localStorage.getItem("token")).toBe("expired-token");
  });
});
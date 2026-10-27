import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw/server";
import { API } from "@/test/msw/handlers";
import useNotifications from "./useNotifications";

const twoUnread = [
  { id: 1, message: "Somchai liked your post", is_read: false },
  { id: 2, message: "Malee commented on your post", is_read: false },
  { id: 3, message: "Welcome!", is_read: true },
];

describe("useNotifications", () => {
  it("ไม่มี token → ไม่ยิง API เลย", async () => {
    const spy = vi.fn();
    server.use(
      http.get(`${API}/notifications`, () => {
        spy();
        return HttpResponse.json(twoUnread);
      })
    );
    const { result } = renderHook(() => useNotifications());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(spy).not.toHaveBeenCalled();
    expect(result.current.notifications).toEqual([]);
  });

  it("มี token → โหลดมาและนับ unread ได้ 2", async () => {
    localStorage.setItem("token", "fake-jwt-token");
    server.use(http.get(`${API}/notifications`, () => HttpResponse.json(twoUnread)));
    const { result } = renderHook(() => useNotifications());

    await waitFor(() => expect(result.current.notifications).toHaveLength(3));

    expect(result.current.unreadCount).toBe(2);
  });

  it("markAllAsRead → unread เป็น 0 ทันที (optimistic) แล้วยิง PATCH", async () => {
    localStorage.setItem("token", "fake-jwt-token");
    const patchSpy = vi.fn();
    server.use(
      http.get(`${API}/notifications`, () => HttpResponse.json(twoUnread)),
      http.patch(`${API}/notifications/read-all`, () => {
        patchSpy();
        return HttpResponse.json({ message: "ok" });
      })
    );
    const { result } = renderHook(() => useNotifications());
    await waitFor(() => expect(result.current.unreadCount).toBe(2));

    await act(() => result.current.markAllAsRead());

    expect(result.current.unreadCount).toBe(0);
    expect(patchSpy).toHaveBeenCalledTimes(1);
  });

  it("PATCH พัง → refetch กลับมาตรงกับ DB (unread = 2 อีกครั้ง)", async () => {
    localStorage.setItem("token", "fake-jwt-token");
    server.use(
      http.get(`${API}/notifications`, () => HttpResponse.json(twoUnread)),
      http.patch(`${API}/notifications/read-all`, () => new HttpResponse(null, { status: 500 }))
    );
    const { result } = renderHook(() => useNotifications());
    await waitFor(() => expect(result.current.unreadCount).toBe(2));

    await act(() => result.current.markAllAsRead());

    await waitFor(() => expect(result.current.unreadCount).toBe(2));
  });
});
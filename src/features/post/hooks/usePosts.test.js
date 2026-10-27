import { describe, it, expect } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw/server";
import { API } from "@/test/msw/handlers";
import usePosts from "./usePosts";

// server ปลอมที่มี 3 หน้า หน้าละ 2 โพสต์ — และจดว่าถูกเรียกด้วย query อะไร
function setupFakePagedApi() {
  const calls = [];
  server.use(
    http.get(`${API}/posts`, ({ request }) => {
      const url = new URL(request.url);
      const page = Number(url.searchParams.get("page"));
      calls.push(Object.fromEntries(url.searchParams));
      return HttpResponse.json({
        totalPages: 3,
        currentPage: page,
        posts: [
          { id: page * 10 + 1, title: `Post ${page}-1` },
          { id: page * 10 + 2, title: `Post ${page}-2` },
        ],
      });
    })
  );
  return calls;
}

describe("usePosts (integration กับ API ปลอม)", () => {
  it("โหลดหน้า 1 ตอนเริ่ม และ Highlight ไม่ส่ง category ไป", async () => {
    const calls = setupFakePagedApi();
    const { result } = renderHook(() => usePosts({ category: "Highlight", limit: 2 }));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.posts.map((p) => p.id)).toEqual([11, 12]);
    expect(result.current.hasMore).toBe(true);
    expect(calls[0]).toEqual({ page: "1", limit: "2" }); // ไม่มี category, ไม่มี keyword
  });

  it("เลือกหมวด → ส่ง category ไปใน query", async () => {
    const calls = setupFakePagedApi();
    const { result } = renderHook(() => usePosts({ category: "Cat", limit: 2 }));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(calls[0]).toEqual({ page: "1", limit: "2", category: "Cat" });
  });

  it("loadMore → ต่อท้ายโพสต์ จนหน้าสุดท้าย hasMore = false", async () => {
    setupFakePagedApi();
    const { result } = renderHook(() => usePosts({ category: "Highlight", limit: 2 }));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => result.current.loadMore());
    await waitFor(() => expect(result.current.posts).toHaveLength(4));

    act(() => result.current.loadMore());
    await waitFor(() => expect(result.current.posts).toHaveLength(6));

    expect(result.current.posts.map((p) => p.id)).toEqual([11, 12, 21, 22, 31, 32]);
    expect(result.current.hasMore).toBe(false);
  });

  it("เปลี่ยนหมวด → กลับไปหน้า 1 และแทนที่โพสต์เดิม (ไม่ต่อท้าย)", async () => {
    const calls = setupFakePagedApi();
    const { result, rerender } = renderHook((props) => usePosts(props), {
      initialProps: { category: "Highlight", limit: 2 },
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => result.current.loadMore());
    await waitFor(() => expect(result.current.posts).toHaveLength(4));

    rerender({ category: "Cat", limit: 2 });

    await waitFor(() => expect(calls.at(-1)).toEqual({ page: "1", limit: "2", category: "Cat" }));
    await waitFor(() => expect(result.current.posts.map((p) => p.id)).toEqual([11, 12]));
  });

  it("API พัง (500) → isError = true", async () => {
    server.use(http.get(`${API}/posts`, () => new HttpResponse(null, { status: 500 })));
    const { result } = renderHook(() => usePosts({ category: "Highlight" }));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isError).toBe(true);
    expect(result.current.posts).toEqual([]);
  });
});
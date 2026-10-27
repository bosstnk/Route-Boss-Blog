import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw/server";
import { API } from "@/test/msw/handlers";
import { useSuggestions } from "./useSearchPost";

describe("useSuggestions", () => {
  it("API พัง → ควรได้ isError = true", async () => {
    server.use(http.get(`${API}/posts`, () => new HttpResponse(null, { status: 500 })));
    const { result } = renderHook(() => useSuggestions("cat"));

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('keyword มีเครื่องหมาย & → server ควรได้ keyword "tips & tricks" ครบ', async () => {
    let receivedKeyword;
    server.use(
      http.get(`${API}/posts`, ({ request }) => {
        receivedKeyword = new URL(request.url).searchParams.get("keyword");
        return HttpResponse.json({ posts: [] });
      })
    );
    renderHook(() => useSuggestions("tips & tricks"));

    await waitFor(() => expect(receivedKeyword).toBeDefined());

    expect(receivedKeyword).toBe("tips & tricks");
  });

  it("ลบ keyword จนว่าง → suggestions กลับเป็น [] ทันที", async () => {
    server.use(http.get(`${API}/posts`, () => HttpResponse.json({ posts: [{ id: 1, title: "Cat" }] })));
    const { result, rerender } = renderHook(({ keyword }) => useSuggestions(keyword), {
      initialProps: { keyword: "cat" },
    });
    await waitFor(() => expect(result.current.suggestions).toHaveLength(1));

    rerender({ keyword: "" });

    expect(result.current).toEqual({ suggestions: [], isLoading: false, isError: false });
  });
});
import { describe, it, expect } from "vitest";
import { filterPostsByCategory } from "./filterPosts";

const posts = [
  { id: 1, category: "Cat" },
  { id: 2, category: "General" },
  { id: 3, category: "Cat" },
];

describe("filterPostsByCategory", () => {
  it('"Highlight" คืนทุกโพสต์', () => {
    expect(filterPostsByCategory(posts, "Highlight")).toEqual(posts);
  });

  it("คืนเฉพาะโพสต์ในหมวดที่เลือก", () => {
    const result = filterPostsByCategory(posts, "Cat");

    expect(result.map((p) => p.id)).toEqual([1, 3]);
  });

  it("หมวดที่ไม่มีโพสต์ → []", () => {
    expect(filterPostsByCategory(posts, "Dog")).toEqual([]);
  });
});
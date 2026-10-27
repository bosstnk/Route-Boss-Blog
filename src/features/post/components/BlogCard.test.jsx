import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { BlogCard } from "./BlogCard";

const post = {
  id: 42,
  title: "Understanding Cat Behavior",
  author: "Thompson P.",
  author_pic: "",
  category: "Cat",
  description: "Why cats knock things off tables",
  image: "https://example.com/cat.jpg",
  date: "2024-03-05T12:00:00.000Z",
};

function renderCard() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<BlogCard post={post} />} />
        <Route path="/post/:postId" element={<p>Post page</p>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("BlogCard", () => {
  it("แสดงข้อมูลโพสต์ครบ", () => {
    renderCard();

    expect(screen.getByRole("heading", { name: "Understanding Cat Behavior" })).toBeInTheDocument();
    expect(screen.getByText("Cat")).toBeInTheDocument();
    expect(screen.getByText("05 March 2024")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Understanding Cat Behavior" })).toHaveAttribute(
      "src",
      "https://example.com/cat.jpg"
    );
  });

  it("คลิกการ์ด → ไปหน้า /post/42", async () => {
    const user = userEvent.setup();
    renderCard();

    await user.click(screen.getByRole("heading", { name: "Understanding Cat Behavior" }));

    expect(screen.getByText("Post page")).toBeInTheDocument();
  });
});
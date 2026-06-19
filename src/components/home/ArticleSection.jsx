import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BlogCard } from "@/components/common/BlogCard.jsx";
import { BlogCardSkeleton } from "@/components/common/BlogCardSkeleton.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSuggestions } from "@/hooks/useSearchPost.js";
import { categories } from "@/data/constantData.js";
import usePosts from "@/hooks/usePosts.js";
import useDebounce from "@/hooks/useDebounce.js";
import SearchBar from "@/components/common/SearchBar.jsx";

function ArticleSection() {

  const [category, setCategory] = useState("Highlight");
  const [keyword, setKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedKeyword = useDebounce(keyword, 100);
  const { posts, isLoading, hasMore, loadMore } = usePosts({ category });

  const navigate = useNavigate();
  const { suggestions, isLoading: SuggestIsLoading } = useSuggestions(debouncedKeyword);
  const isSearchPending = keyword.trim() !== debouncedKeyword.trim();

  // เก็บ loadMore ล่าสุดไว้ใน ref เพื่อให้ callback ref คงที่ (deps = [])
  const loadMoreRef = useRef(loadMore);
  useEffect(() => { loadMoreRef.current = loadMore; });

  // callback ref: ตั้ง/ถอด observer ตอน sentinel mount/unmount พอดี
  const observerRef = useRef(null);
  const sentinelRef = useCallback((node) => {
    observerRef.current?.disconnect();
    if (!node) return;
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loadMoreRef.current();
    });
    observerRef.current.observe(node);
  }, []);

  return (
    <div className="flex flex-col justify-center mx-auto lg:max-w-[1440px] lg:px-[120px] lg:pb-[120px]">
      <h3 className="text-headline-3 leading-8 text-base-brown-600 p-4 lg:p-0">
        Latest articles
      </h3>

      <div className="flex flex-col gap-4 p-4 bg-base-brown-200 
      lg:px-6 lg:py-4 lg:mt-8 lg:flex-row-reverse lg:justify-between lg:rounded-lg"
      >
        <SearchBar
          keyword={keyword}
          setKeyword={setKeyword}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          suggestions={suggestions}
          isLoading={SuggestIsLoading || isSearchPending}
          onSelect={(id) => navigate(`/post/${id}`)}
        />

        <div className="flex flex-col gap-1 lg:hidden">
          <span className="text-body-1 text-base-brown-400">Category</span>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger
              className="
                w-full p-3 pl-4
                bg-white border border-base-brown-300
                rounded-lg
                font-medium text-base-brown-400
                focus:border focus:border-base-brown-400
                focus:ring-1 focus:ring-base-brown-300
                "
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4}>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="transition-colors data-highlighted:bg-base-brown-300/50">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <nav aria-label="Category tabs" className="hidden lg:flex lg:gap-2">
          {categories.map((cat) => {
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                disabled={cat === category}
                className={`px-5 py-3 rounded-lg cursor-pointer text-base-brown-400 text-body-1 ${cat === category
                  ? "bg-base-brown-300 text-base-brown-500"
                  : "hover:bg-base-brown-300/40"
                  }`}>{cat}</button>

            );
          })}
        </nav>
      </div>

      <div className="px-4 pt-6 pb-13 flex flex-col lg:p-0 lg:mt-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {isLoading && posts.length === 0 ? (
            <>
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </>
          ) : (
            posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          )}
        </div>

        {posts.length > 0 && hasMore && <div ref={sentinelRef} className="h-1" />}
        {isLoading && posts.length > 0 && (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 pt-12">
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticleSection;
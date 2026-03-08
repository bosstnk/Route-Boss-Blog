import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BlogCard } from "./common/BlogCard.jsx";
import { Button } from "./common/Button.jsx";
import { Search } from "lucide-react";
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

function ArticleSection() {

  const [category, setCategory] = useState("Highlight");
  const [keyword, setKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedKeyword = useDebounce(keyword, 100);
  const {
    posts,
    isLoading,
    isError,
    hasMore,
    loadMore,
    reset
  } = usePosts({ category, keyword });

  useEffect(() => {
    reset();
  }, [category, keyword]);

  const navigate = useNavigate();
  const { suggestions, isLoading: isLoadingg } = useSuggestions(debouncedKeyword);

  return (
    <div className="flex flex-col justify-center mx-auto lg:max-w-[1440px] lg:px-[120px] lg:pb-[120px]">
      <h3 className="text-headline-3 leading-8 text-base-brown-600 p-4 lg:p-0">
        Latest articles
      </h3>

      <div className="flex flex-col gap-4 p-4 bg-base-brown-200 
      lg:px-6 lg:py-4 lg:mt-8 lg:flex-row-reverse lg:justify-between lg:rounded-lg"
      >
        <div className="relative flex p-3 pl-4 lg:max-w-[304px] bg-base-white border border-base-brown-300 rounded-lg transition-colors focus-within:border-base-brown-400 focus-within:ring-1 focus-within:ring-base-brown-300">
          <input
            type="text"
            placeholder="Search"
            className="w-full text-body-1 text-base-brown-400 placeholder:text-base-brown-400 focus:outline-none focus:ring-0"
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => {
              setTimeout(() => {
                setShowDropdown(false);
              }, 200);
            }}
          />
          <Search size={24} color="#75716b" />
          {showDropdown && keyword.trim().length > 0 && (
            <div className="absolute z-10 w-full bg-background rounded-lg shadow-sm p-1 right-0 top-14">
              {isLoadingg && (
                <div className="px-4 py-2 text-sm text-base-brown-600">
                  Searching...
                </div>
              )}

              {!isLoadingg && suggestions.length === 0 &&(
                <div className="px-4 py-2 text-sm text-base-brown-600">
                  No results found
                </div>
              )}

              {!isLoadingg &&
                suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    className="text-start px-4 py-2 block w-full text-sm hover:bg-[#EFEEEB]"
                    onClick={() => navigate(`/post/${suggestion.id}`)}
                  >
                    {suggestion.title}
                  </button>
                ))}
            </div>
          )}
        </div>

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
              <Button
                key={cat}
                text={cat}
                variant="tab"
                onClick={() => setCategory(cat)}
                disabled={cat === category}
                className={
                  cat === category
                    ? "bg-base-brown-300 text-base-brown-500"
                    : "hover:bg-base-brown-300/40"
                }
              />
            );
          })}
        </nav>
      </div>

      <div className="px-4 pt-6 pb-13 flex flex-col gap-12 lg:gap-20 lg:p-0 lg:mt-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {hasMore && (
          <Button
            variant="text"
            text={isLoading ? "Loading..." : "View more"}
            onClick={loadMore}
            disabled={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default ArticleSection;
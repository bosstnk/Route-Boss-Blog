import { useState, useEffect } from "react";
import axios from "axios";
import { BlogCard } from "./common/BlogCard.jsx";
import { Button } from "./common/Button.jsx";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "./ui/input-group.jsx";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ArticleSection() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const [category, setCategory] = useState("Highlight");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  async function getPosts() {
    setIsLoading(true);
    try {
      const categoryParam = category === "Highlight" ? "" : category;
      const response = await axios.get("https://blog-post-project-api.vercel.app/posts",
        {
          params: {
            page: page,
            limit: 6,
            category: categoryParam,
          },
        }
      );
      console.log(response.data);

      if (page === 1) {
        setPosts(response.data.posts);
      } else {
        setPosts((prevPost) => [...prevPost, ...response.data.posts]);
      }

      if (response.data.currentPage >= response.data.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }, [category]);

  useEffect(() => {
    if (isLoading) return;
    getPosts();
  }, [page, category]);

  return (
    <div className="w-full max-w-[1200px] flex flex-col mx-auto lg:gap-12">
      <div className="w-full flex flex-col lg:gap-8">
        <h3 className="text-headline-3 leading-8 text-base-brown-600 p-4 lg:p-0">
          Latest articles
        </h3>
        <div className="w-full p-4 flex flex-col items-center gap-4 bg-base-brown-200 lg:px-6 lg:py-4 lg:flex-row lg:justify-between lg:rounded-lg">
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
                      : "hover:bg-base-brown-100/70"
                  }
                />
              );
            })}
          </nav>
          <InputGroup className="text-body-1 py-3 pl-4 pr-3 lg:max-w-[304px]  bg-base-white border-base-brown-300 rounded-lg">
            <InputGroupInput
              placeholder="Search"
              className="text-body-1 bg-base-white text-base-brown-400 placeholder:text-base-brown-400 focus-visible:border-muted-foreground"
            />
            <InputGroupAddon align="inline-end" className="p-0">
              <Search size={24} />
            </InputGroupAddon>
          </InputGroup>
          <div className="w-full flex flex-col gap-1 lg:hidden">
            <div className="text-body-1 text-base-brown-400">Category</div>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger
                className="
                w-full !h-auto pl-4 pr-3 py-3
                border bg-base-white border-base-brown-300
                rounded-lg
                font-medium text-base-brown-400
                data-[placeholder]:text-base-brown-400
                focus:outline-none focus:ring-1 focus:ring-brown-400"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={4}>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="transition-colors data-[highlighted]:bg-base-brown-300/50">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="px-4 pt-6 pb-12 flex flex-col gap-12 lg:gap-20 lg:p-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      {hasMore && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="hover:text-muted-foreground font-medium underline"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "View more"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ArticleSection;
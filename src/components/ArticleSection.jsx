import { BlogCard } from "./common/BlogCard.jsx";
import { blogPosts } from "@/data/blogPosts.js";
import { Button } from "./common/Button.jsx";
import { useState } from "react";
import { filterPostsByCategory } from "@/utils/filterPosts.js";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "./ui/input-group.jsx";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = ["Highlight", "Cat", "Inspiration", "General"];

function ArticleSection() {
  const [activeCategory, setActiveCategory] = useState("Highlight");
  return (
    <div className="w-full flex flex-col mx-auto lg:gap-12 lg:max-w-[1200px]">
      <div className="w-full flex flex-col lg:gap-8">
        <h3 className="text-headline-3 leading-8 text-base-brown-600 p-4 lg:p-0">
          Latest articles
        </h3>
        <div className="w-full p-4 flex flex-col items-center gap-4 bg-base-brown-200 lg:px-6 lg:py-4 lg:flex-row lg:justify-between lg:rounded-lg">
          <nav aria-label="Category tabs" className="hidden lg:block">
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  text={category}
                  variant="tab"
                  onClick={() => setActiveCategory(category)}
                  className={
                    activeCategory === category
                      ? "bg-base-brown-300 text-base-brown-500 rounded-lg"
                      : ""
                  }
                />
              ))}
            </div>
          </nav>
          <InputGroup className="text-body-1 py-3 pl-4 pr-3 lg:max-w-[304px]  bg-base-white border-base-brown-300 rounded-lg">
            <InputGroupInput
              placeholder="Search"
              className="text-body-1 bg-base-white text-base-brown-400 placeholder:text-base-brown-400"
            />
            <InputGroupAddon align="inline-end" className="p-0">
              <Search size={24} />
            </InputGroupAddon>
          </InputGroup>
          <div className="w-full flex flex-col gap-1 lg:hidden">
            <div className="text-body-1 text-base-brown-400">Category</div>
            <Select value={activeCategory} onValueChange={setActiveCategory}>
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
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="text-body-1"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="px-4 pt-6 flex flex-col gap-12 lg:gap-20 lg:p-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {filterPostsByCategory(blogPosts, activeCategory).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <button className="text-body-1 text-base-brown-600 underline mt-12 mb-20">
        View more
      </button>
    </div>
  );
}

export default ArticleSection;

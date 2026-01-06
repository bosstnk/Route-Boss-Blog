import { Input } from "@/components/ui/input";
import SearchIcon from "@/assets/images/Search_light.svg";
import { BlogCard } from "./common/BlogCard.jsx";
import PictureProfile from "@/assets/images/picture-profile.jpg"
import { blogPosts } from "@/data/blogPosts.js";

import{
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ArticleSection() {
  return (
    <div className="w-full flex flex-col mx-auto lg:gap-12 lg:max-w-[1200px]">
      <div className="w-full flex flex-col lg:gap-8">
        <h3 className="text-headline-3 leading-8 text-base-brown-600 p-4 lg:p-0">
          Latest articles
        </h3>
        <div className="w-full p-4 flex flex-col items-center gap-4 bg-base-brown-200 lg:px-6 lg:py-4 lg:flex-row lg:justify-between lg:rounded-lg">
          <nav aria-label="Category tabs" className="hidden lg:block">
            <ul className="flex gap-2">
              <li>
                <button className="text-body-1 px-5 py-3 text-base-brown-500 bg-base-brown-300 rounded-lg">
                  Highlight
                </button>
              </li>
              <li>
                <button className="text-body-1 px-5 py-3 text-base-brown-400">
                  Cat
                </button>
              </li>
              <li>
                <button className="text-body-1 px-5 py-3 text-base-brown-400 ">
                  Inspiration
                </button>
              </li>
              <li>
                <button className="text-body-1 px-5 py-3 text-base-brown-400">
                  General
                </button>
              </li>
            </ul>
          </nav>
          <div className="w-full pl-4 pr-3 py-3 bg-base-white border border-base-brown-300 rounded-lg flex flex-row gap-1 lg:max-w-[360px]">
            <Input
              type="text"
              placeholder="Search"
              className="
                placeholder:text-body-1
                placeholder:text-base-brown-400
                w-full max-h-6
                px-0 py-0
                border-0 shadow-none
                focus:outline-none
                focus:ring-0
                focus-visible:ring-0
                focus-visible:outline-none
                lg:max-w-[304px]"
            />
            <img src={SearchIcon} alt="search-icon" />
          </div>
          <div className="w-full flex flex-col gap-1 lg:hidden">
            <div className="text-body-1 text-base-brown-400">
              Category
            </div>
            <Select>
              <SelectTrigger className="w-full !h-auto pl-4 pr-3 py-3 border bg-base-white border-base-brown-300 rounded-lg text-body-1 text-base-brown-400 data-[placeholder]:text-base-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={4}>
                <SelectItem value="Hightlight">Hightlight</SelectItem>
                <SelectItem value="Cat">Cat</SelectItem>
                <SelectItem value="Inspiration">Inspiration</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="px-4 pt-6 pb-20 flex flex-col gap-12 lg:gap-20 lg:p-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {blogPosts.map(blog => 
        <BlogCard
          image = {blog.image}
          category = {blog.category}
          title = {blog.title}
          description = {blog.description}
          imageProfile = {PictureProfile}
          author = {blog.author}
          date={blog.date}
        />)}
        </div>
        <button className="text-body-1 text-base-brown-600 underline">View more</button>
      </div>
    </div>
  );
}

export default ArticleSection;

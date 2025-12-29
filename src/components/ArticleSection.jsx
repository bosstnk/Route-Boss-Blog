import { Input } from "@/components/ui/input";

function ArticleSection() {
  return (
    <div className="w-full max-w-[1200px] flex flex-col mx-auto">
      <div className="w-full flex flex-col gap-8">
        <h3 className="text-headline-3 leading-8 text-base-brown-600">
          Latest articles
        </h3>
        <div className="w-full px-6 py-4 rounded-2xl flex flex-row items-center justify-between bg-base-brown-200">
          <nav aria-label="Category tabs">
            <ul class="flex gap-2">
              <li>
                <button className="text-body-1 px-5 py-3 text-base-brown-500 bg-base-brown-300 rounded-lg">Highlight</button>
              </li>
              <li>
                <button className="text-body-1 px-5 py-3 text-base-brown-400">Cat</button>
              </li>
              <li>
                <button className="text-body-1 px-5 py-3 text-base-brown-400 ">Inspiration</button>
              </li>
              <li>
                <button className="text-body-1 px-5 py-3 text-base-brown-400">General</button>
              </li>
            </ul>
          </nav>
          <div className="w-[360px] pl-4 pr-3 py-3 bg-base-white border border-base-brown-300 rounded-lg flex flex-row gap-1">
            <Input
              type="search"
              placeholder="Search"
              className="
                w-full max-w-[304px] max-h-6
                px-0 py-0
                border-0 shadow-none
                focus:outline-none
                focus:ring-0
                focus-visible:ring-0
                focus-visible:outline-none"
            />
            <img
              src="src\assets\images\Search_light.svg"
              alt="search-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleSection;

import { Search } from "lucide-react";

export default function SearchInput({
  keyword,
  setKeyword,
  placeholder = "Search",
  onFocus,
  onBlur,
  className = "",
}) {
  return (
    <div className={`relative flex p-3 pl-4 bg-base-white border border-base-brown-300 rounded-lg focus-within:border-base-brown-400 focus-within:ring-1 focus-within:ring-base-brown-300 ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full text-body-1 text-base-brown-400 placeholder:text-base-brown-400 focus:outline-none"
      />
      <Search size={24} className="text-base-brown-400" />
    </div>
  );
}

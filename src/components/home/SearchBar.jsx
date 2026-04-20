import { Search } from "lucide-react";

export default function SearchBar({
  keyword,
  setKeyword,
  showDropdown,
  setShowDropdown,
  suggestions,
  isLoading,
  onSelect,
}) {
  return (
    <div className="relative flex p-3 pl-4 lg:w-[360px] bg-base-white border border-base-brown-300 rounded-lg focus-within:border-base-brown-400 focus-within:ring-1 focus-within:ring-base-brown-300">
      
      <input
        type="text"
        placeholder="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        className="w-full text-body-1 text-base-brown-400 placeholder:text-base-brown-400 focus:outline-none"
      />

      <Search size={24} className="text-base-brown-400" />

      {showDropdown && keyword.trim() && (
        <div className="absolute z-10 w-full bg-base-white rounded-lg shadow-sm p-1 right-0 top-14">
          
          {isLoading && (
            <div className="px-4 py-2 text-sm text-base-brown-600">
              Searching...
            </div>
          )}

          {!isLoading && suggestions.length === 0 && (
            <div className="px-4 py-2 text-sm text-base-brown-600">
              No results
            </div>
          )}

          {!isLoading &&
            suggestions.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelect(s.id)}
                className="w-full text-left px-4 py-2 text-body-1 rounded-lg hover:bg-base-brown-200"
              >
                {s.title}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
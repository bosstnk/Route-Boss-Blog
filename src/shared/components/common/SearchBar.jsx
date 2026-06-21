import SearchInput from "./SearchInput";

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
    <div className="relative lg:w-[360px]">
      <SearchInput
        keyword={keyword}
        setKeyword={setKeyword}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />

      {showDropdown && keyword.trim() && !isLoading && (
        <div className="absolute z-10 w-full bg-base-white rounded-lg shadow-sm p-1 right-0 top-14">

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

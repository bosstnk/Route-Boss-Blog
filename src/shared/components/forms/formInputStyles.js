const baseInput =
  "bg-white p-3 pl-4 text-body-1 text-base-brown-500 outline-none border rounded-lg placeholder:text-base-brown-400 transition-colors focus:ring-1 focus-within:ring-1 disabled:opacity-50 disabled:cursor-not-allowed";

const normalBorder =
  "border-base-brown-300 focus:border-base-brown-400 focus:ring-base-brown-300 focus-within:border-base-brown-400 focus-within:ring-base-brown-300";

const errorBorder =
  "border-brand-red focus:border-brand-red focus:ring-brand-red/70 focus-within:border-brand-red focus-within:ring-brand-red/70";

// Shared input class for cases that need to control the wrapper element themselves
// (e.g. a password field whose <div> wraps the input plus an eye-toggle button,
// or a <textarea> that keeps its own markup).
export function inputClassName(hasError, extra = "") {
  return `${baseInput} ${hasError ? errorBorder : normalBorder} ${extra}`;
}

// Trigger class for the shadcn <Select> used in the article forms.
export function selectTriggerClassName(hasError) {
  return `w-full p-3 pl-4 bg-white rounded-lg font-medium text-base-brown-400 data-[placeholder]:text-base-brown-400 focus:ring-1 ${
    hasError
      ? "border border-brand-red focus:border-brand-red focus:ring-brand-red/70"
      : "border border-base-brown-300 focus:border-base-brown-400 focus:ring-base-brown-300"
  }`;
}

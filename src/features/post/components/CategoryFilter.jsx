import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const pillBase =
  "rounded-full px-4 py-2 text-body-1 transition-colors whitespace-nowrap cursor-pointer";
const pillActive = "bg-white text-base-brown-600 shadow-sm";
const pillIdle = "text-base-brown-400 hover:text-base-brown-600";

function CategoryFilter({ categories, activeCategory, onChange, visibleCount = 4 }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // ตัดหมวดเป็น 2 กลุ่ม: ที่โชว์เป็น pill กับที่ซ่อนใน dropdown
  const visible = categories.slice(0, visibleCount);
  const hidden = categories.slice(visibleCount);

  // ถ้า active อยู่ในกลุ่มที่ซ่อน → ปุ่ม More แสดง active + ชื่อหมวดนั้น
  const activeInHidden = hidden.includes(activeCategory);

  // ปิด dropdown เมื่อคลิกข้างนอก หรือกด Escape
  useEffect(() => {
    if (!open) return;

    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {visible.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`${pillBase} ${activeCategory === cat ? pillActive : pillIdle}`}
        >
          {cat}
        </button>
      ))}

      {hidden.length > 0 && (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
            className={`${pillBase} inline-flex items-center gap-1 border border-dashed border-base-brown-400 ${
              activeInHidden ? pillActive : pillIdle
            }`}
          >
            {activeInHidden ? activeCategory : "More"}
            <ChevronDown
              size={16}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div
              role="menu"
              className="absolute left-0 z-20 mt-2 min-w-[160px] rounded-xl border border-base-brown-300 bg-white p-1 shadow-lg"
            >
              {hidden.map((cat) => (
                <button
                  key={cat}
                  role="menuitem"
                  onClick={() => {
                    onChange(cat);
                    setOpen(false);
                  }}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-body-2 transition-colors ${
                    activeCategory === cat
                      ? "bg-base-brown-200 text-base-brown-600"
                      : "text-base-brown-400 hover:bg-base-brown-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryFilter;

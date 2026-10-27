import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LikeShare from "./LikeShare";
import { showToast } from "@/shared/components/common/showToast";

// แทนที่ทั้งโมดูล showToast ด้วยฟังก์ชันปลอม → ไม่ต้องมี <Toaster/> และเช็คได้ว่าถูกเรียกด้วยอะไร
vi.mock("@/shared/components/common/showToast", () => ({
  showToast: vi.fn(),
}));

describe("LikeShare", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // ล้างประวัติการเรียก showToast จาก test ก่อนหน้า
  });

  it("แสดงจำนวน like และหัวใจตามสถานะ liked", () => {
    render(<LikeShare likeAmount={12} liked={true} onRequireAuth={() => false} onLike={() => {}} />);

    expect(screen.getByRole("button", { name: /12/ })).toHaveTextContent("❤️");
  });

  it("guest กด like → เปิด modal (onRequireAuth) แต่ไม่เรียก onLike", async () => {
    const user = userEvent.setup();
    const onRequireAuth = vi.fn(() => true); // true = เป็น guest
    const onLike = vi.fn();
    render(<LikeShare likeAmount={12} liked={false} onRequireAuth={onRequireAuth} onLike={onLike} />);

    await user.click(screen.getByRole("button", { name: /12/ }));

    expect(onRequireAuth).toHaveBeenCalled();
    expect(onLike).not.toHaveBeenCalled();
  });

  it("member กด like → เรียก onLike", async () => {
    const user = userEvent.setup();
    const onLike = vi.fn();
    render(<LikeShare likeAmount={12} liked={false} onRequireAuth={() => false} onLike={onLike} />);

    await user.click(screen.getByRole("button", { name: /12/ }));

    expect(onLike).toHaveBeenCalledTimes(1);
  });

  it("Copy link → URL อยู่ใน clipboard + แสดง toast", async () => {
    const user = userEvent.setup(); // user-event เตรียม clipboard ปลอมให้
    render(<LikeShare likeAmount={0} liked={false} onRequireAuth={() => false} onLike={() => {}} />);

    await user.click(screen.getByRole("button", { name: /copy link/i }));

    expect(await navigator.clipboard.readText()).toBe(window.location.href);
    expect(showToast).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Copied!", type: "success" })
    );
  });
});
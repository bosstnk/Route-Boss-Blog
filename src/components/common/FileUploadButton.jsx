import { useRef } from "react";
import Button from "@/components/common/Button";

export default function FileUploadButton({
  children,
  onChange,
  accept = "image/*",
  ...props
}) {
  const fileRef = useRef(null);

  return (
    <>
      <Button
        {...props}
        onClick={() => fileRef.current?.click()}
      >
        {children}
      </Button>

      <input
        ref={fileRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          onChange?.(e);
          e.target.value = "";
        }}
      />
    </>
  );
}
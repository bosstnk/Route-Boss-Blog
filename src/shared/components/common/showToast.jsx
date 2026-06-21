import { toast } from "sonner";
import { X } from "lucide-react";

export const showToast = ({ title, description, type = "success" }) => {
  const bgColor = {
    success: "bg-brand-green",
    error: "bg-brand-red",
    info: "bg-blue-500",
  }[type];

  toast.custom((id) => (
    <div
      className={`${bgColor} text-white p-4 rounded-lg flex justify-between items-start lg:min-w-[700px]`}
    >
      <div>
        <h2 className="text-headline-4 mb-1">{title}</h2>
        <p className="text-body-2">{description}</p>
      </div>

      <button
        onClick={() => toast.dismiss(id)}
        className="text-white cursor-pointer p-1 rounded-full hover:bg-green-100/30"
      >
        <X size={20} />
      </button>
    </div>
  ));
};
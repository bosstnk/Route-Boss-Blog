import AdminSidebar from "@/components/AdminSidebar";
import Button from "@/components/common/Button";
import useEditCategory from "@/hooks/Category/useUpdateCategory";

function AdminEditCategoryPage() {

  const {
    name,
    handleChange,
    handleSubmit,
    isLoading,
    errors
  } = useEditCategory();

  const inputClass = (hasError) =>
    `mt-1 w-full bg-white p-3 pl-4 text-body-1 text-base-brown-500 outline-none rounded-lg placeholder:text-base-brown-400 border transition-colors focus:ring-1 ${hasError
      ? "border-brand-red focus:border-brand-red focus:ring-brand-red/70"
      : "border-base-brown-300 focus:border-base-brown-400 focus:ring-base-brown-300"
    }`;

  return (
    <div className="flex h-screen bg-base-brown-100">

      <AdminSidebar />

      <main className="flex-1 overflow-auto">

        <div className="flex justify-between items-center py-6 px-[60px] border-b border-b-base-brown-300">

          <h2 className="text-2xl font-semibold">
            Edit Category
          </h2>

          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>

        </div>

        <div className="flex flex-col gap-1 max-w-[480px] ml-[60px] mt-[40px]">

          <label
            htmlFor="name"
            className="block text-body-1 text-base-brown-400"
          >
            Category Name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="Category name"
            className={inputClass(errors.name)}
          />

          {errors.name && (
            <p className="text-body-3 text-brand-red mt-1">
              {errors.name}
            </p>
          )}

        </div>

      </main>

    </div>
  );
}

export default AdminEditCategoryPage;

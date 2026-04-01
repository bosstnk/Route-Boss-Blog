import { Input } from "@/components/ui/input";
import AdminSidebar from "@/components/AdminSidebar";
import useEditCategory from "@/hooks/Category/useUpdateCategory";

function AdminEditCategoryPage() {

  const {
    name,
    inputChange,
    handleSubmit,
    isLoading,
    error
  } = useEditCategory();

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
            text={isLoading ? "Saving..." : "Save"}
            onClick={handleSubmit}
          />

        </div>

        <div className="flex flex-col gap-1 max-w-[480px] ml-[60px] mt-[40px]">

          <label
            htmlFor="category"
            className="block text-body-1 text-base-brown-400"
          >
            Category Name
          </label>

          <Input
            id="category"
            type="text"
            value={name}
            onChange={inputChange}
            placeholder="Category name"
            className="p-3 pl-4 rounded-lg text-body-1 text-base-brown-400 border-base-brown-300 placeholder:text-base-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-base-brown-400"
          />

          {error && (
            <p className="text-red-500 mt-2 text-sm">
              {error}
            </p>
          )}

        </div>

      </main>

    </div>
  );
}

export default AdminEditCategoryPage;
import AdminSidebar from "@/shared/components/common/AdminSidebar";
import Button from "@/shared/components/common/Button";
import FormInput from "@/shared/components/forms/FormInput";
import useUpdateCategory from "@/features/category/hooks/useUpdateCategory";

function AdminEditCategoryPage() {

  const {
    name,
    handleChange,
    handleSubmit,
    isLoading,
    errors
  } = useUpdateCategory();

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

        <div className="max-w-[480px] ml-[60px] mt-[40px]">
          <FormInput
            label="Category Name"
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="Category name"
            error={errors.name}
          />
        </div>

      </main>

    </div>
  );
}

export default AdminEditCategoryPage;

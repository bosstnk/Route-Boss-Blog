import AdminSidebar from "@/components/AdminSidebar";
import Button from "@/components/common/Button";
import useCreateCategory from "@/hooks/Category/useCreateCategory";

function AdminCreateCategoryPage() {

  const {
    name,
    handleChange,
    handleSubmit,
    isLoading,
    errors
  } = useCreateCategory();


  const baseInput =
    "bg-white p-3 pl-4 text-body-1 text-base-brown-400 outline-none border border-base-brown-300 rounded-lg placeholder:text-base-brown-400 transition-colors focus:border-base-brown-400 focus:ring-1 focus:ring-base-brown-300 focus-within:border-base-brown-400 focus-within:ring-1 focus-within:ring-base-brown-300";

  const errorInput =
    "border border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red/70";

  return (
    <div className="flex h-screen bg-base-brown-100">

      <AdminSidebar />

      <main className="flex-1 overflow-auto">

        <div className="flex justify-between items-center py-6 px-[60px] border-b border-b-base-brown-300">

          <h2 className="text-2xl font-semibold">
            Create Category
          </h2>

          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>

        </div>

        <div className="flex flex-col gap-1 text-body-1 text-base-brown-400 max-w-[480px] ml-[60px] mt-[40px]">
          <label htmlFor="name">
            Category Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="Category name"
            className={`${baseInput} ${errors.name ? errorInput : ""}`}
          />
          {(errors.name) && <div className="text-body-3 text-brand-red">{errors.name}</div>}
        </div>

      </main>

    </div>
  );
}

export default AdminCreateCategoryPage;
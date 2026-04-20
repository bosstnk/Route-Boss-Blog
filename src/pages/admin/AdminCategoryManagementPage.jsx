import AdminSidebar from "@/components/AdminSidebar";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import useCategories from "@/hooks/Category/useCategories";
import useDeleteCategory from "@/hooks/Category/useDeleteCategory";
import Modal from "@/components/common/Modal";
import { Link } from "react-router-dom";


function AdminCategoryManagementPage() {

    const [keyword, setKeyword] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const { categories, isLoading, isError, refetch } = useCategories(keyword);

    const { handleDelete } = useDeleteCategory(refetch);

    const openDeleteDialog = (id) => {
        setSelectedCategoryId(id);
        setIsDialogOpen(true);
    };

    const confirmDelete = async () => {
        await handleDelete(selectedCategoryId)
        setIsDialogOpen(false)
    }

    return (
        <div className="flex flex-row bg-base-brown-100">

            <AdminSidebar />

            <main className="flex-1 overflow-auto">

                {/* header */}
                <div className="flex justify-between items-center py-6 px-[60px] border-b border-b-base-brown-300">

                    <h3 className="text-headline-3 text-base-brown-600">
                        Category management
                    </h3>

                    <Link
                        to="/admin/category-management/create"
                        className="flex flex-row gap-1.5 px-10 py-3 rounded-full bg-base-brown-600 text-white text-body-1"
                    >
                        <Plus strokeWidth={1.5} />
                        Create category
                    </Link>

                </div>

                <div className="pt-10 pb-[120px] px-[60px] space-y-4">

                    {/* search */}
                    <div className="relative w-full flex py-3 pl-4 pr-3 max-w-[304px] bg-base-white border border-base-brown-300 rounded-lg">

                        <input
                            type="text"
                            placeholder="Search..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="w-full text-body-1 bg-base-white text-base-brown-400 placeholder:text-base-brown-400 focus:outline-none"
                        />

                    </div>

                    {/* table */}
                    <div className="border border-base-brown-300 rounded-lg overflow-hidden">

                        {/* header */}
                        <div className="grid grid-cols-[1fr_auto] text-body-1 text-base-brown-400 bg-base-brown-100 shadow-[0_12px_12px_-6px_rgba(0,0,0,0.1)]">

                            <div className="py-3 px-6">Category</div>
                            <div className="py-3 px-6"></div>

                        </div>

                        {isLoading && (
                            <div className="py-6 text-center text-base-brown-400">
                                Loading...
                            </div>
                        )}

                        {isError && (
                            <div className="py-6 text-center text-red-500">
                                Failed to load categories
                            </div>
                        )}

                        {/* body */}
                        <div className="flex flex-col text-body-1 text-base-brown-500 border-t border-base-brown-300">

                            {categories.map((category, index) => (

                                <div
                                    key={category.id}
                                    className={`grid grid-cols-[minmax(0,1fr)_116px] items-center py-5 px-6 ${index % 2 === 0 ? "" : "bg-base-brown-200"
                                        }`}
                                >

                                    <div>{category.name}</div>

                                    <div className="flex items-center justify-center gap-5">

                                        <Link
                                            to={`/admin/category-management/edit/${category.id}`}
                                        >
                                            <Pencil size={24} color="#75716B" strokeWidth={1.5} />
                                        </Link>

                                        <button onClick={() => openDeleteDialog(category.id)}>
                                            <Trash2 size={24} color="#75716B" strokeWidth={1.5} />
                                        </button>
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Modal
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title="Delete category"
                description="Do you want to delete this category?"
                onConfirm={confirmDelete}
            />
        </div>
    );
}

export default AdminCategoryManagementPage;
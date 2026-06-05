import AdminSidebar from "@/components/AdminSidebar";
import Button from "@/components/common/Button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAdminPosts from "@/hooks/useAdminPosts";
import useDeletePost from "@/hooks/Post/useDeletePost";
import useCategories from "@/hooks/Category/useCategories";
import useDebounce from "@/hooks/useDebounce";
import SearchInput from "@/components/common/SearchInput";
import Modal from "@/components/common/Modal";

function ArticleManagementPage() {
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("");
    const [keyword, setKeyword] = useState("");
    const debouncedKeyword = useDebounce(keyword, 200);

    const { categories: categoryList } = useCategories();

    const {
        posts,
        isLoading,
        isError,
        reset,
    } = useAdminPosts({
        category,
        status,
        keyword: debouncedKeyword,
        limit: 20,
    });

    const selectTriggerClass =
        "w-[200px] p-3 pl-4 bg-white border border-base-brown-300 rounded-lg font-medium text-base-brown-400 data-[placeholder]:text-base-brown-400 focus:border focus:border-base-brown-400 focus:ring-1 focus:ring-base-brown-300";

    return (
        <div className="flex flex-row bg-base-brown-100">
            <AdminSidebar />

            <main className="flex-1 overflow-auto">
                {/* Header */}
                <div className="flex justify-between items-center py-6 px-[60px] border-b border-b-base-brown-300">
                    <h3 className="text-headline-3 text-base-brown-600">
                        Article management
                    </h3>
                    <Link to="/admin/article-management/create">
                        <Button variant="primary">
                            <Plus /> Create article
                        </Button>
                    </Link>
                </div>

                <div className="pt-10 pb-[120px] px-[60px] space-y-4">
                    {/* Filters */}
                    <div className="flex justify-between gap-4">
                        <SearchInput
                            keyword={keyword}
                            setKeyword={setKeyword}
                            placeholder="Search..."
                            className="w-full max-w-[304px]"
                        />

                        <div className="flex gap-4">
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className={selectTriggerClass}>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent position="popper" sideOffset={4}>
                                    <SelectItem value="Draft" className="transition-colors data-highlighted:bg-base-brown-300/50">
                                        Draft
                                    </SelectItem>
                                    <SelectItem value="Published" className="transition-colors data-highlighted:bg-base-brown-300/50">
                                        Published
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger className={selectTriggerClass}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent position="popper" sideOffset={4}>
                                    <SelectItem value="all" className="transition-colors data-highlighted:bg-base-brown-300/50">
                                        All
                                    </SelectItem>
                                    {categoryList.map((cat) => (
                                        <SelectItem
                                            key={cat.id}
                                            value={cat.name}
                                            className="transition-colors data-highlighted:bg-base-brown-300/50"
                                        >
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border border-base-brown-300 rounded-lg overflow-auto">
                        {/* header */}
                        <div className="grid grid-cols-[minmax(0,1fr)_140px_160px_116px] text-body-1 text-base-brown-400 shadow-[0px_2px_12px_0px_#0000001A]">
                            <div className="py-3 px-6">Article Title</div>
                            <div className="py-3 px-6">Category</div>
                            <div className="py-3 px-6">Status</div>
                            <div className="py-3 px-6"></div>
                        </div>

                        {isLoading && (
                            <div className="py-6 text-center text-body-1 text-base-brown-400">
                                Loading...
                            </div>
                        )}

                        {isError && (
                            <div className="py-6 text-center text-body-1 text-red-500">
                                Failed to load articles
                            </div>
                        )}

                        {/* body */}
                        {!isLoading && !isError && posts.length > 0 && (
                            <div className="flex flex-col text-body-1 text-base-brown-500">
                                {posts.map((article, index) => (
                                    <ListArticle
                                        key={article.id}
                                        article={article}
                                        index={index}
                                        onDeleted={reset}
                                    />
                                ))}
                            </div>
                        )}

                        {!isLoading && !isError && posts.length === 0 && (
                            <div className="py-6 text-center text-body-1 text-base-brown-500">
                                No articles found
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ArticleManagementPage;

function ListArticle({ article, index, onDeleted }) {
    const { deletePost, isDeleting } = useDeletePost();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirmDelete = async () => {
        const success = await deletePost(article.id);
        setIsModalOpen(false);
        if (success) onDeleted?.();
    };

    return (
        <>
            <div
                className={`grid grid-cols-[minmax(0,1fr)_140px_160px_116px] items-center ${index % 2 === 0 ? "" : "bg-base-brown-200"
                    }`}
            >
                <div className="px-6 py-5 truncate">{article.title}</div>
                <div className="px-6 py-5">{article.category}</div>
                <div className="px-6 py-5 text-brand-green">{article.status}</div>
                <div className="px-6 py-5 flex items-center justify-center gap-5">
                    <Link to={`/admin/article-management/edit/${article.id}`}>
                        <Pencil size={24} color="#75716B" strokeWidth={1.5} />
                    </Link>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        disabled={isDeleting}
                        className="cursor-pointer"
                    >
                        <Trash2 size={24} color="#75716B" strokeWidth={1.5} />
                    </button>
                </div>
            </div>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Delete Article"
                description="Do you want to delete this article?"
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}

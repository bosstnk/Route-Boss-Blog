import AdminSidebar from "@/components/AdminSidebar";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useState } from "react";
import usePosts from "@/hooks/usePosts";
import useDeletePost from "@/hooks/Post/useDeletePost";

function ArticleManagmentPage() {
    const [category, setCategory] = useState("");
    const [keyword, setKeyword] = useState("");

    const {
        posts,
        isLoading,
        isError,
    } = usePosts({
        category,
        keyword,
        limit: 20, // admin page เอาเยอะหน่อย
    });

    return (
        <div className="flex flex-row">
            <AdminSidebar />

            <main className="flex-1 overflow-auto">
                {/* Header */}
                <div className="flex justify-between items-center py-6 px-[60px] border-b border-b-base-brown-300">
                    <h3 className="text-headline-3 text-base-brown-600">
                        Article management
                    </h3>
                    <Link to="/admin/article-management/create">
                        <Button
                            variant="primary"
                            text="+ Create article"
                            icon={<Plus />}
                        />
                    </Link>
                </div>

                <div className="pt-10 pb-[120px] px-[60px] space-y-4">
                    {/* Filters */}
                    <div className="flex justify-between">
                        {/* Search */}
                        <div className="w-full flex py-3 pl-4 pr-3 max-w-[304px] bg-white border border-base-brown-300 rounded-lg">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="w-full text-body-1 bg-white text-base-brown-400 focus:outline-none"
                            />
                            <Search size={24} color="#62748e" />
                        </div>

                        {/* Select */}
                        <div className="flex gap-4">
                            <Select onValueChange={setCategory}>
                                <SelectTrigger className="w-[180px] py-3 rounded-lg">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="Highlight">Highlight</SelectItem>
                                    <SelectItem value="General">General</SelectItem>
                                    <SelectItem value="Inspiration">Inspiration</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border border-base-brown-300 rounded-lg">
                        <div className="flex text-body-1 text-base-brown-400 bg-base-brown-100">
                            <div className="w-[60%] py-3 px-6">Article Title</div>
                            <div className="w-[120px] grow py-3 px-6">Category</div>
                            <div className="w-[160px] grow py-3 px-6">Status</div>
                            <div className="w-[120px] grow"></div>
                        </div>

                        {/* States */}
                        {isLoading && (
                            <div className="py-10 text-center text-base-brown-400">
                                Loading articles...
                            </div>
                        )}

                        {isError && (
                            <div className="py-10 text-center text-red-500">
                                Failed to load articles
                            </div>
                        )}

                        {!isLoading && posts.length === 0 && (
                            <div className="py-10 text-center text-base-brown-400">
                                No articles found
                            </div>
                        )}

                        {/* Rows */}
                        {posts.map((article) => (
                            <ListArticle key={article.id} article={article} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ArticleManagmentPage;

function ListArticle({ article }) {
    const { deletePost, isDeleting } = useDeletePost();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Delete this article?");
        if (!confirmDelete) return;

        const success = await deletePost(article.id);

        if (success) {
            window.location.reload(); // 👈 เอาง่ายก่อน
        }
    };
    return (
        <div className="flex text-body-1 text-base-brown-500 border-t border-base-brown-300">
            <div className="w-[60%] truncate py-5 px-6">
                {article.title}
            </div>
            <div className="w-[120px] grow py-5 px-6">
                {article.category}
            </div>
            <div className="w-[160px] grow py-5 px-6 text-brand-green">
                {article.status}
            </div>
            <div className="w-[120px] grow py-5 px-6 flex gap-4 justify-center">
                <Link to={`/admin/article-management/edit/${article.id}`}>
                    <Pencil size={24} />
                </Link>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="cursor-pointer"
                >
                    <Trash2 size={24} />
                </button>
            </div>
        </div>
    );
}
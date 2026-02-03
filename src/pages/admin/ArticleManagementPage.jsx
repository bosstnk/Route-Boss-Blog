import { Button } from "@/components/common/Button";
import AdminSidebar from "@/components/AdminSidebar"
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { articles } from "@/data/articles";

function ArticleManagmentPage() {
    return (
        <div className="flex flex-row">
            <AdminSidebar />

            <main className="flex-1 overflow-auto">
                <div className="flex justify-between items-center py-6 px-[60px] border-b border-b-base-brown-300">
                    <h3 className="text-headline-3 text-base-brown-600">Article management</h3>
                    <button
                        className="flex flex-row gap-1.5 px-10 py-3 rounded-full bg-base-brown-600 text-white text-body-1"
                    >
                        <Plus /> Create article
                    </button>
                </div>
                <div className="pt-10 pb-[120px] px-[60px] space-y-4">
                    <div className="flex justify-between">
                        <div className="w-full flex py-3 pl-4 pr-3 lg:max-w-[304px] bg-base-white border border-base-brown-300 rounded-lg transition-colors focus-within:border-base-brown-500 focus-within:ring-1 focus-within:ring-base-brown-300">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full text-body-1 bg-base-white text-base-brown-400 placeholder:text-base-brown-400 focus:outline-none focus:ring-0"
                            />
                            <Search size={24} color="#62748e" />
                        </div>
                        <div className="flex gap-4">
                            <Select>
                                <SelectTrigger className="w-[180px] py-3 rounded-lg text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-[180px] py-3 rounded-lg text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cat">Cat</SelectItem>
                                    <SelectItem value="general">General</SelectItem>
                                    <SelectItem value="inspiration">Inspiration</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="border border-base-brown-300 rounded-lg">
                        <div className="flex flex-row text-body-1 rounded-t-lg text-base-brown-400 bg-base-brown-100 shadow-[0_12px_12px_-6px_rgba(0,0,0,0.1)]">
                            <div className="w-[60%] py-3 px-6">Article Title</div>
                            <div className="w-[120px] grow py-3 px-6">Category</div>
                            <div className="w-[160px] grow py-3 px-6">Status</div>
                            <div className="w-[120px] grow"></div>
                        </div>
                        {articles.map((item, index) => <ListArticle key={index} article={item} />)}
                    </div>
                </div>
            </main>
        </div>
    )

}
export default ArticleManagmentPage

function ListArticle({ article }) {
    return (
        <div className="flex flex-row text-body-1 text-base-brown-500 border-t border-base-brown-300">
            <div className="w-[60%] truncate py-5 px-6">{article.title}</div>
            <div className="w-[120px] grow py-5 px-6">{article.category}</div>
            <div className="w-[160px] grow py-5 px-6 text-brand-green">{article.status}</div>
            <div className="w-[120px] grow py-5 px-6 flex gap-4 justify-center">
                <Pencil size={24} color="#75716B" strokeWidth={1.5} />
                <Trash2 size={24} color="#75716B" strokeWidth={1.5} />
            </div>
        </div>
    )
}
import AdminSidebar from "@/components/AdminSidebar"
import { Button } from "@/components/common/Button"
import { ImageIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Search } from "lucide-react";


function AdminCategoryManagementPage() {
    return (
        <div className="flex flex-row bg-base-brown-100">
            <AdminSidebar />
            <main className="flex-1 overflow-auto">
                <div className="flex justify-between items-center py-6 px-[60px] border-b border-b-base-brown-300">
                    <h3 className="text-headline-3 text-base-brown-600">Category management</h3>
                    <button
                        className="flex flex-row gap-1.5 px-10 py-3 rounded-full bg-base-brown-600 text-white text-body-1"
                    >
                        <Plus /> Create category
                    </button>
                </div>


                <div className="pt-10 pb-[120px] px-[60px] space-y-4">
                    <div className="relative w-full flex py-3 pl-4 pr-3 lg:max-w-[304px] bg-base-white border border-base-brown-300 rounded-lg transition-colors focus-within:border-base-brown-500 focus-within:ring-1 focus-within:ring-base-brown-300">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full text-body-1 bg-base-white text-base-brown-400 placeholder:text-base-brown-400 focus:outline-none focus:ring-0"
                        />
                    </div>
                    <div className="border border-base-brown-300 rounded-lg">
                        <div className="flex flex-row text-body-1 rounded-t-lg text-base-brown-400 bg-base-brown-100 shadow-[0_12px_12px_-6px_rgba(0,0,0,0.1)]">
                            <div className="py-3 px-6">Category</div>
                        </div>
                        <div className="flex flex-col text-body-1 text-base-brown-500 border-t border-base-brown-300">
                            <div className="flex flex-row justify-between py-5 px-6">
                                <div>Cat</div>
                                <div className="flex gap-4 justify-center">
                                    <Pencil size={24} color="#75716B" strokeWidth={1.5} />
                                    <Trash2 size={24} color="#75716B" strokeWidth={1.5} />
                                </div>
                            </div>
                            <div className="flex flex-row justify-between py-5 px-6">
                                <div>General</div>
                                <div className="flex gap-4 justify-center">
                                    <Pencil size={24} color="#75716B" strokeWidth={1.5} />
                                    <Trash2 size={24} color="#75716B" strokeWidth={1.5} />
                                </div>
                            </div>
                            <div className="flex flex-row justify-between py-5 px-6">
                                <div>Inspiration</div>
                                <div className="flex gap-4 justify-center">
                                    <Pencil size={24} color="#75716B" strokeWidth={1.5} />
                                    <Trash2 size={24} color="#75716B" strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AdminCategoryManagementPage
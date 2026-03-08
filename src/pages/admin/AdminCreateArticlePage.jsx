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
import { categories } from "@/data/constantData.js";
import { useState } from "react";
import useCreatePost from "@/hooks/useCreatePost";


function AdminCreateArticlePage() {
    const [category, setCategory] = useState("Highlight");
    const {
        form,
        handleChange,
        handleCategoryChange,
        handleImageChange,
        submitPost,
        isSubmitting,
    } = useCreatePost();
    return (
        <div className="flex flex-row bg-base-brown-100">
            <AdminSidebar />
            <main className="flex-1 overflow-auto">
                <div className="flex justify-between items-center py-6 px-[60px] border-b border-b-base-brown-300">
                    <h3 className="text-headline-3 text-base-brown-600">Create article</h3>
                    <div className="space-x-2">
                        <Button variant="secondary" text="Sava as draft"
                            onClick={() => submitPost({ publish: false })}
                            disabled={isSubmitting}
                        />
                        <Button variant="primary" text="Sava and publish"
                            onClick={() => submitPost({ publish: true })}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <form className="space-y-7 px-[60px] pt-10 pb-[120px]">
                    <div>
                        <label className="block text-base-brown-400 text-body-1 mb-4">Thumbnail image</label>
                        <div className="flex items-end space-x-7">
                            <div className="flex justify-center items-center w-full max-w-lg h-64 px-6 py-20 border border-base-brown-300 border-dashed rounded-md bg-base-brown-200">
                                <div className="text-center space-y-2">
                                    <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                                </div>
                            </div>
                            <label
                                htmlFor="file-upload"
                                className="px-8 py-2 bg-background rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors cursor-pointer"
                            >
                                <span>Upload thumbnail image</span>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 w-[480px]">
                        <span className="text-body-1 text-base-brown-400">Category</span>
                        <Select
                            value={category}
                            onValueChange={handleCategoryChange}
                        >
                            <SelectTrigger
                                className="
                w-full p-3 pl-4
                bg-white border border-base-brown-300
                rounded-lg
                font-medium text-base-brown-400
                focus:border focus:border-base-brown-400
                focus:ring-1 focus:ring-base-brown-300
                "
                            >
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent position="popper" sideOffset={4}>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat} className="transition-colors data-highlighted:bg-base-brown-300/50">
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-1 w-[480px]">
                        <label htmlFor="author" className="text-base-brown-400 text-body-1">Author name</label>
                        <Input
                            id="author"
                            defaultValue="Thompson P."
                            className="p-3 pl-4 bg-white"
                            disabled
                        />
                    </div>

                    <div>
                        <label htmlFor="title" className="text-base-brown-400 text-body-1">Title</label>
                        <Input
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Article title"
                            className="p-3 pl-4 bg-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="introduction" className="text-base-brown-400 text-body-1">Introduction (max 120 letters)</label>
                        <Textarea
                            id="introduction"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Introduction"
                            rows={3}
                            className="p-3 pl-4 bg-white"
                            maxLength={120}
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="text-base-brown-400 text-body-1">Content</label>
                        <Textarea
                            id="content"
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            placeholder="Content"
                            rows={20}
                            className="p-3 pl-4 bg-white"
                        />
                    </div>
                </form>
            </main>
        </div>
    )
}

export default AdminCreateArticlePage
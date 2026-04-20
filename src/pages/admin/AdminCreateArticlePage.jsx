import AdminSidebar from "@/components/AdminSidebar"
import Button from "@/components/common/Button";
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
import useCreatePost from "@/hooks/Post/useCreatePost";
import useCategories from "@/hooks/Category/useCategories";

function AdminCreateArticlePage() {

    const {
        form,
        imagePreview,
        handleChange,
        handleCategoryChange,
        handleImageChange,
        submitPost,
        isSubmitting,
    } = useCreatePost();
    const { categories, isLoading } = useCategories();

    return (
        <div className="flex flex-row bg-base-brown-100">

            <AdminSidebar />

            <main className="flex-1 overflow-auto">

                <div className="flex justify-between items-center py-6 px-[60px] border-b border-b-base-brown-300">

                    <h3 className="text-headline-3 text-base-brown-600">
                        Create article
                    </h3>

                    <div className="space-x-2">

                        <Button
                            variant="secondary"
                            onClick={() => submitPost({ publish: false })}
                            disabled={isSubmitting}
                        >
                            Save as draft
                        </Button>

                        <Button
                            variant="primary"
                            onClick={() => submitPost({ publish: true })}
                            disabled={isSubmitting}
                        >
                            Save and publish
                        </Button>

                    </div>

                </div>

                <form
                    className="space-y-7 px-[60px] pt-10 pb-[120px]"
                    onSubmit={(e) => e.preventDefault()}
                >

                    {/* Thumbnail */}

                    <div>

                        <label className="block text-base-brown-400 text-body-1 mb-4">
                            Thumbnail image
                        </label>

                        <div className="flex items-end space-x-7">

                            <div className="flex justify-center items-center w-full max-w-lg h-64 border border-base-brown-300 border-dashed rounded-md bg-base-brown-200">

                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        className="object-cover w-full h-full rounded-md"
                                    />
                                ) : (
                                    <div className="text-center space-y-2">
                                        <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                                    </div>
                                )}

                            </div>

                            <label
                                htmlFor="file-upload"
                                className="px-8 py-2 bg-background rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors cursor-pointer"
                            >

                                <span>Upload thumbnail image</span>

                                <input
                                    id="file-upload"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleImageChange}
                                />

                            </label>

                        </div>

                    </div>

                    {/* Category */}

                    <div className="flex flex-col gap-1 w-[480px]">

                        <span className="text-body-1 text-base-brown-400">
                            Category
                        </span>

                        <Select
                            value={String(form.category_id)}
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

                                {isLoading ? (

                                    <div className="p-3 text-sm text-gray-400">
                                        Loading...
                                    </div>

                                ) : (

                                    categories.map((cat) => (

                                        <SelectItem
                                            key={cat.id}
                                            value={String(cat.id)}
                                            className="transition-colors data-highlighted:bg-base-brown-300/50"
                                        >
                                            {cat.name}
                                        </SelectItem>

                                    ))

                                )}

                            </SelectContent>

                        </Select>

                    </div>

                    {/* Author */}

                    <div className="flex flex-col gap-1 w-[480px]">

                        <label className="text-base-brown-400 text-body-1">
                            Author name
                        </label>

                        <Input
                            value="Admin"
                            className="p-3 pl-4 bg-white"
                            disabled
                        />

                    </div>

                    {/* Title */}

                    <div>

                        <label className="text-base-brown-400 text-body-1">
                            Title
                        </label>

                        <Input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Article title"
                            className="p-3 pl-4 bg-white"
                        />

                    </div>

                    {/* Description */}

                    <div>

                        <label className="text-base-brown-400 text-body-1">
                            Introduction (max 120 letters)
                        </label>

                        <Textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Introduction"
                            rows={3}
                            className="p-3 pl-4 bg-white"
                            maxLength={120}
                        />

                    </div>

                    {/* Content */}

                    <div>

                        <label className="text-base-brown-400 text-body-1">
                            Content
                        </label>

                        <Textarea
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
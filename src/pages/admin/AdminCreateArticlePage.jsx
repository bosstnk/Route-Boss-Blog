import AdminSidebar from "@/components/AdminSidebar"
import Button from "@/components/common/Button";
import FileUploadButton from "@/components/common/FileUploadButton";
import { ImageIcon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useCreatePost from "@/hooks/Post/useCreatePost";
import useCategories from "@/hooks/Category/useCategories";
import { useAuth } from "@/context/AuthContext";

function AdminCreateArticlePage() {

    const {
        form,
        imagePreview,
        handleChange,
        handleCategoryChange,
        handleImageChange,
        submitPost,
        isSubmitting,
        fieldErrors,
    } = useCreatePost();
    const { categories, isLoading } = useCategories();
    const { profile } = useAuth();

    const inputClass = (hasError) =>
        `w-full bg-white p-3 pl-4 text-body-1 text-base-brown-500 outline-none rounded-lg placeholder:text-base-brown-400 border transition-colors focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed ${hasError
            ? "border-brand-red focus:border-brand-red focus:ring-brand-red/70"
            : "border-base-brown-300 focus:border-base-brown-400 focus:ring-base-brown-300"
        }`;

    const selectTriggerClass = (hasError) =>
        `w-full p-3 pl-4 bg-white rounded-lg font-medium text-base-brown-400 data-[placeholder]:text-base-brown-400 focus:ring-1 ${hasError
            ? "border border-brand-red focus:border-brand-red focus:ring-brand-red/70"
            : "border border-base-brown-300 focus:border-base-brown-400 focus:ring-base-brown-300"
        }`;

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
                            <div
                                className={`flex justify-center items-center w-full max-w-lg h-64 border border-dashed rounded-md bg-base-brown-200 ${fieldErrors.image ? "border-brand-red" : "border-base-brown-300"
                                    }`}
                            >
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

                            <div className="flex flex-col gap-2">
                                <FileUploadButton
                                    variant="secondary"
                                    size="lg"
                                    onChange={handleImageChange}
                                >
                                    Upload thumbnail image
                                </FileUploadButton>
                                {fieldErrors.image && (
                                    <p className="text-body-3 text-brand-red">
                                        {fieldErrors.image}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-1 w-[480px]">
                        <span className="text-body-1 text-base-brown-400">
                            Category
                        </span>

                        <Select
                            value={form.category_id ? String(form.category_id) : ""}
                            onValueChange={handleCategoryChange}
                        >
                            <SelectTrigger className={selectTriggerClass(fieldErrors.category_id)}>
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

                        {fieldErrors.category_id && (
                            <p className="text-body-3 text-brand-red">
                                {fieldErrors.category_id}
                            </p>
                        )}
                    </div>

                    {/* Author */}
                    <div className="flex flex-col gap-1 w-[480px]">
                        <label htmlFor="author" className="text-base-brown-400 text-body-1">
                            Author name
                        </label>
                        <input
                            id="author"
                            type="text"
                            value={profile?.name || ""}
                            disabled
                            className={inputClass(false)}
                        />
                    </div>

                    {/* Title */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="title" className="text-base-brown-400 text-body-1">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Article title"
                            className={inputClass(fieldErrors.title)}
                        />
                        {fieldErrors.title && (
                            <p className="text-body-3 text-brand-red">
                                {fieldErrors.title}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="description" className="text-base-brown-400 text-body-1">
                            Introduction (max 120 letters)
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Introduction"
                            rows={3}
                            maxLength={120}
                            className={`${inputClass(fieldErrors.description)} resize-y`}
                        />
                        {fieldErrors.description && (
                            <p className="text-body-3 text-brand-red">
                                {fieldErrors.description}
                            </p>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="content" className="text-base-brown-400 text-body-1">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            placeholder="Content"
                            rows={10}
                            className={`${inputClass(fieldErrors.content)} resize-y`}
                        />
                        {fieldErrors.content && (
                            <p className="text-body-3 text-brand-red">
                                {fieldErrors.content}
                            </p>
                        )}
                    </div>
                </form>
            </main>

        </div>
    )
}

export default AdminCreateArticlePage

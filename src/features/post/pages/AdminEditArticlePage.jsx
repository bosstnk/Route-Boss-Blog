import { ImageIcon, Trash2 } from "lucide-react";
import Button from "@/components/common/Button";
import FileUploadButton from "@/components/common/FileUploadButton";
import FormInput from "@/components/common/FormInput";
import { inputClassName, selectTriggerClassName } from "@/components/common/formInputStyles";
import Modal from "@/components/common/Modal";
import LoadingScreen from "@/components/common/LoadingScreen";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AdminSidebar from "@/components/AdminSidebar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePost from "@/features/post/hooks/usePost";
import { useCategories } from "@/features/category";
import useUpdatePost from "@/features/post/hooks/useUpdatePost";
import useDeletePost from "@/features/post/hooks/useDeletePost";
import { showToast } from "@/components/common/showToast";

function AdminEditArticlePage() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { post, isLoading, isError } = usePost(postId);

    useEffect(() => {
        if (isError) {
            showToast({
                title: "Article not found",
                description: "Returning to article management",
                type: "error",
            });
            navigate("/admin/article-management");
        }
    }, [isError, navigate]);

    if (isLoading) return <LoadingScreen />;
    if (!post) return null;

    return <EditArticleForm key={postId} post={post} />;
}

function EditArticleForm({ post }) {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { categories } = useCategories();
    const { updatePost, isSubmitting, fieldErrors, setFieldErrors } = useUpdatePost(postId);
    const { deletePost, isDeleting } = useDeletePost();

    const [form, setForm] = useState({
        title: post.title || "",
        description: post.description || "",
        content: post.content || "",
        category_id: post.category_id ? String(post.category_id) : "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(post.image || null);
    const [openModal, setOpenModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setFieldErrors((prev) => ({ ...prev, [name]: null }));
    };

    const handleCategoryChange = (value) => {
        setForm((prev) => ({ ...prev, category_id: value }));
        setFieldErrors((prev) => ({ ...prev, category_id: null }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        const maxSize = 2 * 1024 * 1024;

        setFieldErrors((prev) => ({ ...prev, image: null }));

        if (!allowedTypes.includes(file.type)) {
            setFieldErrors((prev) => ({
                ...prev,
                image: "Only JPG, PNG, WEBP are allowed",
            }));
            return;
        }

        if (file.size > maxSize) {
            setFieldErrors((prev) => ({
                ...prev,
                image: "Image must be less than 2MB",
            }));
            return;
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (publish) => {
        updatePost({
            form,
            imageFile,
            status_id: publish ? 2 : 1,
        });
    };

    const handleDelete = async () => {
        const success = await deletePost(postId);
        if (success) {
            setOpenModal(false);
            navigate("/admin/article-management");
        }
    };

    return (
        <div className="flex flex-row bg-base-brown-100">
            <AdminSidebar />

            <main className="flex-1 overflow-auto">
                <div className="flex justify-between items-center py-6 px-[60px] border-b border-b-base-brown-300">
                    <h3 className="text-headline-3 text-base-brown-600">
                        Edit article
                    </h3>

                    <div className="space-x-2">
                        <Button
                            variant="secondary"
                            onClick={() => handleSubmit(false)}
                            disabled={isSubmitting}
                        >
                            Save as draft
                        </Button>

                        <Button
                            variant="primary"
                            onClick={() => handleSubmit(true)}
                            disabled={isSubmitting}
                        >
                            Save
                        </Button>
                    </div>
                </div>

                <div className="space-y-7 px-[60px] pt-10 pb-[120px]">
                    <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
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
                                        <ImageIcon className="h-8 w-8 text-gray-400" />
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
                                value={form.category_id}
                                onValueChange={handleCategoryChange}
                            >
                                <SelectTrigger className={selectTriggerClassName(fieldErrors.category_id)}>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>

                                <SelectContent position="popper" sideOffset={4}>
                                    {categories.map((cat) => (
                                        <SelectItem
                                            key={cat.id}
                                            value={String(cat.id)}
                                            className="transition-colors data-highlighted:bg-base-brown-300/50"
                                        >
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {fieldErrors.category_id && (
                                <p className="text-body-3 text-brand-red">
                                    {fieldErrors.category_id}
                                </p>
                            )}
                        </div>

                        {/* Title */}
                        <FormInput
                            label="Title"
                            name="title"
                            type="text"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Article title"
                            error={fieldErrors.title}
                        />

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
                                className={inputClassName(!!fieldErrors.description, "resize-y")}
                            />
                            {fieldErrors.description && (
                                <p className="text-body-3 text-brand-red">
                                    {fieldErrors.description}
                                </p>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="content" className="text-base-brown-400 text-body-1">Content</label>
                            <textarea
                                id="content"
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                placeholder="Content"
                                rows={10}
                                className={inputClassName(!!fieldErrors.content, "resize-y")}
                            />
                            {fieldErrors.content && (
                                <p className="text-body-3 text-brand-red">
                                    {fieldErrors.content}
                                </p>
                            )}
                        </div>
                    </form>

                    <Button
                        variant="text"
                        size="none"
                        disabled={isDeleting}
                        onClick={() => setOpenModal(true)}
                    >
                        <Trash2 />
                        Delete article
                    </Button>

                    <Modal
                        title="Delete article"
                        description="Do you want to delete this article?"
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        onConfirm={handleDelete}
                    />
                </div>
            </main>
        </div>
    );
}

export default AdminEditArticlePage;

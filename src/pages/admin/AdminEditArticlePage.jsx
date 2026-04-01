import { ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Trash2 } from 'lucide-react';
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AdminSidebar from "@/components/AdminSidebar";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import usePost from "@/hooks/usePost";
import useCategories from "@/hooks/Category/useCategories";
import useUpdatePost from "@/hooks/Post/useUpdatePost";
import useDeletePost from "@/hooks/Post/useDeletePost";

function AdminEditArticlePage() {
    const { postId } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const { post, isLoading } = usePost(postId);
    const { categories } = useCategories();
    const { updatePost, isSubmitting } = useUpdatePost(postId);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const { deletePost, isDeleting } = useDeletePost();
    console.log("POST:", post);
    const [form, setForm] = useState({
        title: "",
        description: "",
        content: "",
        category_id: "",
    });

    // sync data จาก post → form
    useEffect(() => {
        if (post) {
            setForm({
                title: post.title || "",
                description: post.description || "",
                content: post.content || "",
                category_id: String(post.category_id) || "",
            });

            setImagePreview(post.image || null); // 👈 สำคัญ
        }
    }, [post]);

    if (isLoading) return <div>Loading...</div>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (publish) => {
        updatePost({
            ...form,
            status_id: publish ? 2 : 1,
            imageFile
        });
    };
    const handleDelete = async () => {
        const success = await deletePost(postId);

        if (success) {
            setOpenModal(false);

            // 👉 optional: redirect
            navigate("/admin/articles");
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
                    <form className="space-y-7">
                        {/* Thumbnail */}
                        <div>
                            <label className="block text-base-brown-400 text-body-1 mb-4">
                                Thumbnail image
                            </label>

                            <div className="flex items-end space-x-7">
                                <div className="flex justify-center items-center w-full max-w-lg h-64 border border-dashed rounded-md bg-base-brown-200">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            className="object-cover w-full h-full rounded-md"
                                        />
                                    ) : (
                                        <ImageIcon className="h-8 w-8 text-gray-400" />
                                    )}
                                </div>

                                <label className="px-8 py-2 bg-background rounded-full border cursor-pointer">
                                    Upload thumbnail image
                                    <input type="file" className="sr-only" onChange={handleImageChange} />
                                </label>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="flex flex-col gap-1 w-[480px]">
                            <span className="text-body-1 text-base-brown-400">
                                Category
                            </span>

                            <Select
                                value={form.category_id}
                                onValueChange={(value) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        category_id: value,
                                    }))
                                }
                            >
                                <SelectTrigger className="w-full p-3 bg-white border rounded-lg">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>

                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={String(cat.id)}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="text-base-brown-400">Title</label>
                            <Input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="bg-white"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-base-brown-400">Introduction</label>
                            <Textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={3}
                                className="bg-white"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="text-base-brown-400">Content</label>
                            <Textarea
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                rows={10}
                                className="bg-white"
                            />
                        </div>
                    </form>
                    <Button
                        variant="text"
                        leftIcon={<Trash2 />}
                        onClick={() => setOpenModal(true)}>
                        Delete article
                    </Button>
                    <Modal
                        title="Delete article"
                        description="Do you want to delete this article?"
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        onConfirm={handleDelete}
                    >
                    </Modal>
                </div>
            </main >
        </div >
    );
}

export default AdminEditArticlePage;
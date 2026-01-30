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
function AdminCreateArticlePage() {
    return (
        <div className="flex flex-row bg-base-brown-100">
            <AdminSidebar />
            <main className="flex-1 overflow-auto">
                <div className="flex justify-between items-center py-6 px-[60px] border-b border-b-base-brown-300">
                    <h3 className="text-headline-3 text-base-brown-600">Create article</h3>
                    <div className="space-x-2">
                        <Button variant="secondary" text="Sava as draft" />
                        <Button variant="primary" text="Sava and publish" />
                    </div>
                </div>

                <form className="space-y-7 px-[60px] pt-10 pb-[120px]">
                    <div>
                        <label
                            htmlFor="thumbnail"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Thumbnail image
                        </label>
                        <div className="flex items-end space-x-4">
                            <div className="flex justify-center items-center w-full max-w-lg h-64 px-6 py-20 border-2 border-gray-300 border-dashed rounded-md bg-gray-50">
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

                    <div>
                        <label htmlFor="category">Category</label>
                        <Select>
                            <SelectTrigger className="max-w-lg mt-1 py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cat">Cat</SelectItem>
                                <SelectItem value="general">General</SelectItem>
                                <SelectItem value="inspiration">Inspiration</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label htmlFor="author">Author name</label>
                        <Input
                            id="author"
                            defaultValue="Thompson P."
                            className="mt-1 max-w-lg"
                            disabled
                        />
                    </div>

                    <div>
                        <label htmlFor="title">Title</label>
                        <Input
                            id="title"
                            placeholder="Article title"
                            className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
                        />
                    </div>

                    <div>
                        <label htmlFor="introduction">Introduction (max 120 letters)</label>
                        <Textarea
                            id="introduction"
                            placeholder="Introduction"
                            rows={3}
                            className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
                            maxLength={120}
                        />
                    </div>

                    <div>
                        <label htmlFor="content">Content</label>
                        <Textarea
                            id="content"
                            placeholder="Content"
                            rows={20}
                            className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
                        />
                    </div>
                </form>
            </main>
        </div>
    )
}

export default AdminCreateArticlePage
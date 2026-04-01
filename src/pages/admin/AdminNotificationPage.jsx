import AdminSidebar from "@/components/AdminSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useNotifications from "@/hooks/useNotifications";
import { Link } from "react-router-dom";

function AdminNotificationPage() {
    const { notifications, isLoading } = useNotifications();

    return (
        <div className="flex bg-base-brown-100">
            <AdminSidebar />
            <main className="flex-1">
                <h3 className="h-[97px] flex items-center px-[60px] border-b border-b-base-brown-300 text-headline-3">
                    Notification
                </h3>
                <div className="pt-10 px-[60px] pb-30 space-y-10">
                    {notifications.map((notification) => (
                        <div key={notification.id}>
                            <div className="flex items-start gap-10">
                                <div className="grow flex gap-3">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage
                                            className="object-cover"
                                            src={notification.user.avatar}
                                            alt={notification.user.name}
                                        />
                                        <AvatarFallback>
                                            {notification.user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="text-body-1">
                                        <span className="font-bold text-base-brown-500">
                                            {notification.user.name}
                                        </span>
                                        <span className="text-base-brown-400">
                                            {notification.type === "comment"
                                                ? " 💬 commented on "
                                                : " ❤️ liked "}
                                            your article: {notification.article}
                                        </span>
                                        {notification.type === "comment" && (
                                            <p className="text-base-brown-500">
                                                {notification.content}
                                            </p>
                                        )}
                                        <p className="text-brand-orange mt-1.5">
                                            {notification.time}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    to={`/post/${notification.post_id}`}
                                    className="underline text-body-1 text-base-brown-600"
                                >
                                    View
                                </Link>
                            </div>
                            <hr className="border-t border-t-base-brown-300 mt-10" />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default AdminNotificationPage
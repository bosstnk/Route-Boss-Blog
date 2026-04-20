import AdminSidebar from "@/components/AdminSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useNotifications from "@/hooks/useNotifications";
import { Link } from "react-router-dom";

function formatNotificationTime(createdAt) {
    const now = new Date();
    const date = new Date(createdAt);
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    }
    if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    }

    return (
        date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) +
        " at " +
        date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })
    );
}

function getNotificationText(type) {
    switch (type) {
        case "comment":
            return " commented on your article.";
        case "like":
            return " liked your article.";
        case "new_post":
            return " published a new article.";
        case "comment_on_commented_post":
            return " commented on the article you have commented on.";
        default:
            return "";
    }
}

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
                    {isLoading && (
                        <p className="text-base-brown-400">Loading...</p>
                    )}
                    {notifications.map((notification) => (
                        <div key={notification.id}>
                            <div className="flex items-start gap-10">
                                <div className="grow flex gap-3">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage
                                            className="object-cover"
                                            src={notification.actor.profile_pic}
                                            alt={notification.actor.name}
                                        />
                                        <AvatarFallback>
                                            {notification.actor.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="text-body-1">
                                        <span className="font-bold text-base-brown-500">
                                            {notification.actor.name}
                                        </span>
                                        <span className="text-base-brown-400">
                                            {getNotificationText(notification.type)}
                                        </span>
                                        {notification.type === "comment" && notification.comment_text && (
                                            <p className="text-base-brown-500 mt-1">
                                                {notification.comment_text}
                                            </p>
                                        )}
                                        <p className="text-brand-orange mt-1.5">
                                            {formatNotificationTime(notification.created_at)}
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
    );
}

export default AdminNotificationPage;

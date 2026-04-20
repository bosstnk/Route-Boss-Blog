import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const truncate = (text, max = 30) =>
  text?.length > max ? text.slice(0, max) + "..." : text;

function getActionText(type) {
  switch (type) {
    case "comment": return "commented on";
    case "like": return "liked";
    case "new_post": return "published";
    case "comment_on_commented_post": return "commented on";
    default: return "";
  }
}

function formatNotificationTime(createdAt) {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now - created;
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;

  const day = created.getDate();
  const month = created.toLocaleString("en-GB", { month: "long" });
  const year = created.getFullYear();
  const time = created.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return `${day} ${month} ${year} at ${time}`;
}

export function NotificationBox({ notifications, isLoading }) {
  return (
    <div className="absolute top-15 right-0 w-[362px] p-4 bg-base-brown-100 shadow-[2px_2px_16px_0_rgba(0,0,0,0.1)] space-y-4 rounded-xl">
      {isLoading ? (
        <p className="text-body-2 text-base-brown-500">Loading...</p>
      ) : notifications.length === 0 ? (
        <p className="text-body-2 text-base-brown-500">No notifications</p>
      ) : (
        notifications.map((notification) => (
          <div key={notification.id} className="flex flex-row gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={notification.actor?.profile_pic}
                alt={notification.actor?.name}
              />
              <AvatarFallback>
                {notification.actor?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-body-1 text-base-brown-500">
                <span className="font-bold">{notification.actor?.name}</span>{" "}
                {getActionText(notification.type)}{" "}
                &ldquo;{truncate(notification.post_title)}&rdquo;.
              </p>
              <div className="text-body-3 text-brand-orange">
                {formatNotificationTime(notification.created_at)}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

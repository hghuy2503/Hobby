import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import streamServerClient from "@/lib/stream";
import { Bookmark, Home } from "lucide-react";
import Link from "next/link";
import MessagesButton from "./MessagesButton";
import NotificationsButton from "./NotificationsButton";

interface MenuBarProps {
  className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
  const { user } = await validateRequest();

  if (!user) return null;

  const [unreadNotificationsCount, unreadMessagesCount] = await Promise.all([
    prisma.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      },
    }),
    (await streamServerClient.getUnreadCount(user.id)).total_unread_count,
  ]);

  return (
    <div className={className}>
      {/* Home Button */}
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home className="text-teal-500" />
          <span className="hidden lg:inline">Trang chủ</span>
        </Link>
      </Button>

      {/* Notifications Button */}
      <NotificationsButton
        initialState={{ unreadCount: unreadNotificationsCount }}
      />

      {/* Messages Button */}
      <MessagesButton initialState={{ unreadCount: unreadMessagesCount }} />

      {/* Bookmarks Button */}
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        <Link href="/bookmarks">
          <Bookmark className="text-purple-500" />
          <span className="hidden lg:inline">Lưu bài viết</span>
        </Link>
      </Button>
    </div>
  );
}

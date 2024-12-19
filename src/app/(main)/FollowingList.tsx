"use client";

import FollowButton from "@/components/FollowButton";
import UserAvatar from "@/components/UserAvatar";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";

export default function FollowingList() {
  const { data: following = [], isLoading } = useQuery({
    queryKey: ["following-list"],
    queryFn: () => fetch("/api/following").then((res) => res.json()),
  });

  if (isLoading) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <h3 className="text-xl font-bold">Bạn bè đã theo dõi</h3>
      {following.length === 0 && (
        <p className="text-muted-foreground text-sm"></p>
      )}
      {following.map((user) => (
        <div key={user.id} className="flex items-center justify-between gap-3">
          <Link href={`/users/${user.username}`} className="flex items-center">
            <UserAvatar avatarUrl={user.avatarUrl} />
            <div className="ml-2">
              <p className="font-semibold">{user.displayName}</p>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </Link>
          <FollowButton
            userId={user.id}
            initialState={{
              followers: user._count.followers,
              isFollowedByUser: true,
            }}
          />
        </div>
      ))}
    </div>
  );
}

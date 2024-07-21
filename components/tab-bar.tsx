"use client";

import {
  NewspaperIcon as OutlineNewspaperIcon,
  HomeIcon as OutlineHome,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineLiveIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import {
  NewspaperIcon as SolidNewspaperIcon,
  HomeIcon as SolidHome,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidLiveIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:text-white">
      <Link href="/products" className="flex flex-col items-center gap-px">
        {pathname === "/products" ? (
          <SolidHome className="size-6" />
        ) : (
          <OutlineHome className="size-6" />
        )}{" "}
        <span>Home</span>
      </Link>
      <Link href="/life" className="flex flex-col items-center gap-px">
        {pathname === "/life" ? (
          <SolidNewspaperIcon className="size-6" />
        ) : (
          <OutlineNewspaperIcon className="size-6" />
        )}{" "}
        <span>Life</span>
      </Link>
      <Link href="/chats" className="flex flex-col items-center gap-px">
        {pathname === "/chats" ? (
          <SolidChatIcon className="size-6" />
        ) : (
          <OutlineChatIcon className="size-6" />
        )}{" "}
        <span>Chat</span>
      </Link>
      <Link href="/live" className="flex flex-col items-center gap-px">
        {pathname === "/live" ? (
          <SolidLiveIcon className="size-6" />
        ) : (
          <OutlineLiveIcon className="size-6" />
        )}{" "}
        <span>Live</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        {pathname === "/profile" ? (
          <SolidUserIcon className="size-6" />
        ) : (
          <OutlineUserIcon className="size-6" />
        )}{" "}
        <span>My Page</span>
      </Link>
    </div>
  );
}

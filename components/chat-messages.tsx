"use client";

import { InitialChatMessages } from "@/app/chats/[id]/page";
import { formatToDate } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface ChatMessagesListProps {
  initialMessages: InitialChatMessages;
  userId: number;
}

export default function ChatMessagesList({
  initialMessages,
  userId,
}: ChatMessagesListProps) {
  const [messages, setMessages] = useState(initialMessages);
  return (
    <div className="p-5 flex flex-col gap-5 min-h-screen justify-end">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-2 items-start ${message.userId === userId ? "justify-end" : ""}`}
        >
          {message.userId === userId ? null : (
            <Image
              src={message.user.avatar!}
              alt={message.user.username}
              width={50}
              height={50}
              className="size-10 rounded-full"
            />
          )}
          <div
            className={`flex flex-col gap-1 ${message.userId === userId ? "items-end" : ""}`}
          >
            <span
              className={`bg-orange-500 p-2.5 rounded-md ${message.userId === userId ? "" : "bg-white text-black"}`}
            >
              {message.payload}
            </span>
            <span>{formatToDate(message.created_at.toString())}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

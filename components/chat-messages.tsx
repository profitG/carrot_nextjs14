"use client";

import { InitialChatMessages } from "@/app/chats/[id]/page";
import { formatToDate } from "@/lib/utils";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SUPABASE_PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXFma2hoYmFkamNxZHllYm9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyNTk4OTcsImV4cCI6MjAzNzgzNTg5N30.vPK9viHJ8En1EV00bH9YzIREUCUqO-zDTe033fzfJkk";

const SUPABASE_URL = "https://oneqfkhhbadjcqdyebob.supabase.co";

interface ChatMessagesListProps {
  initialMessages: InitialChatMessages;
  userId: number;
  chatRoomId: string;
}

export default function ChatMessagesList({
  initialMessages,
  userId,
  chatRoomId,
}: ChatMessagesListProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const channel = useRef<RealtimeChannel>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessages((prevMsg) => [
      ...prevMsg,
      {
        id: Date.now(),
        payload: message,
        created_at: new Date(),
        userId,
        user: {
          username: "string",
          avatar: "xxx",
        },
      },
    ]);
    channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: { message },
    });
    setMessage("");
  };

  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    channel.current = client.channel(`room-${chatRoomId}`);
    channel.current
      .on("broadcast", { event: "message" }, (payload) => {
        console.log(payload);
      })
      .subscribe();
    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId]);

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
      <form className="flex relative" onSubmit={onSubmit}>
        <input
          required
          onChange={onChange}
          value={message}
          className="bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
          type="text"
          name="message"
          placeholder="Write a message..."
        />
        <button className="absolute right-0">
          <ArrowUpCircleIcon className="size-10 text-orange-500 transition-colors hover:text-orange-300" />
        </button>
      </form>
    </div>
  );
}

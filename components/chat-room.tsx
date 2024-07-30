"use client";

import { useRouter } from "next/navigation";

interface User {
  id: number;
  username: string;
  avatar: string | null;
}

interface Message {
  id: number;
  payload: string;
  created_at: Date;
  userId: number;
}

interface ChatRoom {
  id: string;
  users: User[];
  messages: Message[];
}

interface ChatRoomListProps {
  chatRooms: ChatRoom[];
  sessionId: number;
}

export default function ChatRoomList({
  chatRooms,
  sessionId,
}: ChatRoomListProps) {
  const router = useRouter();

  return (
    <div className="p-5 border-b-2 border-neutral-400">
      {chatRooms && chatRooms.length > 0 ? (
        chatRooms.map((room) => {
          const otherUser = room.users.find((user) => user.id !== sessionId);
          return (
            <div
              key={room.id}
              onClick={() => router.push(`/chats/${room.id}`)}
              className="flex gap-3 items-center"
            >
              <div>
                <img
                  src={otherUser?.avatar || "/default-avatar.png"}
                  alt={`${otherUser?.username}'s avatar`}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">{otherUser?.username}</h2>
                <p className="text-white text-opacity-60">
                  {room.messages[0]?.payload || "No messages yet"}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <p>No chat rooms available</p>
      )}
    </div>
  );
}

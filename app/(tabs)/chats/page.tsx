/*

1. 자신이 속해있는 채팅방을 보여준다
2. 그 채팅방의 상대 아바타와 이름을 보여준다
3. 최신 메세지를 보여준다
4. 클릭 시 해당 채팅방으로 이동한다

1. 
현재 userid는 getsession으로 받아오고
아니지 user 안에 chatRoom이 들어있으니까 그거 그대로 가져와서 보여주고 chat_room id 가져오고
chat_room id를 통해서 message에서 찾아
아니면 해당 chat_room의 마지막 message를 보여줘도 되고
그리고 그 chat_room에 참여하는 다른 userid를 뽑아서 
아바타 보여주고, 이름 보여줘
onclick 혹은 button으로 만들어서
클릭 시 redirect(/chats/roomId) 로 이동

user랑 message랑 []로 묶여있다.
이걸 어떻게 풀지

page는 server로 남겨두고 client component를 만들어보자
*/

import ChatRoomList from "@/components/chat-room";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

export const getChatRooms = async () => {
  const session = await getSession();
  const chatRoom = await db.chatRoom.findMany({
    where: {
      users: {
        some: {
          id: session.id,
        },
      },
    },
    select: {
      id: true,
      users: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      messages: {
        orderBy: {
          created_at: "desc",
        },
        take: 1,
        select: {
          id: true,
          payload: true,
          created_at: true,
          userId: true,
        },
      },
    },
  });
  return chatRoom;
};

export default async function showChatRooms() {
  const chatRooms = await getChatRooms();
  const session = await getSession();
  if (!session) {
    return notFound();
  }
  return <ChatRoomList chatRooms={chatRooms} sessionId={session.id!} />;
}

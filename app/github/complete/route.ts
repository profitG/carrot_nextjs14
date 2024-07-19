import db from "@/lib/db";
import getSession from "@/lib/session";
import { Cookie } from "next/font/google";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: { Accept: "application/json" },
  });
  const { error, access_token } = await accessTokenResponse.json();
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });
  const { id, avatar_url, login } = await userProfileResponse.json();
  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });
  if (user) {
    await saveUserIdInCookie(user);
    return redirect("/profile");
  }
  //   const findUserName = await db.user.findUnique({
  //     where: {
  //       username: login,
  //     },
  //   });
  //   let newName = login;
  //   if (findUserName) {
  //     newName = login + `${id}`;
  //   }

  const newUser = await db.user.create({
    data: {
      username: login,
      github_id: id + "",
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  });
  await saveUserIdInCookie(newUser);
  return redirect("/profile");
}

/*
    코드 챌린지 
    1. session을 받고 캐시에 저장하는거까지 function으로 바꾸기
    ----------------------------------------------------------------------
    2. github login에서 username이 중복되는데 그걸 어떻게 할지
    3. github의 email을 user email로 동일한 access-token을 받아서 가져오기
    4. code를 가져오는 Request와 Response를 function으로 바꾸고, github 가져오는것도 새 function으로 만들고
*/

// export async function saveUserIdInCookie(user: { id: number }) {
//   const session = await getSession();
//   session.id = user.id;
//   await session.save();
// }

export async function saveUserIdInCookie(user: { id: number }) {
  console.log("saveUserIdInCookie 시작");
  const session = await getSession();
  session.id = user.id;
  console.log("세션 ID 설정 완료:", session);
  await session.save();
}

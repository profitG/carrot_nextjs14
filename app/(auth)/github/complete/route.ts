import db from "@/lib/db";
import getSession from "@/lib/session";
import { chkOverlap, getAccessToken, getAPI } from "@/lib/utils";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  const accessTokenURL = await getAccessToken(code);

  const userProfileResponse = getAPI(accessTokenURL);

  const { id, avatar_url, login, email } = await (
    await userProfileResponse
  ).json();

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

  const newName = await chkOverlap(login);

  const newUser = await db.user.create({
    data: {
      username: newName,
      github_id: id + "",
      avatar: avatar_url,
      email,
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
    2. github login에서 username이 중복되는데 그걸 어떻게 할지
    ----------------------------------------------------------------------
    4. code를 가져오는 Request와 Response를 function으로 바꾸고, github 가져오는것도 새 function으로 만들고
    3. github의 email을 user email로 동일한 access-token을 받아서 가져오기
*/

async function saveUserIdInCookie(user: { id: number }) {
  const session = await getSession();
  session.id = user.id;
  await session.save();
}

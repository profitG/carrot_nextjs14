import db from "./db";

export function formatToWon(price: number) {
  return price.toLocaleString("ko-KR");
}

export function formatToDate(date: string) {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat("ko");
  return formatter.format(diff, "days");
}

// export async function saveUserIdInCookie(user: { id: number }) {
//   const session = await getSession();
//   session.id = user.id;
//   await session.save();
// }

export async function chkOverlap(login: string) {
  const findUserName = findUN(login);
  let newName = login;
  if (findUserName != null) {
    newName = login + `-git`;
  }

  return newName;
}

export async function findUN(login: string) {
  const findUserName = await db.user.findUnique({
    where: {
      username: login,
    },
    select: {
      username: true,
    },
  });
  return findUserName;
}

export async function getAccessToken(code: string) {
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  return accessTokenURL;
}

export async function getAPI(accessTokenURL: string) {
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
  return userProfileResponse;
}

"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";

export const likePost = async (postId: number) => {
  await new Promise((r) => setTimeout(r, 5000));
  try {
    const session = await getSession();
    await db.like.create({
      data: {
        postid: postId,
        userid: session.id!,
      },
    });
  } catch (e) {}
  revalidateTag(`like-status-${postId}`);
};

export const disLikePost = async (postId: number) => {
  await new Promise((r) => setTimeout(r, 5000));
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          postid: postId,
          userid: session.id!,
        },
      },
    });
  } catch (e) {}
  revalidateTag(`like-status-${postId}`);
};

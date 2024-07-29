import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToDate } from "@/lib/utils";
import { EyeIcon, HeartIcon } from "@heroicons/react/24/solid";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    return post;
  } catch (e) {
    return null;
  }
}

const getCachedPost = nextCache(getPost, ["Post-detail"], {
  tags: ["post-likes"],
});

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }

  async function getIsLiked(postid: number) {
    const session = await getSession();
    const like = await db.like.findUnique({
      where: {
        id: {
          postid,
          userid: session.id!,
        },
      },
    });

    return Boolean(like);
  }
  const likePost = async () => {
    "use server";
    try {
      const session = await getSession();
      await db.like.create({
        data: {
          postid: id,
          userid: session.id!,
        },
      });
    } catch (e) {}
    revalidateTag("post-likes");
  };

  const disLikePost = async () => {
    "use server";
    try {
      const session = await getSession();
      await db.like.delete({
        where: {
          id: {
            postid: id,
            userid: session.id!,
          },
        },
      });
    } catch (e) {}
    revalidateTag("post-likes");
  };
  const isLiked = await getIsLiked(id);
  return (
    <div className="p-5 text-white">
      <div className="flex items-center gap-3 mb-4">
        <Image
          src={post.user.avatar!}
          alt={post.user.username}
          width={28}
          height={28}
          className="size-7 rounded-full"
        />
        <div>
          <span className="font-semibold text-sm">{post.user.username}</span>
          <div className="text-sm">
            <span>{formatToDate(post.created_at.toString())}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-2xl font-bold">{post.title}</span>
        <span className="text-lg mb-5">{post.description}</span>
      </div>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>{post.views}</span>
        </div>
        <form action={isLiked ? disLikePost : likePost}>
          <button
            className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 hover:bg-neutral-800 transition-colors`}
          >
            <HeartIcon className="size-5" />
            <span>{post._count.likes}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

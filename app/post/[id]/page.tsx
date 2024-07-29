import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToDate } from "@/lib/utils";
import { EyeIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import LikeButton from "@/components/like-button";

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
  tags: ["detail"],
  revalidate: 60,
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

  async function getLikeStatus(postid: number, userid: number) {
    //const session = await getSession();
    const isLiked = await db.like.findUnique({
      where: {
        id: {
          postid,
          userid,
        },
      },
    });

    const likeCount = await db.like.count({
      where: {
        postid,
      },
    });
    return {
      likeCount,
      isLiked: Boolean(isLiked),
    };
  }

  // const getCachedLikeStatus = nextCache(getLikeStatus, ["like-status"], {
  //   tags: ["likes"],
  // });

  async function getCachedLikeStatus(postId: number) {
    const session = await getSession();
    const userId = session.id;
    const cachedOperation = nextCache(getLikeStatus, ["product-like-status"], {
      tags: [`like-status-${postId}`],
    });
    return cachedOperation(postId, userId!);
  }

  const { likeCount, isLiked } = await getCachedLikeStatus(id);

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
        <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
      </div>
    </div>
  );
}

/*

유저가 댓글을 작성할 수 있는 form을 생성하고
useOptimistic을 통해 댓글을 submit 할 때마다
바로바로 추가하도록
백엔드에서 댓글 목록을 받아오고
그 댓글을 useOptimistic을 사용하는 다른 component로 전달
reduceFn의 형태가 대략 => [...previousComment, {newComment}]



*/

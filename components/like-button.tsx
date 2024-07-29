"use client";

import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";
import { disLikePost, likePost } from "@/app/post/[id]/action";

interface LikeButtonPrps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  postId,
}: LikeButtonPrps) {
  const [state, reduceFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );
  const onClick = async () => {
    reduceFn(undefined);
    if (isLiked) {
      await disLikePost(postId);
    } else {
      await likePost(postId);
    }
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 transition-colors ${state.isLiked ? "bg-orange-500 text-white border-orange-500" : "hover:bg-neutral-800"}`}
    >
      {state.isLiked ? (
        <HeartIcon className="size-5" />
      ) : (
        <OutlineHeartIcon className="size-5" />
      )}
      <span>{state.likeCount}</span>
    </button>
  );
}

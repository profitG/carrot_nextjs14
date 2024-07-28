"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function CloseButton() {
  const router = useRouter();
  const onCloseClick = () => {
    router.back();
  };
  return (
    <button
      onClick={onCloseClick}
      className="absolute right-8 top-8 text-neutral-400"
    >
      <XMarkIcon className="size-10" />
    </button>
  );
}

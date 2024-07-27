"use client";

import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default async function Modal({ params }: { params: { id: string } }) {
  const router = useRouter();
  const onCloseClick = () => {
    router.back();
  };
  return (
    <div className="absolute items-center w-full h-full left-0 top-0 z-50 bg-black bg-opacity-60 flex justify-center">
      <div className="max-w-screen-sm h-2/3 w-full flex justify-center">
        <button
          onClick={onCloseClick}
          className="absolute right-8 top-8 text-neutral-400"
        >
          <XMarkIcon className="size-10" />
        </button>
        <div className="aspect-square text-neutral-400 bg-neutral-700 rounded-md flex justify-center items-center">
          <PhotoIcon className="h-28" />
        </div>
      </div>
    </div>
  );
}
/*
1. button component를 분리
전체를 client component로 만들지 말고 button만 따로 추출해서 client로 만들고 DB나 fetch 등을 실행하도록 해

2. show product in modal
상품에 대한 모든 정보들을 제공해라

modal에 skeleton 만드는 것도 잊지 말고

*/

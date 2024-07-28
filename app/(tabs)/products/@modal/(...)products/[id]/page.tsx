import CloseButton from "@/components/close-button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToWon } from "@/lib/utils";
import { PhotoIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

export default async function Modal({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }
  const isOwner = await getIsOwner(product.userid);
  return (
    <div className="absolute items-center w-full h-full left-0 top-0 z-50 bg-black bg-opacity-60 flex justify-center">
      <div className="max-w-screen-sm h-2/3 w-full flex justify-center">
        <CloseButton />
        <div className="relative overflow-hidden  aspect-square text-neutral-200 justify-center bg-neutral-700 rounded-md flex items-center">
          <div className="overflow-auto max-h-full w-full">
            <div className="relative aspect-square">
              <Image
                fill
                src={`${product.photo}/public`}
                alt={product.title}
                className="object-cover p-5"
              />
            </div>
            <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
              <div className="size-10 rounded-full overflow-hidden">
                {product.user.avatar !== null ? (
                  <Image
                    src={product.user.avatar}
                    width={40}
                    height={40}
                    alt={product.user.username}
                  />
                ) : (
                  <UserIcon />
                )}
              </div>
              <div>
                <h3>{product.user.username}</h3>
              </div>
            </div>
            <div className="p-5">
              <h1 className="text-2xl font-semibold">{product.title}</h1>
              <p>{product.description}</p>
            </div>
            <div className="flexed w-full p-5 bg-neutral-800 bottom-0 left-0 flex justify-between items-center">
              <span className="font-semibold text-2xl">
                {formatToWon(product.price)}원
              </span>
              <div className="flex gap-5">
                {isOwner ? (
                  <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
                    Delete product
                  </button>
                ) : null}
                <Link
                  href={``}
                  className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
                >
                  Go to chat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*

2. show product in modal
상품에 대한 모든 정보들을 제공해라

modal에 skeleton 만드는 것도 잊지 말고

*/

import { formatToDate, formatToWon } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ListProductProps {
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  id: number;
}

export default function ListProduct({
  title,
  price,
  created_at,
  photo,
  id,
}: ListProductProps) {
  return (
    <Link href={`/products/${id}`} className="flex gap-5">
      <div className="relative size-28 rounded-md overflow-hidden">
        <Image
          fill
          src={`${photo}/avatar`}
          alt={title}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 *:text-white">
        <span className="text-lg">{title}</span>
        <span className="text-sm">{formatToDate(created_at.toString())}</span>
        <span className="text-lg font-semibold">{formatToWon(price)}원</span>
      </div>
    </Link>
  );
}

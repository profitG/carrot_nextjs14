import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export default function SocialLogin() {
  return (
    <>
      <div className="w-full h-px bg-neutral-500" />
      <div className="flex flex-col gap-2">
        <Link
          href="/github/start"
          className="btn flex h-10 items-center justify-center gap-3"
        >
          <FaGithub className="size-6" />
          <span>Continue with Github</span>
        </Link>
        <Link
          href="/sms"
          className="btn flex h-10 items-center justify-center gap-3"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="size-6" />
          </span>
          <span>Continue with SMS</span>
        </Link>
      </div>
    </>
  );
}

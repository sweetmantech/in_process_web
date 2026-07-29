"use client";

import Link from "next/link";
import { avatarColorFor } from "@/lib/artists/avatarColorFor";

type CommentAvatarProps = {
  sender: string;
  initial: string;
  href: string;
};

const CommentAvatar = ({ sender, initial, href }: CommentAvatarProps) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex size-[30px] shrink-0 items-center justify-center rounded-full font-archivo-bold text-xs text-white"
    style={{ background: avatarColorFor(sender) }}
  >
    {initial}
  </Link>
);

export default CommentAvatar;

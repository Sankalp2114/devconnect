"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserCardSqProps {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  accountType: string;
}
const UserCardSq = ({
  id,
  name,
  username,
  imgUrl,
  accountType,
}: UserCardSqProps) => {
  const router = useRouter();
  return (
    <Link href={`/profile/${id}`}>
      <article className="user-card flex-col outline outline-[rgba(255,255,255,0.2)] p-4 rounded-md hover:outline-[rgba(255,255,255,0.6)] transition-all ease-in-out mt-4">
        <Image
          src={imgUrl}
          alt="profileImg"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="user-card_avatar">
          <div className="flex flex-col flex-1 text-ellipsis items-center justify-center">
            <h4 className="text-baase-semibold text-light-1">{name}</h4>
            <p className="text-small-mdeium text-gray-1">@{username}</p>
          </div>
        </div>
        <Button
          className="user-card_btn w-3/4"
          onClick={() => router.push(`/profile/${id}`)}
        >
          View
        </Button>
      </article>
    </Link>
  );
};

export default UserCardSq;

"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface UserCardProps {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  accountType: string;
}
const UserCard = ({
  id,
  name,
  username,
  imgUrl,
  accountType,
}: UserCardProps) => {
  const router = useRouter();
  return (
    <article className="user-card outline outline-[rgba(255,255,255,0.2)] p-4 rounded-md hover:outline-[rgba(255,255,255,0.6)] transition-all ease-in-out">
      <div className="user-card_avatar">
        <Image
          src={imgUrl}
          alt="profileImg"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex-1 text-ellipsis">
          <h4 className="text-baase-semibold text-light-1">{name}</h4>
          <p className="text-small-mdeium text-gray-1">@{username}</p>
        </div>
      </div>
      <Button
        className="user-card_btn"
        onClick={() => router.push(`/profile/${id}`)}
      >
        View
      </Button>
    </article>
  );
};

export default UserCard;

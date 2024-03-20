"use client";

import { dislikePost, likePost } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.actions";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface LikeProps {
  id: string;
  currentUserId: string;
  isLiked: boolean;
}

async function Like({ id, currentUserId, isLiked }: LikeProps) {
  const router = useRouter();

  const handleLikeClick = async () => {
    if (isLiked) {
      await dislikePost(id, currentUserId);
    } else {
      await likePost(id, currentUserId);
    }
    window.location.reload();
  };

  return (
    <>
      {isLiked ? (
        <Heart
          width={24}
          height={24}
          className="cursor-pointer"
          color={"red"}
          fill="red"
          onClick={handleLikeClick}
        />
      ) : (
        <Heart
          width={24}
          height={24}
          className="cursor-pointer"
          color={"gray"}
          onClick={handleLikeClick}
        />
      )}
    </>
  );
}

export default Like;

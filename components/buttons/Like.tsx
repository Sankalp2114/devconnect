"use client";

import { likePost } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.actions";
import { Heart } from "lucide-react";

interface LikeProps {
  id: string;
  currentUserId: string;
}

async function Like({ id, currentUserId }: LikeProps) {
  //   const userInfo = await fetchUser(currentUserId);
  const handleLikeClick = async () => {
    console.log(currentUserId);
    await likePost(id, currentUserId);
  };
  // const handleLike = async (id: string, currentUserId: string) => {
  //   await likePost(id, currentUserId);
  // };
  return (
    <Heart
      width={24}
      height={24}
      className="cursor-pointer"
      color="gray"
      onClick={handleLikeClick}
    />
  );
}

export default Like;

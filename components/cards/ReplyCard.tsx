import { fetchLikedPosts, likePost } from "@/lib/actions/thread.action";
import { Heart, MessageCircleMore, Repeat2, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Like from "../buttons/Like";
import { usePathname } from "next/navigation";
import { formatDateString } from "@/lib/utils";
import { userInfo } from "os";
import { fetchUser } from "@/lib/actions/user.actions";

interface ThreadCardProps {
  id: string;
  likes: number;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  userDbId: string;
  profileid: string;
}

const ReplyCard = async ({
  id,
  likes,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  userDbId,
  profileid,
}: ThreadCardProps) => {
  let isLiked = false;
  const userInfo = await fetchUser(profileid);
  try {
    let likedPosts = await fetchLikedPosts(userDbId);
    isLiked = likedPosts.includes(id);
  } catch (error) {
    console.error("Error fetching liked posts:", error);
  }
  return (
    <article className="flex w-full flex-col rounded-xl mt-2 bg-dark-2 p-7  ">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center ">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="profile pic"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1 ">
                {author.name} replied to user's post:
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>
            <div
              className={` ${isComment && "mb-10"} mt-5 flex flex-col gap-3`}
            >
              <div className="flex gap-10"></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ReplyCard;

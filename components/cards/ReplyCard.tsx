import {
  fetchLikedPosts,
  fetchPostById,
  likePost,
} from "@/lib/actions/thread.action";
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
  parentId: string;
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
}: ThreadCardProps) => {
  let isLiked = false;
  try {
    let likedPosts = await fetchLikedPosts(userDbId);
    isLiked = likedPosts.includes(id);
  } catch (error) {
    console.error("Error fetching liked posts:", error);
  }
  const postInfo = await fetchPostById(parentId);
  return (
    <article
      className={`flex w-full flex-col rounded-xl mt-2 ${
        isComment ? "px-2 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
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

            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`?profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1 ">
                {author.name} replied to{" "}
                <Link
                  href={`/thread/${postInfo._id}`}
                  className="text-[#0423d1]"
                >
                  {postInfo.author.name}
                </Link>
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>
            <div
              className={` ${isComment && "mb-10"} mt-5 flex flex-col gap-3`}
            >
              <div className="flex gap-10">
                <div className="flex items-center">
                  <Like
                    id={id}
                    currentUserId={String(userDbId)}
                    isLiked={isLiked}
                  />
                  <p className=" rounded-ful px-2 py-1 !text-tiny-medium text-light-2">
                    {likes}
                  </p>
                </div>

                <Link href={`/thread/${id}`}>
                  <MessageCircleMore
                    width={24}
                    height={24}
                    className="cursor-pointer"
                    color="gray"
                  />
                </Link>
                <Repeat2
                  width={24}
                  height={24}
                  className="cursor-pointer"
                  color="gray"
                />
                <Share2
                  width={24}
                  height={24}
                  className="cursor-pointer"
                  color="gray"
                />
              </div>
              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1 ">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)} - {community.name} Community
          </p>
          <Image
            src={community.image}
            alt="img"
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
};

export default ReplyCard;

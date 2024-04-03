import { fetchUser, fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import {
  fetchLikedPosts,
  fetchPostById,
  fetchreplies,
} from "@/lib/actions/thread.action";
import ReplyCard from "../cards/ReplyCard";
import LikedCard from "../cards/LikedCard";

interface ThreadsTabProps {
  currentUserId: string;
  accountType: string;
  profileid: string;
}
const LikedPostsTab = async ({
  currentUserId,
  accountType,
  profileid,
}: ThreadsTabProps) => {
  const userInfo = await fetchUser(currentUserId);
  const profileInfo = await fetchUser(profileid);
  let likedPosts = await fetchLikedPosts(profileInfo._id);
  let postsToShow = new Array();
  for (let i = 0; i < likedPosts.length; i++) {
    let post = await fetchPostById(likedPosts[i].toString());
    postsToShow.push(post);
  }

  return (
    <section className="mt-9 felx flex-col gap-10">
      {postsToShow.map((thread: any) => {
        return (
          <LikedCard
            key={thread.id}
            id={thread.id}
            currentUserId={currentUserId}
            parentId={thread.parentId}
            content={thread.text}
            author={{
              name: thread.author.name,
              image: thread.author.image,
              id: thread.author.id,
            }}
            community={thread.community}
            userDbId={userInfo?._id}
            createdAt={thread.createdAt}
            comments={thread.children}
            likes={thread.likes}
            profileInfo={profileInfo}
          />
        );
      })}
    </section>
  );
};

export default LikedPostsTab;

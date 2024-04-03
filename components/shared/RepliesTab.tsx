import { fetchUser, fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchreplies } from "@/lib/actions/thread.action";
import ReplyCard from "../cards/ReplyCard";

interface ThreadsTabProps {
  currentUserId: string;
  accountType: string;
  profileid: string;
}
const RepliesTab = async ({
  currentUserId,
  accountType,
  profileid,
}: ThreadsTabProps) => {
  const userInfo = await fetchUser(currentUserId);
  const profile = await fetchUser(profileid);
  const res = await fetchreplies(profile._id);

  if (!res) redirect("/");

  return (
    <section className="mt-9 felx flex-col gap-10">
      {res.map((thread: any) => (
        <ReplyCard
          key={thread.id}
          id={thread.id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={thread.community}
          userDbId={userInfo?._id}
          createdAt={thread.createdAt}
          comments={thread.children}
          likes={thread.likes}
        />
      ))}
    </section>
  );
};

export default RepliesTab;

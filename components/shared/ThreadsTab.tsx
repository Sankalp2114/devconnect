import { fetchUser, fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface ThreadsTabProps {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
const ThreadsTab = async ({
  currentUserId,
  accountId,
  accountType,
}: ThreadsTabProps) => {
  let res: any;
  if (accountType == "Community") {
    res = await fetchCommunityPosts(accountId);
  } else {
    res = await fetchUserPosts(accountId);
  }
  const userInfo = await fetchUser(currentUserId);

  if (!res) redirect("/");
  return (
    <section className="mt-9 felx flex-col gap-10">
      {res.threads.map((thread: any) => (
        <ThreadCard
          key={thread.id}
          id={thread.id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: res.name, image: res.image, id: res.id }
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

export default ThreadsTab;

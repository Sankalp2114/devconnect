import CommunityCard from "@/components/cards/CommunityCard";
import UserCard from "@/components/cards/UserCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { profileTabs } from "@/constants";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const res = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 20,
  });
  return (
    <div>
      <h1 className="head-text mb-10"> Search</h1>
      <div className="mt-14 flex flex-col gap-9">
        {res.communities.length === 0 ? (
          <p>No such users</p>
        ) : (
          <>
            {res.communities.map((account) => (
              <CommunityCard
                key={account.id}
                id={account.id}
                name={account.name}
                username={account.username}
                imgUrl={account.image}
                bio={account.bio}
                members={account.members}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default page;

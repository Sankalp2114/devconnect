import UserCard from "@/components/cards/UserCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { profileTabs } from "@/constants";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const res = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 20,
  });
  return (
    <div>
      <h1 className="head-text mb-10"> Search</h1>
      <div className="mt-14 flex flex-col gap-9">
        {res.users.length === 0 ? (
          <p>No such users</p>
        ) : (
          <>
            {res.users.map((account) => (
              <UserCard
                key={account.id}
                id={account.id}
                name={account.name}
                username={account.username}
                imgUrl={account.image}
                accountType="User"
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default page;

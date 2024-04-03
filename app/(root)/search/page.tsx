import UserCard from "@/components/cards/UserCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import Searchbar from "@/components/shared/SearchBar";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { profileTabs } from "@/constants";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const res = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: 1,
    pageSize: 20,
  });
  return (
    <div>
      <h1 className="head-text mb-10"> Search</h1>
      <Searchbar routeType="search" />
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
}

export default page;

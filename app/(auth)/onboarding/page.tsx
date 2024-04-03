import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface UserDataProps {
  id: string;
  objectId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
}

async function Page() {
  const user = await currentUser();
  let userId = "";
  if (user) userId = user.id;
  const userInfo = await fetchUser(userId);
  if (!user) redirect("/sign-in");
  const userData: UserDataProps = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };
  if (userInfo?.onboarded) redirect("/");
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text"> OnBoarding</h1>
      <p className="mt-3 test-base-regular text-light-2">Setup your profile</p>
      <section className="mt-9 bg-dark-2 p-10 rounded-2xl">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default Page;

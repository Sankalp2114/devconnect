import ProfileHeader from "@/components/shared/ProfileHeader";
import RepliesTab from "@/components/shared/RepliesTab";
import ThreadsTab from "@/components/shared/ThreadsTab";
import LikedPostsTab from "@/components/shared/LikedPostsTab";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(params.id);

  if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                {tab.icon}
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-[rgb(59,59,255)] px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="threads" className="w-full text-light-1">
            <ThreadsTab
              currentUserId={user.id}
              accountId={userInfo.id}
              accountType="User"
            />
          </TabsContent>
          <TabsContent value="replies" className="w-full text-light-1">
            <RepliesTab
              currentUserId={user.id}
              accountType="User"
              profileid={params.id}
            />
          </TabsContent>
          <TabsContent value="liked" className="w-full text-light-1">
            <LikedPostsTab
              currentUserId={user.id}
              accountType="User"
              profileid={params.id}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
export default Page;

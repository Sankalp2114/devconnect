import UserCard from "@/components/cards/UserCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { communityTabs } from "@/constants";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import { currentUser } from "@clerk/nextjs";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;

  const communityInfo = await fetchCommunityDetails(params.id);
  return (
    <section>
      <ProfileHeader
        accountId={communityInfo.id}
        authUserId={user.id}
        name={communityInfo.name}
        username={communityInfo.username}
        imgUrl={communityInfo.image}
        bio={communityInfo.bio}
        type="Community"
      />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {communityTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                {tab.icon}
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-[rgb(59,59,255)] px-2 py-1 !text-tiny-medium text-light-2">
                    {communityInfo?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="threads" className="w-full text-light-1">
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityInfo._id}
              accountType="Community"
            />
          </TabsContent>
          <TabsContent value="members" className="w-full text-light-1">
            <section className="mt-9 flex flex-col gap-10">
              {communityInfo?.members.map((member: any) => (
                <UserCard
                  key={member._id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  accountType="User"
                />
              ))}
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
export default Page;

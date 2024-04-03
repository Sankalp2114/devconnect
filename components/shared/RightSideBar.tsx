import { fetchUser } from "@/lib/actions/user.actions";
import UserCard from "../cards/UserCard";
import UserCardSq from "../cards/UserCardSq";
async function RightSideBar() {
  const userInfo = await fetchUser("user_2eaFPRCjPipWYOB0pfTy1Y1Y0zC");
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>
        <p className="text-gray-1 mt-10 !text-medium-regualr text-base-semibold">
          No suggested communities yet
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested User</h3>
        <UserCardSq
          id={userInfo.id}
          name={userInfo.name}
          username={userInfo.username}
          imgUrl={userInfo.image}
          accountType="User"
        />
      </div>
    </section>
  );
}

export default RightSideBar;

import { fetchUser, getLogs } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const logs = await getLogs(userInfo._id);
  return (
    <section>
      <h1 className="head-text mb-10">Logs</h1>
      <section className="mt-10 flex flex-col gap-5">
        {logs.length > 0 ? (
          <>
            {logs.map((reply) => (
              <Link key={reply._id} href={`/thread/${reply.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={reply.author.image}
                    alt="profile picture"
                    height={20}
                    width={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regualr text-light-1">
                    <span className="mr-1 text-primary-500">
                      {reply.author.name}
                    </span>
                    commented on one of your posts
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!test-base-regualr text-light-3">No logs to show!</p>
        )}
      </section>
    </section>
  );
};

export default page;

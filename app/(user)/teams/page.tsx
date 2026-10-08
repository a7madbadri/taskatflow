import MyTeams from "./components/MyTeams";
import SharedTasks from "./components/SharedTasks";
import Header from "@/components/Header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getMyMemberships } from "@/utils/team";

async function page() {
  const session = await auth();
  if (!session) redirect("/auth/signin");
  const myMemberships = await getMyMemberships(session.user.id);
  return (
    <>
      <div className="grid content-start grid-cols-1 gap-3 rounded-t-xl h-full scrollbar-hide overflow-auto lg:overflow-hidden lg:grid-rows-[auto_1fr] lg:grid-cols-2 xl:grid-cols-3">
        <Header title="Teams" />
        <MyTeams myMemberships={myMemberships} />
        {/* <SharedTasks /> */}
      </div>
    </>
  );
}

export default page;

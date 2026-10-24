import AddTask from "@/app/(user)/tasks/components/AddTask";
import MyTasks from "@/app/(user)/tasks/components/MyTasks";
import { auth } from "@/auth";
import { getUserTasks, isTaskFilter } from "@/utils/tasks";

type Props = {
  searchParams: Promise<{ filter?: TaskFilters }>;
};

async function Tasks({ searchParams }: Props) {
  const params = await searchParams;
  const session = await auth();
  if (!session) return null;

  const filter =
    params.filter && isTaskFilter(params.filter) ? params.filter : "all";
  const tasks = await getUserTasks(session.user.id, filter);

  return (
    <>
      <AddTask />
      <MyTasks tasks={tasks} filter={filter} />
    </>
  );
}

export default Tasks;

import AddTask from "@/app/(user)/tasks/components/AddTask";
import MyTasks from "@/app/(user)/tasks/components/MyTasks";
import prisma from "@/lib/prisma";

async function Tasks() {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <AddTask />
      <MyTasks tasks={tasks} />
    </>
  );
}

export default Tasks;

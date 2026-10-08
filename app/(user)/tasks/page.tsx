import AddTask from "@/app/(user)/tasks/components/AddTask";
import MyTasks from "@/app/(user)/tasks/components/MyTasks";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

async function Tasks() {
  const session = await auth();
  if (!session) return null;

  const tasks = await prisma.task.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AddTask />
      <MyTasks tasks={tasks} />
    </>
  );
}

export default Tasks;

import AddTask from "@/components/AddTask";
import MyTasks from "@/components/MyTasks";
import prisma from "@/lib/prisma";

export default async function Home() {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <>
      <AddTask />
      <MyTasks tasks={tasks} />
    </>
  );
}

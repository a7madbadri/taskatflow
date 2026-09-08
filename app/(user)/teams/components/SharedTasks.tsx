import Subheading from "@/components/Subheading";
import Assignment from "./Assignment";

const dummyTasks = [
  { id: "01", title: "Task No 1", description: "Dummy Desc", isDone: false },
  { id: "02", title: "Task No 2", description: "Dummy Desc", isDone: false },
  { id: "03", title: "Task No 3", description: "Dummy Desc", isDone: false },
  { id: "04", title: "Task No 4", description: "Dummy Desc", isDone: false },
  { id: "05", title: "Task No 5", description: "Dummy Desc", isDone: false },
  { id: "06", title: "Task No 6", description: "Dummy Desc", isDone: false },
];

function SharedTasks() {
  return (
    <div className="scrollbar-hide lg:overflow-auto lg:col-start-2 lg:row-start-1 lg:row-span-2 xl:col-span-2 xl:col-start-2">
      <Subheading>Shared Tasks</Subheading>
      <div className="mt-2">
        {dummyTasks.map((task) => (
          <Assignment key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}

export default SharedTasks;

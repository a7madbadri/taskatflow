import YourTeams from "./components/YourTeams";
import SharedTasks from "./components/SharedTasks";
import Header from "@/components/Header";

function page() {
  return (
    <>
      <div className="grid content-start grid-cols-1 gap-3 rounded-t-xl h-full scrollbar-hide overflow-auto lg:overflow-hidden lg:grid-rows-[auto_1fr] lg:grid-cols-2 xl:grid-cols-3">
        <Header title="Teams" />
        <YourTeams />
        <SharedTasks />
      </div>
    </>
  );
}

export default page;

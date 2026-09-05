import AddTask from "@/components/AddTask";
import MyTasks from "@/components/MyTasks";
import Subheading from "@/components/Subheading";
import { CheckCircle, Circle, Loader } from "lucide-react";

export default function Home() {
  return (
    <>
      <AddTask />
      <MyTasks />
    </>
  );
}

import Button from "@/components/Button";
import Subheading from "@/components/Subheading";
import Image from "next/image";
import React from "react";
import Assignment from "../components/Assignment";
import Header from "@/components/Header";

const dummyTasks = [
  { id: "01", title: "Task No 1", description: "Dummy Desc", isDone: false },
  { id: "02", title: "Task No 2", description: "Dummy Desc", isDone: false },
  { id: "03", title: "Task No 3", description: "Dummy Desc", isDone: false },
  { id: "04", title: "Task No 4", description: "Dummy Desc", isDone: false },
];

function page() {
  return (
    <div className="grid grid-cols-1 content-start rounded-t-xl gap-3 h-full scrollbar-hide overflow-auto lg:overflow-hidden lg:grid-rows-[auto_1fr] lg:grid-cols-2 xl:grid-cols-3">
      <Header title="Team Name" />
      <div className="border-b pb-2 border-slate-300 mb-2 lg:col-start-1">
        <div className="flex gap-2 text-sm text-slate-700 mb-1">
          <p>
            <b className="text-slate-900 ">16</b> Members
          </p>
          <p>
            <b className="text-slate-900">9/23</b> Tasks
          </p>
        </div>
        <p className="mb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
          accusantium.
        </p>
        <div className="flex items-center flex-wrap gap-2 justify-between">
          <div className="flex h-fit">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Image
                key={i}
                src="/images/profile.png"
                alt="profile pic"
                width={30}
                height={30}
                className="rounded-full border border-slate-600 not-first:-ml-2"
              />
            ))}
          </div>
          <Button size="medium" theme="primary">
            Add Member
          </Button>
        </div>
      </div>

      <div className="scrollbar-hide lg:overflow-auto lg:col-start-2 lg:row-start-1 lg:row-span-2 xl:col-span-2 xl:col-start-2">
        <Subheading>Team&apos;s Tasks</Subheading>
        <div className="mt-2">
          {dummyTasks.map((task) => (
            <Assignment key={task.id} {...task} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;

"use client";

import Link from "next/link";

function YourTeams() {
  return (
    <div className="lg:col-start-1">
      <Link
        href="/teams/134er2"
        className="block duration-150 border-b border-slate-300 p-2 hover:bg-slate-200"
      >
        <h3 className="font-semibold">Team Name</h3>
        <div className="">
          <p className="text-sm text-slate-600">9/21 Tasks</p>
        </div>
      </Link>
      <Link
        href="/teams/134er2"
        className="block duration-150 border-b border-slate-300 p-2 hover:bg-slate-200"
      >
        <h3 className="font-semibold">Team Name</h3>
        <div className="">
          <p className="text-sm text-slate-600">9/21 Tasks</p>
        </div>
      </Link>
      <Link
        href="/teams/134er2"
        className="block duration-150 border-b border-slate-300 p-2 hover:bg-slate-200"
      >
        <h3 className="font-semibold">Team Name</h3>
        <div className="">
          {/* <p className="text-sm text-slate-600">9/21 Tasks</p> */}
          <p className="relative text-sm pl-4 before:absolute before:size-2.5 before:left-0 before:top-1/2 before:translate-y-[-50%] before:bg-green-500 before:rounded-full">
            5 new tasks
          </p>
        </div>
      </Link>
    </div>
  );
}

export default YourTeams;

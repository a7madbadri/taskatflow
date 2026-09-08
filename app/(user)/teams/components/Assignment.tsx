"use client";

import { CheckCircle, Circle } from "lucide-react";
import { useState } from "react";

interface Props {
  title: string;
  description: string;
  isDone: boolean;
}

function Assignment({ title, description, isDone: done }: Props) {
  const [isDone, setIsDone] = useState(done);

  return (
    <div className="bg-indigo-100 border border-indigo-200 p-2 rounded-xl not-last:mb-2">
      <div className="flex gap-2 mb-1 cursor-pointer w-fit">
        <button className="" onClick={() => setIsDone(!isDone)}>
          {isDone ? <CheckCircle size={18} /> : <Circle size={18} />}
          {/* <Loader size={18} className="animate-spin" /> */}
        </button>
        <p className="">Ass - {title}</p>
      </div>
      <p className="text-sm text-slate-600 mb-2">{description}</p>
      <div className="w-full h-2 rounded-full bg-indigo-200 mb-1">
        <div className="w-[33%] h-full rounded-full bg-indigo-600" />
      </div>
      <div className="">
        <p className="text-xs text-slate-500">
          Done By <i>ahmedali</i> and 16 others
        </p>
      </div>
    </div>
  );
}

export default Assignment;

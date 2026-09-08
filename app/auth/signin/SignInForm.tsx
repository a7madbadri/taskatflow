"use client";

import Button from "@/components/Button";
import { useTransition } from "react";
import { signInWithGoogle } from "@/lib/actions/auth.actions";

export default function SignInForm() {
  const [, startTransition] = useTransition();

  return (
    <div className="text-center border border-slate-300 p-3 rounded-xl w-full max-w-80">
      <p className="mb-1">Welcome to TaskatFlow :D</p>
      <p className="text-sm text-slate-600 mb-1">Continue with</p>
      <div className="flex flex-col w-full max-w-[85%] mx-auto justify-center">
        <Button
          className="not-last:mb-2 bg-red-600 text-white"
          onClick={() => startTransition(signInWithGoogle)}
        >
          Google
        </Button>
        {/* <Button className="not-last:mb-2 bg-black text-white">Github</Button> */}
      </div>
    </div>
  );
}

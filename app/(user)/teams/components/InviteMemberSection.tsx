"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { addUserAction } from "@/lib/actions/team.actions";
import { searchUsersAction } from "@/lib/actions/user.actions";
import { Search } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface Props {
  teamId: string;
}

export default function InviteMemberSection({ teamId }: Props) {
  const [value, setValue] = useState("");
  const [query] = useDebounce(value, 500);
  const [result, setResult] = useState<
    {
      id: string;
      name: string;
      email: string;
      image: string | null;
    }[]
  >([]);
  const { execute, status } = useAction(searchUsersAction, {
    onSuccess({ data }) {
      if (data.success && data.data) {
        setResult(data.data);
      }
    },
  });
  const isPending = status === "executing";

  useEffect(() => {
    if (!value) {
      setTimeout(() => setResult([]), 0);
    }
  }, [value]);
  useEffect(() => {
    if (query) {
      execute({ teamId, query });
    }
  }, [execute, query, teamId]);
  return (
    <div className="w-full max-w-100 mx-auto">
      <InputField
        value={value}
        setValue={setValue}
        Icon={Search}
        placeholder="User's email"
      />
      {!value && (
        <p className="text-sm text-slate-600 text-center p-3">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores,
          dolore.
        </p>
      )}
      {
        <div className="py-3">
          {result.map((user) => (
            <User {...user} teamId={teamId} key={user.id} />
          ))}
        </div>
      }
    </div>
  );
}

const User = ({
  id,
  image,
  name,
  teamId,
}: {
  id: string;
  image: string | null;
  name: string;
  teamId: string;
}) => {
  const [added, setAdded] = useState(false);
  const { execute, status } = useAction(addUserAction, {
    onSuccess({ data }) {
      if (data.success) setAdded(true);
    },
  });
  const isPending = status === "executing";
  return (
    <div className="flex gap-2 items-center py-1 not-last:mb-2" key={id}>
      <Image
        src={image || "/images/profile-pic.png"}
        alt="profile"
        width={38}
        height={38}
        className="rounded-full bg-slate-300 border border-slate-400 size-9.5"
      />
      <p className="flex-1 overflow-hidden text-ellipsis text-nowrap">{name}</p>
      {!added && (
        <Button
          theme="primary"
          onClick={() => execute({ teamId, userId: id })}
          disabled={isPending}
        >
          {isPending ? "Adding" : "Invite"}
        </Button>
      )}
    </div>
  );
};

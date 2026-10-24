"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { inviteUserAction } from "@/lib/actions/team.actions";
import { searchUsersAction } from "@/lib/actions/user.actions";
import { Search } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
      receivedInvitaions: {
        id: string;
      }[];
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
  console.log(result);
  return (
    <div className="w-full max-w-100 mx-auto">
      <InputField
        value={value}
        setValue={setValue}
        Icon={Search}
        placeholder="User's email"
      />
      {(!query || query.length < 2) && (
        <p className="text-sm text-slate-600 text-center p-3">
          Search for users by email
        </p>
      )}
      {query && query.length >= 2 && isPending && (
        <p className="text-sm text-slate-600 text-center p-3">Searching...</p>
      )}
      {query && query.length >= 2 && !isPending && !result.length && (
        <p className="text-sm text-slate-600 text-center p-3">No results</p>
      )}

      {
        <div className="py-3">
          {result.map((user) => (
            <User
              {...user}
              teamId={teamId}
              isInvited={user.receivedInvitaions.length > 0}
              key={user.id}
            />
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
  isInvited,
}: {
  id: string;
  image: string | null;
  name: string;
  teamId: string;
  isInvited: boolean;
}) => {
  const [invited, setInvited] = useState(isInvited);
  const { execute, status } = useAction(inviteUserAction, {
    onSuccess({ data }) {
      if (data.success) {
        setInvited(true);
        toast.success("User has been invited!");
      } else if (!data.success && data.message) {
        toast.error(data.message);
      }
    },
  });
  const isPending = status === "executing";
  return (
    <div className="flex gap-2 items-center py-1 not-last:mb-2" key={id}>
      <Image
        src={image || "/images/profile-pic.png"}
        alt="profile"
        width={36}
        height={36}
        className="rounded-full bg-slate-300 border border-slate-400 size-9"
      />
      <p className="flex-1 overflow-hidden text-ellipsis text-nowrap text-sm">
        {name}
      </p>
      <Button
        theme="primary"
        onClick={() => execute({ teamId, userId: id })}
        disabled={isPending || invited}
      >
        {invited ? "Invited" : isPending ? "Inviting" : "Invite"}
      </Button>
    </div>
  );
};

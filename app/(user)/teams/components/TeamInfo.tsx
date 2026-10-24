"use client";

import CustomLink from "@/components/CustomLink";
import { PrismaPromise, Role } from "@prisma/client";
import { ChevronRight, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import MemberOptionsMenu from "./MemberOptioneMenu";
import { useAction } from "next-safe-action/hooks";
import { removeMemberAction } from "@/lib/actions/team.actions";
import { toast } from "sonner";

interface Props {
  teamId: string;
  role: Role;
  membersCount: number;
  description: string | null;
  avatarsPromise: PrismaPromise<
    {
      user: {
        id: string;
        image: string | null;
      };
    }[]
  >;
  membersPromise: PrismaPromise<
    {
      user: {
        id: string;
        name: string;
        email: string;
        image: string | null;
      };
      role: Role;
    }[]
  >;
}

function TeamInfo({
  teamId,
  role,
  membersCount,
  description,
  avatarsPromise,
  membersPromise,
}: Props) {
  const avatars = use(avatarsPromise);
  const members = use(membersPromise);
  const [membersVisible, setMembersVisible] = useState(false);
  const { execute, status } = useAction(removeMemberAction, {
    onSuccess({ data }) {
      if (data.success) {
        toast.success("User removed");
      } else if (!data.success && data.message) {
        toast.error(data.message);
      }
    },
  });
  return (
    <div className="main-card flex flex-col lg:overflow-hidden lg:col-start-1">
      <div className="p-3">
        <div className="flex gap-2 text-sm text-slate-700 mb-1">
          <p>
            <b className="text-slate-900 ">{membersCount}</b> Members
          </p>
          <p>
            <b className="text-slate-900">9/23</b> Tasks
          </p>
        </div>
        <p className="mb-2">{description}</p>
        <div className="flex items-center flex-wrap gap-2 justify-between">
          <div className="flex h-fit">
            {avatars.map(({ user }) => (
              <Image
                key={user.id}
                src={user.image || "/images/profile-pic.png"}
                alt="profile pic"
                width={30}
                height={30}
                className="rounded-full border border-slate-600 size-7.5 not-first:-ml-2"
              />
            ))}
            <button
              className="size-7.5 bg-slate-300 rounded-full -ml-2 grid place-items-center lg:hidden"
              onClick={() => setMembersVisible(!membersVisible)}
            >
              <ChevronRight
                size={18}
                className={`duration-150 ${membersVisible ? "rotate-90" : "rotate-0"}`}
              />
            </button>
          </div>
          {role === "OWNER" && (
            <CustomLink
              href={`/teams/${teamId}/invite-members`}
              size="medium"
              theme="primary"
            >
              Invite Members
            </CustomLink>
          )}
        </div>
      </div>
      <div
        className={`overflow-y-scroll overflow-hidden scrollbar-hide border-t py-3 ${membersVisible ? "h-fit " : "flex-1 hidden lg:block"}`}
      >
        <h3 className="font-medium px-3">Members</h3>
        {members.map(({ user, role }) => (
          <div
            className="flex items-center px-3 py-2 w-full duration-150 hover:bg-slate-100"
            key={user.id}
          >
            <Image
              src={user.image || "/images/profile.png"}
              alt=""
              width={32}
              height={32}
              className="rounded-full aspect-square h-8 mr-2"
            />
            <div className="text-sm flex-1 overflow-hidden">
              <p className="mb-0.5">
                {user.name}{" "}
                {role === "OWNER" && (
                  <span className="text-xs bg-indigo-200 text-indigo-600 font-medium px-2 rounded-full">
                    OWNER
                  </span>
                )}
              </p>
              <p className="text-slate-500 overflow-hidden text-ellipsis">
                {user.email}
              </p>
            </div>
            {role === "MEMBER" && (
              <MemberOptionsMenu
                onRemove={() => execute({ userId: user.id, teamId })}
              />
            )}
          </div>
        ))}
        {membersCount > 7 && (
          <Link
            href="#"
            className="text-sm underline px-3 text-indigo-500 flex items-center"
          >
            See all members <ChevronRight size={18} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default TeamInfo;

import CustomLink from "@/components/CustomLink";
import { Prisma, Role } from "@prisma/client";
import Image from "next/image";
import { use } from "react";

interface Props {
  teamId: string;
  role: Role;
  membersCount: number;
  description: string | null;
  avatarsPromise: Prisma.PrismaPromise<
    {
      user: {
        id: string;
        image: string | null;
      };
    }[]
  >;
}

function TeamInfo({
  teamId,
  role,
  membersCount,
  description,
  avatarsPromise,
}: Props) {
  const avatars = use(avatarsPromise);
  return (
    <div className="border-b pb-2 border-slate-300 mb-2 lg:col-start-1">
      <div className="flex gap-2 text-sm text-slate-700 mb-1">
        <p>
          <b className="text-slate-900 ">{membersCount}</b> Members
        </p>
        <p>
          <b className="text-slate-900">9/23</b> Tasks
        </p>
        <p>{role}</p>
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
  );
}

export default TeamInfo;

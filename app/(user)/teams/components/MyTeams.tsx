"use client";

import Button from "@/components/Button";
import Subheading from "@/components/Subheading";
import Link from "next/link";
import AddTeamModal from "./CreateTeamModal";
import { useState } from "react";
import { MyMembershipType } from "@/types/team";

interface Props {
  myMemberships: MyMembershipType[];
}

function MyTeams({ myMemberships = [] }: Props) {
  const [isCreateTeamModalVisible, setIsCreateTeamModalVisible] =
    useState(false);
  return (
    <div className="lg:col-start-1">
      <div className="flex items-center justify-between mb-2">
        <Subheading>My Teams</Subheading>
        <Button
          theme="primary"
          onClick={() => setIsCreateTeamModalVisible(true)}
        >
          Create Team
        </Button>
      </div>
      <div className="">
        {myMemberships.map((mem) => (
          <Link
            key={mem.id}
            href={`/teams/${mem.teamId}`}
            className="block duration-150 border-b border-slate-300 p-2 hover:bg-slate-200"
          >
            <h3 className="font-semibold">{mem.team.name}</h3>
            <div className="">
              <p className="text-sm text-slate-600">9/21 Tasks</p>
            </div>
          </Link>
        ))}
      </div>

      <AddTeamModal
        visible={isCreateTeamModalVisible}
        close={() => setIsCreateTeamModalVisible(false)}
      />
    </div>
  );
}

export default MyTeams;

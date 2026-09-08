import Button from "@/components/Button";
import Subheading from "@/components/Subheading";
import React from "react";

function CreateTeam() {
  return (
    <div className="">
      <Subheading>Create Team</Subheading>
      <p className="mt-1 mb-2">
        Create your own team and manage your tasks together, easier and faster!!
      </p>
      <Button size="medium" theme="primary">
        Create Team
      </Button>
    </div>
  );
}

export default CreateTeam;

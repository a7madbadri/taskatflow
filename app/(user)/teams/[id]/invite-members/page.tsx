import InviteMemberSection from "../../components/InviteMemberSection";

async function InviteMembers({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <InviteMemberSection teamId={id} />;
}

export default InviteMembers;

import Goal from "./_components/Goal";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/prisma/client";
import { type User } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await currentUser();

  const getUserData = await prisma.user.findUnique({
    where: {
      clerkUserId: user?.id,
    },
  });

  return (
    <>
      <Goal initialData={getUserData} />
    </>
  );
}

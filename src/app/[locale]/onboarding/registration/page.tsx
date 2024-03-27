import Registration from "./_components/Registration";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/prisma/client";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await currentUser();

  const getUserData = await prisma.user.findUnique({
    where: {
      externalId: user?.id,
    },
  });

  return (
    <>
      <Registration initialData={getUserData} />
    </>
  );
}

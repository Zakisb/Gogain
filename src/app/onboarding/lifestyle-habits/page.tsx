import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import Main from "./_components/Main";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/prisma/client";

export default async function Page() {
  const user = await currentUser();

  const getUserData = await prisma.user.findUnique({
    where: {
      externalId: user?.id,
    },
  });

  return (
    <>
      <Main initialData={getUserData} />{" "}
    </>
  );
}

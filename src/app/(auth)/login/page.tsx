import Login from "./_components/Login";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await currentUser();
  // if (user) {
  //   redirect("/onboarding/registration");
  // }

  return (
    <>
      <Login />
    </>
  );
}

import Congratulations from "./_components/Congratulations";
import { currentUser } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default async function Page() {
  const generateDietPlan = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/meal-plan`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        externalId: user?.id,
      }),
    }
  );

  // const redirectToAnotherPage = () => {
  //   setTimeout(() => {
  //     router.push("/licenses");
  //   }, 5000); // Redirects after 5 seconds
  // };

  // redirectToAnotherPage();

  return (
    <>
      <Congratulations />
    </>
  );
}

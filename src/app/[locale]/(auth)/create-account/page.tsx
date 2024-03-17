import CreateAccount from "../_components/CreateAccount";
import { Suspense } from "react";
interface Props {
  params: { slug: string };
  searchParams: { access: string };
}
async function verifyToken(token: string) {
  const res = await fetch("http://127.0.0.1:3000/api/verify-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ resetToken: token }),
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params, searchParams }: Props) {
  //   const isValid = await verifyToken(searchParams.access);

  return (
    <Suspense>
      <CreateAccount />
    </Suspense>
  );
}

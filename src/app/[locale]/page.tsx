import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Page() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Link href="/auth/login">
        <Button> Click here to be redirected to the auth page </Button>
      </Link>
    </div>
  );
}

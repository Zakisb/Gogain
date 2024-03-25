import Image from "next/image";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import Link from "next/link";
import { Boxes } from "lucide-react";
import { UserNav } from "@/components/layout/user-nav";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";
import { Calendar } from "lucide-react";
import { currentUser } from "@clerk/nextjs";

export default async function Header() {
  const user = await currentUser();

  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link
          href={"/"}
          className="hidden items-center justify-between gap-2 md:flex"
          passHref
        >
          <Logo />
          {/* <h1 className="text-lg font-semibold">T3 app template</h1> */}
        </Link>
        <div className={cn("block md:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <UserNav user={JSON.parse(JSON.stringify(user))} />
          ) : (
            //
            <Button
              size="sm"
              // onClick={() => {
              //   void signIn();
              // }}
            >
              <Calendar className="h-3.5 w-3.5 mr-1" />
              Book training session
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}

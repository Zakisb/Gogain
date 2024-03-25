"use client";
import { UserButton } from "@clerk/clerk-react";
import { signOut } from "next-auth/react";
import type { User } from "next-auth";
import "@/styles/custom.css";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";
import { UserAvatar } from "@/components/layout/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

// type Props = {
//   user: Pick<User, "name" | "image" | "email">;
// };

export function UserNav({ user }) {
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            firstName: user.firstName || null,
            imageUrl: user.imageUrl || null,
          }}
          className="h-8 w-8 cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="gg-dropdownmenu-content  bg-red-500"
        align="end"
      >
        <DropdownMenuLabel className="flex flex-row gap-4 items-stretch px-6">
          <UserAvatar
            user={{
              firstName: user.firstName || null,
              imageUrl: user.imageUrl || null,
            }}
            className="h-11 w-11 cursor-pointer"
          />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium" style={{ fontSize: "0.875rem" }}>
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-black/60 font-normal">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex flex-col p-0">
          <button
            className="inline-flex justify-start items-center gap-4 flex-row w-full"
            style={{ padding: "0.875rem 1.5rem" }}
            onClick={() => signOut(() => router.push("/login"))}
          >
            <div
              className="justify-center flex"
              style={{ flexBasis: "2.75rem", flexShrink: 0, flexGrow: 0 }}
            >
              <LogOut className="h-3.5 w-3.5" />
            </div>
            <span className=" text-black/60 text-sm">Se déconnecter</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

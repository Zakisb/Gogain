import { type User } from "@prisma/client";
import { type AvatarProps } from "@radix-ui/react-avatar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { User as UserIcon } from "lucide-react";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "firstName">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {/* {user.image ? (
                <AvatarImage alt="Picture" src={user.firstName} />
            ) : (
                <AvatarFallback>
                    <span className="sr-only">{user.name}</span>
                    <UserIcon className="h-4 w-4" />
                </AvatarFallback>
            )} */}
      <AvatarFallback>
        <span className="sr-only">{user.firstName}</span>
        <UserIcon className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  );
}

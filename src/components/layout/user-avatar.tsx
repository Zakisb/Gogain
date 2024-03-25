import { type User } from "@prisma/client";
import { type AvatarProps } from "@radix-ui/react-avatar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { User as UserIcon } from "lucide-react";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "firstName" | "imageUrl">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.imageUrl ? (
        <AvatarImage alt="Picture" src={user.imageUrl} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.firstName}</span>
          <UserIcon className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}

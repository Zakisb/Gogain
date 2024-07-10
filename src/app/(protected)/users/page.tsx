import { Separator } from "@/components/ui/separator";
import UsersActions from "./_components/UsersActions";
import UsersTable from "./_components/UsersTable";
import { getAccounts } from "@/services/AccountServices";
import { getUsers } from "@/services/UserServices";

export default async function Page() {
  const users = await getUsers();

  return (
    <>
      <UsersActions />
      <Separator />
      <UsersTable users={users} />
    </>
  );
}

export const revalidate = 0;

import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./user";
import { LoginButton, LogoutButton } from "./api/helpers";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <div>Hello Students</div>
      <LoginButton />
      <LogoutButton />
      <h2>server</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client</h2>
      <User />
    </main>
  );
}

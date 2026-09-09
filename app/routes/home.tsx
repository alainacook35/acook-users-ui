import type { Route } from "./+types/home";
import { UsersList } from "../components/UsersList";
import usersComLogo from "../assets/users-com-logo.svg";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="flex h-screen flex-col">
      <img src={usersComLogo} alt="Users.com" className="h-20 self-start" />
      <div className="w-full flex-1 min-h-0 flex flex-col">
        <UsersList />
      </div>
    </main>
  );
}

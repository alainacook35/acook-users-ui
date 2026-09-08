import type { Route } from "./+types/home";
import { UsersList } from "../components/UsersList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="flex h-screen justify-center">
      <UsersList />
    </main>
  );
}

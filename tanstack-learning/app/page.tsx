import { UsersList } from "./components";

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">TanStack Query Challenge</h1>
      <UsersList />
    </div>
  );
}

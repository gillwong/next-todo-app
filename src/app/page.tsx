import { Separator } from "@/components/ui/separator";
import NavBar from "./components/nav-bar";
import TodoList from "./components/todo-list";

export default function Home() {
  return (
    <>
      <NavBar className="sticky top-0" />
      <main className="px-4 mt-3">
        <TodoList />
      </main>
    </>
  );
}

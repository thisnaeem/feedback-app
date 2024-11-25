import TaskCreate from "../components/tasks/TaskCreate";
import TaskList from "../components/tasks/TaskList";


export default function TasksPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <TaskCreate />
      </div>
      <TaskList />
    </div>
  );
} 
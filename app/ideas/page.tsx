import IdeaBoard from "../components/ideas/IdeaBoard";

export default function IdeasPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Content Ideas</h1>
      </div>
      <IdeaBoard />
    </div>
  );
} 
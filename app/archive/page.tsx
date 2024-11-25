
import ArchiveFilter from "../components/archive/ArchiveFilter";
import ArchiveList from "../components/archive/ArchiveList";

export default function ArchivePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Archive</h1>
      <ArchiveFilter />
      <ArchiveList />
    </div>
  );
} 
import DesignGrid from "../components/designs/DesignGrid";
import DesignUpload from "../components/designs/DesignUpload";

export default function DesignsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Designs</h1>
      <DesignUpload />
      <DesignGrid />
    </div>
  );
} 
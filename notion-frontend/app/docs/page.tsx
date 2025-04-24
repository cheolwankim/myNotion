import CreateDocButton from "../../components/docs/CreateDocButton";
import DocList from "../../components/docs/DocList";

export default function DocsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 내 문서 목록</h1>
      <CreateDocButton />
      <DocList />
    </div>
  );
}

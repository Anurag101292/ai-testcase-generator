import { RAGPipeline } from "@/core/orchestrator/RAGPipeline";

export default async function Home() {
  const pipeline = new RAGPipeline();
  await pipeline.index();

  const results = await pipeline.query("login password rules");

  return (
    <div style={{ padding: 20 }}>
      <h1>RAG Retrieval Test</h1>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}

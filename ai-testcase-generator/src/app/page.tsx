"use client";

import { useEffect, useState } from "react";
import { runRAGSequence } from "./actions";

export default function Home() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        const res = await runRAGSequence();
        setResults(res);
      } catch (err) {
        console.error("Error running RAG:", err);
      } finally {
        setLoading(false);
      }
    }

    run();
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading RAG...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>RAG Query Test</h1>

      <h3>Top Retrieved Chunks:</h3>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}

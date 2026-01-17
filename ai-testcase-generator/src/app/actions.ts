"use server";

import { RAGPipeline } from "@/core/orchestrator/RAGPipeline";

export async function runRAGSequence() {
    const pipeline = new RAGPipeline();

    console.log("Starting indexing...");
    await pipeline.index();
    console.log("Indexing complete.");

    const res = await pipeline.query("What is the password rule for login?");
    console.log("Query complete:", res);

    // Ensure the response is serializable plain objects
    return JSON.parse(JSON.stringify(res));
}

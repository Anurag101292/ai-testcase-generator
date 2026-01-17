import { Pinecone } from "@pinecone-database/pinecone";
import { IVectorStore } from "../vectordb/IVectorStore";

export class PineconeVectorStore implements IVectorStore {
    private client: Pinecone;
    private indexName: string;

    constructor() {
        const apiKey = process.env.PINECONE_API_KEY!;
        const indexName = process.env.PINECONE_INDEX!;

        if (!apiKey || !indexName) {
            throw new Error("PINECONE_API_KEY or PINECONE_INDEX not set");
        }

        this.client = new Pinecone({ apiKey });
        this.indexName = indexName;
    }

    async add(vectors: number[][], documents: any[]) {
        const index = this.client.index(this.indexName);

        const upserts = vectors.map((vector, i) => {
            const rawMetadata = documents[i].metadata || {};
            const cleanMetadata: Record<string, any> = {
                content: documents[i].content,
            };

            for (const key in rawMetadata) {
                const value = rawMetadata[key];
                if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                    cleanMetadata[key] = JSON.stringify(value);
                } else {
                    cleanMetadata[key] = value;
                }
            }

            return {
                id: `${rawMetadata.source || "doc"}-${i}-${Date.now()}`,
                values: vector,
                metadata: cleanMetadata
            };
        });

        await index.upsert(upserts);
    }

    async search(queryVector: number[], k: number) {
        const index = this.client.index(this.indexName);

        const res = await index.query({
            vector: queryVector,
            topK: k,
            includeMetadata: true
        });

        return res.matches?.map(m => ({
            content: (m.metadata?.content as string) || "",
            metadata: m.metadata,
            score: m.score
        })) || [];
    }
}

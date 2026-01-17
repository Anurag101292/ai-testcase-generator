import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { IEmbeddingProvider } from "../embedding/IEmbeddingProvider";

export class GoogleEmbeddingProvider implements IEmbeddingProvider {
    private client: GoogleGenerativeAIEmbeddings;

    constructor() {
        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            throw new Error("GOOGLE_API_KEY is not set in environment variables");
        }

        const model = process.env.GOOGLE_EMBEDDING_MODEL || "text-embedding-004";

        this.client = new GoogleGenerativeAIEmbeddings({
            apiKey,
            model
        });
    }

    async embedDocuments(texts: string[]): Promise<number[][]> {
        return await this.client.embedDocuments(texts);
    }

    async embedQuery(text: string): Promise<number[]> {
        return await this.client.embedQuery(text);
    }
}

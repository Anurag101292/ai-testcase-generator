import { OpenAIEmbeddings } from "@langchain/openai";
import { IEmbeddingProvider } from "../embedding/IEmbeddingProvider";

export class OpenAIEmbeddingProvider implements IEmbeddingProvider {
    private client: OpenAIEmbeddings;

    constructor() {
        this.client = new OpenAIEmbeddings({
            model: process.env.EMBEDDING_MODEL || "text-embedding-3-large",
            apiKey: process.env.OPENAI_API_KEY!
        });
    }

    async embedDocuments(texts: string[]) {
        return await this.client.embedDocuments(texts);
    }

    async embedQuery(text: string) {
        return await this.client.embedQuery(text);
    }
}

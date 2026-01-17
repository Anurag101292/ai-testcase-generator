import { OllamaEmbeddings } from "@langchain/ollama";
import { IEmbeddingProvider } from "../embedding/IEmbeddingProvider";

export class OllamaEmbeddingProvider implements IEmbeddingProvider {
    private client: OllamaEmbeddings;

    constructor() {
        this.client = new OllamaEmbeddings({
            baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
            model: process.env.OLLAMA_EMBEDDING_MODEL || "nomic-embed-text"
        });
    }

    async embedDocuments(texts: string[]) {
        return await this.client.embedDocuments(texts);
    }

    async embedQuery(text: string) {
        return await this.client.embedQuery(text);
    }
}

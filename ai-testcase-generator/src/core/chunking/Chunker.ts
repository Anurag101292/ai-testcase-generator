import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { TokenCounter } from "../tokenization/TokenCounter";

export class Chunker {
    private splitter: RecursiveCharacterTextSplitter;
    private tokenCounter = new TokenCounter();

    constructor() {
        this.splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200
        });
    }

    async chunk(docs: { content: string; metadata: any }[]) {
        const langchainDocs = docs.map(d => ({
            pageContent: d.content,
            metadata: d.metadata
        }));

        const chunks = await this.splitter.splitDocuments(langchainDocs);

        // Attach token count
        return chunks.map(c => ({
            content: c.pageContent,
            metadata: {
                ...c.metadata,
                tokens: this.tokenCounter.count(c.pageContent)
            }
        }));
    }
}

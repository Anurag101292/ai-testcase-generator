import { IngestionManager } from "../ingestion/IngestionManager";
import { Cleaner } from "../preprocessing/Cleaner";
import { Chunker } from "../chunking/Chunker";
import { EmbeddingService } from "../embedding/EmbeddingService";
import { LocalVectorStore } from "../vectordb/LocalVectorStore";

export class RAGPipeline {
  private vectorStore = new LocalVectorStore();
  private embedder = new EmbeddingService();

  async index() {
    const ingestion = new IngestionManager();
    const cleaner = new Cleaner();
    const chunker = new Chunker();

    const docs = await ingestion.ingest();

    const cleaned = docs.map(d => ({
      content: cleaner.clean(d.content),
      metadata: {
        jiraId: d.jiraId,
        source: d.source
      }
    }));

    const chunks = await chunker.chunk(cleaned);

    const texts = chunks.map(c => c.content);
    const vectors = await this.embedder.embed(texts);

    this.vectorStore.add(vectors, chunks);

    console.log(`Indexed ${chunks.length} chunks`);
  }

  async query(question: string) {
    const qVec = await this.embedder.embedQuery(question);
    return this.vectorStore.search(qVec, 5);
  }
}

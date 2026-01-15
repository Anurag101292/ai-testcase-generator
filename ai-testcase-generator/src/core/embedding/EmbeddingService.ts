import { OpenAIEmbeddings } from "@langchain/openai";

export class EmbeddingService {
  private embeddings: OpenAIEmbeddings;

  constructor() {
    this.embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-large",
      apiKey: process.env.OPENAI_API_KEY!
    });
  }

  async embed(texts: string[]) {
    return await this.embeddings.embedDocuments(texts);
  }

  async embedQuery(text: string) {
    return await this.embeddings.embedQuery(text);
  }
}

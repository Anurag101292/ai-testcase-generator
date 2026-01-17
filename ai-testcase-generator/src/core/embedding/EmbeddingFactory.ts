import { IEmbeddingProvider } from "./IEmbeddingProvider";
import { OpenAIEmbeddingProvider } from "./OpenAIEmbeddingProvider";
import { OllamaEmbeddingProvider } from "./OllamaEmbeddingProvider";
import { GoogleEmbeddingProvider } from "./GoogleEmbeddingProvider";

export class EmbeddingFactory {
  static create(): IEmbeddingProvider {
    const provider = (process.env.EMBEDDING_PROVIDER || "google").toLowerCase();

    switch (provider) {
      case "ollama":
      case "llama":
        console.log("Using Ollama/Llama embeddings");
        return new OllamaEmbeddingProvider();

      case "openai":
        console.log("Using OpenAI embeddings");
        return new OpenAIEmbeddingProvider();

      case "google":
        console.log("Using Google embeddings");
        return new GoogleEmbeddingProvider();

      default:
        throw new Error(`Unsupported embedding provider: ${provider}`);
    }
  }
}

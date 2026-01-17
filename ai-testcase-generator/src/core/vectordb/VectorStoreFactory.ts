import { LocalVectorStore } from "./LocalVectorStore";
import { PineconeVectorStore } from "./PineconeVectorStore";
import { IVectorStore } from "./IVectorStore";

export class VectorStoreFactory {
    static create(): IVectorStore {
        const provider = process.env.VECTOR_DB || "local";

        if (provider === "pinecone") {
            console.log("Using Pinecone vector DB");
            return new PineconeVectorStore();
        }

        console.log("Using Local vector DB");
        return new LocalVectorStore();
    }
}

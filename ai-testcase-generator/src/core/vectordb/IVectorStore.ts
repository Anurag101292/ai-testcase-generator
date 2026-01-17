export interface IVectorStore {
    add(vectors: number[][], documents: any[]): Promise<void>;
    search(queryVector: number[], k: number): Promise<
        {
            content: string;
            metadata: any;
            score: number | undefined;
        }[]
    >;
}

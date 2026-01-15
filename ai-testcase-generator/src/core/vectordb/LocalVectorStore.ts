type VectorRecord = {
  vector: number[];
  content: string;
  metadata: any;
};

export class LocalVectorStore {
  private store: VectorRecord[] = [];

  add(vectors: number[][], docs: { content: string; metadata: any }[]) {
    for (let i = 0; i < vectors.length; i++) {
      this.store.push({
        vector: vectors[i],
        content: docs[i].content,
        metadata: docs[i].metadata
      });
    }
  }

  search(queryVector: number[], k = 5) {
    function cosine(a: number[], b: number[]) {
      const dot = a.reduce((s, x, i) => s + x * b[i], 0);
      const na = Math.sqrt(a.reduce((s, x) => s + x * x, 0));
      const nb = Math.sqrt(b.reduce((s, x) => s + x * x, 0));
      return dot / (na * nb);
    }

    return this.store
      .map(r => ({ ...r, score: cosine(queryVector, r.vector) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, k);
  }
}

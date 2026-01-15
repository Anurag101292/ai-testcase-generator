import { getEncoding } from "js-tiktoken";

export class TokenCounter {
    private enc = getEncoding("cl100k_base");

    count(text: string): number {
        return this.enc.encode(text).length;
    }
}

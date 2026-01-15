import data from "@/mockdata/confluence.json";
import { ConfluenceDoc } from "../../types";

export class ConfluenceMockClient {
    async fetchDocs(): Promise<ConfluenceDoc[]> {
        return data as ConfluenceDoc[];
    }
}

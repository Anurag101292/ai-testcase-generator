import data from "@/mockdata/github.json";
import { GitHubCommit } from "../../types";

export class GitHubMockClient {
    async fetchCommits(): Promise<GitHubCommit[]> {
        return data as GitHubCommit[];
    }
}

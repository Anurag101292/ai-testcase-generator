import { JiraMockClient } from "./jira/JiraMockClient";
import { ConfluenceMockClient } from "./confluence/ConfluenceMockClient";
import { GitHubMockClient } from "./github/GitHubMockClient";
import { UnifiedDocument } from "../types";

export class IngestionManager {
    private jira = new JiraMockClient();
    private conf = new ConfluenceMockClient();
    private git = new GitHubMockClient();

    async ingest(): Promise<UnifiedDocument[]> {
        const stories = await this.jira.fetchStories();
        const docs = await this.conf.fetchDocs();
        const commits = await this.git.fetchCommits();

        const unified: UnifiedDocument[] = [];

        for (const s of stories) {
            unified.push({
                id: s.id,
                jiraId: s.id,
                source: "jira",
                content: `${s.title}\n${s.description}\n${s.acceptanceCriteria.join("\n")}`
            });
        }

        for (const d of docs) {
            unified.push({
                id: d.id,
                jiraId: d.jiraId,
                source: "confluence",
                content: `${d.title}\n${d.content}`
            });
        }

        for (const c of commits) {
            unified.push({
                id: c.id,
                jiraId: c.jiraId,
                source: "github",
                content: `${c.file}\n${c.diff}`
            });
        }

        return unified;
    }
}

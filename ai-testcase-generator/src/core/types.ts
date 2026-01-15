export type JiraStory = {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
};

export type ConfluenceDoc = {
  id: string;
  jiraId: string;
  title: string;
  content: string;
};

export type GitHubCommit = {
  id: string;
  jiraId: string;
  file: string;
  diff: string;
};

export type UnifiedDocument = {
  id: string;
  jiraId: string;
  source: "jira" | "confluence" | "github";
  content: string;
};

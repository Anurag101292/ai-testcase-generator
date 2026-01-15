import data from "@/mockdata/jira.json";
import { JiraStory } from "../../types";

export class JiraMockClient {
  async fetchStories(): Promise<JiraStory[]> {
    return data as JiraStory[];
  }
}

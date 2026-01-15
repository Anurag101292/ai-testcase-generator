export class Cleaner {
  clean(text: string): string {
    return text
      .replace(/\s+/g, " ")
      .replace(/[^\w\s\.\-]/g, "")
      .trim();
  }
}

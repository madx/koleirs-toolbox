import { Plugin, TFile } from "obsidian";

export default class KoleirsToolbox extends Plugin {
  async onload() {
    this.addCommand({
      id: "open-previous-file-from-properties",
      name: "Open previous file (from properties)",
      callback: async () => {
        openFrontmatterLinkInActiveFile("previous");
      },
    });

    this.addCommand({
      id: "open-next-file-from-properties",
      name: "Open next file (from properties)",
      callback: () => {
        openFrontmatterLinkInActiveFile("next");
      },
    });
  }

  onunload() {}
}

function getFrontmatterLink(file: TFile, frontmatterKey: string) {
  const cachedMetadata = app.metadataCache.getFileCache(file);

  const frontmatterLink = cachedMetadata?.frontmatterLinks?.find(
    (link) => link.key === frontmatterKey,
  );

  return frontmatterLink?.link;
}

function openFrontmatterLinkInActiveFile(frontmatterKey: string) {
  const activeFile = this.app.workspace.getActiveFile();
  if (!activeFile) {
    return null;
  }

  const link = getFrontmatterLink(activeFile, frontmatterKey);
  if (link) {
    this.app.workspace.openLinkText(link, activeFile.path);
  }
}

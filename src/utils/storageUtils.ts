export interface MarkdownFile {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  type: "uploaded" | "edited";
  originalName?: string;
  size?: number;
}

const STORAGE_KEY = "markdownFiles";
const MAX_STORAGE_SIZE = 10 * 1024 * 1024; // 10MB limit

export const StorageManager = {
  // Get all saved markdown files
  getAllFiles: (): MarkdownFile[] => {
    const files = localStorage.getItem(STORAGE_KEY);
    return files ? JSON.parse(files) : [];
  },

  // Get files by type (uploaded or edited)
  getFilesByType: (type: "uploaded" | "edited"): MarkdownFile[] => {
    const files = StorageManager.getAllFiles();
    return files.filter((f) => f.type === type);
  },

  // Save a new file or update existing one
  saveFile: (file: MarkdownFile): void => {
    const files = StorageManager.getAllFiles();
    const existingIndex = files.findIndex((f) => f.id === file.id);

    if (existingIndex >= 0) {
      files[existingIndex] = file;
    } else {
      files.push(file);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
  },

  // Delete a file
  deleteFile: (id: string): void => {
    const files = StorageManager.getAllFiles();
    const updatedFiles = files.filter((f) => f.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFiles));
  },

  // Get a single file by ID
  getFileById: (id: string): MarkdownFile | null => {
    const files = StorageManager.getAllFiles();
    return files.find((f) => f.id === id) || null;
  },

  // Download file as .md
  downloadFile: (file: MarkdownFile): void => {
    const blob = new Blob([file.content], { type: "text/markdown" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download =
      file.type === "uploaded"
        ? file.originalName || `${file.title}.md`
        : `${file.title}.md`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  // Get storage usage
  getStorageUsage: () => {
    const files = StorageManager.getAllFiles();
    const totalSize = files.reduce(
      (acc, file) => acc + (file.size || file.content.length),
      0
    );
    return {
      used: totalSize,
      total: MAX_STORAGE_SIZE,
      percentage: (totalSize / MAX_STORAGE_SIZE) * 100,
    };
  },

  // Clear all files of a specific type
  clearFilesByType: (type: "uploaded" | "edited"): void => {
    const files = StorageManager.getAllFiles();
    const updatedFiles = files.filter((f) => f.type !== type);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFiles));
  },

  // Clear all files
  clearAllFiles: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },
};

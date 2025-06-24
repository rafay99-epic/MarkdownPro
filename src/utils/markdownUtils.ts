
import { marked } from 'marked';

export const convertMarkdownToHtml = async (markdown: string): Promise<string> => {
  try {
    const html = await marked(markdown);
    return html;
  } catch (error) {
    throw new Error('Failed to convert markdown to HTML');
  }
};

export const validateMarkdownFile = (file: File): boolean => {
  return file.type === 'text/markdown' || file.name.endsWith('.md');
};

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      resolve(content);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

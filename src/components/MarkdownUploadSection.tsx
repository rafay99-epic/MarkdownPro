import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Upload, File, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  validateMarkdownFile,
  readFileAsText,
  convertMarkdownToHtml,
} from "@/utils/markdownUtils";

interface MarkdownUploadSectionProps {
  fileName: string;
  isDragging: boolean;
  setMarkdownContent: (content: string) => void;
  setHtmlContent: (content: string) => void;
  setFileName: (name: string) => void;
  setIsDragging: (dragging: boolean) => void;
}

const MarkdownUploadSection = ({
  fileName,
  isDragging,
  setMarkdownContent,
  setHtmlContent,
  setFileName,
  setIsDragging,
}: MarkdownUploadSectionProps) => {
  const { toast } = useToast();

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!validateMarkdownFile(file)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a markdown (.md) file",
          variant: "destructive",
        });
        return;
      }

      try {
        const content = await readFileAsText(file);
        setMarkdownContent(content);
        const html = await convertMarkdownToHtml(content);
        setHtmlContent(html);
        setFileName(file.name.replace(".md", ""));

        toast({
          title: "File Uploaded Successfully",
          description: `${file.name} has been processed and is ready for conversion.`,
        });
      } catch (error) {
        toast({
          title: "File Processing Error",
          description: "Failed to process the markdown file",
          variant: "destructive",
        });
      }
    },
    [setMarkdownContent, setHtmlContent, setFileName, toast]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload, setIsDragging]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    },
    [setIsDragging]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    },
    [setIsDragging]
  );

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg">
            <Upload className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          Upload Markdown File
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Drag and drop your .md file here or click to browse
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer group ${
            isDragging
              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 scale-[1.02] shadow-lg"
              : "border-border hover:border-emerald-400 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/10"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            <div
              className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center transition-all duration-300 ${
                isDragging
                  ? "scale-110 from-emerald-100 to-emerald-200 dark:from-emerald-900/20 dark:to-emerald-800/20"
                  : "group-hover:scale-105"
              }`}
            >
              {isDragging ? (
                <Sparkles className="h-8 w-8 text-emerald-500 animate-pulse" />
              ) : (
                <FileText className="h-8 w-8 text-muted-foreground group-hover:text-emerald-500 transition-colors duration-300" />
              )}
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2">
              {isDragging ? "Drop your file here" : "Choose a markdown file"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Supports .md and .markdown files up to 10MB
            </p>

            {/* File type indicators */}
            <div className="flex justify-center space-x-2">
              <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 rounded-full">
                .md
              </span>
              <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 rounded-full">
                .markdown
              </span>
            </div>
          </div>

          <input
            id="file-input"
            type="file"
            accept=".md,.markdown"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
          />
        </div>

        {fileName && (
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <File className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                    {fileName}.md
                  </span>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    File uploaded successfully
                  </p>
                </div>
              </div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>
          </div>
        )}

        {/* Help text */}
        {!fileName && (
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Your files are processed locally and never leave your device
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarkdownUploadSection;

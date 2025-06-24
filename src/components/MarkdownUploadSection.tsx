import React, { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { marked } from "marked";
import { StorageManager, type MarkdownFile } from "@/utils/storageUtils";
import { ConversionOptions } from "./ConversionSettings";

interface MarkdownUploadSectionProps {
  fileName: string;
  isDragging: boolean;
  setFileName: (name: string) => void;
  setIsDragging: (dragging: boolean) => void;
  conversionOptions: ConversionOptions;
  onFileUploaded?: (file: MarkdownFile) => void;
}

const MarkdownUploadSection = ({
  fileName,
  isDragging,
  setFileName,
  setIsDragging,
  conversionOptions,
  onFileUploaded,
}: MarkdownUploadSectionProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const { toast } = useToast();

  const validateMarkdownFile = (file: File): boolean => {
    const validExtensions = [".md", ".mdx"];
    return validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  };

  const processFile = useCallback(
    async (file: File) => {
      if (!validateMarkdownFile(file)) {
        setUploadStatus("error");
        toast({
          title: "Invalid file type",
          description:
            "Please upload a valid markdown file (.md or .mdx only).",
          variant: "destructive",
        });
        return;
      }

      setIsProcessing(true);
      setUploadStatus("idle");

      try {
        const content = await readFileAsText(file);
        const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");

        // Save to unified storage system
        const newFile: MarkdownFile = {
          id: crypto.randomUUID(),
          title: fileNameWithoutExt,
          content: content,
          type: "uploaded",
          originalName: file.name,
          size: file.size,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        StorageManager.saveFile(newFile);

        // Update current state
        setFileName(fileNameWithoutExt);
        setUploadStatus("success");

        // Notify parent component
        onFileUploaded?.(newFile);

        toast({
          title: "File uploaded successfully!",
          description: `${file.name} has been saved and is ready for preview.`,
        });
      } catch (error) {
        console.error("Error processing file:", error);
        setUploadStatus("error");

        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        toast({
          title: "Error processing file",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    },
    [setFileName, toast, onFileUploaded]
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

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        processFile(files[0]);
      }
    },
    [setIsDragging, processFile]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        processFile(files[0]);
      }
      // Reset input value to allow re-uploading the same file
      e.target.value = "";
    },
    [processFile]
  );

  const getStatusIcon = () => {
    if (uploadStatus === "success") {
      return <CheckCircle2 className="h-8 w-8 text-emerald-500" />;
    }
    if (uploadStatus === "error") {
      return <AlertCircle className="h-8 w-8 text-destructive" />;
    }
    return <Upload className="h-8 w-8 text-muted-foreground" />;
  };

  const getStatusMessage = () => {
    if (uploadStatus === "success") {
      return "File uploaded successfully!";
    }
    if (uploadStatus === "error") {
      return "Error uploading file. Please try again.";
    }
    return "Upload your markdown file";
  };

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
            <Upload className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <CardTitle className="text-xl">Upload Markdown</CardTitle>
            <CardDescription>
              Drag and drop your .md or .mdx file or click to browse
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            isDragging
              ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 scale-105"
              : uploadStatus === "success"
              ? "border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/30"
              : uploadStatus === "error"
              ? "border-destructive/50 bg-destructive/5"
              : "border-muted-foreground/25 hover:border-emerald-300 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isProcessing && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                <p className="text-sm text-muted-foreground">
                  Processing and saving your markdown...
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {getStatusIcon()}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {getStatusMessage()}
              </h3>
              {fileName && uploadStatus === "success" && (
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <FileText className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-600">
                    {fileName}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs border-emerald-200 text-emerald-600"
                  >
                    Saved
                  </Badge>
                </div>
              )}
              <p className="text-muted-foreground mb-6">
                {uploadStatus === "idle"
                  ? "Support for .md and .mdx files. Files are saved locally in your browser for easy access."
                  : uploadStatus === "success"
                  ? "Your file has been saved locally and is ready for preview and export."
                  : "Please check your file format and try again."}
              </p>
            </div>

            <div className="space-y-3">
              <input
                type="file"
                accept=".md,.mdx"
                onChange={handleFileSelect}
                className="hidden"
                id="markdown-upload"
                disabled={isProcessing}
              />
              <label htmlFor="markdown-upload">
                <Button
                  asChild
                  size="lg"
                  className={`w-full bg-gradient-to-r transition-all duration-200 ${
                    uploadStatus === "success"
                      ? "from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
                      : "from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
                  }`}
                  disabled={isProcessing}
                >
                  <div className="flex items-center space-x-2 cursor-pointer">
                    {uploadStatus === "success" ? (
                      <>
                        <Sparkles className="h-5 w-5" />
                        <span>Upload Another File</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-5 w-5" />
                        <span>Choose File</span>
                      </>
                    )}
                  </div>
                </Button>
              </label>

              {uploadStatus === "success" && (
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Saved Locally</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Ready to Export</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarkdownUploadSection;

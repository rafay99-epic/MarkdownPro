import React, { useState, useEffect } from "react";
import { MarkdownEditorContainer } from "@/components/editor/MarkdownEditorContainer";
import { DraftsList } from "@/components/editor/DraftsList";
import { type MarkdownFile } from "@/utils/storageUtils";
import { StorageManager } from "@/utils/storageUtils";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import {
  PenLine,
  FolderOpen,
  Eye,
  ArrowLeft,
  FileText,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { Separator } from "@/components/ui/separator";

export default function Editor() {
  const [currentFile, setCurrentFile] = useState<MarkdownFile | null>(null);
  const [files, setFiles] = useState<MarkdownFile[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    refreshFiles();
  }, []);

  const refreshFiles = () => {
    const editedFiles = StorageManager.getFilesByType("edited");
    const uploadedFiles = StorageManager.getFilesByType("uploaded");
    setFiles([...editedFiles, ...uploadedFiles]);
  };

  const handleSave = async (file: MarkdownFile) => {
    try {
      await StorageManager.saveFile(file);
      refreshFiles();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleCreateNew = () => {
    const newFile: MarkdownFile = {
      id: crypto.randomUUID(),
      title: "Untitled Document",
      content: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      type: "edited",
      size: 0,
    };
    setCurrentFile(newFile);
  };

  const handleFileDelete = async (id: string) => {
    try {
      await StorageManager.deleteFile(id);
      if (currentFile?.id === id) {
        setCurrentFile(null);
      }
      refreshFiles();
      toast({
        title: "File deleted",
        description: "The file has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete the file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileDownload = (file: MarkdownFile) => {
    StorageManager.downloadFile(file);
    toast({
      title: "File downloaded",
      description: `${file.title}.md has been downloaded.`,
    });
  };

  const handleFileUpload = async (file: MarkdownFile) => {
    try {
      await StorageManager.saveFile(file);
      setCurrentFile(file);
      refreshFiles();
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back</span>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden">
                  <img
                    src="/markdownproIcon.png"
                    alt="MarkdownPro"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    MarkdownPro
                  </h1>
                  <p className="text-xs text-muted-foreground">Editor</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => (window.location.href = "/converter")}
                className="font-medium"
              >
                Open Converter
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 flex-1">
        <Tabs defaultValue="editor" className="space-y-6">
          <div className="h-14 border-b bg-background/50 -mx-4 px-4 sticky top-16 z-40 backdrop-blur-sm">
            <TabsList className="inline-flex h-12 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-full max-w-2xl">
              <TabsTrigger
                value="editor"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-6 py-2.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm flex-1"
              >
                <PenLine className="h-4 w-4 mr-2" />
                Editor
              </TabsTrigger>
              <TabsTrigger
                value="files"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-6 py-2.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm flex-1"
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                Files
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-6 py-2.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm flex-1"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="editor"
            className="mt-6 min-h-[calc(100vh-12rem)]"
          >
            <MarkdownEditorContainer
              currentFile={currentFile}
              onSave={handleSave}
            />
          </TabsContent>

          <TabsContent value="files" className="mt-6 min-h-[calc(100vh-12rem)]">
            <div className="rounded-lg border bg-background">
              <DraftsList
                currentFile={currentFile}
                files={files}
                onFileSelect={setCurrentFile}
                onCreateNew={handleCreateNew}
                onFileDelete={handleFileDelete}
                onFileDownload={handleFileDownload}
                onFileUpload={handleFileUpload}
                onFileConvert={(file) => {
                  sessionStorage.setItem("convertFile", JSON.stringify(file));
                  window.location.href = "/converter";
                }}
              />
            </div>
          </TabsContent>

          <TabsContent
            value="preview"
            className="mt-6 min-h-[calc(100vh-12rem)]"
          >
            <div className="rounded-lg border bg-background p-6">
              {currentFile ? (
                <div className="prose dark:prose-invert max-w-none">
                  <MDEditor.Markdown
                    source={currentFile.content}
                    className="!bg-background"
                  />
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Select a file to preview its content</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
}

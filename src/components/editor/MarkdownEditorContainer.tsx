import React from "react";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { StorageManager, type MarkdownFile } from "@/utils/storageUtils";
import { DraftsList } from "./DraftsList";
import { useIsMobile } from "@/hooks/use-mobile";
import { Save } from "lucide-react";
import "./editor-styles.css";

export function MarkdownEditorContainer() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentFile, setCurrentFile] = React.useState<MarkdownFile | null>(
    null
  );
  const [content, setContent] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [files, setFiles] = React.useState<MarkdownFile[]>([]);
  const { toast } = useToast();
  const saveTimeoutRef = React.useRef<NodeJS.Timeout>();

  // Function to refresh files list - update to get both types
  const refreshFiles = React.useCallback(() => {
    // Get both edited and uploaded files
    const editedFiles = StorageManager.getFilesByType("edited");
    const uploadedFiles = StorageManager.getFilesByType("uploaded");
    setFiles([...editedFiles, ...uploadedFiles]);
  }, []);

  // Initial load of files
  React.useEffect(() => {
    refreshFiles();
  }, [refreshFiles]);

  const generateTitle = (content: string): string => {
    // Try to find the first heading
    const headingMatch = content.match(/^#\s+(.+)$/m);
    if (headingMatch) {
      return headingMatch[1].trim();
    }

    // If no heading, take the first line that's not empty
    const firstLine = content.split("\n").find((line) => line.trim() !== "");
    if (firstLine) {
      return (
        firstLine.trim().slice(0, 50) + (firstLine.length > 50 ? "..." : "")
      );
    }

    // Fallback to timestamp-based title
    return `Untitled Document ${new Date().toLocaleString()}`;
  };

  const createNewDraft = () => {
    const newFile: MarkdownFile = {
      id: Date.now().toString(),
      title: "Untitled Document",
      content: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      type: "edited",
      size: 0,
    };

    StorageManager.saveFile(newFile);
    setCurrentFile(newFile);
    setContent("");
    setTitle("Untitled Document");
    setHasUnsavedChanges(false);
    refreshFiles(); // Refresh the files list
    toast({
      title: "New Draft Created",
      description: "Start writing your markdown content.",
    });
  };

  const updateDraft = React.useCallback(
    async (newContent: string, showToast = false) => {
      if (!currentFile) {
        // Create a new file if none exists
        const newTitle = newContent
          ? generateTitle(newContent)
          : "Untitled Document";
        const newFile: MarkdownFile = {
          id: Date.now().toString(),
          title: newTitle,
          content: newContent,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          type: "edited",
          size: newContent.length,
        };
        setCurrentFile(newFile);
        setTitle(newTitle);
        setContent(newContent);
        await StorageManager.saveFile(newFile);
        refreshFiles(); // Refresh after creating new file
        toast({
          title: "New Draft Created",
          description: "Your content has been saved as a new draft.",
        });
        return;
      }

      setIsSaving(true);
      const updatedFile: MarkdownFile = {
        ...currentFile,
        title: title || generateTitle(newContent),
        content: newContent,
        updatedAt: Date.now(),
        size: newContent.length,
      };

      try {
        await StorageManager.saveFile(updatedFile);
        setCurrentFile(updatedFile);
        setHasUnsavedChanges(false);
        refreshFiles(); // Refresh after updating file
        if (showToast) {
          toast({
            title: "Draft Saved",
            description: "Your changes have been saved successfully.",
          });
        }
      } catch (error) {
        toast({
          title: "Save Failed",
          description: "Failed to save your changes. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSaving(false);
      }
    },
    [currentFile, title, toast, refreshFiles]
  );

  const handleContentChange = React.useCallback(
    (value?: string) => {
      if (value === undefined) return;
      setContent(value);
      setHasUnsavedChanges(true);

      // Clear existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Set new timeout for auto-save
      saveTimeoutRef.current = setTimeout(() => {
        updateDraft(value);
      }, 1000);
    },
    [updateDraft]
  );

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const handleManualSave = () => {
    // Clear any pending auto-save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    updateDraft(content, true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setHasUnsavedChanges(true);

    // Auto-save after title change
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      if (currentFile) {
        const updatedFile = {
          ...currentFile,
          title: newTitle || generateTitle(content),
          updatedAt: Date.now(),
        };
        setCurrentFile(updatedFile);
        StorageManager.saveFile(updatedFile);
        setHasUnsavedChanges(false);
        refreshFiles(); // Refresh after title update
      }
    }, 1000);
  };

  const handleFileSelect = (file: MarkdownFile) => {
    setCurrentFile(file);
    setContent(file.content);
    setTitle(file.title);
    setHasUnsavedChanges(false);
  };

  const handleFileDelete = async (id: string) => {
    try {
      await StorageManager.deleteFile(id);
      if (currentFile?.id === id) {
        setCurrentFile(null);
        setContent("");
        setTitle("");
        setHasUnsavedChanges(false);
      }
      refreshFiles(); // Refresh after deletion
      toast({
        title: "Draft Deleted",
        description: "The draft has been removed.",
      });
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete the draft. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileDownload = (file: MarkdownFile) => {
    StorageManager.downloadFile(file);
    toast({
      title: "Draft Downloaded",
      description: `${file.title}.md has been downloaded.`,
    });
  };

  const handleFileConvert = (file: MarkdownFile) => {
    sessionStorage.setItem("convertFile", JSON.stringify(file));
    navigate("/converter");
  };

  const handleFileUpload = (file: MarkdownFile) => {
    StorageManager.saveFile(file);
    setCurrentFile(file);
    setContent(file.content);
    setTitle(file.title);
    setHasUnsavedChanges(false);
    refreshFiles();
  };

  return (
    <div className="grid grid-cols-12 min-h-[calc(100vh-8rem)]">
      {/* Drafts Sidebar */}
      <div className={`${isMobile ? "col-span-12" : "col-span-3"} border-r`}>
        <DraftsList
          currentFile={currentFile}
          files={files}
          onFileSelect={handleFileSelect}
          onCreateNew={createNewDraft}
          onFileDelete={handleFileDelete}
          onFileConvert={handleFileConvert}
          onFileDownload={handleFileDownload}
          onFileUpload={handleFileUpload}
        />
      </div>

      {/* Editor */}
      <div
        className={`${
          isMobile ? "col-span-12" : "col-span-9"
        } bg-background flex flex-col`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <Input
            type="text"
            placeholder="Untitled Document"
            value={title}
            onChange={handleTitleChange}
            className="text-lg font-medium border-0 px-0 focus-visible:ring-0 w-auto flex-1 mr-4"
          />
          <Button
            onClick={handleManualSave}
            disabled={!hasUnsavedChanges || isSaving}
            variant="outline"
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
        <div className="flex-1 p-4">
          <MDEditor
            value={content}
            onChange={handleContentChange}
            preview="live"
            height="100%"
            hideToolbar={false}
            enableScroll={true}
            textareaProps={{
              placeholder: "Write your markdown here...",
            }}
            previewOptions={{
              className: "wmde-markdown",
            }}
          />
        </div>
      </div>
    </div>
  );
}

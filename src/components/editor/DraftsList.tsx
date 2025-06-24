import { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Plus,
  Download,
  MoreVertical,
  ExternalLink,
  Trash2,
  Upload,
  Edit,
  Search,
} from "lucide-react";
import { type MarkdownFile } from "@/utils/storageUtils";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DraftsListProps {
  currentFile: MarkdownFile | null;
  files: MarkdownFile[];
  onFileSelect: (file: MarkdownFile) => void;
  onCreateNew: () => void;
  onFileDelete: (id: string) => void;
  onFileConvert: (file: MarkdownFile) => void;
  onFileDownload: (file: MarkdownFile) => void;
  onFileUpload: (file: MarkdownFile) => void;
}

interface FileItemProps {
  file: MarkdownFile;
  currentFile: MarkdownFile | null;
  onFileSelect: (file: MarkdownFile) => void;
  onFileDelete: (id: string) => void;
  onFileConvert: (file: MarkdownFile) => void;
  onFileDownload: (file: MarkdownFile) => void;
}

function FileItem({
  file,
  currentFile,
  onFileSelect,
  onFileDelete,
  onFileConvert,
  onFileDownload,
}: FileItemProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileDelete(file.id);
  };

  const isActive = currentFile?.id === file.id;

  return (
    <div
      onClick={() => onFileSelect(file)}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-all duration-200",
        "hover:bg-accent/50",
        isActive && "bg-accent/70 hover:bg-accent/70",
        !isActive && "hover:translate-x-1"
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
          file.type === "uploaded"
            ? "bg-blue-500/10 text-blue-600"
            : "bg-emerald-500/10 text-emerald-600"
        )}
      >
        <FileText className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "font-medium truncate",
            isActive ? "text-primary" : "text-foreground/90"
          )}
        >
          {file.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {new Date(file.updatedAt).toLocaleDateString()} •{" "}
          {formatFileSize(file.size || 0)}
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 h-8 w-8 absolute right-2"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {file.type === "uploaded" && (
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onFileSelect(file);
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit as Draft
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onFileConvert(file);
            }}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Convert
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onFileDownload(file);
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function DraftsList({
  currentFile,
  files,
  onFileSelect,
  onCreateNew,
  onFileDelete,
  onFileConvert,
  onFileDownload,
  onFileUpload,
}: DraftsListProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.name.match(/\.(md|mdx)$/i)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a markdown (.md) or MDX (.mdx) file.",
          variant: "destructive",
        });
        return;
      }

      try {
        const content = await file.text();
        const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");

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

        onFileUpload(newFile);
        toast({
          title: "File uploaded successfully",
          description: `${file.name} has been uploaded and is ready to edit.`,
        });
      } catch (error) {
        toast({
          title: "Upload failed",
          description: "Failed to read the file. Please try again.",
          variant: "destructive",
        });
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [onFileUpload, toast]
  );

  const filteredFiles = files.filter(
    (file) =>
      file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (file.originalName &&
        file.originalName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const drafts = filteredFiles.filter((file) => file.type === "edited");
  const uploadedFiles = filteredFiles.filter(
    (file) => file.type === "uploaded"
  );

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 space-y-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">My Drafts</h2>
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".md,.mdx"
              className="hidden"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="hover:bg-accent"
              title="Upload markdown file"
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCreateNew}
              className="hover:bg-accent"
              title="Create new draft"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-muted/50"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-2">
        {/* Drafts Section */}
        <div className="py-2">
          <div className="flex items-center justify-between px-2 mb-2">
            <p className="text-sm font-medium text-muted-foreground">Drafts</p>
            <p className="text-sm text-muted-foreground">{drafts.length}</p>
          </div>
          <div className="space-y-1">
            {drafts.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                currentFile={currentFile}
                onFileSelect={onFileSelect}
                onFileDelete={onFileDelete}
                onFileConvert={onFileConvert}
                onFileDownload={onFileDownload}
              />
            ))}
            {drafts.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                <p className="text-sm font-medium mb-1">No drafts yet</p>
                <p className="text-xs">Create a new draft to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Uploaded Files Section */}
        {uploadedFiles.length > 0 && (
          <div className="py-2">
            <Separator className="my-4" />
            <div className="flex items-center justify-between px-2 mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Uploaded Files
              </p>
              <p className="text-sm text-muted-foreground">
                {uploadedFiles.length}
              </p>
            </div>
            <div className="space-y-1">
              {uploadedFiles.map((file) => (
                <FileItem
                  key={file.id}
                  file={file}
                  currentFile={currentFile}
                  onFileSelect={onFileSelect}
                  onFileDelete={onFileDelete}
                  onFileConvert={onFileConvert}
                  onFileDownload={onFileDownload}
                />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

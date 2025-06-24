import { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
} from "lucide-react";
import { type MarkdownFile } from "@/utils/storageUtils";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <div
      key={file.id}
      onClick={() => onFileSelect(file)}
      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-accent/50 group ${
        currentFile?.id === file.id ? "bg-accent" : ""
      }`}
    >
      <div className="flex items-center space-x-3 min-w-0">
        <FileText className="h-4 w-4 text-primary/60" />
        <div className="truncate">
          <p className="text-sm font-medium truncate">{file.title}</p>
          <p className="text-xs text-muted-foreground">
            Last updated: {new Date(file.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 h-8 w-8"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
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

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
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

      // Clear the input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [onFileUpload, toast]
  );

  // Handle file deletion with UI update
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onFileDelete(id);
  };

  const drafts = files.filter((file) => file.type === "edited");
  const uploadedFiles = files.filter((file) => file.type === "uploaded");

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">My Drafts</h2>
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
              title="Upload markdown file"
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCreateNew}
              title="Create new draft"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {drafts.length} saved draft{drafts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <ScrollArea className="flex-1">
        {/* Drafts Section */}
        <div className="space-y-0.5 p-2">
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
            <div className="p-4 text-center text-muted-foreground">
              <p>No drafts yet</p>
              <p className="text-sm">Create a new draft to get started</p>
            </div>
          )}
        </div>

        {/* Uploaded Files Section */}
        {uploadedFiles.length > 0 && (
          <>
            <Separator className="my-2" />
            <div className="px-4 py-2">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-sm">Uploaded Files</h2>
                <p className="text-xs text-muted-foreground">
                  {uploadedFiles.length} file
                  {uploadedFiles.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="space-y-0.5 p-2">
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
          </>
        )}
      </ScrollArea>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Trash2,
  Download,
  Calendar,
  HardDrive,
  FolderOpen,
  AlertCircle,
  Upload,
  Edit,
  Search,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StorageManager, type MarkdownFile } from "@/utils/storageUtils";

interface FileManagerProps {
  currentFileId?: string;
  onFileSelect: (file: MarkdownFile) => void;
  onNewUpload: () => void;
}

const FileManager = ({
  currentFileId,
  onFileSelect,
  onNewUpload,
}: FileManagerProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<MarkdownFile[]>([]);
  const [editedFiles, setEditedFiles] = useState<MarkdownFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [storageInfo, setStorageInfo] = useState({
    used: 0,
    total: 0,
    percentage: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = () => {
    setUploadedFiles(StorageManager.getFilesByType("uploaded"));
    setEditedFiles(StorageManager.getFilesByType("edited"));
    setStorageInfo(StorageManager.getStorageUsage());
  };

  const filterFiles = (files: MarkdownFile[]) => {
    if (!searchQuery) return files;
    const query = searchQuery.toLowerCase();
    return files.filter(
      (file) =>
        file.title.toLowerCase().includes(query) ||
        (file.originalName && file.originalName.toLowerCase().includes(query))
    );
  };

  const handleDeleteFile = (id: string, fileName: string) => {
    try {
      StorageManager.deleteFile(id);
      loadFiles();
      toast({
        title: "File deleted",
        description: `${fileName} has been removed from storage.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClearFiles = (type: "uploaded" | "edited") => {
    try {
      StorageManager.clearFilesByType(type);
      loadFiles();
      toast({
        title: "Files cleared",
        description: `All ${type} files have been cleared.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear files. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const renderFileGrid = (
    files: MarkdownFile[],
    type: "uploaded" | "edited"
  ) => {
    const filteredFiles = filterFiles(files);

    if (filteredFiles.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
            {type === "uploaded" ? (
              <Upload className="h-6 w-6 text-muted-foreground" />
            ) : (
              <Edit className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <h3 className="text-sm font-medium mb-1">
            {files.length === 0 ? `No ${type} files` : "No matches found"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {files.length === 0
              ? type === "uploaded"
                ? "Upload markdown files to get started"
                : "Create new markdown files in the editor"
              : "Try adjusting your search"}
          </p>
        </div>
      );
    }

    return (
      <ScrollArea className="h-[400px]">
        <div className="grid grid-cols-2 gap-4 p-1">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                currentFileId === file.id
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/50 hover:bg-muted/30"
              }`}
              onClick={() => onFileSelect(file)}
            >
              <div className="flex flex-col h-full">
                <div
                  className={`p-3 rounded-lg mb-3 ${
                    type === "uploaded"
                      ? "bg-blue-100 dark:bg-blue-900/20"
                      : "bg-emerald-100 dark:bg-emerald-900/20"
                  }`}
                >
                  <FileText
                    className={`h-6 w-6 ${
                      type === "uploaded"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-foreground truncate">
                      {file.title}
                    </h4>
                    {currentFileId === file.id && (
                      <Badge
                        variant="secondary"
                        className="text-xs flex-shrink-0"
                      >
                        Active
                      </Badge>
                    )}
                  </div>
                  {file.type === "uploaded" && file.originalName && (
                    <p className="text-sm text-muted-foreground truncate mb-2">
                      {file.originalName}
                    </p>
                  )}
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(file.updatedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="h-3 w-3" />
                      <span>
                        {formatFileSize(file.size || file.content.length)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-3">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete File</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{file.title}"? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteFile(file.id, file.title)}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  };

  const renderFileList = (
    files: MarkdownFile[],
    type: "uploaded" | "edited"
  ) => {
    const filteredFiles = filterFiles(files);

    if (filteredFiles.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
            {type === "uploaded" ? (
              <Upload className="h-6 w-6 text-muted-foreground" />
            ) : (
              <Edit className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <h3 className="text-sm font-medium mb-1">
            {files.length === 0 ? `No ${type} files` : "No matches found"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {files.length === 0
              ? type === "uploaded"
                ? "Upload markdown files to get started"
                : "Create new markdown files in the editor"
              : "Try adjusting your search"}
          </p>
        </div>
      );
    }

    return (
      <ScrollArea className="h-[400px]">
        <div className="space-y-3">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                currentFileId === file.id
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/50 hover:bg-muted/30"
              }`}
              onClick={() => onFileSelect(file)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div
                    className={`p-2 rounded-lg flex-shrink-0 ${
                      type === "uploaded"
                        ? "bg-blue-100 dark:bg-blue-900/20"
                        : "bg-emerald-100 dark:bg-emerald-900/20"
                    }`}
                  >
                    <FileText
                      className={`h-4 w-4 ${
                        type === "uploaded"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground truncate">
                        {file.title}
                      </h4>
                      {currentFileId === file.id && (
                        <Badge variant="secondary" className="text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                    {file.type === "uploaded" && file.originalName && (
                      <p className="text-sm text-muted-foreground truncate mb-2">
                        {file.originalName}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {type === "uploaded" ? "Uploaded" : "Modified"}{" "}
                          {formatDate(file.updatedAt)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="h-3 w-3" />
                        <span>
                          {formatFileSize(file.size || file.content.length)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete File</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{file.title}"? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteFile(file.id, file.title)}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search and View Options */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="h-8 w-8 p-0"
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-8 w-8 p-0"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Storage Info */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <HardDrive className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-lg">File Storage</CardTitle>
                <CardDescription>
                  {uploadedFiles.length + editedFiles.length} files •{" "}
                  {formatFileSize(storageInfo.used)} used
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onNewUpload}
              className="flex items-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>Upload New</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(storageInfo.percentage, 100)}%` }}
            />
          </div>
          {storageInfo.percentage > 80 && (
            <div className="flex items-center space-x-2 mt-2 text-amber-600 dark:text-amber-400">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Storage is getting full</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* File Tabs */}
      <Tabs defaultValue="uploaded">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="uploaded" className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Uploaded Files</span>
            <Badge variant="secondary" className="ml-2">
              {uploadedFiles.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="edited" className="flex items-center space-x-2">
            <Edit className="h-4 w-4" />
            <span>Edited Files</span>
            <Badge variant="secondary" className="ml-2">
              {editedFiles.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="uploaded" className="mt-4">
          {viewMode === "grid"
            ? renderFileGrid(uploadedFiles, "uploaded")
            : renderFileList(uploadedFiles, "uploaded")}
        </TabsContent>

        <TabsContent value="edited" className="mt-4">
          {viewMode === "grid"
            ? renderFileGrid(editedFiles, "edited")
            : renderFileList(editedFiles, "edited")}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FileManager;

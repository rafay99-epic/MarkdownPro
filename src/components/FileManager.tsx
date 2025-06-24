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
import {
  FileText,
  Trash2,
  Download,
  Calendar,
  HardDrive,
  FolderOpen,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  StoredMarkdownFile,
  getStoredFiles,
  deleteStoredFile,
  clearAllStoredFiles,
  getStorageUsage,
} from "@/utils/markdownUtils";

interface FileManagerProps {
  currentFileId?: string;
  onFileSelect: (file: StoredMarkdownFile) => void;
  onNewUpload: () => void;
}

const FileManager = ({
  currentFileId,
  onFileSelect,
  onNewUpload,
}: FileManagerProps) => {
  const [storedFiles, setStoredFiles] = useState<StoredMarkdownFile[]>([]);
  const [storageInfo, setStorageInfo] = useState({ used: 0, percentage: 0 });
  const { toast } = useToast();

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = () => {
    const files = getStoredFiles();
    setStoredFiles(files);
    setStorageInfo(getStorageUsage());
  };

  const handleDeleteFile = (id: string, fileName: string) => {
    try {
      deleteStoredFile(id);
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

  const handleClearAll = () => {
    try {
      clearAllStoredFiles();
      loadFiles();
      toast({
        title: "All files cleared",
        description: "Your local storage has been cleared.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear files. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
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

  if (storedFiles.length === 0) {
    return (
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-muted to-muted/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Files Yet</h3>
          <p className="text-muted-foreground mb-4">
            Upload your first markdown file to get started
          </p>
          <Button
            onClick={onNewUpload}
            className="bg-primary hover:bg-primary/90"
          >
            Upload File
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
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
                  {storedFiles.length} of 10 files •{" "}
                  {formatFileSize(storageInfo.used)} used
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onNewUpload}
                className="flex items-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>Upload New</span>
              </Button>
              {storedFiles.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear All Files</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete all stored files from your
                        browser's local storage. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleClearAll}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Clear All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
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

      {/* Files List */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Your Files</CardTitle>
          <CardDescription>
            Click on a file to load it, or manage your uploaded files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {storedFiles.map((file) => (
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
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex-shrink-0">
                        <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-foreground truncate">
                            {file.name}
                          </h4>
                          {currentFileId === file.id && (
                            <Badge variant="secondary" className="text-xs">
                              Active
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate mb-2">
                          {file.originalName}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>Uploaded {formatDate(file.uploadDate)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Download className="h-3 w-3" />
                            <span>
                              {Math.ceil(file.content.length / 1024)}KB
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
                            Are you sure you want to delete "{file.name}"? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteFile(file.id, file.name)}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default FileManager;

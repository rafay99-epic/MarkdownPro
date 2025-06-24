import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import {
  Save,
  Trash2,
  Edit,
  FileText,
  Plus,
  Download,
  MoreVertical,
  ExternalLink,
} from "lucide-react";
import { StorageManager, type MarkdownFile } from "@/utils/storageUtils";

const MarkdownEditor = () => {
  const navigate = useNavigate();
  const [files, setFiles] = React.useState<MarkdownFile[]>([]);
  const [currentFile, setCurrentFile] = React.useState<MarkdownFile | null>(
    null
  );
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const { toast } = useToast();

  // Load files from storage on component mount
  React.useEffect(() => {
    setFiles(StorageManager.getAllFiles());
  }, []);

  const createNewFile = () => {
    const newFile: MarkdownFile = {
      id: Date.now().toString(),
      title: title || "Untitled",
      content: content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      type: "edited",
      size: content.length,
    };

    StorageManager.saveFile(newFile);
    setFiles(StorageManager.getFilesByType("edited"));
    setCurrentFile(newFile);
    toast({
      title: "File Created",
      description: "Your markdown file has been saved.",
    });
    setTitle("");
    setContent("");
  };

  const updateFile = () => {
    if (!currentFile) return;

    const updatedFile: MarkdownFile = {
      ...currentFile,
      title: title || currentFile.title,
      content: content,
      updatedAt: Date.now(),
      size: content.length,
    };

    StorageManager.saveFile(updatedFile);
    setFiles(StorageManager.getFilesByType("edited"));
    toast({
      title: "File Updated",
      description: "Your changes have been saved.",
    });
  };

  const deleteFile = (id: string) => {
    StorageManager.deleteFile(id);
    setFiles(StorageManager.getAllFiles());
    if (currentFile?.id === id) {
      setCurrentFile(null);
      setTitle("");
      setContent("");
    }
    toast({
      title: "File Deleted",
      description: "The markdown file has been removed.",
      variant: "destructive",
    });
  };

  const loadFile = (file: MarkdownFile) => {
    setCurrentFile(file);
    setTitle(file.title);
    setContent(file.content);
  };

  const downloadFile = (file: MarkdownFile) => {
    StorageManager.downloadFile(file);
    toast({
      title: "File Downloaded",
      description: `${file.title}.md has been downloaded.`,
    });
  };

  const convertFile = (file: MarkdownFile) => {
    // Store the current file in sessionStorage for the converter to access
    sessionStorage.setItem("convertFile", JSON.stringify(file));
    navigate("/converter");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* File List */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>My Drafts</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Draft</DialogTitle>
                  <DialogDescription>
                    Start a new markdown document. It will be saved
                    automatically.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Enter title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="Write your markdown here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>
                <DialogFooter>
                  <Button onClick={createNewFile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <CardDescription>
            {files.length} saved draft{files.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {files.map((file) => (
                <Card
                  key={file.id}
                  className={`cursor-pointer transition-colors ${
                    currentFile?.id === file.id
                      ? "bg-primary/5 border-primary"
                      : ""
                  }`}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-base flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span className="truncate">{file.title}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => loadFile(file)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => convertFile(file)}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Convert to HTML/PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => downloadFile(file)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download as .md
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => deleteFile(file.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Last updated:{" "}
                      {new Date(file.updatedAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Editor */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>
            {currentFile ? "Edit Draft" : "Create New Draft"}
          </CardTitle>
          <CardDescription>
            Write your markdown content below. It will be saved automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Write your markdown here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[400px] font-mono"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            {currentFile && (
              <>
                <Button
                  variant="outline"
                  onClick={() => downloadFile(currentFile)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  onClick={() => convertFile(currentFile)}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Convert
                </Button>
              </>
            )}
          </div>
          <div>
            {currentFile ? (
              <Button onClick={updateFile}>
                <Save className="h-4 w-4 mr-2" />
                Update Draft
              </Button>
            ) : (
              <Button onClick={createNewFile}>
                <Save className="h-4 w-4 mr-2" />
                Save as New Draft
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MarkdownEditor;

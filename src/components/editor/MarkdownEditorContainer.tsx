import React, { useCallback, useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type MarkdownFile } from "@/utils/storageUtils";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  Heading,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image,
  Table,
  Strikethrough,
  CheckSquare,
} from "lucide-react";

interface MarkdownEditorContainerProps {
  currentFile: MarkdownFile | null;
  onSave: (file: MarkdownFile) => void;
}

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

function ToolbarButton({ icon, label, onClick, isActive }: ToolbarButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        "h-8 px-2 py-1",
        isActive && "bg-accent text-accent-foreground"
      )}
      title={label}
    >
      {icon}
    </Button>
  );
}

export function MarkdownEditorContainer({
  currentFile,
  onSave,
}: MarkdownEditorContainerProps) {
  const [content, setContent] = useState(currentFile?.content || "");
  const [title, setTitle] = useState(currentFile?.title || "");
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (currentFile) {
      setContent(currentFile.content);
      setTitle(currentFile.title);
      setHasChanges(false);
    } else {
      setContent("");
      setTitle("");
      setHasChanges(false);
    }
  }, [currentFile]);

  const handleSave = useCallback(async () => {
    if (!currentFile) return;

    setIsSaving(true);
    try {
      const updatedFile: MarkdownFile = {
        ...currentFile,
        title: title.trim() || "Untitled Document",
        content,
        updatedAt: Date.now(),
      };

      await onSave(updatedFile);
      setHasChanges(false);
      toast({
        title: "Changes saved",
        description: "Your document has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Failed to save your changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [currentFile, content, title, onSave, toast]);

  const handleContentChange = useCallback(
    (value?: string) => {
      setContent(value || "");
      setHasChanges(true);

      // Auto-generate title from first heading if title is empty
      if (!title && value) {
        const headingMatch = value.match(/^#\s+(.+)$/m);
        if (headingMatch) {
          setTitle(headingMatch[1].trim());
        }
      }
    },
    [title]
  );

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      setHasChanges(true);
    },
    []
  );

  const insertText = useCallback(
    (before: string, after: string = "") => {
      const textarea = document.querySelector(
        ".w-md-editor-text-input"
      ) as HTMLTextAreaElement;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.substring(start, end);
      const newText = `${content.substring(
        0,
        start
      )}${before}${selectedText}${after}${content.substring(end)}`;

      handleContentChange(newText);

      // Set cursor position after insertion
      setTimeout(() => {
        textarea.selectionStart = start + before.length;
        textarea.selectionEnd = end + before.length;
        textarea.focus();
      }, 0);
    },
    [content, handleContentChange]
  );

  const toolbarActions = [
    {
      icon: <Bold className="h-4 w-4" />,
      label: "Bold",
      onClick: () => insertText("**", "**"),
    },
    {
      icon: <Italic className="h-4 w-4" />,
      label: "Italic",
      onClick: () => insertText("*", "*"),
    },
    {
      icon: <Strikethrough className="h-4 w-4" />,
      label: "Strikethrough",
      onClick: () => insertText("~~", "~~"),
    },
    {
      icon: <Heading className="h-4 w-4" />,
      label: "Heading",
      onClick: () => insertText("### "),
    },
    {
      icon: <List className="h-4 w-4" />,
      label: "Bullet List",
      onClick: () => insertText("- "),
    },
    {
      icon: <ListOrdered className="h-4 w-4" />,
      label: "Numbered List",
      onClick: () => insertText("1. "),
    },
    {
      icon: <CheckSquare className="h-4 w-4" />,
      label: "Task List",
      onClick: () => insertText("- [ ] "),
    },
    {
      icon: <Quote className="h-4 w-4" />,
      label: "Quote",
      onClick: () => insertText("> "),
    },
    {
      icon: <Code className="h-4 w-4" />,
      label: "Code",
      onClick: () => insertText("```\n", "\n```"),
    },
    {
      icon: <LinkIcon className="h-4 w-4" />,
      label: "Link",
      onClick: () => insertText("[", "](url)"),
    },
    {
      icon: <Image className="h-4 w-4" />,
      label: "Image",
      onClick: () => insertText("![alt text](", ")"),
    },
    {
      icon: <Table className="h-4 w-4" />,
      label: "Table",
      onClick: () =>
        insertText(
          "\n| Header 1 | Header 2 |\n| --------- | --------- |\n| Cell 1 | Cell 2 |\n"
        ),
    },
  ];

  if (!currentFile) {
    return (
      <div className="h-full flex items-center justify-center bg-background/50 rounded-lg border">
        <div className="text-center space-y-2 max-w-md mx-auto p-8">
          <h3 className="text-lg font-semibold">No Document Selected</h3>
          <p className="text-sm text-muted-foreground">
            Select a document from the Files tab or create a new one to start
            editing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col rounded-lg border bg-background">
      <div className="flex items-center justify-between gap-4 p-4 border-b bg-background/50">
        <div className="flex-1">
          <Input
            value={title}
            onChange={handleTitleChange}
            placeholder="Untitled Document"
            className="text-lg font-medium bg-transparent border-none shadow-none focus-visible:ring-0 px-0 h-auto"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Last updated: {new Date(currentFile.updatedAt).toLocaleString()}
          </p>
        </div>
        <Button
          variant={hasChanges ? "default" : "ghost"}
          size="sm"
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
          className={cn(
            "transition-all duration-200 bg-primary/10 hover:bg-primary/20",
            hasChanges && "text-primary"
          )}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : hasChanges ? "Save Changes" : "Saved"}
        </Button>
      </div>

      <div className="flex items-center gap-1 p-2 border-b bg-muted/40">
        {toolbarActions.map((action, index) => (
          <React.Fragment key={action.label}>
            <ToolbarButton {...action} />
            {(index + 1) % 3 === 0 && (
              <Separator orientation="vertical" className="h-6 mx-1" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex-1 min-h-0">
        <MDEditor
          value={content}
          onChange={handleContentChange}
          preview="edit"
          className="!bg-background border-none h-full"
          height="100%"
          hideToolbar={true}
          textareaProps={{
            placeholder: "Write your markdown here...",
          }}
          previewOptions={{
            className: "prose dark:prose-invert max-w-none",
          }}
          components={{
            toolbar: () => null,
          }}
        />
      </div>
    </div>
  );
}

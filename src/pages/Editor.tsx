import React from "react";
import { MarkdownEditorContainer } from "@/components/editor/MarkdownEditorContainer";

export default function Editor() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Markdown Editor</h1>
        <p className="text-muted-foreground mt-2">
          Write and save your markdown files locally. They'll be available for
          conversion later.
        </p>
      </div>
      <MarkdownEditorContainer />
    </div>
  );
}

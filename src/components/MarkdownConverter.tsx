
import React, { useState } from 'react';
import MarkdownUploadSection from './MarkdownUploadSection';
import MarkdownDownloadSection from './MarkdownDownloadSection';
import MarkdownPreviewSection from './MarkdownPreviewSection';
import { ThemeToggle } from './ThemeToggle';

const MarkdownConverter = () => {
  const [markdownContent, setMarkdownContent] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Markdown Converter
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your markdown files into beautiful HTML pages or PDF documents with just a few clicks
            </p>
          </div>
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MarkdownUploadSection
            fileName={fileName}
            isDragging={isDragging}
            setMarkdownContent={setMarkdownContent}
            setHtmlContent={setHtmlContent}
            setFileName={setFileName}
            setIsDragging={setIsDragging}
          />

          <MarkdownDownloadSection
            markdownContent={markdownContent}
            htmlContent={htmlContent}
            fileName={fileName}
          />
        </div>

        <MarkdownPreviewSection
          markdownContent={markdownContent}
          htmlContent={htmlContent}
        />
      </div>
    </div>
  );
};

export default MarkdownConverter;

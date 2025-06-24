
import React, { useState } from 'react';
import MarkdownUploadSection from './MarkdownUploadSection';
import MarkdownDownloadSection from './MarkdownDownloadSection';
import MarkdownPreviewSection from './MarkdownPreviewSection';
import { ThemeToggle } from './ThemeToggle';
import { FileText, Zap, Download } from 'lucide-react';

const MarkdownConverter = () => {
  const [markdownContent, setMarkdownContent] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MarkdownPro</h1>
              <p className="text-xs text-muted-foreground">Convert & Export</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
            <Zap className="h-4 w-4 mr-2" />
            Professional Markdown Converter
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
            Transform Markdown to
            <span className="text-primary block">Beautiful Documents</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Upload your markdown files and convert them to stunning HTML pages or professional PDF documents. 
            Perfect for documentation, reports, and presentations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Easy Upload</h3>
            <p className="text-sm text-muted-foreground">Drag & drop or click to upload your markdown files instantly</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Instant Preview</h3>
            <p className="text-sm text-muted-foreground">See your converted content in real-time with live preview</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Download className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Multiple Formats</h3>
            <p className="text-sm text-muted-foreground">Export as HTML or PDF with professional formatting</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 MarkdownPro. Transform your markdown files with ease.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarkdownConverter;

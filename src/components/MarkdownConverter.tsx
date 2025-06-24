import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MarkdownUploadSection from "./MarkdownUploadSection";
import MarkdownDownloadSection from "./MarkdownDownloadSection";
import MarkdownPreviewSection from "./MarkdownPreviewSection";
import { ThemeToggle } from "./ThemeToggle";
import { FileText, Zap, Download, ArrowLeft, Home } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const MarkdownConverter = () => {
  const navigate = useNavigate();
  const [markdownContent, setMarkdownContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Enhanced Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 hover:bg-muted/50"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  MarkdownPro
                </h1>
                <p className="text-xs text-muted-foreground">Converter</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="hidden sm:flex">
              Privacy-First
            </Badge>
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="hidden sm:flex items-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="text-center mb-8">
          <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary border-primary/20 mb-4">
            <Zap className="h-4 w-4 mr-2" />
            Professional Markdown Converter
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            Convert Your Markdown
            <span className="block text-primary">Into Beautiful Documents</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Upload your markdown files and convert them to stunning HTML pages
            or professional PDF documents. All processing happens locally in
            your browser.
          </p>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 hover:shadow-md transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-semibold text-foreground mb-1 text-sm">
              Easy Upload
            </h3>
            <p className="text-xs text-muted-foreground">
              Drag & drop or click to upload
            </p>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 hover:shadow-md transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-foreground mb-1 text-sm">
              Instant Preview
            </h3>
            <p className="text-xs text-muted-foreground">
              Real-time conversion and preview
            </p>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 hover:shadow-md transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-foreground mb-1 text-sm">
              Multiple Formats
            </h3>
            <p className="text-xs text-muted-foreground">
              Export as HTML or PDF
            </p>
          </div>
        </div>

        {/* Main Content with Enhanced Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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

      {/* Enhanced Footer */}
      <footer className="border-t bg-muted/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© 2024 MarkdownPro. Privacy-first markdown conversion.</p>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <Button variant="link" size="sm" className="text-xs p-0 h-auto">
                Privacy Policy
              </Button>
              <Button variant="link" size="sm" className="text-xs p-0 h-auto">
                Terms
              </Button>
              <Button variant="link" size="sm" className="text-xs p-0 h-auto">
                Support
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarkdownConverter;

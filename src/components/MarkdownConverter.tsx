import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MarkdownUploadSection from "./MarkdownUploadSection";
import MarkdownDownloadSection from "./MarkdownDownloadSection";
import MarkdownPreviewSection from "./MarkdownPreviewSection";
import ConversionSettings, { ConversionOptions } from "./ConversionSettings";
import FileManager from "./FileManager";
import { ThemeToggle } from "./ThemeToggle";
import {
  FileText,
  Zap,
  Download,
  ArrowLeft,
  Home,
  Settings2,
  Upload,
  Eye,
  FolderOpen,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { StoredMarkdownFile, getStoredFiles } from "@/utils/markdownUtils";

const MarkdownConverter = () => {
  const navigate = useNavigate();
  const [markdownContent, setMarkdownContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [currentFileId, setCurrentFileId] = useState<string | undefined>();
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState("files");
  const [hasStoredFiles, setHasStoredFiles] = useState(false);

  // Default conversion options
  const [conversionOptions, setConversionOptions] = useState<ConversionOptions>(
    {
      theme: "github",
      fontSize: "medium",
      fontFamily: "system",
      lineHeight: "normal",
      includeToc: false,
      syntaxHighlighting: true,
      pdfPageSize: "a4",
      pdfMargins: "normal",
      externalLinksNewTab: true,
      includePageNumbers: false,
      includeTimestamp: false,
      darkMode: false,
    }
  );

  // Check for stored files on component mount
  useEffect(() => {
    const storedFiles = getStoredFiles();
    setHasStoredFiles(storedFiles.length > 0);

    // If no stored files, start with upload tab
    if (storedFiles.length === 0) {
      setActiveTab("upload");
    }
  }, []);

  // Auto-switch to preview tab when file is uploaded or selected
  useEffect(() => {
    if (markdownContent && htmlContent) {
      // Always switch to preview when content is available
      setActiveTab("preview");
    }
  }, [markdownContent, htmlContent]);

  // Handle file selection from file manager
  const handleFileSelect = (file: StoredMarkdownFile) => {
    setMarkdownContent(file.content);
    setHtmlContent(file.htmlContent);
    setFileName(file.name);
    setCurrentFileId(file.id);
  };

  // Handle new file upload
  const handleFileUploaded = (file: StoredMarkdownFile) => {
    setCurrentFileId(file.id);
    setHasStoredFiles(true);
  };

  // Handle uploading a new file (clear current state)
  const handleNewUpload = () => {
    setMarkdownContent("");
    setHtmlContent("");
    setFileName("");
    setCurrentFileId(undefined);
    setActiveTab("upload");
  };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
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
            Upload multiple markdown files (.md, .mdx), switch between them
            easily, and convert them to stunning HTML pages or professional PDF
            documents. All files are stored locally in your browser for privacy
            and easy access.
          </p>
        </div>

        {/* Tab-Based Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-5 bg-muted/50 p-1 rounded-lg mb-8 h-14">
            <TabsTrigger
              value="files"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 p-2"
            >
              <FolderOpen className="h-4 w-4 text-blue-600" />
              <span className="text-xs sm:text-sm font-medium">Files</span>
              {hasStoredFiles && (
                <Badge
                  variant="secondary"
                  className="text-xs ml-1 hidden sm:block"
                >
                  {getStoredFiles().length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="upload"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 p-2"
            >
              <Upload className="h-4 w-4 text-emerald-600" />
              <span className="text-xs sm:text-sm font-medium">Upload</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 p-2"
            >
              <Settings2 className="h-4 w-4 text-purple-600" />
              <span className="text-xs sm:text-sm font-medium">Settings</span>
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 p-2"
              disabled={!markdownContent}
            >
              <Eye className="h-4 w-4 text-blue-600" />
              <span className="text-xs sm:text-sm font-medium">Preview</span>
              {!markdownContent && (
                <Badge
                  variant="outline"
                  className="text-xs ml-1 hidden sm:block"
                >
                  Select file
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="export"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 p-2"
              disabled={!markdownContent}
            >
              <Download className="h-4 w-4 text-orange-600" />
              <span className="text-xs sm:text-sm font-medium">Export</span>
              {!markdownContent && (
                <Badge
                  variant="outline"
                  className="text-xs ml-1 hidden sm:block"
                >
                  Select file
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {/* Files Tab */}
            <TabsContent value="files" className="mt-0">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FolderOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">File Manager</h2>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Manage your uploaded markdown files. All files are stored
                    locally in your browser for privacy.
                  </p>
                </div>
                <FileManager
                  currentFileId={currentFileId}
                  onFileSelect={handleFileSelect}
                  onNewUpload={handleNewUpload}
                />
              </div>
            </TabsContent>

            {/* Upload Tab */}
            <TabsContent value="upload" className="mt-0">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    Upload Markdown File
                  </h2>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Upload .md or .mdx files. Each file is automatically saved
                    locally for easy access later.
                  </p>
                </div>

                {/* Enhanced Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">
                      Multiple Files
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Upload and manage multiple files
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">
                      Local Storage
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Files saved in your browser
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">
                      Easy Access
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Switch between files instantly
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Settings2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">
                      .md & .mdx
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Support for both formats
                    </p>
                  </div>
                </div>

                <MarkdownUploadSection
                  fileName={fileName}
                  isDragging={isDragging}
                  setMarkdownContent={setMarkdownContent}
                  setHtmlContent={setHtmlContent}
                  setFileName={setFileName}
                  setIsDragging={setIsDragging}
                  conversionOptions={conversionOptions}
                  onFileUploaded={handleFileUploaded}
                />
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-0">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Settings2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    Customize Your Document
                  </h2>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Choose themes, fonts, and export options to create the
                    perfect document.
                  </p>
                  {markdownContent && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNewUpload}
                      className="mt-4 flex items-center space-x-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload New File</span>
                    </Button>
                  )}
                </div>
                <ConversionSettings
                  options={conversionOptions}
                  onOptionsChange={setConversionOptions}
                />
              </div>
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview" className="mt-0">
              <div className="max-w-full">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Live Preview</h2>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    See how your document will look with the current settings.
                  </p>
                  {markdownContent && (
                    <div className="flex items-center justify-center space-x-4 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab("files")}
                        className="flex items-center space-x-2"
                      >
                        <FolderOpen className="h-4 w-4" />
                        <span>Switch File</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNewUpload}
                        className="flex items-center space-x-2"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Upload New</span>
                      </Button>
                    </div>
                  )}
                </div>
                <MarkdownPreviewSection
                  markdownContent={markdownContent}
                  htmlContent={htmlContent}
                  conversionOptions={conversionOptions}
                />
              </div>
            </TabsContent>

            {/* Export Tab */}
            <TabsContent value="export" className="mt-0">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    Export Your Document
                  </h2>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Download your converted document as HTML or PDF with your
                    chosen styling.
                  </p>
                  {markdownContent && (
                    <div className="flex items-center justify-center space-x-4 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab("files")}
                        className="flex items-center space-x-2"
                      >
                        <FolderOpen className="h-4 w-4" />
                        <span>Switch File</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNewUpload}
                        className="flex items-center space-x-2"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Upload New</span>
                      </Button>
                    </div>
                  )}
                </div>
                <MarkdownDownloadSection
                  markdownContent={markdownContent}
                  htmlContent={htmlContent}
                  fileName={fileName}
                  conversionOptions={conversionOptions}
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Enhanced Footer */}
      <footer className="border-t bg-muted/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>
              © 2024 MarkdownPro. Privacy-first markdown conversion with
              professional styling.
            </p>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <Button
                variant="link"
                size="sm"
                className="text-xs p-0 h-auto"
                onClick={() => navigate("/privacy")}
              >
                Privacy Policy
              </Button>
              <Button
                variant="link"
                size="sm"
                className="text-xs p-0 h-auto"
                onClick={() => navigate("/terms")}
              >
                Terms
              </Button>
              <Button
                variant="link"
                size="sm"
                className="text-xs p-0 h-auto"
                onClick={() => navigate("/contact")}
              >
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

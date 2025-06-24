import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MarkdownUploadSection from "./MarkdownUploadSection";
import MarkdownDownloadSection from "./MarkdownDownloadSection";
import MarkdownPreviewSection from "./MarkdownPreviewSection";
import ConversionSettings, { ConversionOptions } from "./ConversionSettings";
import FileManager from "./FileManager";
import { ThemeToggle } from "./ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
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
import { StorageManager, type MarkdownFile } from "@/utils/storageUtils";
import { type StoredMarkdownFile } from "@/utils/markdownUtils";
import { useToast } from "@/hooks/use-toast";
import type { ComponentProps } from "react";
import { marked } from "marked";

interface MarkdownConverterProps {
  initialContent?: string;
  onBack?: () => void;
}

interface FileManagerProps extends ComponentProps<"div"> {
  currentFileId?: string;
  onFileSelect: (file: MarkdownFile) => void;
  onNewUpload: () => void;
}

const MarkdownConverter = ({
  initialContent = "",
  onBack,
}: MarkdownConverterProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [fileName, setFileName] = useState("");
  const [currentFileId, setCurrentFileId] = useState<string | undefined>();
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState("files");
  const [hasStoredFiles, setHasStoredFiles] = useState(false);
  const [files, setFiles] = useState<MarkdownFile[]>([]);
  const { toast } = useToast();
  const [markdownContent, setMarkdownContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [currentFile, setCurrentFile] = useState<MarkdownFile | null>(null);

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
    const storedFiles = StorageManager.getFilesByType("uploaded");
    setHasStoredFiles(storedFiles.length > 0);

    // If no stored files, start with upload tab
    if (storedFiles.length === 0) {
      setActiveTab("upload");
    }
  }, []);

  // Handle file selection from file manager
  const handleFileSelect = async (file: MarkdownFile) => {
    setMarkdownContent(file.content);
    const html = await marked(file.content);
    setHtmlContent(html);
    setFileName(file.title);
    setCurrentFileId(file.id);
    setCurrentFile(file);
    setActiveTab("preview");
  };

  // Handle new file upload
  const handleFileUploaded = async (file: MarkdownFile) => {
    setCurrentFileId(file.id);
    setHasStoredFiles(true);

    // Also set the content for preview
    setMarkdownContent(file.content);
    const html = await marked(file.content);
    setHtmlContent(html);
    setFileName(file.title);
    setCurrentFile(file);
    setActiveTab("preview");
  };

  // Handle uploading a new file (clear current state)
  const handleNewUpload = () => {
    setMarkdownContent("");
    setHtmlContent("");
    setFileName("");
    setCurrentFileId(undefined);
    setCurrentFile(null);
    setActiveTab("upload");
  };

  const loadFiles = () => {
    setFiles(StorageManager.getFilesByType("uploaded"));
  };

  useEffect(() => {
    // Check if we have a file from the editor
    const convertFile = sessionStorage.getItem("convertFile");
    if (convertFile) {
      const file = JSON.parse(convertFile) as MarkdownFile;
      handleFileSelect(file).catch((error) => {
        console.error("Error loading file from editor:", error);
        toast({
          title: "Error",
          description: "Failed to load file from editor",
          variant: "destructive",
        });
      });
      // Clear the session storage
      sessionStorage.removeItem("convertFile");
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Convert Markdown
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Convert your markdown files to HTML or PDF with professional
              styling
            </p>
          </div>
          <Button
            onClick={() => navigate("/editor")}
            className="w-full sm:w-auto flex items-center justify-center space-x-2"
            variant="outline"
          >
            <FileText className="h-4 w-4" />
            <span>{isMobile ? "Write New Post" : "Write Blog Post"}</span>
          </Button>
        </div>

        {/* Tab-Based Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <TabsList
            className={`grid w-full ${
              isMobile ? "grid-cols-3 gap-1" : "grid-cols-5"
            } bg-muted/50 p-1 rounded-lg mb-6 sm:mb-8 h-auto sm:h-14`}
          >
            <TabsTrigger
              value="files"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 p-2"
            >
              <FolderOpen className="h-4 w-4 text-blue-600" />
              <span className="text-xs sm:text-sm font-medium">Files</span>
              {hasStoredFiles && !isMobile && (
                <Badge
                  variant="secondary"
                  className="text-xs ml-1 hidden sm:block"
                >
                  {StorageManager.getFilesByType("uploaded").length}
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
            {!isMobile && (
              <>
                <TabsTrigger
                  value="preview"
                  className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 p-2"
                  disabled={!markdownContent}
                >
                  <Eye className="h-4 w-4 text-blue-600" />
                  <span className="text-xs sm:text-sm font-medium">
                    Preview
                  </span>
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
              </>
            )}
          </TabsList>

          {/* Mobile Action Buttons */}
          {isMobile && markdownContent && (
            <div className="flex space-x-2 mb-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setActiveTab("preview")}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setActiveTab("export")}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          )}

          {/* Tab Content */}
          <div className="min-h-[400px] sm:min-h-[600px]">
            {/* Files Tab */}
            <TabsContent value="files" className="mt-0">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FolderOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">
                    File Manager
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
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
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">
                    Upload Markdown File
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                    Upload .md or .mdx files. Each file is automatically saved
                    locally for easy access later.
                  </p>
                </div>
                <MarkdownUploadSection
                  fileName={fileName}
                  isDragging={isDragging}
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
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Settings2 className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">
                    Customize Your Document
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                    Choose themes, fonts, and export options to create the
                    perfect document.
                  </p>
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
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">
                    Live Preview
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                    See how your document will look with the current settings.
                  </p>
                  {markdownContent && (
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab("files")}
                        className="w-full sm:w-auto flex items-center space-x-2"
                      >
                        <FolderOpen className="h-4 w-4" />
                        <span>Switch File</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNewUpload}
                        className="w-full sm:w-auto flex items-center space-x-2"
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
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Download className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">
                    Export Your Document
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                    Download your converted document as HTML or PDF with your
                    chosen styling.
                  </p>
                  {markdownContent && (
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab("files")}
                        className="w-full sm:w-auto flex items-center space-x-2"
                      >
                        <FolderOpen className="h-4 w-4" />
                        <span>Switch File</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNewUpload}
                        className="w-full sm:w-auto flex items-center space-x-2"
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
    </div>
  );
};

export default MarkdownConverter;


import React, { useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload, File } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { validateMarkdownFile, readFileAsText, convertMarkdownToHtml } from '@/utils/markdownUtils';

interface MarkdownUploadSectionProps {
  fileName: string;
  isDragging: boolean;
  setMarkdownContent: (content: string) => void;
  setHtmlContent: (content: string) => void;
  setFileName: (name: string) => void;
  setIsDragging: (dragging: boolean) => void;
}

const MarkdownUploadSection = ({
  fileName,
  isDragging,
  setMarkdownContent,
  setHtmlContent,
  setFileName,
  setIsDragging,
}: MarkdownUploadSectionProps) => {
  const { toast } = useToast();

  const handleFileUpload = useCallback(async (file: File) => {
    if (!validateMarkdownFile(file)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a markdown (.md) file",
        variant: "destructive",
      });
      return;
    }

    try {
      const content = await readFileAsText(file);
      setMarkdownContent(content);
      const html = await convertMarkdownToHtml(content);
      setHtmlContent(html);
      setFileName(file.name.replace('.md', ''));
    } catch (error) {
      toast({
        title: "File Processing Error",
        description: "Failed to process the markdown file",
        variant: "destructive",
      });
    }
  }, [setMarkdownContent, setHtmlContent, setFileName, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload, setIsDragging]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, [setIsDragging]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, [setIsDragging]);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-blue-600" />
          Upload Markdown File
        </CardTitle>
        <CardDescription>
          Drag and drop your .md file here or click to browse
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            {isDragging ? 'Drop your file here' : 'Choose a markdown file'}
          </p>
          <p className="text-sm text-gray-500">
            Supports .md files
          </p>
          <input
            id="file-input"
            type="file"
            accept=".md,.markdown"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
          />
        </div>

        {fileName && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <File className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                {fileName}.md
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarkdownUploadSection;

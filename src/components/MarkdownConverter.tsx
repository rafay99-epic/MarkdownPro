
import React, { useState, useCallback } from 'react';
import { marked } from 'marked';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Upload, File } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MarkdownConverter = () => {
  const [markdownContent, setMarkdownContent] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const convertMarkdownToHtml = useCallback((markdown: string) => {
    try {
      const html = marked(markdown);
      setHtmlContent(html);
      return html;
    } catch (error) {
      toast({
        title: "Conversion Error",
        description: "Failed to convert markdown to HTML",
        variant: "destructive",
      });
      return '';
    }
  }, [toast]);

  const handleFileUpload = useCallback((file: File) => {
    if (file.type !== 'text/markdown' && !file.name.endsWith('.md')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a markdown (.md) file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setMarkdownContent(content);
      convertMarkdownToHtml(content);
      setFileName(file.name.replace('.md', ''));
    };
    reader.readAsText(file);
  }, [convertMarkdownToHtml, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const downloadAsHtml = () => {
    if (!htmlContent) {
      toast({
        title: "No Content",
        description: "Please upload a markdown file first",
        variant: "destructive",
      });
      return;
    }

    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName || 'Converted Document'}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            color: #333;
        }
        h1, h2, h3, h4, h5, h6 {
            color: #2563eb;
            margin-top: 2rem;
            margin-bottom: 1rem;
        }
        code {
            background-color: #f1f5f9;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        }
        pre {
            background-color: #f1f5f9;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
        }
        blockquote {
            border-left: 4px solid #2563eb;
            padding-left: 1rem;
            margin-left: 0;
            font-style: italic;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
        }
        th, td {
            border: 1px solid #e2e8f0;
            padding: 0.5rem;
            text-align: left;
        }
        th {
            background-color: #f8fafc;
        }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName || 'converted'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download Complete",
      description: "HTML file has been downloaded successfully",
    });
  };

  const downloadAsPdf = async () => {
    if (!htmlContent) {
      toast({
        title: "No Content",
        description: "Please upload a markdown file first",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create a temporary div with the HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      tempDiv.style.cssText = `
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        color: #333;
        background: white;
        position: absolute;
        left: -9999px;
        top: 0;
      `;
      
      document.body.appendChild(tempDiv);

      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      document.body.removeChild(tempDiv);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${fileName || 'converted'}.pdf`);

      toast({
        title: "Download Complete",
        description: "PDF file has been downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "PDF Generation Error",
        description: "Failed to generate PDF file",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Markdown Converter
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your markdown files into beautiful HTML pages or PDF documents with just a few clicks
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
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

          {/* Download Options */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-blue-600" />
                Download Options
              </CardTitle>
              <CardDescription>
                Convert and download your markdown file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={downloadAsHtml}
                className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                disabled={!markdownContent}
              >
                <FileText className="h-5 w-5 mr-2" />
                Download as HTML
              </Button>
              <Button
                onClick={downloadAsPdf}
                variant="outline"
                className="w-full h-12 text-lg border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                disabled={!markdownContent}
              >
                <File className="h-5 w-5 mr-2" />
                Download as PDF
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        {markdownContent && (
          <Card className="mt-8 shadow-lg">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                Preview your converted content before downloading
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="markdown" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="markdown">Markdown Source</TabsTrigger>
                  <TabsTrigger value="html">HTML Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="markdown" className="mt-4">
                  <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96 text-sm">
                    {markdownContent}
                  </pre>
                </TabsContent>
                <TabsContent value="html" className="mt-4">
                  <div
                    className="prose max-w-none bg-white p-6 rounded-lg border max-h-96 overflow-auto"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MarkdownConverter;

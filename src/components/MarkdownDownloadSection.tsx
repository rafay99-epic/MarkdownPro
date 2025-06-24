
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, File } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { downloadAsHtml, downloadAsPdf } from '@/utils/downloadUtils';

interface MarkdownDownloadSectionProps {
  markdownContent: string;
  htmlContent: string;
  fileName: string;
}

const MarkdownDownloadSection = ({
  markdownContent,
  htmlContent,
  fileName,
}: MarkdownDownloadSectionProps) => {
  const { toast } = useToast();

  const handleDownloadAsHtml = () => {
    if (!htmlContent) {
      toast({
        title: "No Content",
        description: "Please upload a markdown file first",
        variant: "destructive",
      });
      return;
    }

    downloadAsHtml(htmlContent, fileName);
    toast({
      title: "Download Complete",
      description: "HTML file has been downloaded successfully",
    });
  };

  const handleDownloadAsPdf = async () => {
    if (!htmlContent) {
      toast({
        title: "No Content",
        description: "Please upload a markdown file first",
        variant: "destructive",
      });
      return;
    }

    try {
      await downloadAsPdf(htmlContent, fileName);
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
          onClick={handleDownloadAsHtml}
          className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          disabled={!markdownContent}
        >
          <FileText className="h-5 w-5 mr-2" />
          Download as HTML
        </Button>
        <Button
          onClick={handleDownloadAsPdf}
          variant="outline"
          className="w-full h-12 text-lg border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors duration-200"
          disabled={!markdownContent}
        >
          <File className="h-5 w-5 mr-2" />
          Download as PDF
        </Button>
      </CardContent>
    </Card>
  );
};

export default MarkdownDownloadSection;

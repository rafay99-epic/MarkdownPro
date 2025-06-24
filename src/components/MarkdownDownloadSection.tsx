import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, FileText, File, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadAsHtml, downloadAsPdf } from "@/utils/downloadUtils";

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
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
            <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-xl">Export Options</CardTitle>
            <CardDescription className="text-muted-foreground">
              Choose your preferred format
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Button
            onClick={handleDownloadAsHtml}
            className="w-full h-14 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 group"
            disabled={!markdownContent}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">HTML Document</div>
                  <div className="text-xs opacity-90">Web-ready format</div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Button>

          <Button
            onClick={handleDownloadAsPdf}
            variant="outline"
            className="w-full h-14 text-base border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group"
            disabled={!markdownContent}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <File className="h-5 w-5 mr-3 text-primary" />
                <div className="text-left">
                  <div className="font-semibold text-foreground">
                    PDF Document
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Print-ready format
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </Button>
        </div>

        {!markdownContent && (
          <div className="text-center py-6 border-2 border-dashed border-muted rounded-lg">
            <div className="text-muted-foreground text-sm">
              Upload a markdown file to enable downloads
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarkdownDownloadSection;

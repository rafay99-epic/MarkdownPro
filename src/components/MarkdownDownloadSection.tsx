import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Image, Loader2, CheckCircle2 } from "lucide-react";
import { downloadAsHtml } from "@/utils/downloadUtils";
import { convertMarkdownToStyledHtml } from "@/utils/markdownUtils";
import { ConversionOptions } from "./ConversionSettings";
import { useToast } from "@/hooks/use-toast";
import { usePDF } from "react-to-pdf";

interface MarkdownDownloadSectionProps {
  markdownContent: string;
  htmlContent: string;
  fileName: string;
  conversionOptions: ConversionOptions;
}

const MarkdownDownloadSection = ({
  markdownContent,
  htmlContent,
  fileName,
  conversionOptions,
}: MarkdownDownloadSectionProps) => {
  type DownloadType = "html" | "pdf" | null;
  const [isDownloading, setIsDownloading] = useState<DownloadType>(null);
  const { toast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);

  const { toPDF, targetRef } = usePDF({
    filename: `${fileName}.pdf`,
    page: {
      format: "a4",
      orientation: "portrait",
      margin: 20,
    },
    canvas: {
      mimeType: "image/png",
      qualityRatio: 1,
    },
  });

  const handleHtmlDownload = async () => {
    if (!markdownContent) {
      toast({
        title: "No content to download",
        description: "Please upload a markdown file first.",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading("html");
    try {
      const styledHtml = await convertMarkdownToStyledHtml(
        markdownContent,
        conversionOptions,
        fileName
      );
      downloadAsHtml(styledHtml, fileName);

      toast({
        title: "HTML download started",
        description: `${fileName}.html is being downloaded with ${conversionOptions.theme} theme.`,
      });
    } catch (error) {
      console.error("Error downloading HTML:", error);
      toast({
        title: "Download failed",
        description: "There was an error generating the HTML file.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(null);
    }
  };

  const handlePdfDownload = async () => {
    if (!htmlContent) {
      toast({
        title: "No content to download",
        description: "Please upload a markdown file first.",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading("pdf");
    try {
      await toPDF();
      toast({
        title: "PDF download started",
        description: `${fileName}.pdf is being generated and downloaded.`,
      });
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast({
        title: "Download failed",
        description: "There was an error generating the PDF file.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(null);
    }
  };

  const isContentReady = markdownContent && htmlContent;

  return (
    <>
      <div
        ref={targetRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "210mm",
          padding: "20mm",
          fontSize:
            conversionOptions.fontSize === "small"
              ? "12pt"
              : conversionOptions.fontSize === "large"
              ? "14pt"
              : "13pt",
          fontFamily: conversionOptions.fontFamily,
          lineHeight: "1.6",
          color: conversionOptions.darkMode ? "#ffffff" : "#000000",
          backgroundColor: conversionOptions.darkMode ? "#1a1a1a" : "#ffffff",
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-xl">Export Options</CardTitle>
              <CardDescription>
                Download your converted document in different formats
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isContentReady && (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No Content Ready</p>
              <p className="text-sm">
                Upload a markdown file to enable downloads
              </p>
            </div>
          )}

          {isContentReady && (
            <>
              {/* Current Settings Preview */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="text-sm font-medium mb-3">Export Preview</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Theme:</span>
                    <div className="font-medium capitalize">
                      {conversionOptions.theme}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Font:</span>
                    <div className="font-medium capitalize">
                      {conversionOptions.fontFamily}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <div className="font-medium capitalize">
                      {conversionOptions.fontSize}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Features:</span>
                    <div className="flex flex-wrap gap-1">
                      {conversionOptions.includeToc && (
                        <Badge variant="secondary" className="text-xs">
                          TOC
                        </Badge>
                      )}
                      {conversionOptions.darkMode && (
                        <Badge variant="secondary" className="text-xs">
                          Dark
                        </Badge>
                      )}
                      {conversionOptions.includeTimestamp && (
                        <Badge variant="secondary" className="text-xs">
                          Timestamp
                        </Badge>
                      )}
                      {!conversionOptions.includeToc &&
                        !conversionOptions.darkMode &&
                        !conversionOptions.includeTimestamp && (
                          <span className="text-xs text-muted-foreground">
                            Standard
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* HTML Download */}
                <div className="p-4 border border-border/50 rounded-lg hover:shadow-md transition-all duration-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
                      <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        HTML File
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Styled web page
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs text-muted-foreground">
                      • Responsive design • Custom CSS styling • All features
                      included
                    </div>
                    <Button
                      onClick={handleHtmlDownload}
                      disabled={isDownloading !== null}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                    >
                      {isDownloading === "html" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download HTML
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* PDF Download */}
                <div className="p-4 border border-border/50 rounded-lg hover:shadow-md transition-all duration-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        PDF File
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Print-ready document
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs text-muted-foreground">
                      • Professional layout • High-quality export • Preserves
                      formatting
                    </div>
                    <Button
                      onClick={handlePdfDownload}
                      disabled={isDownloading !== null}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    >
                      {isDownloading === "pdf" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating PDF...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* File Info */}
              {fileName && (
                <div className="flex items-center justify-between p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <div>
                      <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                        Ready to export: {fileName}
                      </p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">
                        Using {conversionOptions.theme} theme •{" "}
                        {conversionOptions.fontSize} size
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default MarkdownDownloadSection;

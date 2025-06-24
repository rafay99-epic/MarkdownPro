import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Eye, Code2, Palette, FileText } from "lucide-react";
import { convertMarkdownToStyledHtml } from "@/utils/markdownUtils";
import { ConversionOptions } from "./ConversionSettings";

interface MarkdownPreviewSectionProps {
  markdownContent: string;
  htmlContent: string;
  conversionOptions: ConversionOptions;
}

const MarkdownPreviewSection = ({
  markdownContent,
  htmlContent,
  conversionOptions,
}: MarkdownPreviewSectionProps) => {
  const [styledHtml, setStyledHtml] = useState<string>("");

  useEffect(() => {
    const generateStyledHtml = async () => {
      if (markdownContent && htmlContent) {
        try {
          const styled = await convertMarkdownToStyledHtml(
            markdownContent,
            conversionOptions,
            "preview"
          );
          setStyledHtml(styled);
        } catch (error) {
          console.error("Error generating styled HTML:", error);
          setStyledHtml(htmlContent);
        }
      }
    };

    generateStyledHtml();
  }, [markdownContent, htmlContent, conversionOptions]);

  if (!markdownContent) return null;

  return (
    <Card className="mt-12 shadow-xl border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-xl">Live Preview</CardTitle>
              <CardDescription>
                See how your content will look with current settings
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              <Palette className="h-3 w-3 mr-1" />
              {conversionOptions.theme}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {conversionOptions.fontSize}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="styled" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-lg">
            <TabsTrigger
              value="styled"
              className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Palette className="h-4 w-4" />
              <span>Styled Preview</span>
            </TabsTrigger>
            <TabsTrigger
              value="html"
              className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
              <span>Basic HTML</span>
            </TabsTrigger>
            <TabsTrigger
              value="markdown"
              className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Code2 className="h-4 w-4" />
              <span>Source</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="styled" className="mt-6">
            <div className="rounded-lg border bg-background/50 backdrop-blur-sm">
              <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Styled Output</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{conversionOptions.theme} theme</span>
                    <span>•</span>
                    <span>{conversionOptions.fontFamily} font</span>
                    <span>•</span>
                    <span>{conversionOptions.fontSize}</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <iframe
                  srcDoc={styledHtml}
                  className="w-full border-0 rounded-b-lg"
                  style={{
                    height: "500px",
                    background: conversionOptions.darkMode
                      ? "#000000"
                      : "#ffffff",
                  }}
                  title="Styled Preview"
                  sandbox="allow-same-origin allow-scripts"
                />
                <div className="absolute top-2 right-2 z-10">
                  <Badge variant="secondary" className="text-xs">
                    Live Preview
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="html" className="mt-6">
            <div className="rounded-lg border bg-background/50 backdrop-blur-sm">
              <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Basic HTML Preview
                  </span>
                </div>
              </div>
              <div
                className="prose prose-lg max-w-none p-8 prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-blockquote:border-l-primary prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-a:text-primary hover:prose-a:text-primary/80 prose-li:text-foreground"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                style={{ maxHeight: "500px", overflowY: "auto" }}
              />
            </div>
          </TabsContent>

          <TabsContent value="markdown" className="mt-6">
            <div className="rounded-lg border bg-background/50 backdrop-blur-sm">
              <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center space-x-2">
                  <Code2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Markdown Source</span>
                </div>
              </div>
              <pre
                className="p-8 text-sm text-foreground font-mono leading-relaxed whitespace-pre-wrap"
                style={{ maxHeight: "500px", overflowY: "auto" }}
              >
                {markdownContent}
              </pre>
            </div>
          </TabsContent>
        </Tabs>

        {/* Settings Summary */}
        <div className="mt-6 p-4 bg-muted/20 rounded-lg">
          <h4 className="text-sm font-medium mb-3 flex items-center">
            <Palette className="h-4 w-4 mr-2" />
            Current Preview Settings
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
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
              <span className="text-muted-foreground">Mode:</span>
              <div className="font-medium">
                {conversionOptions.darkMode ? "Dark" : "Light"}
              </div>
            </div>
          </div>

          {(conversionOptions.includeToc ||
            conversionOptions.includeTimestamp ||
            conversionOptions.externalLinksNewTab) && (
            <div className="mt-3 pt-3 border-t">
              <span className="text-xs text-muted-foreground">
                Active Features:
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {conversionOptions.includeToc && (
                  <Badge variant="secondary" className="text-xs">
                    Table of Contents
                  </Badge>
                )}
                {conversionOptions.includeTimestamp && (
                  <Badge variant="secondary" className="text-xs">
                    Timestamp
                  </Badge>
                )}
                {conversionOptions.externalLinksNewTab && (
                  <Badge variant="secondary" className="text-xs">
                    External Links
                  </Badge>
                )}
                {conversionOptions.syntaxHighlighting && (
                  <Badge variant="secondary" className="text-xs">
                    Syntax Highlighting
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarkdownPreviewSection;

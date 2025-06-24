
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Code2 } from 'lucide-react';

interface MarkdownPreviewSectionProps {
  markdownContent: string;
  htmlContent: string;
}

const MarkdownPreviewSection = ({
  markdownContent,
  htmlContent,
}: MarkdownPreviewSectionProps) => {
  if (!markdownContent) return null;

  return (
    <Card className="mt-12 shadow-xl border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Eye className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Live Preview</CardTitle>
            <CardDescription>
              See how your content will look before downloading
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="html" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 rounded-lg">
            <TabsTrigger 
              value="html" 
              className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="markdown" 
              className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Code2 className="h-4 w-4" />
              <span>Source</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="html" className="mt-6">
            <div className="rounded-lg border bg-background/50 backdrop-blur-sm">
              <div
                className="prose prose-lg max-w-none p-8 prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-blockquote:border-l-primary prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-a:text-primary hover:prose-a:text-primary/80 prose-li:text-foreground"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                style={{ maxHeight: '500px', overflowY: 'auto' }}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="markdown" className="mt-6">
            <div className="rounded-lg border bg-background/50 backdrop-blur-sm">
              <pre 
                className="p-8 text-sm text-foreground font-mono leading-relaxed whitespace-pre-wrap"
                style={{ maxHeight: '500px', overflowY: 'auto' }}
              >
                {markdownContent}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarkdownPreviewSection;

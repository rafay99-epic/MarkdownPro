
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    <Card className="mt-8 shadow-lg bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Preview</CardTitle>
        <CardDescription className="text-muted-foreground">
          Preview your converted content before downloading
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="markdown" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="markdown" className="text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Markdown Source</TabsTrigger>
            <TabsTrigger value="html" className="text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">HTML Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="markdown" className="mt-4">
            <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-sm text-foreground border border-border">
              {markdownContent}
            </pre>
          </TabsContent>
          <TabsContent value="html" className="mt-4">
            <div
              className="prose max-w-none bg-background p-6 rounded-lg border border-border max-h-96 overflow-auto text-foreground prose-headings:text-primary prose-code:text-accent-foreground prose-pre:bg-muted prose-blockquote:border-primary"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarkdownPreviewSection;

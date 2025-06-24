
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
    <Card className="mt-8 shadow-lg bg-tokyo-bgHighlight border-tokyo-input">
      <CardHeader>
        <CardTitle className="text-tokyo-fg">Preview</CardTitle>
        <CardDescription className="text-tokyo-fgDark">
          Preview your converted content before downloading
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="markdown" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-tokyo-input">
            <TabsTrigger value="markdown" className="text-tokyo-fg data-[state=active]:bg-tokyo-blue data-[state=active]:text-white">Markdown Source</TabsTrigger>
            <TabsTrigger value="html" className="text-tokyo-fg data-[state=active]:bg-tokyo-blue data-[state=active]:text-white">HTML Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="markdown" className="mt-4">
            <pre className="bg-tokyo-terminal p-4 rounded-lg overflow-auto max-h-96 text-sm text-tokyo-fg border border-tokyo-input">
              {markdownContent}
            </pre>
          </TabsContent>
          <TabsContent value="html" className="mt-4">
            <div
              className="prose max-w-none bg-tokyo-bg p-6 rounded-lg border border-tokyo-input max-h-96 overflow-auto text-tokyo-fg prose-headings:text-tokyo-blue prose-code:text-tokyo-cyan prose-pre:bg-tokyo-terminal prose-blockquote:border-tokyo-blue"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarkdownPreviewSection;

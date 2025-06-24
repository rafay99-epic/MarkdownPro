
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
  );
};

export default MarkdownPreviewSection;

import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FileQuestion, Home, ArrowLeft, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { marked } from "marked";

const NotFound = () => {
  const location = useLocation();
  const [markdownPreview, setMarkdownPreview] = useState(false);
  const [renderedContent, setRenderedContent] = useState("");

  const markdownContent = `# 404 - Page Not Found

## Error Details
- **Path**: \`${location.pathname}\`
- **Status**: \`404\`
- **Message**: Page does not exist

## What Happened?
The page you're looking for seems to have been moved, deleted, or never existed.
It's like trying to preview a markdown file that's not in your workspace! 📝

## Available Actions
1. Return to the [home page](/)
2. Go back to your previous page
3. Try refreshing the page

> **Tip**: Make sure you're using the correct URL, just like how you need the right file path in markdown!

\`\`\`markdown
# Quick Navigation
[Home](/) - Convert your markdown files
[Features](/features) - Discover our features
[Contact](/contact) - Get in touch
\`\`\`
`;

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useEffect(() => {
    if (markdownPreview) {
      const result = marked.parse(markdownContent);
      if (typeof result === "string") {
        setRenderedContent(result);
      } else {
        result.then(setRenderedContent);
      }
    }
  }, [markdownPreview, markdownContent]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-card rounded-xl shadow-2xl overflow-hidden border border-border/50">
          {/* Header */}
          <div className="p-6 bg-muted/30">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileQuestion className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  404 - Page Not Found
                </h1>
                <p className="text-muted-foreground">
                  Let's help you find your way back
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Toggle View */}
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMarkdownPreview(!markdownPreview)}
                  className="text-sm"
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Toggle {markdownPreview ? "Raw" : "Preview"} View
                </Button>
              </div>

              {/* Markdown Content */}
              <div
                className={`rounded-lg p-4 font-mono text-sm ${
                  markdownPreview ? "bg-muted" : "bg-muted/30"
                }`}
              >
                {markdownPreview ? (
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: renderedContent,
                    }}
                  />
                ) : (
                  <pre className="whitespace-pre-wrap">{markdownContent}</pre>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  asChild
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    Return Home
                  </Link>
                </Button>
                <Button
                  onClick={() => window.history.back()}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="flex-1"
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Refresh Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;

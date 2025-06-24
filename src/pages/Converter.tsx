import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Edit } from "lucide-react";
import MarkdownConverter from "@/components/MarkdownConverter";
import { useIsMobile } from "@/hooks/use-mobile";
import { Footer } from "@/components/Footer";
const Converter = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [initialContent, setInitialContent] = React.useState<string>("");

  React.useEffect(() => {
    // Check if we have a file from the editor
    const convertFile = sessionStorage.getItem("convertFile");
    if (convertFile) {
      const file = JSON.parse(convertFile);
      setInitialContent(file.content);
      // Clear the session storage
      sessionStorage.removeItem("convertFile");
    }
  }, []);

  return (
    <div className="container mx-auto py-4 sm:py-8 px-4 sm:px-6">
      <div
        className={`flex ${
          isMobile ? "flex-col space-y-4" : "justify-between"
        } items-start sm:items-center mb-6 sm:mb-8`}
      >
        <div
          className={`flex ${
            isMobile ? "flex-col space-y-3" : "items-center space-x-4"
          } w-full sm:w-auto`}
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto justify-start"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Markdown Converter
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Convert your markdown to HTML or PDF
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/editor")}
          className="w-full sm:w-auto justify-center"
        >
          <Edit className="h-4 w-4 mr-2" />
          {isMobile ? "Write New Post" : "Open Editor"}
        </Button>
      </div>

      <Card className="p-3 sm:p-6">
        <MarkdownConverter initialContent={initialContent} />
      </Card>
      <Footer />
    </div>
  );
};

export default Converter;

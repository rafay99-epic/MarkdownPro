import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileText,
  Scale,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Terms = () => {
  const navigate = useNavigate();

  const keyPoints = [
    "Free to use for personal and commercial purposes",
    "No registration or account creation required",
    "All processing happens locally in your browser",
    "No warranties on the accuracy of conversions",
    "Service provided 'as is' without guarantees",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 hover:bg-muted/50"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  MarkdownPro
                </h1>
                <p className="text-xs text-muted-foreground">
                  Terms & Conditions
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              onClick={() => navigate("/converter")}
              className="bg-gradient-to-r from-primary to-primary/80"
            >
              Try Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800 mb-6">
            <Scale className="h-4 w-4 mr-2" />
            Legal Terms
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Terms and Conditions
          </h1>
          <p className="text-lg text-muted-foreground">
            Please read these terms carefully before using MarkdownPro.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: December 2024
          </p>
        </div>

        {/* Key Points */}
        <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Key Points
            </h2>
            <div className="space-y-3">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Terms */}
        <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using MarkdownPro, you accept and agree to be
                bound by the terms and provision of this agreement. If you do
                not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Use License
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily use MarkdownPro for
                personal and commercial purposes. This is the grant of a
                license, not a transfer of title, and under this license you may
                not:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• Modify or copy the application code</li>
                <li>• Use the service for any unlawful purpose</li>
                <li>• Attempt to decompile or reverse engineer the software</li>
                <li>• Remove any copyright or other proprietary notations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. Service Description
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                MarkdownPro is a web-based markdown conversion tool that
                processes files locally in your browser. The service converts
                markdown files to HTML and PDF formats without uploading your
                data to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. User Responsibilities
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You are responsible for:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• The content of files you process through the service</li>
                <li>• Ensuring you have the right to process the content</li>
                <li>• Complying with all applicable laws and regulations</li>
                <li>
                  • Using the service in a manner that doesn't harm others
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Disclaimer
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The information on this web application is provided on an "as
                is" basis. To the fullest extent permitted by law, this Company
                excludes all representations, warranties, conditions and terms
                (whether express or implied by law) except those expressly set
                out in the Terms and Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Limitations
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall MarkdownPro or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data
                or profit, or due to business interruption) arising out of the
                use or inability to use the service, even if MarkdownPro or an
                authorized representative has been notified orally or in writing
                of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Accuracy of Materials
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials appearing on MarkdownPro could include technical,
                typographical, or photographic errors. MarkdownPro does not
                warrant that any of the materials on its web application are
                accurate, complete, or current. MarkdownPro may make changes to
                the materials contained on its web application at any time
                without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Links
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                MarkdownPro has not reviewed all of the sites linked to our web
                application and is not responsible for the contents of any such
                linked site. The inclusion of any link does not imply
                endorsement by MarkdownPro of the site. Use of any such linked
                web application is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                9. Modifications
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                MarkdownPro may revise these terms of service for its web
                application at any time without notice. By using this web
                application, you are agreeing to be bound by the then current
                version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                10. Governing Law
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in
                accordance with the laws and you irrevocably submit to the
                exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                11. Contact Information
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms and Conditions,
                please contact us at{" "}
                <a
                  href="https://rafay99.com"
                  className="text-primary hover:text-primary/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  rafay99.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to start using MarkdownPro?
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/converter")}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            Start Converting Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Terms;

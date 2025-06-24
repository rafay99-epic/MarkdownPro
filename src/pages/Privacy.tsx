import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft,
  FileText,
  Shield,
  Eye,
  Database,
  Lock,
  Globe,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Privacy = () => {
  const navigate = useNavigate();

  const privacyPrinciples = [
    {
      icon: Shield,
      title: "Local Processing Only",
      description:
        "All file processing happens directly in your browser. Your markdown files never leave your device.",
    },
    {
      icon: Database,
      title: "No Data Collection",
      description:
        "We don't collect, store, or transmit any of your personal data or document content.",
    },
    {
      icon: Lock,
      title: "Secure by Design",
      description:
        "Built with privacy-first architecture ensuring your content remains completely private.",
    },
    {
      icon: Eye,
      title: "No Tracking",
      description:
        "No analytics, cookies, or tracking scripts that monitor your usage or behavior.",
    },
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
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <img
                  src="/markdownproIcon.png"
                  alt="MarkdownPro"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  MarkdownPro
                </h1>
                <p className="text-xs text-muted-foreground">Privacy Policy</p>
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
          <Badge className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 mb-6">
            <Shield className="h-4 w-4 mr-2" />
            Privacy First
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Your privacy is our top priority. Learn how we protect your data and
            ensure complete privacy.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: December 2024
          </p>
        </div>

        {/* Privacy Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {privacyPrinciples.map((principle, index) => (
            <Card
              key={index}
              className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl flex items-center justify-center">
                    <principle.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Privacy Policy */}
        <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                How MarkdownPro Works
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                MarkdownPro is a client-side application that runs entirely in
                your web browser. When you upload a markdown file, it is
                processed locally on your device using JavaScript. No data is
                transmitted to our servers or any third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Information We Don't Collect
              </h2>
              <ul className="text-muted-foreground space-y-2">
                <li>• Your markdown files or document content</li>
                <li>• Personal information or contact details</li>
                <li>• Usage analytics or behavioral data</li>
                <li>• IP addresses or location data</li>
                <li>• Browser information or device details</li>
                <li>• Cookies or tracking identifiers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Data Processing
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All markdown processing, HTML conversion, and PDF generation
                happens locally in your browser. Your files are processed in
                memory and never stored on our servers or transmitted over the
                internet.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Third-Party Services
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                MarkdownPro does not integrate with any third-party analytics,
                advertising, or tracking services. The application is completely
                self-contained and operates independently.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Security
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Since all processing happens locally, your data never leaves
                your device, providing the highest level of security. We use
                modern web security practices including HTTPS encryption for the
                application delivery.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Your Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Since we don't collect any personal data, there's nothing for us
                to access, modify, or delete. You maintain complete control over
                your data at all times.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Changes to This Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may update this privacy policy from time to time. Any changes
                will be posted on this page with an updated revision date. Since
                we don't collect contact information, we cannot notify users
                directly of changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Contact Information
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this privacy policy or
                MarkdownPro's privacy practices, you can contact us through our
                website at{" "}
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
            Ready to experience privacy-first markdown conversion?
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/converter")}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            Start Converting Securely
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileText,
  Zap,
  Download,
  Shield,
  Globe,
  Sparkles,
  Eye,
  Code2,
  Palette,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Features = () => {
  const navigate = useNavigate();

  const mainFeatures = [
    {
      icon: FileText,
      title: "Smart Markdown Processing",
      description:
        "Advanced parsing engine that handles complex markdown syntax including tables, code blocks, math equations, and custom formatting.",
      highlights: [
        "GFM Support",
        "Code Syntax Highlighting",
        "Math Equations",
        "Custom Extensions",
      ],
    },
    {
      icon: Zap,
      title: "Lightning Fast Conversion",
      description:
        "Instant processing with optimized algorithms. Convert even large documents in milliseconds with real-time preview.",
      highlights: [
        "Real-time Preview",
        "Instant Processing",
        "Large File Support",
        "Optimized Performance",
      ],
    },
    {
      icon: Download,
      title: "Multiple Export Formats",
      description:
        "Export to HTML, PDF, and more formats with professional styling, custom themes, and print-ready layouts.",
      highlights: [
        "HTML Export",
        "PDF Generation",
        "Custom Styling",
        "Print-Ready",
      ],
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "All processing happens locally in your browser. Your files never leave your device, ensuring complete privacy and security.",
      highlights: [
        "Local Processing",
        "No File Upload",
        "Complete Privacy",
        "Secure by Design",
      ],
    },
    {
      icon: Globe,
      title: "Universal Compatibility",
      description:
        "Works on any device with a modern browser. No installation required, accessible from anywhere.",
      highlights: [
        "Cross-Platform",
        "No Installation",
        "Browser-Based",
        "Mobile Friendly",
      ],
    },
    {
      icon: Palette,
      title: "Beautiful Styling",
      description:
        "Professional typography, customizable themes, and beautiful layouts that make your documents stand out.",
      highlights: [
        "Professional Typography",
        "Custom Themes",
        "Beautiful Layouts",
        "Responsive Design",
      ],
    },
  ];

  const additionalFeatures = [
    {
      icon: Eye,
      title: "Live Preview",
      description: "See changes in real-time as you work",
    },
    {
      icon: Code2,
      title: "Syntax Highlighting",
      description: "Beautiful code blocks with language detection",
    },
    {
      icon: Clock,
      title: "Version History",
      description: "Track changes and revert when needed",
    },
    {
      icon: Users,
      title: "Collaboration Ready",
      description: "Share and collaborate on documents",
    },
    {
      icon: Sparkles,
      title: "AI Enhancements",
      description: "Smart formatting and optimization",
    },
    {
      icon: CheckCircle2,
      title: "Quality Assurance",
      description: "Automatic validation and error checking",
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
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  MarkdownPro
                </h1>
                <p className="text-xs text-muted-foreground">Features</p>
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

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Powerful Features
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
              Everything you need for
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Perfect Documents
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              MarkdownPro combines powerful processing capabilities with
              beautiful design to give you the ultimate markdown conversion
              experience.
            </p>
          </div>

          {/* Main Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {mainFeatures.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {feature.highlights.map((highlight, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Features */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              And much more...
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover all the features that make MarkdownPro the best choice
              for your workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {additionalFeatures.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to experience the difference?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start converting your markdown files with all these powerful
              features
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/converter")}
              className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Try MarkdownPro Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;

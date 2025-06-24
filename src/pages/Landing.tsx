import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  FileText,
  Zap,
  Download,
  Check,
  Star,
  Users,
  Globe,
  Shield,
  Sparkles,
  Github,
  Twitter,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: "Smart Conversion",
      description:
        "Advanced markdown parsing with support for tables, code blocks, and complex formatting",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Instant processing and real-time preview with optimized performance",
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description:
        "Export to HTML, PDF, and more with professional styling and layout",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "All processing happens locally in your browser - your files never leave your device",
    },
    {
      icon: Globe,
      title: "Universal Access",
      description:
        "Works on any device with a modern browser - no installation required",
    },
    {
      icon: Sparkles,
      title: "Beautiful Output",
      description:
        "Professional styling with customizable themes and typography",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Technical Writer",
      content:
        "This tool has revolutionized my documentation workflow. The PDF exports look incredibly professional!",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Software Engineer",
      content:
        "Finally, a markdown converter that handles complex documents perfectly. Love the real-time preview!",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Content Creator",
      content:
        "The interface is beautiful and intuitive. Converting my blog posts to PDFs has never been easier.",
      rating: 5,
    },
  ];

  const stats = [
    { number: "50K+", label: "Documents Converted" },
    { number: "99.9%", label: "Uptime" },
    { number: "< 1s", label: "Average Processing Time" },
    { number: "100%", label: "Privacy Protected" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                MarkdownPro
              </h1>
              <p className="text-xs text-muted-foreground">
                Professional Converter
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/features")}
            >
              Features
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/privacy")}
            >
              Privacy
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/about")}
            >
              About
            </Button>
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
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary border-primary/20 mb-8">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Markdown Conversion
            </Badge>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
              Transform Markdown into
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Beautiful Documents
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              Convert your markdown files into stunning HTML pages and
              professional PDF documents with just a few clicks. No registration
              required, completely free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                size="lg"
                onClick={() => navigate("/converter")}
                className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-2 hover:bg-muted/50"
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="inline-flex items-center px-4 py-2 bg-secondary/10 text-secondary border-secondary/20 mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Everything you need for
              <span className="block text-primary">perfect documents</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From simple notes to complex technical documentation, our platform
              handles it all with precision and style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary border-primary/20 mb-6">
              <Users className="h-4 w-4 mr-2" />
              Loved by Creators
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              What our users say
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to transform your
            <span className="block text-primary">markdown files?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Join thousands of users who trust MarkdownPro for their document
            conversion needs. Start converting in seconds, no sign-up required.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/converter")}
            className="h-16 px-12 text-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Converting Now
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                  <FileText className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  MarkdownPro
                </span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Professional markdown conversion tool that respects your privacy
                and delivers beautiful results.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="outline">
                  <Github className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => navigate("/features")}
                  >
                    Features
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    Documentation
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    API
                  </Button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => navigate("/contact")}
                  >
                    Help Center
                  </Button>
                </li>
                <li>
                  <a
                    href="https://rafay99.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => navigate("/privacy")}
                  >
                    Privacy Policy
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => navigate("/terms")}
                  >
                    Terms of Service
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2024 MarkdownPro. All rights reserved. Made with ❤️ by{" "}
              <a
                href="https://rafay99.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                rafay99.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

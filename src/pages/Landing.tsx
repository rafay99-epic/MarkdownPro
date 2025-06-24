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
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Footer } from "@/components/Footer";

const Landing = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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

  const NavLinks = () => (
    <>
      <Button
        variant="ghost"
        size={isMobile ? "default" : "sm"}
        onClick={() => {
          navigate("/features");
          setIsMenuOpen(false);
        }}
        className={isMobile ? "w-full justify-start" : ""}
      >
        Features
      </Button>
      <Button
        variant="ghost"
        size={isMobile ? "default" : "sm"}
        onClick={() => {
          navigate("/editor");
          setIsMenuOpen(false);
        }}
        className={isMobile ? "w-full justify-start" : ""}
      >
        Editor
      </Button>
      <Button
        variant="ghost"
        size={isMobile ? "default" : "sm"}
        onClick={() => {
          navigate("/privacy");
          setIsMenuOpen(false);
        }}
        className={isMobile ? "w-full justify-start" : ""}
      >
        Privacy
      </Button>
      <Button
        variant="ghost"
        size={isMobile ? "default" : "sm"}
        onClick={() => {
          navigate("/about");
          setIsMenuOpen(false);
        }}
        className={isMobile ? "w-full justify-start" : ""}
      >
        About
      </Button>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
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
              <p className="text-xs text-muted-foreground">
                Professional Converter
              </p>
            </div>
          </div>

          {isMobile ? (
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    <NavLinks />
                    <Button
                      onClick={() => {
                        navigate("/converter");
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-primary to-primary/80"
                    >
                      Try Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <NavLinks />
              <ThemeToggle />
              <Button
                onClick={() => navigate("/converter")}
                className="bg-gradient-to-r from-primary to-primary/80"
              >
                Try Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary border-primary/20 mb-6 lg:mb-8">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Markdown Conversion
            </Badge>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 lg:mb-8 leading-tight">
              Transform Markdown into
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Beautiful Documents
              </span>
            </h1>

            <p className="text-lg lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 lg:mb-12 leading-relaxed px-4">
              Convert your markdown files into stunning HTML pages and
              professional PDF documents with just a few clicks. No registration
              required, completely free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 lg:mb-16 px-4">
              <Button
                size={isMobile ? "default" : "lg"}
                onClick={() => navigate("/converter")}
                className={`${
                  isMobile ? "w-full" : "h-14 px-8"
                } text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size={isMobile ? "default" : "lg"}
                variant="outline"
                className={`${
                  isMobile ? "w-full" : "h-14 px-8"
                } text-lg border-2 hover:bg-muted/50`}
                onClick={() =>
                  window.open(
                    "https://github.com/rafay99-epic/MarkdownPro",
                    "_blank"
                  )
                }
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 max-w-4xl mx-auto px-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-card/50 rounded-lg backdrop-blur-sm"
                >
                  <div className="text-2xl lg:text-4xl font-bold text-primary mb-2">
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
      <section className="py-12 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <Badge className="inline-flex items-center px-4 py-2 bg-secondary/10 text-secondary border-secondary/20 mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-2xl lg:text-5xl font-bold text-foreground mb-6">
              Everything you need for
              <span className="block text-primary">perfect documents</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              From simple notes to complex technical documentation, our platform
              handles it all with precision and style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-6 lg:p-8">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 lg:h-7 lg:w-7 text-primary" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary border-primary/20 mb-6">
              <Users className="h-4 w-4 mr-2" />
              Loved by Creators
            </Badge>
            <h2 className="text-2xl lg:text-5xl font-bold text-foreground mb-6">
              What our users say
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-6 lg:p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-sm lg:text-base text-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-xs lg:text-sm text-muted-foreground">
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
      <section className="py-12 lg:py-32 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to transform your
            <span className="block text-primary">markdown files?</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 lg:mb-12 leading-relaxed">
            Join thousands of users who trust MarkdownPro for their document
            conversion needs. Start converting in seconds, no sign-up required.
          </p>
          <Button
            size={isMobile ? "default" : "lg"}
            onClick={() => navigate("/converter")}
            className={`${
              isMobile ? "w-full" : "h-16 px-12"
            } text-lg lg:text-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            Start Converting Now
            <ArrowRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileText,
  Code2,
  Heart,
  Globe,
  Github,
  Twitter,
  Mail,
  ArrowRight,
  Zap,
  Users,
  Award,
  Coffee,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const About = () => {
  const navigate = useNavigate();

  const skills = [
    { name: "React & TypeScript", level: "Expert" },
    { name: "Node.js & Python", level: "Advanced" },
    { name: "UI/UX Design", level: "Advanced" },
    { name: "Technical Writing", level: "Expert" },
    { name: "DevOps & Cloud", level: "Intermediate" },
    { name: "Open Source", level: "Passionate" },
  ];

  const projects = [
    {
      name: "MarkdownPro",
      description: "Privacy-first markdown conversion tool with beautiful UI",
      tech: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
      name: "Developer Tools",
      description:
        "Various productivity tools for developers and content creators",
      tech: ["Next.js", "Node.js", "PostgreSQL"],
    },
    {
      name: "Open Source Contributions",
      description:
        "Contributing to the developer community through open source",
      tech: ["JavaScript", "Python", "Documentation"],
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Privacy First",
      description:
        "Building tools that respect user privacy and data ownership",
    },
    {
      icon: Zap,
      title: "Performance Focused",
      description: "Creating fast, efficient applications that users love",
    },
    {
      icon: Users,
      title: "User Centric",
      description: "Designing with real user needs and feedback in mind",
    },
    {
      icon: Award,
      title: "Quality Driven",
      description: "Delivering polished, well-tested, and reliable software",
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
                <p className="text-xs text-muted-foreground">About</p>
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary border-primary/20 mb-6">
            <Coffee className="h-4 w-4 mr-2" />
            Meet the Creator
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
            Hi, I'm Rafay!
            <span className="block bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent text-3xl sm:text-4xl mt-2">
              Developer & Creator
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            I'm a passionate full-stack developer who loves creating tools that
            make developers' and content creators' lives easier. MarkdownPro is
            one of my projects focused on privacy-first, beautiful, and
            functional software.
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://rafay99.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-5 w-5 mr-2" />
                Website
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/rafay99-epic"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/contact")}
            >
              <Mail className="h-5 w-5 mr-2" />
              Contact Me
            </Button>
          </div>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                <Code2 className="h-6 w-6 mr-3 text-primary" />
                My Journey
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I started my journey in software development with a passion
                  for creating tools that solve real problems. Over the years,
                  I've worked on various projects ranging from web applications
                  to developer tools.
                </p>
                <p>
                  What drives me is the intersection of great design and
                  powerful functionality. I believe that software should not
                  only work well but also feel great to use. Privacy and user
                  control are core principles in everything I build.
                </p>
                <p>
                  When I'm not coding, you can find me writing technical
                  articles, contributing to open source projects, or exploring
                  new technologies that can make development more enjoyable.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Skills & Expertise
              </h2>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium text-foreground">
                      {skill.name}
                    </span>
                    <Badge variant="secondary">{skill.level}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What I Believe In
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide my work and the software I create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground">
              Some of the projects I've worked on recently
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Let's Build Something Together
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always interested in collaborating on interesting projects or
            helping solve challenging problems. Feel free to reach out if you'd
            like to connect!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/contact")}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              Get In Touch
              <Mail className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://rafay99.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit My Website
                <Globe className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

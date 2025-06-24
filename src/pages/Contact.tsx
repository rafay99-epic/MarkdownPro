import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  FileText,
  Mail,
  MessageSquare,
  Globe,
  Github,
  Twitter,
  ArrowRight,
  Send,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  reason: string;
}

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      // In a real application, you would send this to your backend
      // For now, we'll simulate the form submission
      console.log("Contact form submitted:", data);

      // Create mailto link
      const subject = encodeURIComponent(data.subject);
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nReason: ${data.reason}\n\nMessage:\n${data.message}`
      );
      const mailtoLink = `mailto:99marafay@gmail.com?subject=${subject}&body=${body}`;

      // Open default email client
      window.location.href = mailtoLink;

      toast({
        title: "Message Prepared!",
        description:
          "Your default email client should open with the message prepared. If it doesn't, please copy the details and email contact@rafay99.com",
      });

      reset();
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an issue preparing your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Best for detailed inquiries and support requests",
      value: "99marafay@gmail.com",
      action: "mailto:99marafay@gmail.com",
    },
    {
      icon: Globe,
      title: "Website",
      description: "Visit my personal website for more projects",
      value: "rafay99.com",
      action: "https://rafay99.com",
    },
    {
      icon: Github,
      title: "GitHub",
      description: "Check out my open source projects",
      value: "GitHub Profile",
      action: "https://github.com/rafay99-epic",
    },
  ];

  const responseInfo = [
    {
      icon: Clock,
      title: "Response Time",
      description: "I typically respond within 24-48 hours",
    },
    {
      icon: CheckCircle2,
      title: "Support Included",
      description: "Free support for all MarkdownPro users",
    },
    {
      icon: MessageSquare,
      title: "Collaboration Welcome",
      description: "Open to discussing new projects and ideas",
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
                <p className="text-xs text-muted-foreground">Contact</p>
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
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary border-primary/20 mb-6">
            <Mail className="h-4 w-4 mr-2" />
            Get In Touch
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
            Let's Connect
            <span className="block bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent text-3xl sm:text-4xl mt-2">
              I'd Love to Hear From You
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether you need help with MarkdownPro, want to collaborate on a
            project, or just want to say hello, I'm always happy to connect with
            fellow developers and creators.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-foreground">
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        {...register("name", { required: "Name is required" })}
                        className="mt-1"
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className="mt-1"
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reason">What's this about?</Label>
                    <select
                      id="reason"
                      {...register("reason", {
                        required: "Please select a reason",
                      })}
                      className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    >
                      <option value="">Select a reason</option>
                      <option value="support">MarkdownPro Support</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="business">Business Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.reason && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.reason.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your message"
                      {...register("subject", {
                        required: "Subject is required",
                      })}
                      className="mt-1"
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      rows={6}
                      {...register("message", {
                        required: "Message is required",
                      })}
                      className="mt-1"
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">
                  Contact Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="group">
                    <a
                      href={method.action}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
                        <method.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {method.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                        <p className="text-sm text-primary">{method.value}</p>
                      </div>
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Response Info */}
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">
                  What to Expect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {responseInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg flex items-center justify-center mt-0.5">
                      <info.icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {info.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

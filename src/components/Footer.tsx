import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Github, Twitter, Mail } from "lucide-react";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const navigate = useNavigate();

  return (
    <footer className={`border-t bg-muted/30 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                MarkdownPro
              </span>
            </div>
            <p className="text-sm lg:text-base text-muted-foreground mb-6 max-w-md">
              Professional markdown conversion tool that respects your privacy
              and delivers beautiful results.
            </p>
            <div className="flex space-x-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  window.open(
                    "https://github.com/rafay99-epic/MarkdownPro",
                    "_blank"
                  )
                }
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  window.open("https://twitter.com/rafay99", "_blank")
                }
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open("mailto:99marafay@gmail.com")}
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <ul className="space-y-2">
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm lg:text-base"
                  onClick={() => navigate("/features")}
                >
                  Features
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm lg:text-base"
                  onClick={() => navigate("/docs")}
                >
                  Documentation
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm lg:text-base"
                  onClick={() => navigate("/api")}
                >
                  API
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm lg:text-base"
                  onClick={() => navigate("/settings")}
                >
                  Settings
                </Button>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2">
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm lg:text-base"
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
                  className="text-sm lg:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm lg:text-base"
                  onClick={() => navigate("/privacy")}
                >
                  Privacy Policy
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm lg:text-base"
                  onClick={() => navigate("/terms")}
                >
                  Terms of Service
                </Button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 lg:mt-12 pt-8 text-center text-xs lg:text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} MarkdownPro. All rights reserved.
            Made with ❤️ by{" "}
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
  );
}

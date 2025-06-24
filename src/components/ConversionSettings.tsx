import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Palette,
  Type,
  FileText,
  Settings2,
  Monitor,
  Moon,
  Sun,
  BookOpen,
  ExternalLink,
  Hash,
  Calendar,
} from "lucide-react";

export interface ConversionOptions {
  theme:
    | "github"
    | "vscode-dark"
    | "medium"
    | "academic"
    | "minimal"
    | "tokyo-night";
  fontSize: "small" | "medium" | "large";
  fontFamily: "system" | "serif" | "mono";
  lineHeight: "compact" | "normal" | "relaxed";
  includeToc: boolean;
  syntaxHighlighting: boolean;
  pdfPageSize: "a4" | "letter" | "legal";
  pdfMargins: "narrow" | "normal" | "wide";
  externalLinksNewTab: boolean;
  includePageNumbers: boolean;
  includeTimestamp: boolean;
  darkMode: boolean;
}

interface ConversionSettingsProps {
  options: ConversionOptions;
  onOptionsChange: (options: ConversionOptions) => void;
}

const ConversionSettings: React.FC<ConversionSettingsProps> = ({
  options,
  onOptionsChange,
}) => {
  const updateOption = <K extends keyof ConversionOptions>(
    key: K,
    value: ConversionOptions[K]
  ) => {
    onOptionsChange({ ...options, [key]: value });
  };

  const themes = [
    { value: "github", label: "GitHub", description: "Clean and professional" },
    {
      value: "vscode-dark",
      label: "VS Code Dark",
      description: "Dark theme for developers",
    },
    {
      value: "medium",
      label: "Medium Style",
      description: "Blog-like appearance",
    },
    {
      value: "academic",
      label: "Academic",
      description: "Formal document style",
    },
    { value: "minimal", label: "Minimal", description: "Ultra-clean design" },
    {
      value: "tokyo-night",
      label: "Tokyo Night",
      description: "Modern dark theme with vibrant colors",
    },
  ];

  const fontSizes = [
    { value: "small", label: "Small (14px)", description: "Compact reading" },
    { value: "medium", label: "Medium (16px)", description: "Standard size" },
    {
      value: "large",
      label: "Large (18px)",
      description: "Comfortable reading",
    },
  ];

  const fontFamilies = [
    { value: "system", label: "System Font", description: "Platform default" },
    { value: "serif", label: "Serif", description: "Traditional reading" },
    { value: "mono", label: "Monospace", description: "Code-like appearance" },
  ];

  const lineHeights = [
    { value: "compact", label: "Compact (1.4)", description: "Dense text" },
    { value: "normal", label: "Normal (1.6)", description: "Balanced spacing" },
    { value: "relaxed", label: "Relaxed (1.8)", description: "Loose spacing" },
  ];

  const pdfSizes = [
    { value: "a4", label: "A4", description: "210 × 297 mm" },
    { value: "letter", label: "US Letter", description: "8.5 × 11 in" },
    { value: "legal", label: "US Legal", description: "8.5 × 14 in" },
  ];

  const pdfMargins = [
    { value: "narrow", label: "Narrow", description: "0.5 inch margins" },
    { value: "normal", label: "Normal", description: "1 inch margins" },
    { value: "wide", label: "Wide", description: "1.5 inch margins" },
  ];

  return (
    <Card className="mt-8 shadow-xl border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Settings2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Conversion Settings</CardTitle>
            <p className="text-sm text-muted-foreground">
              Customize how your markdown will be converted and styled
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Style & Theme Settings */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Style & Appearance
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Theme</Label>
              <Select
                value={options.theme}
                onValueChange={(value) =>
                  updateOption("theme", value as ConversionOptions["theme"])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.value} value={theme.value}>
                      <div className="flex flex-col">
                        <span>{theme.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {theme.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                {options.darkMode ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
                <div>
                  <Label className="text-sm font-medium">Dark Mode</Label>
                  <p className="text-xs text-muted-foreground">
                    Apply dark theme to output
                  </p>
                </div>
              </div>
              <Switch
                checked={options.darkMode}
                onCheckedChange={(checked) => updateOption("darkMode", checked)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Font Size</Label>
              <Select
                value={options.fontSize}
                onValueChange={(value) =>
                  updateOption(
                    "fontSize",
                    value as ConversionOptions["fontSize"]
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      <div className="flex flex-col">
                        <span>{size.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {size.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Font Family</Label>
              <Select
                value={options.fontFamily}
                onValueChange={(value) =>
                  updateOption(
                    "fontFamily",
                    value as ConversionOptions["fontFamily"]
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontFamilies.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <div className="flex flex-col">
                        <span>{font.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {font.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Line Height</Label>
              <Select
                value={options.lineHeight}
                onValueChange={(value) =>
                  updateOption(
                    "lineHeight",
                    value as ConversionOptions["lineHeight"]
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lineHeights.map((height) => (
                    <SelectItem key={height.value} value={height.value}>
                      <div className="flex flex-col">
                        <span>{height.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {height.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Content Options */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Content Options
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-4 w-4" />
                <div>
                  <Label className="text-sm font-medium">
                    Table of Contents
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Generate TOC from headings
                  </p>
                </div>
              </div>
              <Switch
                checked={options.includeToc}
                onCheckedChange={(checked) =>
                  updateOption("includeToc", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Monitor className="h-4 w-4" />
                <div>
                  <Label className="text-sm font-medium">
                    Syntax Highlighting
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Highlight code blocks
                  </p>
                </div>
              </div>
              <Switch
                checked={options.syntaxHighlighting}
                onCheckedChange={(checked) =>
                  updateOption("syntaxHighlighting", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <ExternalLink className="h-4 w-4" />
                <div>
                  <Label className="text-sm font-medium">External Links</Label>
                  <p className="text-xs text-muted-foreground">
                    Open in new tab
                  </p>
                </div>
              </div>
              <Switch
                checked={options.externalLinksNewTab}
                onCheckedChange={(checked) =>
                  updateOption("externalLinksNewTab", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4" />
                <div>
                  <Label className="text-sm font-medium">
                    Include Timestamp
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Add generation date
                  </p>
                </div>
              </div>
              <Switch
                checked={options.includeTimestamp}
                onCheckedChange={(checked) =>
                  updateOption("includeTimestamp", checked)
                }
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* PDF Export Settings */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              PDF Export Settings
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Page Size</Label>
              <Select
                value={options.pdfPageSize}
                onValueChange={(value) =>
                  updateOption(
                    "pdfPageSize",
                    value as ConversionOptions["pdfPageSize"]
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pdfSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      <div className="flex flex-col">
                        <span>{size.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {size.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Margins</Label>
              <Select
                value={options.pdfMargins}
                onValueChange={(value) =>
                  updateOption(
                    "pdfMargins",
                    value as ConversionOptions["pdfMargins"]
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pdfMargins.map((margin) => (
                    <SelectItem key={margin.value} value={margin.value}>
                      <div className="flex flex-col">
                        <span>{margin.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {margin.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Hash className="h-4 w-4" />
              <div>
                <Label className="text-sm font-medium">Page Numbers</Label>
                <p className="text-xs text-muted-foreground">
                  Add page numbers to PDF
                </p>
              </div>
            </div>
            <Switch
              checked={options.includePageNumbers}
              onCheckedChange={(checked) =>
                updateOption("includePageNumbers", checked)
              }
            />
          </div>
        </div>

        {/* Current Settings Summary */}
        <div className="p-4 bg-muted/20 rounded-lg">
          <h4 className="text-sm font-medium mb-3">Current Settings</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">
              {themes.find((t) => t.value === options.theme)?.label}
            </Badge>
            <Badge variant="secondary">
              {fontSizes.find((s) => s.value === options.fontSize)?.label}
            </Badge>
            <Badge variant="secondary">
              {fontFamilies.find((f) => f.value === options.fontFamily)?.label}
            </Badge>
            {options.includeToc && (
              <Badge variant="outline">Table of Contents</Badge>
            )}
            {options.syntaxHighlighting && (
              <Badge variant="outline">Syntax Highlighting</Badge>
            )}
            {options.darkMode && <Badge variant="outline">Dark Mode</Badge>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionSettings;

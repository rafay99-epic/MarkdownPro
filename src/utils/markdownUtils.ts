import { marked } from "marked";
import { ConversionOptions } from "@/components/ConversionSettings";

// Enhanced CSS themes for different styles
const getThemeStyles = (options: ConversionOptions): string => {
  const baseFont = getFontFamily(options.fontFamily);
  const fontSize = getFontSize(options.fontSize);
  const lineHeight = getLineHeight(options.lineHeight);

  const baseStyles = `
    body {
      font-family: ${baseFont};
      font-size: ${fontSize};
      line-height: ${lineHeight};
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    * {
      box-sizing: border-box;
    }
    
    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1.5rem 0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      overflow: hidden;
    }
    
    th, td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid;
    }
    
    th {
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.875rem;
      letter-spacing: 0.025em;
    }
    
    tr:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
    
    ${
      options.darkMode
        ? "tr:hover { background-color: rgba(255, 255, 255, 0.05); }"
        : ""
    }
    
    ul, ol {
      padding-left: 1.5rem;
      margin: 1rem 0;
    }
    
    li {
      margin: 0.25rem 0;
    }
    
    hr {
      border: none;
      height: 1px;
      margin: 2rem 0;
      background: linear-gradient(to right, transparent, currentColor, transparent);
      opacity: 0.3;
    }
    
    /* Mermaid Diagram Styles */
    .mermaid-container {
      margin: 2rem 0;
      padding: 1rem;
      background: ${
        options.darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)"
      };
      border-radius: 8px;
      border: 1px solid ${
        options.darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
      };
      text-align: center;
      overflow-x: auto;
    }
    
    .mermaid {
      max-width: 100%;
      height: auto;
    }

    /* Override mermaid theme for dark mode */
    ${
      options.darkMode
        ? `
    .mermaid .node rect,
    .mermaid .node circle,
    .mermaid .node ellipse,
    .mermaid .node polygon {
      fill: #2d3748 !important;
      stroke: #4a5568 !important;
    }
    
    .mermaid .node .label {
      color: #e2e8f0 !important;
      fill: #e2e8f0 !important;
    }
    
    .mermaid .edgePath .path {
      stroke: #4a5568 !important;
    }
    
    .mermaid .arrowheadPath {
      fill: #4a5568 !important;
    }
    `
        : ""
    }
    
    @media print {
      body {
        padding: 0;
        max-width: none;
      }
      
      h1, h2, h3, h4, h5, h6 {
        page-break-after: avoid;
      }
      
      p, blockquote, pre, code {
        page-break-inside: avoid;
      }

      .mermaid-container {
        page-break-inside: avoid;
      }
    }
  `;

  switch (options.theme) {
    case "github":
      return baseStyles + getGitHubTheme(options.darkMode);
    case "vscode-dark":
      return baseStyles + getVSCodeDarkTheme();
    case "medium":
      return baseStyles + getMediumTheme(options.darkMode);
    case "academic":
      return baseStyles + getAcademicTheme(options.darkMode);
    case "minimal":
      return baseStyles + getMinimalTheme(options.darkMode);
    default:
      return baseStyles + getGitHubTheme(options.darkMode);
  }
};

const getFontFamily = (fontFamily: ConversionOptions["fontFamily"]): string => {
  switch (fontFamily) {
    case "system":
      return '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif';
    case "serif":
      return 'Georgia, "Times New Roman", Times, serif';
    case "mono":
      return '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace';
    default:
      return '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif';
  }
};

const getFontSize = (fontSize: ConversionOptions["fontSize"]): string => {
  switch (fontSize) {
    case "small":
      return "14px";
    case "medium":
      return "16px";
    case "large":
      return "18px";
    default:
      return "16px";
  }
};

const getLineHeight = (lineHeight: ConversionOptions["lineHeight"]): string => {
  switch (lineHeight) {
    case "compact":
      return "1.4";
    case "normal":
      return "1.6";
    case "relaxed":
      return "1.8";
    default:
      return "1.6";
  }
};

const getGitHubTheme = (darkMode: boolean): string => {
  if (darkMode) {
    return `
      body { 
        background-color: #0d1117; 
        color: #e6edf3; 
      }
      h1, h2, h3, h4, h5, h6 { 
        color: #f0f6fc; 
        border-bottom: 1px solid #21262d;
        padding-bottom: 0.5rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
      }
      h1 { font-size: 2rem; }
      h2 { font-size: 1.5rem; }
      h3 { font-size: 1.25rem; }
      code { 
        background-color: #161b22; 
        color: #f85149; 
        padding: 0.2rem 0.4rem; 
        border-radius: 6px; 
        font-size: 0.875em;
      }
      pre { 
        background-color: #161b22; 
        border: 1px solid #30363d;
        padding: 1rem; 
        border-radius: 6px; 
        overflow-x: auto;
        margin: 1rem 0;
      }
      pre code {
        background: none;
        color: #e6edf3;
        padding: 0;
      }
      blockquote { 
        border-left: 4px solid #1f6feb; 
        padding-left: 1rem; 
        margin: 1rem 0;
        font-style: italic; 
        color: #8b949e;
        background-color: rgba(31, 111, 235, 0.05);
        padding: 1rem;
        border-radius: 0 6px 6px 0;
      }
      a { 
        color: #58a6ff; 
        text-decoration: none;
      }
      a:hover { 
        text-decoration: underline; 
      }
      th, td { 
        border-bottom-color: #21262d; 
      }
      th { 
        background-color: #161b22; 
        color: #f0f6fc;
      }
    `;
  } else {
    return `
      body { 
        background-color: #ffffff; 
        color: #24292f; 
      }
      h1, h2, h3, h4, h5, h6 { 
        color: #1f2328; 
        border-bottom: 1px solid #eaecef;
        padding-bottom: 0.5rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
      }
      h1 { font-size: 2rem; }
      h2 { font-size: 1.5rem; }
      h3 { font-size: 1.25rem; }
      code { 
        background-color: #f6f8fa; 
        color: #d73a49; 
        padding: 0.2rem 0.4rem; 
        border-radius: 6px; 
        font-size: 0.875em;
      }
      pre { 
        background-color: #f6f8fa; 
        border: 1px solid #d0d7de;
        padding: 1rem; 
        border-radius: 6px; 
        overflow-x: auto;
        margin: 1rem 0;
      }
      pre code {
        background: none;
        color: #24292f;
        padding: 0;
      }
      blockquote { 
        border-left: 4px solid #0969da; 
        padding-left: 1rem; 
        margin: 1rem 0;
        font-style: italic; 
        color: #656d76;
        background-color: rgba(9, 105, 218, 0.05);
        padding: 1rem;
        border-radius: 0 6px 6px 0;
      }
      a { 
        color: #0969da; 
        text-decoration: none;
      }
      a:hover { 
        text-decoration: underline; 
      }
      th, td { 
        border-bottom-color: #eaecef; 
      }
      th { 
        background-color: #f6f8fa; 
        color: #1f2328;
      }
    `;
  }
};

const getVSCodeDarkTheme = (): string => {
  return `
    body { 
      background-color: #1e1e1e; 
      color: #d4d4d4; 
    }
    h1, h2, h3, h4, h5, h6 { 
      color: #569cd6; 
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    h1 { font-size: 2rem; }
    h2 { font-size: 1.5rem; }
    h3 { font-size: 1.25rem; }
    code { 
      background-color: #2d2d30; 
      color: #ce9178; 
      padding: 0.2rem 0.4rem; 
      border-radius: 4px; 
    }
    pre { 
      background-color: #2d2d30; 
      border: 1px solid #3e3e42;
      padding: 1rem; 
      border-radius: 4px; 
      overflow-x: auto;
    }
    pre code {
      background: none;
      color: #d4d4d4;
      padding: 0;
    }
    blockquote { 
      border-left: 4px solid #569cd6; 
      padding-left: 1rem; 
      font-style: italic; 
      color: #9cdcfe;
      background-color: rgba(86, 156, 214, 0.1);
      padding: 1rem;
      border-radius: 0 4px 4px 0;
    }
    a { 
      color: #4fc1ff; 
      text-decoration: none;
    }
    a:hover { 
      text-decoration: underline; 
    }
    th, td { 
      border-bottom-color: #3e3e42; 
    }
    th { 
      background-color: #2d2d30; 
      color: #569cd6;
    }
  `;
};

const getMediumTheme = (darkMode: boolean): string => {
  if (darkMode) {
    return `
      body { 
        background-color: #191919; 
        color: #f7f4ed; 
        font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
      }
      h1, h2, h3, h4, h5, h6 { 
        color: #ffffff; 
        font-weight: 700;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
      }
      h1 { font-size: 2.5rem; line-height: 1.2; }
      h2 { font-size: 2rem; }
      h3 { font-size: 1.5rem; }
      p { margin-bottom: 1.5rem; }
      code { 
        background-color: #2a2a2a; 
        color: #ff6b6b; 
        padding: 0.2rem 0.4rem; 
        border-radius: 3px; 
      }
      pre { 
        background-color: #2a2a2a; 
        padding: 1.5rem; 
        border-radius: 8px; 
        overflow-x: auto;
        margin: 2rem 0;
      }
      blockquote { 
        border-left: 3px solid #4ecdc4; 
        padding-left: 1.5rem; 
        font-style: italic; 
        font-size: 1.1em;
        color: #a8a8a8;
        margin: 2rem 0;
      }
      a { 
        color: #4ecdc4; 
        text-decoration: none;
      }
      a:hover { 
        text-decoration: underline; 
      }
    `;
  } else {
    return `
      body { 
        background-color: #ffffff; 
        color: #292929; 
        font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
      }
      h1, h2, h3, h4, h5, h6 { 
        color: #292929; 
        font-weight: 700;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
      }
      h1 { font-size: 2.5rem; line-height: 1.2; }
      h2 { font-size: 2rem; }
      h3 { font-size: 1.5rem; }
      p { margin-bottom: 1.5rem; }
      code { 
        background-color: #f3f3f3; 
        color: #d63384; 
        padding: 0.2rem 0.4rem; 
        border-radius: 3px; 
      }
      pre { 
        background-color: #f8f9fa; 
        padding: 1.5rem; 
        border-radius: 8px; 
        overflow-x: auto;
        margin: 2rem 0;
        border: 1px solid #e9ecef;
      }
      blockquote { 
        border-left: 3px solid #198754; 
        padding-left: 1.5rem; 
        font-style: italic; 
        font-size: 1.1em;
        color: #6c757d;
        margin: 2rem 0;
      }
      a { 
        color: #198754; 
        text-decoration: none;
      }
      a:hover { 
        text-decoration: underline; 
      }
    `;
  }
};

const getAcademicTheme = (darkMode: boolean): string => {
  if (darkMode) {
    return `
      body { 
        background-color: #1a1a1a; 
        color: #e0e0e0; 
        font-family: "Times New Roman", Times, serif;
      }
      h1, h2, h3, h4, h5, h6 { 
        color: #ffffff; 
        text-align: center;
        margin-top: 2rem;
        margin-bottom: 1.5rem;
      }
      h1 { font-size: 2rem; text-transform: uppercase; letter-spacing: 1px; }
      h2 { font-size: 1.5rem; }
      h3 { font-size: 1.25rem; }
      p { 
        text-align: justify; 
        margin-bottom: 1rem;
        text-indent: 1.5rem;
      }
      code { 
        background-color: #2d2d2d; 
        color: #ff7b7b; 
        padding: 0.2rem 0.4rem; 
        border-radius: 2px; 
        font-family: "Courier New", monospace;
      }
      pre { 
        background-color: #2d2d2d; 
        padding: 1rem; 
        border: 1px solid #444;
        margin: 1.5rem 0;
      }
      blockquote { 
        border-left: 2px solid #666; 
        padding-left: 1rem; 
        font-style: italic; 
        margin: 1.5rem 0;
        color: #ccc;
      }
      a { 
        color: #87ceeb; 
        text-decoration: underline;
      }
      th, td { 
        border: 1px solid #444; 
        padding: 0.5rem;
      }
      th { 
        background-color: #2d2d2d; 
        text-align: center;
      }
    `;
  } else {
    return `
      body { 
        background-color: #ffffff; 
        color: #2c3e50; 
        font-family: "Times New Roman", Times, serif;
      }
      h1, h2, h3, h4, h5, h6 { 
        color: #2c3e50; 
        text-align: center;
        margin-top: 2rem;
        margin-bottom: 1.5rem;
      }
      h1 { font-size: 2rem; text-transform: uppercase; letter-spacing: 1px; }
      h2 { font-size: 1.5rem; }
      h3 { font-size: 1.25rem; }
      p { 
        text-align: justify; 
        margin-bottom: 1rem;
        text-indent: 1.5rem;
      }
      code { 
        background-color: #ecf0f1; 
        color: #e74c3c; 
        padding: 0.2rem 0.4rem; 
        border-radius: 2px; 
        font-family: "Courier New", monospace;
      }
      pre { 
        background-color: #ecf0f1; 
        padding: 1rem; 
        border: 1px solid #bdc3c7;
        margin: 1.5rem 0;
      }
      blockquote { 
        border-left: 2px solid #34495e; 
        padding-left: 1rem; 
        font-style: italic; 
        margin: 1.5rem 0;
        color: #7f8c8d;
      }
      a { 
        color: #3498db; 
        text-decoration: underline;
      }
      th, td { 
        border: 1px solid #bdc3c7; 
        padding: 0.5rem;
      }
      th { 
        background-color: #ecf0f1; 
        text-align: center;
      }
    `;
  }
};

const getMinimalTheme = (darkMode: boolean): string => {
  if (darkMode) {
    return `
      body { 
        background-color: #000000; 
        color: #ffffff; 
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      h1, h2, h3, h4, h5, h6 { 
        color: #ffffff; 
        font-weight: 300;
        margin-top: 3rem;
        margin-bottom: 1rem;
      }
      h1 { font-size: 2.5rem; }
      h2 { font-size: 1.8rem; }
      h3 { font-size: 1.3rem; }
      p { margin-bottom: 1.5rem; }
      code { 
        background-color: #222; 
        color: #fff; 
        padding: 0.2rem 0.4rem; 
        font-family: "SF Mono", monospace;
      }
      pre { 
        background-color: #111; 
        padding: 1.5rem; 
        margin: 2rem 0;
        border: 1px solid #333;
      }
      blockquote { 
        border-left: 2px solid #666; 
        padding-left: 1rem; 
        margin: 2rem 0;
        color: #ccc;
      }
      a { 
        color: #ffffff; 
        text-decoration: underline;
      }
      th, td { 
        border: 1px solid #333; 
        padding: 1rem;
      }
      th { 
        background-color: #111; 
      }
    `;
  } else {
    return `
      body { 
        background-color: #ffffff; 
        color: #000000; 
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      h1, h2, h3, h4, h5, h6 { 
        color: #000000; 
        font-weight: 300;
        margin-top: 3rem;
        margin-bottom: 1rem;
      }
      h1 { font-size: 2.5rem; }
      h2 { font-size: 1.8rem; }
      h3 { font-size: 1.3rem; }
      p { margin-bottom: 1.5rem; }
      code { 
        background-color: #f5f5f5; 
        color: #000; 
        padding: 0.2rem 0.4rem; 
        font-family: "SF Mono", monospace;
      }
      pre { 
        background-color: #fafafa; 
        padding: 1.5rem; 
        margin: 2rem 0;
        border: 1px solid #eee;
      }
      blockquote { 
        border-left: 2px solid #ccc; 
        padding-left: 1rem; 
        margin: 2rem 0;
        color: #666;
      }
      a { 
        color: #000000; 
        text-decoration: underline;
      }
      th, td { 
        border: 1px solid #eee; 
        padding: 1rem;
      }
      th { 
        background-color: #fafafa; 
      }
    `;
  }
};

const generateTableOfContents = (html: string): string => {
  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
  const headings: Array<{ level: number; text: string; id: string }> = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, ""); // Strip HTML tags
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    headings.push({ level, text, id });
  }

  if (headings.length === 0) return "";

  let toc = '<div class="table-of-contents"><h2>Table of Contents</h2><ul>';
  let currentLevel = 1;

  headings.forEach((heading) => {
    if (heading.level > currentLevel) {
      toc += "<ul>".repeat(heading.level - currentLevel);
    } else if (heading.level < currentLevel) {
      toc += "</ul>".repeat(currentLevel - heading.level);
    }
    toc += `<li><a href="#${heading.id}">${heading.text}</a></li>`;
    currentLevel = heading.level;
  });

  toc += "</ul>".repeat(currentLevel) + "</div>";
  return toc;
};

const addHeadingIds = (html: string): string => {
  return html.replace(
    /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi,
    (match, level, text) => {
      const cleanText = text.replace(/<[^>]*>/g, "");
      const id = cleanText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  );
};

const addExternalLinkTargets = (html: string): string => {
  return html.replace(
    /<a\s+href="(https?:\/\/[^"]+)"([^>]*)>/gi,
    '$<a href="$1" target="_blank" rel="noopener noreferrer"$2>'
  );
};

// Enhanced function to process Mermaid diagrams
const processMermaidDiagrams = (
  html: string,
  options: ConversionOptions
): string => {
  // Multiple regex patterns to catch different ways marked might format the mermaid blocks
  const patterns = [
    // Standard pattern with language-mermaid class
    /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/gi,
    // Alternative pattern without language- prefix
    /<pre><code class="mermaid">([\s\S]*?)<\/code><\/pre>/gi,
    // Pattern with just mermaid in code element
    /<code class="language-mermaid">([\s\S]*?)<\/code>/gi,
    /<code class="mermaid">([\s\S]*?)<\/code>/gi,
    // Pattern with mermaid in pre element
    /<pre class="language-mermaid"><code>([\s\S]*?)<\/code><\/pre>/gi,
    /<pre class="mermaid"><code>([\s\S]*?)<\/code><\/pre>/gi,
  ];

  let processedHtml = html;
  let diagramCounter = 0;

  // Try each pattern
  patterns.forEach((pattern) => {
    processedHtml = processedHtml.replace(pattern, (match, content) => {
      diagramCounter++;
      const diagramId = `mermaid-diagram-${diagramCounter}`;

      // Clean up the content - remove HTML entities and trim
      const cleanContent = content
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();

      return `
        <div class="mermaid-container">
          <div class="mermaid" id="${diagramId}">${cleanContent}</div>
        </div>
      `;
    });
  });
  return processedHtml;
};

// Get Mermaid configuration based on theme
const getMermaidConfig = (options: ConversionOptions): string => {
  if (options.darkMode) {
    return `
      mermaid.initialize({
        theme: 'dark',
        themeVariables: {
          primaryColor: '#4f46e5',
          primaryTextColor: '#e2e8f0',
          primaryBorderColor: '#6366f1',
          lineColor: '#64748b',
          secondaryColor: '#1e293b',
          tertiaryColor: '#334155',
          background: '#0f172a',
          mainBkg: '#1e293b',
          secondBkg: '#334155',
          tertiaryBkg: '#475569'
        },
        flowchart: {
          htmlLabels: true,
          curve: 'basis'
        }
      });
    `;
  } else {
    return `
      mermaid.initialize({
        theme: 'default',
        themeVariables: {
          primaryColor: '#3b82f6',
          primaryTextColor: '#1f2937',
          primaryBorderColor: '#2563eb',
          lineColor: '#374151',
          secondaryColor: '#f3f4f6',
          tertiaryColor: '#e5e7eb'
        },
        flowchart: {
          htmlLabels: true,
          curve: 'basis'
        }
      });
    `;
  }
};

export const convertMarkdownToHtml = async (
  markdown: string,
  options?: ConversionOptions
): Promise<string> => {
  try {
    // Configure marked options
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    let html = await marked(markdown);

    if (options) {
      // Add heading IDs for TOC
      html = addHeadingIds(html);

      // Add external link targets if enabled
      if (options.externalLinksNewTab) {
        html = addExternalLinkTargets(html);
      }

      // Process Mermaid diagrams
      html = processMermaidDiagrams(html, options);
    }

    return html;
  } catch (error) {
    throw new Error("Failed to convert markdown to HTML");
  }
};

export const convertMarkdownToStyledHtml = async (
  markdown: string,
  options: ConversionOptions,
  fileName?: string
): Promise<string> => {
  const htmlContent = await convertMarkdownToHtml(markdown, options);
  const styles = getThemeStyles(options);
  const mermaidConfig = getMermaidConfig(options);

  let finalHtml = htmlContent;

  // Add table of contents if enabled
  if (options.includeToc) {
    const toc = generateTableOfContents(htmlContent);
    if (toc) {
      finalHtml = toc + finalHtml;
    }
  }

  // Add timestamp if enabled
  if (options.includeTimestamp) {
    const timestamp = new Date().toLocaleString();
    finalHtml += `<div class="generation-timestamp" style="margin-top: 3rem; padding-top: 1rem; border-top: 1px solid currentColor; opacity: 0.6; font-size: 0.875rem; text-align: center;">Generated on ${timestamp}</div>`;
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName || "Converted Document"}</title>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js"></script>
    <style>
        ${styles}
        
        .table-of-contents {
          background: rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          border-left: 4px solid;
        }
        
        .table-of-contents h2 {
          margin-top: 0;
          margin-bottom: 1rem;
        }
        
        .table-of-contents ul {
          list-style: none;
          padding-left: 1rem;
        }
        
        .table-of-contents li {
          margin: 0.5rem 0;
        }
        
        .table-of-contents a {
          text-decoration: none;
          padding: 0.25rem 0;
          display: block;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        
        .table-of-contents a:hover {
          text-decoration: underline;
          padding-left: 0.5rem;
        }
        
        ${
          options.darkMode
            ? `
        .table-of-contents {
          background: rgba(255, 255, 255, 0.05);
        }
        `
            : ""
        }
    </style>
</head>
<body>
    ${finalHtml}
    
    <script>
      ${mermaidConfig}
      
      // Wait for DOM to be ready, then render diagrams
      document.addEventListener('DOMContentLoaded', function() {
        const mermaidElements = document.querySelectorAll('.mermaid');
        
        if (mermaidElements.length === 0) {
          return;
        }
        
        // Add a small delay to ensure all elements are rendered
        setTimeout(() => {
          try {
            mermaid.run();
          } catch (error) {
            console.error('Mermaid rendering failed:', error);
            // Fallback: show the diagram as code if rendering fails
            document.querySelectorAll('.mermaid').forEach((el) => {
              if (el.textContent && !el.innerHTML.includes('<svg')) {
                el.innerHTML = '<div style="background: rgba(255,0,0,0.1); border: 1px solid red; padding: 1rem; border-radius: 4px; margin: 1rem 0;"><strong>Mermaid Rendering Failed</strong><br/><pre style="text-align: left; font-family: monospace; font-size: 0.875rem; background: rgba(0,0,0,0.1); padding: 1rem; border-radius: 4px; white-space: pre-wrap; margin-top: 0.5rem;">' + el.textContent + '</pre></div>';
              }
            });
          }
        }, 500);
      });
    </script>
</body>
</html>`;
};

export const validateMarkdownFile = (file: File): boolean => {
  return (
    file.type === "text/markdown" ||
    file.name.endsWith(".md") ||
    file.name.endsWith(".markdown")
  );
};

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      resolve(content);
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
};

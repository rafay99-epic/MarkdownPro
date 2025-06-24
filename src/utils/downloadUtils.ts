import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadAsHtml = (htmlContent: string, fileName: string): void => {
  const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName || "Converted Document"}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            color: #333;
        }
        h1, h2, h3, h4, h5, h6 {
            color: #2563eb;
            margin-top: 2rem;
            margin-bottom: 1rem;
        }
        code {
            background-color: #f1f5f9;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        }
        pre {
            background-color: #f1f5f9;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
        }
        blockquote {
            border-left: 4px solid #2563eb;
            padding-left: 1rem;
            margin-left: 0;
            font-style: italic;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
        }
        th, td {
            border: 1px solid #e2e8f0;
            padding: 0.5rem;
            text-align: left;
        }
        th {
            background-color: #f8fafc;
        }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName || "converted"}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadAsPdf = async (
  htmlContent: string,
  fileName: string
): Promise<void> => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;
  tempDiv.style.cssText = `
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    line-height: 1.6;
    max-width: 210mm;
    margin: 0;
    padding: 20mm;
    color: #333;
    background: white;
    position: absolute;
    left: -9999px;
    top: 0;
    box-sizing: border-box;
  `;

  // Style headings and other elements for better PDF appearance
  const headings = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");
  headings.forEach((heading) => {
    (heading as HTMLElement).style.cssText += `
      color: #1f2937;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      page-break-after: avoid;
    `;
  });

  const codeBlocks = tempDiv.querySelectorAll("code, pre");
  codeBlocks.forEach((code) => {
    (code as HTMLElement).style.cssText += `
      background-color: #f8f9fa;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
      font-size: 0.875rem;
    `;
  });

  const paragraphs = tempDiv.querySelectorAll("p");
  paragraphs.forEach((p) => {
    (p as HTMLElement).style.cssText += `
      margin-bottom: 1rem;
      orphans: 3;
      widows: 3;
    `;
  });

  document.body.appendChild(tempDiv);

  const canvas = await html2canvas(tempDiv, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    width: tempDiv.scrollWidth,
    height: tempDiv.scrollHeight,
    scrollX: 0,
    scrollY: 0,
  });

  document.body.removeChild(tempDiv);

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  // Calculate scale to fit width and maintain aspect ratio
  const scale = pdfWidth / imgWidth;
  const scaledHeight = imgHeight * scale;

  // If content fits on one page
  if (scaledHeight <= pdfHeight) {
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, scaledHeight);
  } else {
    // Split content across multiple pages
    const pageHeight = pdfHeight;
    const pagesNeeded = Math.ceil(scaledHeight / pageHeight);

    for (let i = 0; i < pagesNeeded; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      const sourceY = (i * pageHeight) / scale;
      const sourceHeight = Math.min(pageHeight / scale, imgHeight - sourceY);

      // Create a canvas for this page
      const pageCanvas = document.createElement("canvas");
      const pageCtx = pageCanvas.getContext("2d")!;
      pageCanvas.width = imgWidth;
      pageCanvas.height = sourceHeight * 2; // scale factor

      pageCtx.drawImage(
        canvas,
        0,
        sourceY * 2, // source x, y (scaled)
        imgWidth,
        sourceHeight * 2, // source width, height (scaled)
        0,
        0, // dest x, y
        imgWidth,
        sourceHeight * 2 // dest width, height
      );

      const pageImgData = pageCanvas.toDataURL("image/png");
      pdf.addImage(pageImgData, "PNG", 0, 0, pdfWidth, sourceHeight * scale);
    }
  }

  pdf.save(`${fileName || "converted"}.pdf`);
};

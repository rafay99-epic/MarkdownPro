
import React, { useState } from 'react';
import MarkdownUploadSection from './MarkdownUploadSection';
import MarkdownDownloadSection from './MarkdownDownloadSection';
import MarkdownPreviewSection from './MarkdownPreviewSection';

const MarkdownConverter = () => {
  const [markdownContent, setMarkdownContent] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Markdown Converter
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your markdown files into beautiful HTML pages or PDF documents with just a few clicks
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MarkdownUploadSection
            fileName={fileName}
            isDragging={isDragging}
            setMarkdownContent={setMarkdownContent}
            setHtmlContent={setHtmlContent}
            setFileName={setFileName}
            setIsDragging={setIsDragging}
          />

          <MarkdownDownloadSection
            markdownContent={markdownContent}
            htmlContent={htmlContent}
            fileName={fileName}
          />
        </div>

        <MarkdownPreviewSection
          markdownContent={markdownContent}
          htmlContent={htmlContent}
        />
      </div>
    </div>
  );
};

export default MarkdownConverter;

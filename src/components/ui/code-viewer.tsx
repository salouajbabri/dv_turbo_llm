
import React, { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeViewerProps {
  code: string;
  fileName: string;
  language?: string;
  className?: string;
  showCopyButton?: boolean;
  showDownloadButton?: boolean;
}

export const CodeViewer = ({
  code,
  fileName,
  language = "sql",
  className,
  showCopyButton = true,
  showDownloadButton = true,
}: CodeViewerProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Create a blob from the code
    const blob = new Blob([code], { type: "text/plain" });
    
    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    
    // Append to the document, click it, and remove it
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div 
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="font-mono text-sm text-muted-foreground truncate">
          {fileName}
        </div>
        <div className="flex gap-2">
          {showCopyButton && (
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
              title="Copy code"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          )}
          {showDownloadButton && (
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
              title="Download file"
            >
              <Download className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      <pre
        className={cn(
          "p-4 overflow-x-auto font-mono text-sm",
          {
            "bg-[#f8f8f8]": language === "sql",
          }
        )}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

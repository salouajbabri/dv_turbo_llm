
import React, { useState } from "react";
import { Download, Code, Table, FileText } from "lucide-react";
import { CodeViewer } from "@/components/ui/code-viewer";
import { GeneratedFile, TableMetadata } from "@/lib/api";
import { cn } from "@/lib/utils";

interface CodeOutputProps {
  files: GeneratedFile[];
  metadata?: TableMetadata[];
  className?: string;
}

export const CodeOutput = ({ files, metadata, className }: CodeOutputProps) => {
  const [activeTab, setActiveTab] = useState<"files" | "metadata">("files");
  const [selectedFile, setSelectedFile] = useState<GeneratedFile | null>(
    files.length > 0 ? files[0] : null
  );
  
  // Handle downloading all files as a ZIP
  const handleDownloadAll = () => {
    // This would typically use a library like JSZip to create a ZIP file
    // For now, we'll just alert
    alert("This would download all files as a ZIP archive");
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Generated Output</h2>
          <p className="text-sm text-muted-foreground">
            {files.length} SQL model{files.length !== 1 ? "s" : ""} generated for Data Vault 2.0
          </p>
        </div>
        
        <button
          onClick={handleDownloadAll}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors focus-ring"
        >
          <Download className="h-4 w-4" />
          <span>Download All</span>
        </button>
      </div>
      
      <div className="flex border-b gap-4">
        <button
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
            activeTab === "files"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setActiveTab("files")}
        >
          <Code className="h-4 w-4" />
          <span>SQL Files</span>
        </button>
        
        {metadata && (
          <button
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
              activeTab === "metadata"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab("metadata")}
          >
            <Table className="h-4 w-4" />
            <span>Table Metadata</span>
          </button>
        )}
      </div>
      
      {activeTab === "files" ? (
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Generated Files</h3>
            <ul className="space-y-1 max-h-[500px] overflow-y-auto rounded-md border bg-card p-1">
              {files.map((file) => (
                <li key={file.fileName}>
                  <button
                    className={cn(
                      "w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      selectedFile?.fileName === file.fileName
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary"
                    )}
                    onClick={() => setSelectedFile(file)}
                  >
                    <FileText className="h-4 w-4" />
                    {file.fileName}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            {selectedFile ? (
              <CodeViewer
                code={selectedFile.content}
                fileName={selectedFile.fileName}
                language="sql"
                className="h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-64 rounded-lg border bg-card text-card-foreground p-6">
                <p className="text-muted-foreground">Select a file to view</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {metadata?.map((table) => (
            <div key={table.tableName} className="rounded-lg border bg-card p-4">
              <h3 className="text-lg font-semibold mb-4">{table.tableName}</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Primary Key</h4>
                  <div className="flex flex-wrap gap-2">
                    {table.primaryKey.map((key) => (
                      <span
                        key={key}
                        className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                      >
                        {key}
                      </span>
                    ))}
                  </div>
                </div>
                
                {table.foreignKeys.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Foreign Keys</h4>
                    <ul className="space-y-2">
                      {table.foreignKeys.map((fk, idx) => (
                        <li key={idx} className="text-sm">
                          <code className="bg-secondary px-1 py-0.5 rounded text-xs">
                            {fk.column}
                          </code>{" "}
                          references{" "}
                          <code className="bg-secondary px-1 py-0.5 rounded text-xs">
                            {fk.references.table}.{fk.references.column}
                          </code>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Columns</h4>
                  <div className="flex flex-wrap gap-2">
                    {table.columns.map((col) => (
                      <span
                        key={col}
                        className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

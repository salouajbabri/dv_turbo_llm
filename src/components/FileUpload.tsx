
import React, { useState } from "react";
import { Upload, FileText, ArrowRight } from "lucide-react";
import { FileUpload as FileUploadUI } from "@/components/ui/file-upload";
import { uploadCSVFiles, uploadSchemaFile } from "@/lib/api";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onComplete: (csvFiles: string[], schemaFile: string) => void;
  className?: string;
}

export const FileUpload = ({ onComplete, className }: FileUploadProps) => {
  const [csvFiles, setCsvFiles] = useState<File[]>([]);
  const [schemaFile, setSchemaFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const handleStartUpload = async () => {
    if (csvFiles.length === 0) {
      setError("Please upload at least one CSV file");
      return;
    }
    
    if (!schemaFile) {
      setError("Please upload a schema.yml file");
      return;
    }
    
    setError(null);
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Upload CSV files
      setUploadProgress(33);
      const csvResponse = await uploadCSVFiles(csvFiles);
      
      // Upload schema file
      setUploadProgress(66);
      const schemaResponse = await uploadSchemaFile(schemaFile);
      
      // Complete
      setUploadProgress(100);
      
      // Call the completion handler with the file names
      onComplete(csvResponse.fileNames, schemaResponse.fileName);
      
    } catch (err) {
      setError("Error uploading files. Please try again.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className={cn("space-y-8", className)}>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">CSV Files</h3>
          <FileUploadUI
            label="Upload CSV Files"
            description="Drag and drop CSV files here or click to browse"
            accept=".csv"
            multiple
            value={csvFiles}
            onFilesChange={setCsvFiles}
            disabled={isUploading}
          />
          <p className="text-xs text-muted-foreground">
            Upload your raw source tables as CSV files
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Schema File</h3>
          <FileUploadUI
            label="Upload schema.yml"
            description="Drag and drop your schema.yml file here"
            accept=".yml,.yaml"
            multiple={false}
            value={schemaFile ? [schemaFile] : []}
            onFilesChange={(files) => setSchemaFile(files[0] || null)}
            disabled={isUploading}
          />
          <p className="text-xs text-muted-foreground">
            Upload your schema.yml file defining table structures and relationships
          </p>
        </div>
      </div>
      
      {error && (
        <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive animate-slide-up">
          {error}
        </div>
      )}
      
      <div className="flex justify-center pt-4">
        <button
          onClick={handleStartUpload}
          disabled={isUploading || csvFiles.length === 0 || !schemaFile}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2",
            (isUploading || csvFiles.length === 0 || !schemaFile) && "opacity-70 cursor-not-allowed"
          )}
        >
          {isUploading ? (
            <>
              <span className="animate-pulse">Processing</span>
              <span className="animate-pulse">
                {uploadProgress < 100 ? `${uploadProgress}%` : "Finishing..."}
              </span>
            </>
          ) : (
            <>
              <span>Start Generation</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      
      {isUploading && (
        <div className="w-full bg-secondary/50 rounded-full h-2.5 overflow-hidden mt-4">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
};

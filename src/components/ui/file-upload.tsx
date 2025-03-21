
import React, { useState, useRef } from "react";
import { UploadCloud, File, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  accept?: string;
  maxFiles?: number;
  maxSize?: number; // in MB
  onFilesChange: (files: File[]) => void;
  value?: File[];
  className?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  multiple?: boolean;
}

export const FileUpload = ({
  accept = "*",
  maxFiles = 10,
  maxSize = 10, // 10MB default
  onFilesChange,
  value = [],
  className,
  label = "Upload files",
  description = "Drag and drop files here or click to browse",
  disabled = false,
  multiple = true,
}: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const maxSizeInBytes = maxSize * 1024 * 1024; // Convert MB to bytes

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFiles = (files: File[]): boolean => {
    // Check number of files
    if (files.length + value.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} files`);
      return false;
    }
    
    // Check file sizes
    for (const file of files) {
      if (file.size > maxSizeInBytes) {
        setError(`File "${file.name}" exceeds the maximum size of ${maxSize}MB`);
        return false;
      }
    }
    
    setError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    
    if (validateFiles(droppedFiles)) {
      const newFiles = multiple 
        ? [...value, ...droppedFiles]
        : droppedFiles;
      onFilesChange(newFiles);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (disabled || !e.target.files?.length) return;
    
    const selectedFiles = Array.from(e.target.files);
    
    if (validateFiles(selectedFiles)) {
      const newFiles = multiple 
        ? [...value, ...selectedFiles]
        : selectedFiles;
      onFilesChange(newFiles);
    }
    
    // Reset file input
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemoveFile = (fileToRemove: File) => {
    const updatedFiles = value.filter(file => file !== fileToRemove);
    onFilesChange(updatedFiles);
  };

  return (
    <div className={cn("w-full", className)}>
      {label && <p className="text-sm font-medium mb-2">{label}</p>}
      
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6",
          "transition-all duration-200 ease-in-out",
          "focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20",
          {
            "bg-muted/30 border-muted-foreground/20": !dragActive && !disabled,
            "bg-primary/5 border-primary/50": dragActive && !disabled,
            "bg-muted border-muted-foreground/10 cursor-not-allowed opacity-60": disabled,
          }
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="hidden"
          onChange={handleChange}
        />
        
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="rounded-full bg-primary/10 p-3">
            <UploadCloud className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm font-medium">{description}</p>
          <p className="text-xs text-muted-foreground">
            {multiple 
              ? `Up to ${maxFiles} files, max ${maxSize}MB each` 
              : `Max ${maxSize}MB`}
          </p>
        </div>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-destructive animate-slide-up">{error}</p>
      )}
      
      {value.length > 0 && (
        <ul className="mt-4 space-y-2 animate-slide-up">
          {value.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between rounded-md bg-secondary p-2 text-sm"
            >
              <div className="flex items-center gap-2 truncate">
                <File className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)}MB
                </span>
              </div>
              <button
                type="button"
                className="ml-2 rounded-full p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(file);
                }}
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

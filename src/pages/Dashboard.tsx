
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { FileUpload } from "@/components/FileUpload";
import { CodeOutput } from "@/components/CodeOutput";
import { useAuth } from "@/lib/auth";
import { generateModels, analyzeSchema, GeneratedFile, TableMetadata } from "@/lib/api";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);
  const [tableMetadata, setTableMetadata] = useState<TableMetadata[]>([]);
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  const handleFileUploadComplete = async (csvFiles: string[], schemaFile: string) => {
    setIsGenerating(true);
    setGenerationComplete(false);
    
    try {
      // Analyze schema to extract metadata
      const metadata = await analyzeSchema(csvFiles, schemaFile);
      setTableMetadata(metadata);
      
      // Generate SQL models
      const files = await generateModels(csvFiles, schemaFile);
      setGeneratedFiles(files);
      
      // Mark generation as complete
      setGenerationComplete(true);
    } catch (error) {
      console.error("Error generating models:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-xl font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto">
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Upload your files and generate Data Vault 2.0 staging models
            </p>
          </div>
          
          <div className="space-y-12">
            <div className={cn(
              "rounded-lg border bg-card p-6 shadow-sm transition-all",
              isGenerating && "opacity-50 pointer-events-none"
            )}>
              <FileUpload onComplete={handleFileUploadComplete} />
            </div>
            
            {isGenerating && (
              <div className="rounded-lg bg-secondary/30 p-8 text-center animate-pulse">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Generating Models</h3>
                  <p className="text-muted-foreground">
                    Our LLM is analyzing your data and generating models...
                  </p>
                  <div className="w-full max-w-md mx-auto bg-secondary/50 rounded-full h-2.5 overflow-hidden mt-4">
                    <div className="bg-primary h-2.5 rounded-full animate-pulse-soft" style={{ width: "70%" }} />
                  </div>
                </div>
              </div>
            )}
            
            {generationComplete && (
              <div className="animate-slide-up">
                <CodeOutput 
                  files={generatedFiles} 
                  metadata={tableMetadata}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

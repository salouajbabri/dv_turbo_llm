
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Database, Code, FileText } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/20 pointer-events-none" />
      
      <div className="container relative px-4 py-20 md:py-32 lg:py-40 mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8 max-w-lg">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm">
                <span className="font-medium">Data Vault Code Generator</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Generate <span className="text-gradient">Data Vault 2.0</span> models in seconds
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Upload your CSV files and schema.yml to automatically generate 
                Data Vault 2.0 staging SQL models with dbt's AutomateDV.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all focus-ring"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-3 text-base font-semibold transition-all focus-ring"
              >
                <span>Log In</span>
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* Feature Cards */}
              <div className="space-y-4">
                <div className="glass-panel rounded-lg p-6 shadow-lg animate-slide-up">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">CSV Upload</h3>
                      <p className="text-sm text-muted-foreground">
                        Upload your source tables as CSV files and a schema.yml file
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="glass-panel rounded-lg p-6 shadow-lg animate-slide-up [animation-delay:200ms]">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Database className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">LLM Processing</h3>
                      <p className="text-sm text-muted-foreground">
                        AI analyzes your data to extract metadata and relationships
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="glass-panel rounded-lg p-6 shadow-lg animate-slide-up [animation-delay:400ms]">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Code className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">SQL Generation</h3>
                      <p className="text-sm text-muted-foreground">
                        Get ready-to-use Data Vault 2.0 stage model SQL files
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

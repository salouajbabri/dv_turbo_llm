
import React from "react";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        <section className="py-20 bg-secondary/20">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                How It Works
              </h2>
              <p className="text-muted-foreground">
                A simple three-step process to transform your data into Data Vault 2.0 models
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Upload Your Files",
                  description:
                    "Upload your CSV files that represent your source tables along with a schema.yml file that defines the relationships between them.",
                },
                {
                  step: "02",
                  title: "AI Analysis",
                  description:
                    "Our LLM analyzes your data to understand the structure, infer relationships, and identify keys and hash columns.",
                },
                {
                  step: "03",
                  title: "Get Your Models",
                  description:
                    "Download the generated SQL files that use AutomateDV macros to create your Data Vault 2.0 staging models.",
                },
              ].map(({ step, title, description }) => (
                <div
                  key={step}
                  className="relative glass-panel rounded-lg p-8 transition-transform hover:-translate-y-1"
                >
                  <div className="absolute -top-4 left-8 rounded-full bg-primary/90 w-8 h-8 flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {step}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                Ready to optimize your data modeling workflow?
              </h2>
              <p className="text-lg text-muted-foreground">
                Sign up now and start generating your Data Vault 2.0 models in seconds.
              </p>
              <div className="pt-6">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all focus-ring"
                >
                  Get Started For Free
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-8">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Data Vault Generator. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

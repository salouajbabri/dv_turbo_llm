
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

interface AuthFormProps {
  type: "login" | "signup";
  className?: string;
}

export const AuthForm = ({ type, className }: AuthFormProps) => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (type === "signup" && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      setIsLoading(true);
      
      if (type === "login") {
        await login(email, password);
        navigate("/dashboard");
      } else {
        await signup(name, email, password);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className={cn("space-y-6 w-full max-w-md", className)}>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">
          {type === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-muted-foreground">
          {type === "login" 
            ? "Enter your email to sign in to your account" 
            : "Enter your information to create an account"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "signup" && (
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="name">
              Name
            </label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-muted-foreground">
                <User className="h-4 w-4" />
              </div>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:outline-none transition-all"
                disabled={isLoading}
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-muted-foreground">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:outline-none transition-all"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-muted-foreground">
              <Lock className="h-4 w-4" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:outline-none transition-all"
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        
        {type === "signup" && (
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="confirm-password">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-muted-foreground">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:outline-none transition-all"
                disabled={isLoading}
              />
            </div>
          </div>
        )}
        
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive animate-slide-up">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          className={cn(
            "w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2",
            isLoading && "opacity-70 cursor-not-allowed"
          )}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="animate-pulse">
              {type === "login" ? "Signing in..." : "Creating account..."}
            </span>
          ) : (
            <span>{type === "login" ? "Sign in" : "Create account"}</span>
          )}
        </button>
      </form>
      
      <div className="text-center text-sm">
        {type === "login" ? (
          <>
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Sign up
            </a>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Sign in
            </a>
          </>
        )}
      </div>
    </div>
  );
};

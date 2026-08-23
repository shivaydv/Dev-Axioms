import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LogoIcon } from "@/components/global/Logo";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6">
      <div className="flex flex-col items-center text-center max-w-md">
        <LogoIcon className="w-16 h-16 mb-6 text-muted-foreground" />
        
        <h1 className="text-4xl font-bold tracking-tight mb-2">404</h1>
        <h2 className="text-lg font-medium text-muted-foreground mb-8">
          Page not found
        </h2>
        
        <p className="text-sm text-muted-foreground mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors border border-border/40 bg-muted/40 px-6 py-3 rounded-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

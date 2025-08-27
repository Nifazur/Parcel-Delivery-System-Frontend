import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface ErrorPageProps {
  message?: string;
  onRetry?: () => void;
  onHome?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ 
  message = "Something went wrong",
  onRetry,
  onHome 
}) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <AlertCircle className="h-16 w-16 text-destructive" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Oops!</h1>
          <p className="text-muted-foreground">{message}</p>
        </div>

        <div className="flex gap-3 justify-center">
          {onRetry && (
            <button 
              onClick={onRetry}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          )}
          
          {onHome && (
            <button 
              onClick={onHome}
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors"
            >
              <Home className="h-4 w-4" />
              Go Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
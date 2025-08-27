import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <h2 className="text-xl font-medium text-foreground">Loading...</h2>
        <p className="text-muted-foreground">Please wait</p>
      </div>
    </div>
  );
};

export default LoadingPage;
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorComponentProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

export default function ErrorComponent({ error, resetErrorBoundary }: ErrorComponentProps) {
  return (
    <Alert variant="destructive" className="max-w-2xl mx-auto my-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Something went wrong!</AlertTitle>
      <AlertDescription className="mt-2 flex flex-col gap-4">
        <p className="text-sm">{error.message}</p>
        {resetErrorBoundary && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetErrorBoundary}
            className="w-fit"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}

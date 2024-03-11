import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  title?: string;
  description?: string;
  className?: string;
}

const ErrorMessage = ({ title, description, className }: ErrorMessageProps) => {
  return (
    <Alert className={cn("gap-3 bg-red-100", className)}>
      <AlertTriangle className="stroke-red-500 h-5 w-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className=" text-red-500">
        {description}
      </AlertDescription>
    </Alert>
  );
};

ErrorMessage.displayName = "ErrorMessage";

export { ErrorMessage };

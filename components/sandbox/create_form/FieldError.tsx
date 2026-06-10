import { ErrorIcon } from "@/components/sandbox/icons";

export default function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs text-error flex items-center gap-1">
      <ErrorIcon /> {message}
    </p>
  );
}

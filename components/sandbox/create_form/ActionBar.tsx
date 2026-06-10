import type { FormErrors } from "./types";
import { Loader, CheckCircle, ErrorIcon } from "@/components/sandbox/icons";

export default function ActionBar({
  isPending,
  errors,
  success,
  onSubmit,
}: {
  isPending: boolean;
  errors: FormErrors;
  success: string | null;
  onSubmit: () => void;
}) {
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="sticky bottom-0 bg-white rounded-xl border border-outline-variant/70 shadow-lg p-xl -mx-px -mb-px">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2.5 text-sm font-semibold text-on-primary transition-all duration-150 shadow-sm"
          >
            {isPending && <Loader />}
            {isPending ? "Creating Sandbox…" : "Create Sandbox"}
          </button>

          {success && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
              <CheckCircle /> {success}
            </span>
          )}

          {hasErrors && !isPending && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-error">
              <ErrorIcon /> Fix the errors above
            </span>
          )}
        </div>

        <p className="text-xs text-on-surface-disabled">
          All fields validated before submission
        </p>
      </div>
    </div>
  );
}

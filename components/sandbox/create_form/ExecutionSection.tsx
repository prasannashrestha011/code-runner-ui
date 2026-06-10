import type { FormErrors, UpdateFn } from "./types";
import { inputBase, labelBase } from "./constants";
import FormSection from "./FormSection";
import FieldError from "./FieldError";
import { SandboxFormState } from "@/types/sandbox.types";

export default function ExecutionSection({
  session_timeout,
  exec_timeout,
  errors,
  onUpdate,
}: {
  session_timeout: string;
  exec_timeout: string;
  errors: FormErrors<SandboxFormState>;
  onUpdate: UpdateFn<{ session_timeout: string; exec_timeout: string }>;
}) {
  return (
    <FormSection
      icon="timer"
      title="Execution"
      subtitle="Configure session lifetime and per-command execution deadlines"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <label className={labelBase} htmlFor="session_timeout">Session Timeout</label>
          <input
            id="session_timeout"
            type="text"
            value={session_timeout}
            onChange={(e) => onUpdate("session_timeout", e.target.value)}
            placeholder='e.g. "30m" or "1h30m"'
            className={inputBase}
          />
          <FieldError message={errors.session_timeout} />
        </div>
        <div>
          <label className={labelBase} htmlFor="exec_timeout">Execution Timeout</label>
          <input
            id="exec_timeout"
            type="text"
            value={exec_timeout}
            onChange={(e) => onUpdate("exec_timeout", e.target.value)}
            placeholder='e.g. "5s" or "30s"'
            className={inputBase}
          />
          <FieldError message={errors.exec_timeout} />
        </div>
      </div>
    </FormSection>
  );
}

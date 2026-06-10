"use client";

import { useCallback, useState } from "react";
import { SandboxCommandBuilder } from "@/lib/builders/SandboxCommandBuilder";
import { useCreateSandbox } from "@/hooks/useSandbox";
import type { SandboxFormState } from "@/types/sandbox.types";

import type { FormErrors } from "./types";
import { INITIAL_STATE } from "./constants";
import EnvironmentSection from "./EnvironmentSection";
import ResourceLimitsSection from "./ResourceLimitsSection";
import ExecutionSection from "./ExecutionSection";
import NetworkSection from "./NetworkSection";
import ActionBar from "./ActionBar";
import { MB_TO_BYTES } from "@/utils/const";

function validate(form: SandboxFormState): FormErrors<SandboxFormState> {
  const errors: FormErrors<SandboxFormState> = {};

  if (!form.environment.trim()) {
    errors.environment = "Environment is required";
  }
  if (!form.image_id.trim()) {
    errors.image_id = "Image is required";
  }
  if (!Number.isFinite(form.memory_limit) || form.memory_limit < 4) {
    errors.memory_limit = "Minimum 4 MB";
  }
  if (!Number.isFinite(form.cpu_limit) || form.cpu_limit < 0.5) {
    errors.cpu_limit = "Minimum 0.5 CPU";
  }
  if (!Number.isFinite(form.pids_limit) || form.pids_limit < 1) {
    errors.pids_limit = "Minimum 1 PID";
  }
  if (!form.session_timeout.trim()) {
    errors.session_timeout = "Session timeout is required";
  } else if (!/^(\d+h\s*)?(\d+m\s*)?(\d+s\s*)?$/.test(form.session_timeout.trim())) {
    errors.session_timeout = 'Use format like "30m" or "1h30m"';
  }
  if (!form.exec_timeout.trim()) {
    errors.exec_timeout = "Execution timeout is required";
  } else if (!/^(\d+h\s*)?(\d+m\s*)?(\d+s\s*)?$/.test(form.exec_timeout.trim())) {
    errors.exec_timeout = 'Use format like "5s" or "30s"';
  }

  return errors;
}

export default function CreateSandboxForm() {
  const [form, setForm] = useState<SandboxFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors<SandboxFormState>>({});
  const [success, setSuccess] = useState<string | null>(null);
  const { mutate, isPending } = useCreateSandbox();



  const update = useCallback(
    <K extends keyof SandboxFormState>(key: K, value: SandboxFormState[K]) => {
      console.log(`Updating field ${key} with value:`, value);
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        if (prev[key]) {
          const next = { ...prev };
          delete next[key];
          return next;
        }
        return prev;
      });
      setSuccess(null);
    },
    []
  );

  const handleSubmit = useCallback(() => {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    console.log("Submitting form with data:", form);
    setSuccess(null);
    mutate(
      SandboxCommandBuilder.build({
        environment: form.environment,
        image_id: form.image_id,
        memory_limit: form.memory_limit * MB_TO_BYTES,
        cpu_limit: form.cpu_limit,
        pids_limit: form.pids_limit,
        session_timeout: form.session_timeout,
        exec_timeout: form.exec_timeout,
        network_mode: form.network_mode,
      }),
      {
        onSuccess: () => {
          setSuccess("Sandbox created successfully!");
          setForm(INITIAL_STATE);
        },
      }
    );
  }, [form, mutate]);

  return (
    <div className="space-y-xl font-sans">

      <EnvironmentSection
        image_id={form.image_id}
        errors={errors}
        onUpdate={update}
      />

      <ResourceLimitsSection
        memory_limit={form.memory_limit}
        cpu_limit={form.cpu_limit}
        pids_limit={form.pids_limit}
        errors={errors}
        onUpdate={update}
      />

      <ExecutionSection
        session_timeout={form.session_timeout}
        exec_timeout={form.exec_timeout}
        errors={errors}
        onUpdate={update}
      />

      <NetworkSection
        network_mode={form.network_mode}
        onSelect={(mode) => update("network_mode", mode)}
      />

      <ActionBar
        isPending={isPending}
        errors={errors}
        success={success}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

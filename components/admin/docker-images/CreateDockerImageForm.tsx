"use client";

import { useCallback, useState } from "react";
import { DockerCommandBuilder } from "@/lib/builders/admin/DockerCommandBuilder";
import { useCreateDockerImage } from "@/hooks/admin/useDockerImage";
import FormSection from "@/components/sandbox/create_form/FormSection";
import { inputBase, labelBase } from "@/components/sandbox/create_form/constants";
import { CheckCircle, ErrorIcon, Loader } from "@/components/sandbox/icons";

export default function CreateDockerImageForm() {
  const [imageTag, setImageTag] = useState("");
  const [environment, setEnvironment] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { mutate, isPending, isError, error } = useCreateDockerImage();

  const serverError =
    isError && error instanceof Error
      ? error.message
      : isError
        ? "Failed to create Docker image"
        : null;
  const displayError = validationError ?? serverError;

  const handleSubmit = useCallback(() => {
    if (!imageTag.trim()) {
      setValidationError("Image tag is required");
      return;
    }
    if (!/^[^:\s]+:[^:\s]+$/.test(imageTag.trim())) {
      setValidationError("Image tag must be in the format image:tag");
      return;
    }
    if (!environment.trim()) {
      setValidationError("Environment variables are required");
      return;
    }

    setValidationError(null);
    setSuccess(null);

    mutate(DockerCommandBuilder.build(imageTag, environment), {
      onSuccess: () => {
        setSuccess("Docker image created successfully!");
        setImageTag("");
        setEnvironment("");
      },
    });
  }, [imageTag, environment, mutate]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setImageTag(e.target.value);
      setValidationError(null);
      setSuccess(null);
    },
    [],
  );

  return (
    <div className="space-y-xl">
      <FormSection
        icon="add"
        title="Create Docker Image"
        subtitle="Specify an image tag to create a new Docker image"
      >
        <div>
          <label htmlFor="image_tag" className={labelBase}>
            Image Tag
          </label>
          <input
            id="image_tag"
            type="text"
            value={imageTag}
            onChange={handleChange}
            placeholder="e.g. my-image:latest"
            className={inputBase}
            disabled={isPending}
          />
          <input
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            placeholder="environement(python,node)"
            className={`${inputBase} mt-4`}
            disabled={isPending}
          />
        </div>
      </FormSection>

      <div className="sticky bottom-0 bg-white rounded-xl border border-outline-variant/70 shadow-lg p-xl -mx-px -mb-px">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2.5 text-sm font-semibold text-on-primary transition-all duration-150 shadow-sm"
            >
              {isPending && <Loader />}
              {isPending ? "Creating…" : "Create Docker Image"}
            </button>

            {success && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                <CheckCircle /> {success}
              </span>
            )}

            {displayError && !isPending && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-error">
                <ErrorIcon /> {displayError}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

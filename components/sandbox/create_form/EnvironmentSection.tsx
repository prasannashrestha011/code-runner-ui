"use client";

import type { FormErrors, UpdateFn } from "./types";
import { inputBase, labelBase } from "./constants";
import FormSection from "./FormSection";
import FieldError from "./FieldError";
import { useDockerImageList } from "@/hooks/admin/useDockerImage";

export default function EnvironmentSection({
  image_id,
  errors,
  onUpdate,
}: {
  image_id: string;
  errors: FormErrors<{ environment: string; image_id: string }>;
  onUpdate: UpdateFn<{ environment: string; image_id: string }>;
}) {
  const { data: res } = useDockerImageList();
  const images = res?.data;

  const handleImageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    console.log("Selected image ID:", selectedId);
    onUpdate("image_id", selectedId);
    const selectedImage = images?.find((img) => img.id === selectedId);
    if (selectedImage) {
      onUpdate("environment", selectedImage.environment);
    } else {
      onUpdate("environment", "");
    }
  };

  return (
    <FormSection
      icon="terminal"
      title="Environment"
      subtitle="Define the runtime and base image for the sandbox"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <label className={labelBase} htmlFor="image_id">
            Docker Image
          </label>
          <select
            id="image_id"
            value={image_id}
            onChange={handleImageChange} // Use the new compound handler
            className={inputBase}
          >
            <option value="">Select a Docker Image</option>
            {images?.map((image) => (
              <option key={image.id} value={image.id}>
                {image.image_tag}
              </option>
            ))}
          </select>
          <FieldError message={errors.image_id} />
        </div>
      </div>
    </FormSection>
  );
}
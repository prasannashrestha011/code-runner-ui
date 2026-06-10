"use client";

import * as Slider from "@radix-ui/react-slider";
import type { FormErrors, UpdateFn } from "./types";
import { labelBase } from "./constants";
import FormSection from "./FormSection";
import FieldError from "./FieldError";
import { SandboxFormState } from "@/types/sandbox.types";

export default function ResourceLimitsSection({
  memory_limit,
  cpu_limit,
  pids_limit,
  errors,
  onUpdate,
}: {
  memory_limit: number;
  cpu_limit: number;
  pids_limit: number;
  errors: FormErrors<SandboxFormState>;
  onUpdate: UpdateFn<{ memory_limit: number; cpu_limit: number; pids_limit: number }>;
}) {
  return (
    <FormSection
      icon="memory"
      title="Resource Limits"
      subtitle="Constrain CPU, memory, and process count for the sandbox"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8">

        {/* Memory Limit Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className={labelBase} htmlFor="memory_limit">Memory Limit</label>
            <span className="text-sm  font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              {memory_limit} MB
            </span>
          </div>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
            value={[memory_limit]}
            onValueChange={(val) => onUpdate("memory_limit", val[0])}
            min={4}
            max={2048} // Adjusted a sensible default max, change if needed
            step={4}
          >
            <Slider.Track className="bg-slate-200 dark:bg-slate-700 relative grow rounded-full h-1.5">
              <Slider.Range className="absolute bg-indigo-600 dark:bg-indigo-500 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-4 h-4 bg-white border-2 border-indigo-600 dark:border-indigo-500 rounded-full shadow-md hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              aria-label="Memory limit"
            />
          </Slider.Root>
          <FieldError message={errors.memory_limit} />
        </div>

        {/* CPU Limit Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className={labelBase} htmlFor="cpu_limit">CPU Limit</label>
            <span className="text-sm  font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              {cpu_limit} Cores
            </span>
          </div>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
            value={[cpu_limit]}
            onValueChange={(val) => onUpdate("cpu_limit", val[0])}
            min={0.5}
            max={16}
            step={0.5}
          >
            <Slider.Track className="bg-slate-200 dark:bg-slate-700 relative grow rounded-full h-1.5">
              <Slider.Range className="absolute bg-indigo-600 dark:bg-indigo-500 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-4 h-4 bg-white border-2 border-indigo-600 dark:border-indigo-500 rounded-full shadow-md hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              aria-label="CPU limit"
            />
          </Slider.Root>
          <FieldError message={errors.cpu_limit} />
        </div>

        {/* PID Limit Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className={labelBase} htmlFor="pids_limit">PID Limit</label>
            <span className="text-sm  font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              {pids_limit} PIDs
            </span>
          </div>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
            value={[pids_limit]}
            onValueChange={(val) => onUpdate("pids_limit", val[0])}
            min={1}
            max={500}
            step={1}
          >
            <Slider.Track className="bg-slate-200 dark:bg-slate-700 relative grow rounded-full h-1.5">
              <Slider.Range className="absolute bg-indigo-600 dark:bg-indigo-500 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-4 h-4 bg-white border-2 border-indigo-600 dark:border-indigo-500 rounded-full shadow-md hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              aria-label="PID limit"
            />
          </Slider.Root>
          <FieldError message={errors.pids_limit} />
        </div>

      </div>
    </FormSection>
  );
}
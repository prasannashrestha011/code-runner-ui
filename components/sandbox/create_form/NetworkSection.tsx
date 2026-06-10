import type { NetworkMode } from "@/types/sandbox.types";
import { CheckCircle } from "@/components/sandbox/icons";
import { NETWORK_OPTIONS } from "./constants";
import FormSection from "./FormSection";

export default function NetworkSection({
  network_mode,
  onSelect,
}: {
  network_mode: NetworkMode;
  onSelect: (mode: NetworkMode) => void;
}) {
  return (
    <FormSection
      icon="lan"
      title="Network"
      subtitle="Control the sandbox&#39;s network access and isolation level"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {NETWORK_OPTIONS.map((opt) => {
          const active = network_mode === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={[
                "relative rounded-xl border-2 p-4 text-left transition-all duration-200",
                active
                  ? "border-primary bg-primary-container/50 shadow-sm"
                  : "border-outline-variant bg-surface-container-low hover:border-outline hover:shadow-sm",
              ].join(" ")}
            >
              {active && (
                <span className="absolute top-2 right-2 text-primary">
                  <CheckCircle />
                </span>
              )}
              <div className="font-semibold text-sm text-on-surface mb-1">{opt.label}</div>
              <p className="text-xs text-on-surface-variant leading-relaxed">{opt.description}</p>
            </button>
          );
        })}
      </div>
    </FormSection>
  );
}

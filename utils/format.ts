export function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatMemory(mb: number): string {
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
  return `${mb} MB`;
}

export function statusColor(status: string) {
  switch (status?.toLowerCase()) {
    case "active":
      return { text: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" };
    case "inactive":
      return { text: "text-zinc-500", bg: "bg-zinc-50 border-zinc-200", dot: "bg-zinc-400" };
    case "expired":
      return { text: "text-amber-600", bg: "bg-amber-50 border-amber-200", dot: "bg-amber-500" };
    case "stopped":
      return { text: "text-red-600", bg: "bg-red-50 border-red-200", dot: "bg-red-500" };
    default:
      return { text: "text-zinc-500", bg: "bg-zinc-50 border-zinc-200", dot: "bg-zinc-500" };
  }
}

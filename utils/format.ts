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
      return { text: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-400" };
    case "inactive":
      return { text: "text-zinc-400", bg: "bg-zinc-500/10 border-zinc-500/20", dot: "bg-zinc-400" };
    case "expired":
      return { text: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", dot: "bg-amber-400" };
    case "stopped":
      return { text: "text-red-400", bg: "bg-red-500/10 border-red-500/20", dot: "bg-red-400" };
    default:
      return { text: "text-zinc-500", bg: "bg-zinc-500/10 border-zinc-500/20", dot: "bg-zinc-500" };
  }
}

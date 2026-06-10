"use client";

import { useSandboxes } from "@/hooks/useSandbox";
import { getDotClass, getStatusStyles } from "@/utils/status";
import Link from "next/link";
import { FaGear } from "react-icons/fa6";

export default function SandboxList() {
    const { data: res, isLoading } = useSandboxes();

    const list = res?.data || [];
    console.log("Fetched sandboxes:", list);


    const formatMemory = (bytesOrMb: number) => {
        if (bytesOrMb > 1024 * 1024) return `${Math.round(bytesOrMb / (1024 * 1024))} MB`;
        return `${bytesOrMb} MB`;
    };

    if (isLoading) {
        return (
            <div className="space-y-3">
                <div className="h-6 w-40 bg-violet-50 rounded animate-pulse" />
                {[1, 2, 3].map((n) => (
                    <div key={n} className="h-28 bg-zinc-50 rounded-xl border border-zinc-200 animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-5 font-sans">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-zinc-200 pb-4">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">Active Sandboxes</h1>
                </div>
                <span className="text-[11px] font-mono font-semibold text-violet-600 bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-full">
                    {list.length} instances
                </span>
            </div>

            {/* Empty */}
            {list.length === 0 ? (
                <div className="text-center py-14 border border-dashed border-zinc-200 rounded-xl">
                    <p className="text-sm font-mono text-zinc-400">No instances found</p>
                    <p className="text-xs font-mono text-zinc-300 mt-1">Spin up an environment to see it here.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {list.map((sandbox) => (
                        <div
                            key={sandbox.id}
                            className="bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-violet-300 rounded-xl px-4 py-3.5 transition-all duration-150"
                        >
                            {/* Top row */}
                            <div className="flex items-center justify-between gap-3 mb-3">
                                <div className="flex items-center gap-2.5 flex-wrap">
                                    {/* Status dot */}
                                    <span className={`w-2 h-2 rounded-full shrink-0 ${getDotClass(sandbox.status)}`} />
                                    {/* Env badge */}
                                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-violet-50 text-violet-600 border border-violet-200">
                                        {sandbox.environment}
                                    </span>
                                    {/* Status tag */}
                                    <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${getStatusStyles(sandbox.status)}`}>
                                        {sandbox.status}
                                    </span>
                                </div>
                            </div>

                            {/* Bottom row — metrics + actions */}
                            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 border-t border-zinc-100 pt-3">
                                <div>
                                    <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-0.5">Memory</p>
                                    <p className="text-xs font-mono font-semibold text-zinc-700">
                                        {formatMemory(sandbox.memory_limit)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-0.5">Compute</p>
                                    <p className="text-xs font-mono font-semibold text-zinc-700">
                                        {sandbox.cpu_limit} vCPU
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-0.5">Network</p>
                                    <p className="text-xs font-mono font-semibold text-zinc-700 capitalize">
                                        {sandbox.network_mode}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-0.5">PIDS limit</p>
                                    <p className="text-xs font-mono font-semibold text-zinc-700 capitalize">
                                        {sandbox.pids_limit}
                                    </p>
                                </div>

                                <div className="hidden sm:block">
                                    <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-0.5">Expires</p>
                                    <p className="text-xs font-mono font-semibold text-zinc-400">
                                        {sandbox.expires_at
                                            ? new Date(sandbox.expires_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                            : "Never"}
                                    </p>
                                </div>
                                <div>
                                    <Link href={`sandbox/update/${sandbox.id}`}>
                                        <FaGear color="gray" />
                                    </Link>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
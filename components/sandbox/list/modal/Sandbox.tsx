"use client";

import { useSandbox } from '@/hooks/useSandbox';
import { MB_TO_BYTES } from '@/utils/const';
import { useParams } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import { FaEdit, FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

const UpdateSandbox = () => {
    const { id } = useParams<{ id: string }>(); // Cleanly destructure id directly
    const [isEditing, setIsEditing] = useState(false);
    const { data: res, isLoading } = useSandbox(id);
    const sandbox = res?.data;

    // 1. Initialize state with explicit fallback types to completely avoid uncontrolled input warnings
    const [formData, setFormData] = useState({
        environment: "",
        memory_limit: 128,
        cpu_limit: 0.5,
        pids_limit: 20,
        session_timeout: 300,
        exec_timeout: 30,
        network_mode: "bridge",
    });

    // 2. Safely sync async data into form state only when a new sandbox loads or edit mode resets
    useEffect(() => {
        if (sandbox && !isEditing) {
            setFormData({
                environment: sandbox.environment ?? "node-20",
                memory_limit: (sandbox.memory_limit ?? 128) / MB_TO_BYTES,
                cpu_limit: sandbox.cpu_limit ?? 0.5,
                pids_limit: sandbox.pids_limit ?? 20,
                session_timeout: sandbox.session_timeout ?? 300,
                exec_timeout: sandbox.exec_timeout ?? 30,
                network_mode: sandbox.network_mode ?? "bridge",
            });
        }
    }, [sandbox, isEditing]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: e.target.type === 'number' ? Number(value) : value,
        }));
    }, []
    )
    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsEditing(false);
    }, []);

    if (isLoading) {
        return (
            <div className="w-full max-w-4xl p-xl bg-surface-container-lowest border border-outline-variant rounded-xl animate-pulse text-on-surface-variant text-sm font-medium">
                Loading production sandbox parameters...
            </div>
        );
    }

    if (!sandbox) {
        return (
            <div className="w-full max-w-4xl p-xl bg-surface-container-lowest border border-error rounded-xl text-error text-sm font-medium">
                Target engine sandbox runtime instance could not be found.
            </div>
        );
    }

    const handleCancel = () => {
        setIsEditing(false); // Triggers the useEffect baseline restore naturally
    };

    const inputBaseClass = "w-full px-md py-2 bg-background border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:bg-surface-container-low disabled:text-on-surface-variant/70 disabled:border-transparent font-medium";

    return (
        <div className="w-full max-w-4xl bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden font-sans">

            {/* Component Header Status Bar */}
            <header className="flex justify-between items-center px-xl py-lg border-b border-outline-variant bg-surface-container-low/50">
                <div>
                    <div className="flex items-center gap-sm">
                        <span className={`w-2 h-2 rounded-full ${sandbox.status === 'active' ? 'bg-tertiary' : 'bg-on-surface-disabled'}`} />
                        <h2 className="text-title-md font-bold text-on-surface">Sandbox Configuration</h2>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1 font-mono tracking-tight">ID: {sandbox.id}</p>
                </div>

                {/* Controls Action Section */}
                {!isEditing ? (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-sm px-md py-2 bg-background border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary rounded-lg text-body-sm font-semibold shadow-sm transition-all cursor-pointer"
                    >
                        <FaEdit size={14} />
                        <span>Edit Settings</span>
                    </button>
                ) : (
                    <div className="flex items-center gap-sm">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex items-center gap-sm px-md py-2 bg-background border border-outline-variant text-on-surface-variant hover:bg-surface-container-high rounded-lg text-body-sm font-semibold transition-all cursor-pointer"
                        >
                            <FaXmark size={14} />
                            <span>Cancel</span>
                        </button>

                        {/* FIX: Explicitly targeted form via ID attribute.
                          This lets a button live anywhere outside the form boundaries while retaining submit authority!
                        */}
                        <button
                            type="submit"
                            form="sandbox-update-form"
                            className="flex items-center gap-sm px-md py-2 bg-primary text-on-primary rounded-lg text-body-sm font-semibold shadow-md shadow-primary/20 transition-all cursor-pointer hover:bg-primary/90"
                        >
                            <FaCheck size={14} />
                            <span>Save Changes</span>
                        </button>
                    </div>
                )}
            </header>

            {/* Form Canvas Structure */}
            <form id="sandbox-update-form" onSubmit={handleSubmit} className="p-xl space-y-xl">

                {/* SECTION 1: Core Runtime Environment */}
                <div>
                    <h3 className="text-body-sm font-bold text-primary tracking-wide uppercase mb-md">Runtime Parameters</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                        <div className="space-y-sm">
                            <label className="block text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider">Network Configuration</label>
                            <select
                                name="network_mode"
                                value={formData.network_mode}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={inputBaseClass}
                            >
                                <option value="bridge">bridge</option>
                                <option value="host">host</option>
                                <option value="none">isolated</option>
                            </select>
                        </div>
                    </div>
                </div>

                <hr className="border-outline-variant" />

                {/* SECTION 2: System Architecture Allocations */}
                <div>
                    <h3 className="text-body-sm font-bold text-primary tracking-wide uppercase mb-md">Hardware Allocations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
                        <div className="space-y-sm">
                            <label className="block text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider">Memory Threshold (MB)</label>
                            <input
                                type="number"
                                name="memory_limit"
                                value={formData.memory_limit}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={inputBaseClass}
                                min={128}
                            />
                        </div>

                        <div className="space-y-sm">
                            <label className="block text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider">CPU Core Units</label>
                            <input
                                type="number"
                                name="cpu_limit"
                                value={formData.cpu_limit}
                                onChange={handleChange}
                                disabled={!isEditing}
                                step="0.1"
                                className={inputBaseClass}
                                min={0.1}
                            />
                        </div>

                        <div className="space-y-sm">
                            <label className="block text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider">PID Limitation Throttle</label>
                            <input
                                type="number"
                                name="pids_limit"
                                value={formData.pids_limit}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={inputBaseClass}
                                min={10}
                            />
                        </div>
                    </div>
                </div>

                <hr className="border-outline-variant" />

                {/* SECTION 3: Session Expiry Metrics */}
                <div>
                    <h3 className="text-body-sm font-bold text-primary tracking-wide uppercase mb-md">Lifecycle Lifespans</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                        <div className="space-y-sm">
                            <label className="block text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider"> Session Timeout (sec)</label>
                            <input
                                type="number"
                                name="session_timeout"
                                value={formData.session_timeout}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={inputBaseClass}
                            />
                        </div>

                        <div className="space-y-sm">
                            <label className="block text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider">Command  Execution Bound (sec)</label>
                            <input
                                type="number"
                                name="exec_timeout"
                                value={formData.exec_timeout}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={inputBaseClass}
                            />
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default UpdateSandbox;
import { SandboxCreatePayload, SandboxFormState } from "@/types/sandbox.types";
import { parseDurationToNanoseconds } from "@/utils/duration";


const DEFAULTS = {
    memory_limit: 256,
    cpu_limit: 1,
    pids_limit: 50,
    session_timeout: "30m",
    exec_timeout: "5s",
    network_mode: "none",
} as const;


export class SandboxCommandBuilder {
    private payload: SandboxCreatePayload = {};

    constructor() {
        this.payload = {}
    }
    static build(formState: SandboxFormState): SandboxCreatePayload {
        return new SandboxCommandBuilder()
            .setEnvironment(formState.environment)
            .setMemoryLimit(formState.memory_limit)
            .setCpuLimit(formState.cpu_limit)
            .setPidLimit(formState.pids_limit)
            .setSessionTimeout(formState.session_timeout)
            .setExecTimeout(formState.exec_timeout)
            .setNetworkMode(formState.network_mode)
            .toPayload()
    }

    setEnvironment(env: string): this {
        const value = env?.trim();
        if (value) this.payload.environment = value;
        return this
    }
    setMemoryLimit(mb: number): this {
        this.payload.memory_limit = Number.isFinite(mb) && mb > 0 ? mb : DEFAULTS.memory_limit
        return this
    }
    setCpuLimit(cores: number): this {
        this.payload.cpu_limit = Number.isFinite(cores) && cores > 0 ? cores : DEFAULTS.cpu_limit
        return this
    }
    setPidLimit(pids: number): this {
        this.payload.pids_limit = Number.isFinite(pids) && pids > 0 ? pids : DEFAULTS.pids_limit
        return this
    }
    setSessionTimeout(timeout: string): this {
        const val = (timeout.trim() ?? "") || DEFAULTS.session_timeout
        this.payload.session_timeout = parseDurationToNanoseconds(val)
        return this
    }

    setExecTimeout(timeout: string): this {
        const val = (timeout.trim() ?? "") || DEFAULTS.exec_timeout
        this.payload.exec_timeout = parseDurationToNanoseconds(val)
        return this
    }
    setNetworkMode(mode: string): this {
        this.payload.network_mode = mode.trim() || DEFAULTS.network_mode
        return this
    }

    toPayload(): SandboxCreatePayload {
        return { ...this.payload }
    }
}
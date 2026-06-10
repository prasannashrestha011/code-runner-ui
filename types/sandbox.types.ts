export type NetworkMode = "none" | "bridge" | "host";

export type SandboxStatus = "active" | "inactive" | "expired" | "stopped";

/** Form input state — what the UI collects */
export interface SandboxFormState {
  environment: string;
  image_id: string;
  memory_limit: number;
  cpu_limit: number;
  pids_limit: number;
  session_timeout: string; // human-readable e.g. "30m"
  exec_timeout: string; // human-readable e.g. "5s"
  network_mode: NetworkMode;
}

/** API request payload — what the command builder produces */
export interface SandboxCreatePayload {
  environment?: string;
  image_id?: string;
  memory_limit?: number;
  cpu_limit?: number;
  pids_limit?: number;
  session_timeout?: number; // nanoseconds (Go time.Duration)
  exec_timeout?: number; // nanoseconds
  network_mode?: string;
}
/** API request payload for updating a sandbox */
export interface SandboxUpdatePayload {
  memory_limit?: number;
  cpu_limit?: number;
  pids_limit?: number;
  session_timeout?: number; // nanoseconds (Go time.Duration)
  exec_timeout?: number; // nanoseconds
  network_mode?: string;
}

/** POST /sandboxes & GET /sandboxes/{id} response data */
export interface SandboxCreateResponse {
  container_id: string;
  session_id: string;
  status: SandboxStatus;
  created_at: string;
  expires_at: string;
  error: string | null;
}

/** GET /sandboxes list items (Go struct without json tags → PascalCase) */
export interface SandboxListItem {
  id: string;
  user_id: string;
  environment: string;
  memory_limit: number;
  cpu_limit: number;
  pids_limit: number;
  session_timeout: number;
  exec_timeout: number;
  network_mode: string;
  status: SandboxStatus;
  expires_at: string;
  created_at: string;
}
export interface SandboxExecuteRequest {
  Lang: string
  Code: string
}
export interface SandboxExecuteResponse {
  result: string
}

/** Generic API response wrapper */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    details?: unknown;
  };
}

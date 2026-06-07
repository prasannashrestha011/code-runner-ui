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
  ID: string;
  UserID: string;
  Environment: string;
  MemoryLimit: number;
  CPULimit: number;
  PidsLimit: number;
  SessionTimeout: number;
  ExecTimeout: number;
  NetworkMode: string;
  ContainerName: string;
  ContainerID: string;
  SessionID: string;
  Status: SandboxStatus;
  ExpiresAt: string;
  CreatedAt: string;
  UpdatedAt: string;
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

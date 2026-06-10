import { SandboxCreatePayload, SandboxUpdatePayload, SandboxCreateResponse, SandboxExecuteRequest, SandboxExecuteResponse, SandboxListItem } from "@/types/sandbox.types";
import { request } from "./request.api";

export const sandboxApi = {
    create(payload: SandboxCreatePayload) {
        console.log("Creating sandbox with payload:", payload);
        return request<SandboxCreateResponse>("/sandboxes", { method: "POST", data: payload })
    },
    getById(id: string) {
        return request<SandboxListItem>(`/sandboxes/${id}`, { method: "GET" });
    },

    list() {

        return request<SandboxListItem[]>("/sandboxes", { method: "GET" });
    },

    delete(id: string) {
        return request<void>(`/sandboxes/${id}`, { method: "DELETE" });
    },
    execute(id: string, data: SandboxExecuteRequest) {
        return request<SandboxExecuteResponse>(`/sandboxes/${id}/execute`, { method: "GET", data: data })
    },
    update(id: string, payload: SandboxUpdatePayload) {
        return request<SandboxCreateResponse>(`/sandboxes/${id}`, { method: "PUT", data: payload })
    }
}
import { sandboxApi } from "@/lib/api/sandbox.api";
import { SandboxCreatePayload, SandboxUpdatePayload, SandboxExecuteRequest } from "@/types/sandbox.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useSandbox(id: string) {
    return useQuery({
        queryKey: ["sandboxes", id],
        queryFn: () => sandboxApi.getById(id)
    })
}
export function useSandboxes() {
    return useQuery({
        queryKey: ["sandboxes"],
        queryFn: () => sandboxApi.list()
    })
}

export function useCreateSandbox() {
    return useMutation({
        mutationKey: ["create_sandbox"],
        mutationFn: (create: SandboxCreatePayload) => sandboxApi.create(create)
    })
}

export function useDeleteSandbox(id: string) {
    return useMutation({
        mutationKey: ["delete_sandbox", id],
        mutationFn: () => sandboxApi.delete(id)
    })
}
export function useUpdateSandbox(id: string, updates: SandboxUpdatePayload) {
    return useMutation({
        mutationKey: ["update_sandbox", id],
        mutationFn: () => sandboxApi.update(id, updates)
    })
}

export function useExecuteSandbox(id: string, execute: SandboxExecuteRequest) {
    return useMutation({
        mutationKey: ["execute_sandbox", id],
        mutationFn: () => sandboxApi.execute(id, execute)
    })
}
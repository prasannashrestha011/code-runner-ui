
import { ApiResponse } from "@/types/sandbox.types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"


const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});
export async function request<T>(path: string,
    options?: {
        method: "GET" | "POST" | "PUT" | "DELETE"
        data?: unknown,
        headers?: Record<string, string>
    }): Promise<ApiResponse<T>> {
    try {
        const res = await api.request<ApiResponse<T>>({
            url: path,
            method: options?.method ?? "GET",
            data: options?.data,
            headers: options?.headers
        })

        if (res.status === 204) {
            return { success: true } as ApiResponse<T>;
        }
        const json = res.data
        console.log(json)
        if (!json.success) {
            throw new Error(json.message || json.error?.code || "request failed")
        }
        return json

    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            throw new Error(
                err.response?.data?.message ||
                err.response?.data?.error?.code ||
                err.message ||
                "Request failed"
            );
        }
        throw new Error(
            err instanceof Error ? err.message : "Request failed"
        );
    }
}
import { CreateDockerImage, DockerImage } from "@/types/dockerimage.types";
import { request } from "./request.api";

export const dockerImageApi = {
    create(payload: CreateDockerImage) {
        return request<DockerImage>("/docker-images", {
            method: "POST",
            data: payload,
        });
    },

    list() {
        return request<DockerImage[]>("/docker-images", {
            method: "GET",
        });
    },
};
import { dockerImageApi } from "@/lib/api/image.api";
import { CreateDockerImage } from "@/types/dockerimage.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDockerImageList() {
    return useQuery({
        queryKey: ["docker-images"],
        queryFn: () => dockerImageApi.list(),
    });
}

export function useCreateDockerImage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["create_docker_image"],
        mutationFn: (payload: CreateDockerImage) =>
            dockerImageApi.create(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["docker-images"],
            });
        },
    });
}
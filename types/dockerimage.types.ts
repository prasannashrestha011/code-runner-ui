export interface CreateDockerImage {
    image_tag: string;
    environment: string;
}
export interface DockerImage {
    id: string;
    image_tag: string;
    environment: string;
    created_by_id: string;
    created_at: string;
    updated_at: string;
}
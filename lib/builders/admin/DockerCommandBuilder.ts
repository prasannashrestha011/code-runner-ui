import { CreateDockerImage } from "@/types/dockerimage.types";


export class DockerCommandBuilder {
    private payload: CreateDockerImage;
    constructor() {
        this.payload = { image_tag: "", environment: "" };
    }

    setImageTag(image_tag: string): DockerCommandBuilder {
        this.payload.image_tag = (image_tag || "").trim();
        return this;
    }

    setEnvironment(environment: string): DockerCommandBuilder {
        this.payload.environment = (environment || "").trim();
        return this;
    }

    static build(image_tag: string, environment: string): CreateDockerImage {
        return new DockerCommandBuilder()
            .setImageTag(image_tag)
            .setEnvironment(environment)
            .toPayload();
    }
    toPayload(): CreateDockerImage {
        return { ...this.payload };
    }
}
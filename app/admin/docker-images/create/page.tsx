import CreateDockerImageForm from "@/components/admin/docker-images/CreateDockerImageForm";
import PageHeader from "@/components/admin/docker-images/PageHeader";

export default function CreateDockerImagePage() {
  return (
    <div className="max-w-4xl mx-auto py-xl px-md space-y-xl relative">
      <PageHeader
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Docker Images", href: "/admin/docker-images" },
          { label: "Create" },
        ]}
        title="Create Docker Image"
        description="Create a new Docker image by specifying an image tag. The image will be prepared for use in sandbox environments."
      />

      <CreateDockerImageForm />
    </div>
  );
}

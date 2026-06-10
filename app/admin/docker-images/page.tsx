"use client";

import { useDockerImageList } from "@/hooks/admin/useDockerImage";
import { Loader, ErrorIcon } from "@/components/sandbox/icons";
import Link from "next/link";
import PageHeader from "@/components/admin/docker-images/PageHeader";
import DockerImagesTable from "@/components/admin/docker-images/DockerImagesTable";
import EmptyState from "@/components/admin/docker-images/EmptyState";

export default function DockerImagesPage() {
  const { data: res, isLoading, isError, error } = useDockerImageList();
  const images = res?.data;

  return (
    <div className="max-w-4xl mx-auto py-xl px-md space-y-xl relative">
      <PageHeader
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Docker Images" },
        ]}
        title="Docker Images"
        description="Manage Docker images available for sandbox environments."
        action={
          <Link
            href="/admin/docker-images/create"
            className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary/90 px-5 py-2.5 text-sm font-semibold text-on-primary transition-all duration-150 shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Create Image
          </Link>
        }
      />

      {isLoading && (
        <div className="flex items-center justify-center py-xxl">
          <Loader className="border-primary! border-t-transparent! h-6 w-6" />
        </div>
      )}

      {isError && (
        <div className="bg-error-container border border-error/30 rounded-xl p-xl flex items-start gap-3">
          <ErrorIcon className="text-error text-xl mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-on-error-container">
              Failed to load Docker images
            </p>
            <p className="text-sm text-on-error-container/80 mt-1">
              {error instanceof Error
                ? error.message
                : "An unexpected error occurred."}
            </p>
          </div>
        </div>
      )}

      {images && images.length === 0 && (
        <EmptyState
          title="No Docker images"
          description="Create your first Docker image to get started."
          actionLabel="Create Image"
          actionHref="/admin/docker-images/create"
        />
      )}

      {images && images.length > 0 && <DockerImagesTable images={images} />}
    </div>
  );
}

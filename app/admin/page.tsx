import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto py-xl px-md space-y-xl relative">
      <div className="flex flex-col gap-xs">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-body-md text-on-surface-variant w-full">
          Manage system resources, Docker images, and configuration.
        </p>
      </div>

      <div className="grid gap-lg sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/docker-images"
          className="group bg-white rounded-xl border border-outline-variant/70 shadow-sm p-xl hover:shadow-md hover:border-primary/30 transition-all duration-150"
        >
          <span className="material-symbols-outlined text-3xl text-primary mb-lg block">
            image
          </span>
          <h3 className="text-title-md text-on-surface group-hover:text-primary transition-colors">
            Docker Images
          </h3>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Create and manage Docker images for sandbox environments.
          </p>
        </Link>
      </div>
    </div>
  );
}

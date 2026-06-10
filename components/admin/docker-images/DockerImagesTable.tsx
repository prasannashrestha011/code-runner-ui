import type { DockerImage } from "@/types/dockerimage.types";
import { formatDate } from "@/utils/format";

export default function DockerImagesTable({
  images,
}: {
  images: DockerImage[];
}) {
  return (
    <div className="bg-white rounded-xl border border-outline-variant/70 shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-outline-variant">
            <th className="text-left text-xs font-semibold text-on-surface-disabled uppercase tracking-wider px-xl py-3">
              Image Tag
            </th>
            <th className="text-left text-xs font-semibold text-on-surface-disabled uppercase tracking-wider px-xl py-3">
              Created By
            </th>
            <th className="text-left text-xs font-semibold text-on-surface-disabled uppercase tracking-wider px-xl py-3">
              Created
            </th>
            <th className="text-left text-xs font-semibold text-on-surface-disabled uppercase tracking-wider px-xl py-3">
              Updated
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/50">
          {images.map((img) => (
            <tr
              key={img.id}
              className="hover:bg-surface-container-low transition-colors"
            >
              <td className="px-xl py-3.5">
                <code className="text-sm font-mono font-medium text-on-surface">
                  {img.image_tag}
                </code>
              </td>
              <td className="px-xl py-3.5 text-sm text-on-surface-variant">
                {img.created_by_id}
              </td>
              <td className="px-xl py-3.5 text-sm text-on-surface-variant whitespace-nowrap">
                {formatDate(img.created_at)}
              </td>
              <td className="px-xl py-3.5 text-sm text-on-surface-variant whitespace-nowrap">
                {formatDate(img.updated_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

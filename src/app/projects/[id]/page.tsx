// app/projects/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { TaskBoard } from "@task/TaskBoard";
import { useProject } from "hooks/useProject";
import { getStatusClass, StatusLabels } from "@lib/constants";

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, isError } = useProject(id);

  if (isLoading) return <div className="p-4">Lade Projekt…</div>;
  if (!id || isError || !project)
    return <div className="p-4">Projekt nicht gefunden</div>;

  return (
    <main className="p-6 space-y-6">
      <div className="flex justify-between container mx-auto items-center">
        <h2 className="font-main text-2xl text-gray-600">{project.title}</h2>
        <span
          className={`inline-block px-2 py-1 rounded ${getStatusClass(
            project.status
          )}`}
        >
          {StatusLabels[project.status]}
        </span>
      </div>
      <TaskBoard projectId={id} />
    </main>
  );
};

export default ProjectPage;

// app/projects/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { TaskBoard } from "@task/TaskBoard";
import { useProject } from "hooks/useProject";

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, isError } = useProject(id);
  if (!id || isError || !project)
    return <div className="p-4">Kein Projekt-ID gefunden.</div>;
  if (isLoading) return <div className="p-4">Lade Projekt…</div>;

  return (
    <main className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-600">{project.title}</h2>
      <TaskBoard projectId={id} />
    </main>
  );
};

export default ProjectPage;

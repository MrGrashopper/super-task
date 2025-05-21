"use client";

import { useParams } from "next/navigation";
import { TaskBoard } from "@task/TaskBoard";

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <div className="p-4">Kein Projekt-ID gefunden.</div>;
  return (
    <main className="p-6 space-y-6">
      <TaskBoard projectId={id} />
    </main>
  );
};

export default ProjectPage;

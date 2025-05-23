import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Project } from "@lib/types";

export const useProjects = () => {
  const qc = useQueryClient();

  const query = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => fetch("/api/projects").then((r) => r.json()),
  });

  const add = useMutation<Project, Error, Omit<Project, "id">>({
    mutationFn: (newProj) =>
      fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProj),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });

  const update = useMutation<
    Project,
    Error,
    { id: string; data: Partial<Omit<Project, "id">> }
  >({
    mutationFn: ({ id, data }) =>
      fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });

  const remove = useMutation<void, Error, string>({
    mutationFn: (id) =>
      fetch(`/api/projects/${id}`, { method: "DELETE" }).then(() => {}),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });

  return { ...query, add, update, remove };
};

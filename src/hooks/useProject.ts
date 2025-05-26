import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Project } from "@lib/types";

export const useProject = (projectId: string) => {
  const qc = useQueryClient();

  const query = useQuery<Project, Error>({
    queryKey: ["projects", projectId],
    queryFn: () =>
      fetch(`/api/projects/${projectId}`).then((r) => {
        if (!r.ok) throw new Error("Projekt nicht gefunden");
        return r.json();
      }),
  });

  const update = useMutation<Project, Error, Partial<Project>>({
    mutationFn: (data) =>
      fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => {
        if (!r.ok) throw new Error("Update fehlgeschlagen");
        return r.json();
      }),
    onMutate: async (data) => {
      await qc.cancelQueries({ queryKey: ["projects", projectId] });
      const previous = qc.getQueryData<Project>(["projects", projectId]);
      qc.setQueryData<Project>(["projects", projectId], (old) =>
        old ? { ...old, ...data } : old!
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      const ctx = context as { previous?: Project } | undefined;
      if (ctx?.previous) {
        qc.setQueryData(["projects", projectId], ctx.previous);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["projects", projectId] });
    },
  });

  return { ...query, update };
};

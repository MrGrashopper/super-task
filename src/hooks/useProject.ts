import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Project } from "@lib/types";

export const useProject = (id: string) => {
  const qc = useQueryClient();

  const query = useQuery<Project, Error>({
    queryKey: ["project", id],
    queryFn: () =>
      fetch(`/api/projects/${id}`).then((r) => {
        if (!r.ok) throw new Error("Projekt nicht gefunden");
        return r.json();
      }),
  });

  const update = useMutation<Project, Error, Partial<Project>>({
    mutationFn: (data) =>
      fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => {
        if (!r.ok) throw new Error("Update fehlgeschlagen");
        return r.json();
      }),

    onMutate: async (data) => {
      await qc.cancelQueries({ queryKey: ["project", id] });
      const previous = qc.getQueryData<Project>(["project", id]);
      qc.setQueryData<Project>(["project", id], (old) =>
        old ? { ...old, ...data } : old!
      );
      return { previous };
    },

    onError: (_err, _vars, context: unknown) => {
      const ctx = context as { previous?: Project } | undefined;
      if (ctx?.previous) {
        qc.setQueryData(["project", id], ctx.previous);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["project", id] });
    },
  });

  return { ...query, update };
};

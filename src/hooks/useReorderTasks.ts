import { Status } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useReorderTasks = (projectId: string) => {
  const qc = useQueryClient();
  return useMutation<
    void,
    Error,
    { status: Status; newOrder: { id: string; order: number }[] }
  >({
    mutationFn: (payload) =>
      fetch(`/api/projects/${projectId}/tasks/reorder`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks", projectId] }),
  });
};

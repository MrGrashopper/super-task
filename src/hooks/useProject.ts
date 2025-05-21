import { useQuery } from "@tanstack/react-query";
import type { Project } from "@lib/types";

export const useProject = (id: string) =>
  useQuery<Project>({
    queryKey: ["project", id],
    queryFn: () => fetch(`/api/projects/${id}`).then((r) => r.json()),
  });

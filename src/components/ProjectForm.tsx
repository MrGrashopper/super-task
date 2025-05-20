"use client";
import { useForm } from "react-hook-form";
import { useProjects } from "@/hooks/useProjects";
import { Status } from "@/lib/types";
import { UIButton } from "./ui/Button";

type ProjectFormProps = {
  onClose: () => void;
};

type FormData = {
  title: string;
  description?: string;
  dueDate: string;
  status: Status;
};

export const ProjectForm = ({ onClose }: ProjectFormProps) => {
  const { add } = useProjects();
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date().toISOString().split("T")[0],
      status: "Open",
    },
  });
  const onSubmit = (data: FormData) => {
    add.mutate({ ...data, tasks: [] }, { onSuccess: onClose });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4"
    >
      <div>
        <label className="block mb-1 font-medium">Titel</label>
        <input
          {...register("title", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Beschreibung</label>
        <textarea
          {...register("description")}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Fälligkeitsdatum</label>
        <input
          type="date"
          {...register("dueDate", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select
          {...register("status")}
          className="w-full border rounded px-3 py-2"
        >
          <option value="Open">Open</option>
          <option value="InProgress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <UIButton type="button" variant="secondary" onClick={onClose}>
          Abbrechen
        </UIButton>
        <UIButton type="submit">Speichern</UIButton>
      </div>
    </form>
  );
};

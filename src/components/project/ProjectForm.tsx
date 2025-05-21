"use client";
import { useForm } from "react-hook-form";
import { useProjects } from "hooks/useProjects";
import { FormData } from "@lib/types";
import { UIButton } from "../ui/Button";
import { StatusLabels } from "@lib/constants";

type ProjectFormProps = {
  onClose: () => void;
};

export const ProjectForm = ({ onClose }: ProjectFormProps) => {
  //TODO check validation
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
    add.mutate(
      {
        title: data.title,
        description: data.description,
        dueDate: new Date(data.dueDate).toISOString(),
        status: data.status,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-[90vw] max-w-[800px] p-6 rounded-lg shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-600">Neues Projekt</h2>
      <div>
        <label className="block mb-1 text-gray-600">Titel</label>
        <input
          {...register("title", { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 text-gray-600">Beschreibung</label>
        <textarea
          {...register("description")}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 text-gray-600">Fälligkeitsdatum</label>
        <input
          type="date"
          {...register("dueDate", { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select
          {...register("status")}
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-600"
        >
          {Object.entries(StatusLabels).map(([status, label]) => (
            <option key={status} value={status}>
              {label}
            </option>
          ))}
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

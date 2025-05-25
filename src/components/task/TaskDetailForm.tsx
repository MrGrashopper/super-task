"use client";

import { useForm } from "react-hook-form";
import { StatusLabels } from "@lib/constants";
import type { Task } from "@lib/types";
import { ChevronDown } from "lucide-react";

type Values = Pick<Task, "title" | "description" | "dueDate" | "status">;

type Props = {
  formId?: string;
  initial: Task;
  onSubmit: (v: Values) => void;
};

export const TaskDetailForm = ({ formId, initial, onSubmit }: Props) => {
  const { register, handleSubmit } = useForm<Values>({
    defaultValues: {
      title: initial.title,
      description: initial.description,
      dueDate: initial.dueDate.slice(0, 10),
      status: initial.status,
    },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Titel</label>
        <input
          {...register("title", { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Beschreibung</label>
        <textarea
          {...register("description")}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 space-y-4 sm:space-y-0 sm:space-x-4">
        <div>
          <label className="block mb-1 font-medium">Fälligkeitsdatum</label>
          <input
            type="date"
            {...register("dueDate", { required: true })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <div className="relative">
            <select
              {...register("status")}
              className="appearance-none w-full border border-gray-300 rounded px-3 py-2 pr-8"
            >
              {Object.entries(StatusLabels).map(([s, label]) => (
                <option key={s} value={s}>
                  {label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

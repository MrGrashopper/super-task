"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { UIButton } from "@components/ui";
import { StatusLabels } from "@lib/constants";
import type { Subtask } from "@lib/types";
import { ChevronDown } from "lucide-react";

type Values = Omit<Subtask, "id" | "taskId">;

type Props = {
  initial: Values;
  onSubmit: (vals: Values) => void;
  onCancel?: () => void;
  submitLabel?: string;
};

export const SubtaskForm = ({
  initial,
  onSubmit,
  onCancel,
  submitLabel = "Hinzufügen",
}: Props) => {
  const { register, handleSubmit } = useForm<Values>({
    defaultValues: initial,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-4 rounded shadow-sm"
    >
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
      <div className="grid grid-cols-1 sm:grid-cols-2 space-x-0 sm:space-x-4">
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
      <div className="flex justify-end space-x-2 text-sm text-gray-400">
        {onCancel && (
          <UIButton type="button" variant="abort" onClick={onCancel}>
            Abbrechen
          </UIButton>
        )}
        <UIButton type="submit" variant="ghost">
          {submitLabel}
        </UIButton>
      </div>
    </form>
  );
};

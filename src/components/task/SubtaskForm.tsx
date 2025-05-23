"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { UIButton } from "@components/ui";
import { StatusLabels } from "@lib/constants";
import type { Subtask } from "@lib/types";

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
          <select
            {...register("status")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            {Object.entries(StatusLabels).map(([s, label]) => (
              <option key={s} value={s}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-end space-x-2 text-sm text-gray-400">
        {onCancel && (
          <UIButton type="button" variant="secondary" onClick={onCancel}>
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

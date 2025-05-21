"use client";

import { useForm } from "react-hook-form";
import { UIButton } from "@ui/Button";
import { StatusLabels } from "@lib/constants";
import type { Status } from "@lib/types";

type Values = {
  title: string;
  description?: string;
  dueDate: string;
  status: Status;
};

type Props = {
  headline: string;
  defaultValues: Values;
  onSubmit: (v: Values) => void;
  onClose: () => void;
};

export const EntityForm = ({
  headline,
  defaultValues,
  onSubmit,
  onClose,
}: Props) => {
  const { register, handleSubmit } = useForm<Values>({ defaultValues });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-[90vw] max-w-[800px] p-6 rounded-lg shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-600">{headline}</h2>

      <input
        {...register("title", { required: true })}
        className="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="Titel"
      />

      <textarea
        {...register("description")}
        className="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="Beschreibung"
      />

      <input
        type="date"
        {...register("dueDate", { required: true })}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      <select
        {...register("status")}
        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-600"
      >
        {Object.entries(StatusLabels).map(([s, label]) => (
          <option key={s} value={s}>
            {label}
          </option>
        ))}
      </select>

      <div className="flex justify-end space-x-2">
        <UIButton type="button" variant="secondary" onClick={onClose}>
          Abbrechen
        </UIButton>
        <UIButton type="submit">Speichern</UIButton>
      </div>
    </form>
  );
};

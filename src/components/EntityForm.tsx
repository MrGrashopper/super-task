"use client";

import { useForm } from "react-hook-form";
import { UIButton } from "@ui";
import { StatusLabels } from "@lib/constants";
import type { FormData } from "@lib/types";
import { ChevronDown } from "lucide-react";

type Props = {
  headline?: string;
  defaultValues: FormData;
  onSubmit: (v: FormData) => void;
  onClose?: () => void;
  onDelete?: () => void;
  inline?: boolean;
};

export const EntityForm = ({
  headline,
  defaultValues,
  onSubmit,
  onClose,
  onDelete,
  inline = false,
}: Props) => {
  const { register, handleSubmit } = useForm<FormData>({ defaultValues });

  if (inline) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center space-x-2"
      >
        <input
          {...register("title", { required: true })}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Titel"
        />
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="text-red-600 hover:text-red-800"
          >
            🗑
          </button>
        )}
        <UIButton type="submit">✔︎</UIButton>
      </form>
    );
  }

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
      <div className="relative">
        <select
          {...register("status")}
          className="appearance-none w-full border border-gray-300 rounded px-3 py-2 pr-8 text-gray-600"
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
      <div className="flex justify-end space-x-2">
        {onClose && (
          <UIButton type="button" variant="abort" onClick={onClose}>
            Abbrechen
          </UIButton>
        )}
        <UIButton type="submit">Speichern</UIButton>
      </div>
    </form>
  );
};

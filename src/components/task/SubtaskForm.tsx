// SubtaskForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { StatusLabels } from "@lib/constants";
import type { Subtask } from "@lib/types";
import { UIButton } from "@components/ui";

type Values = Omit<Subtask, "id" | "taskId">;
type Props = {
  initial: Values;
  onSubmit: (v: Values) => void;
  onCancel: () => void;
};

export const SubtaskForm = ({ initial, onSubmit, onCancel }: Props) => {
  const { register, handleSubmit } = useForm<Values>({
    defaultValues: initial,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 bg-white p-3 rounded shadow"
    >
      <input
        {...register("title", { required: true })}
        placeholder="Titel"
        className="w-full border border-gray-300 rounded px-2 py-1"
      />
      <textarea
        {...register("description")}
        placeholder="Beschreibung"
        className="w-full border border-gray-300 rounded px-2 py-1"
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="date"
          {...register("dueDate", { required: true })}
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
        <select
          {...register("status")}
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          {Object.entries(StatusLabels).map(([s, label]) => (
            <option key={s} value={s}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <UIButton type="button" variant="secondary" onClick={onCancel}>
          Abbrechen
        </UIButton>
        <UIButton type="submit" variant="ghost">
          Hinzufügen{" "}
        </UIButton>
      </div>
    </form>
  );
};

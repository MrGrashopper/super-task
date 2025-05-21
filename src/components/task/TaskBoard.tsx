const TaskBoard = ({ tasks, onAdd }: Props) => (
  <div className="flex gap-4 overflow-x-auto lg:overflow-visible">
    {["Open", "InProgress", "Done"].map((s) => (
      <TaskColumn
        key={s}
        status={s}
        tasks={tasks.filter((t) => t.status === s)}
        onAdd={onAdd}
      />
    ))}
  </div>
);

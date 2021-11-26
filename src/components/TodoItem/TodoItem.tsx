import { memo, useState } from "react";

// types
import type { Todo } from "api/resources";
interface Props extends Todo {
  handleToggle: (todoId: Todo["id"], isCompleted: Todo["completed"]) => void;
  disabled?: boolean;
}

function TodoItem({
  completed: defaultCompleted,
  id,
  title,
  userId,
  handleToggle,
  disabled = false,
}: Props) {
  const [completed, setCompleted] = useState(defaultCompleted);
  const labelClassName = [
    "card",
    completed ? "border-success" : "border-info",
    "border",
  ].join(" ");

  return (
    <li
      style={{ transition: "opacity 200ms ease" }}
      className={[disabled ? "disabled" : "", ""].join(" ")}
    >
      <label className={labelClassName}>
        <input
          disabled={disabled}
          type="checkbox"
          checked={completed}
          onChange={({ target }) => {
            const isCompleted = target.checked;
            setCompleted(isCompleted);
            handleToggle(id, isCompleted);
          }}
        />
        <p>{completed ? <del>{title}</del> : title}</p>
      </label>
    </li>
  );
}

export default memo(TodoItem);

import type { Todo } from '../types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className={`item${todo.completed ? ' item--done' : ''}`}>
      <label className="item__label">
        <input
          className="item__check"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="item__text">{todo.text}</span>
      </label>
      <button
        className="btn btn--ghost"
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Удалить задачу «${todo.text}»`}
      >
        Удалить
      </button>
    </li>
  )
}

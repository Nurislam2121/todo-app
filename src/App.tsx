import { useState } from 'react'
import { TodoFilters } from './components/TodoFilters'
import { TodoForm } from './components/TodoForm'
import { TodoItem } from './components/TodoItem'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Filter, Todo } from './types'

const STORAGE_KEY = 'todo-app:todos'

const isTodoList = (value: unknown): value is Todo[] =>
  Array.isArray(value) &&
  value.every(
    (t) =>
      typeof t === 'object' &&
      t !== null &&
      typeof t.id === 'string' &&
      typeof t.text === 'string' &&
      typeof t.completed === 'boolean',
  )

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`

const EMPTY_MESSAGES: Record<Filter, string> = {
  all: 'Задач пока нет. Добавьте первую.',
  active: 'Активных задач нет.',
  completed: 'Выполненных задач пока нет.',
}

export default function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEY, [], isTodoList)
  const [filter, setFilter] = useState<Filter>('all')

  const addTodo = (text: string) => {
    setTodos((prev) => [{ id: createId(), text, completed: false }, ...prev])
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const visibleTodos = todos.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed,
  )
  const activeCount = todos.filter((t) => !t.completed).length

  return (
    <main className="app">
      <h1 className="app__title">Список задач</h1>

      <TodoForm onAdd={addTodo} />
      <TodoFilters value={filter} onChange={setFilter} />

      {visibleTodos.length === 0 ? (
        <p className="empty">{EMPTY_MESSAGES[filter]}</p>
      ) : (
        <ul className="list">
          {visibleTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}

      <p className="counter">Осталось активных: {activeCount}</p>
    </main>
  )
}

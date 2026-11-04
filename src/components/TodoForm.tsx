import { useState, type FormEvent } from 'react'

interface Props {
  onAdd: (text: string) => void
}

export function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState('')
  const canSubmit = text.trim().length > 0

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    onAdd(text.trim())
    setText('')
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="form__input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Что нужно сделать?"
        aria-label="Текст новой задачи"
        autoFocus
      />
      <button className="btn btn--primary" type="submit" disabled={!canSubmit}>
        Добавить
      </button>
    </form>
  )
}

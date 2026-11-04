import type { Filter } from '../types'

interface Props {
  value: Filter
  onChange: (filter: Filter) => void
}

const OPTIONS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Выполненные' },
]

export function TodoFilters({ value, onChange }: Props) {
  return (
    <div className="filters" role="group" aria-label="Фильтр задач">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          className={`filters__btn${value === o.value ? ' filters__btn--active' : ''}`}
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

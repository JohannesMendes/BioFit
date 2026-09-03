export function AuthInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
}: {
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  error?: string
  autoComplete?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-xs font-medium text-bio-ink-soft">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete ?? 'off'}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        className={`rounded-bio-md border bg-bio-surface px-3.5 py-3 font-body text-sm text-bio-paper placeholder:text-bio-ink-soft/60 focus:border-bio-lime ${
          error ? 'border-bio-danger' : 'border-bio-line'
        }`}
      />
      {error && <span className="font-body text-xs text-bio-danger">{error}</span>}
    </label>
  )
}

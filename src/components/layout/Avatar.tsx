import type { AuthUser } from '@/types/auth'

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : ''
  return (first + last).toUpperCase()
}

export function Avatar({ user, size = 36 }: { user: AuthUser | null; size?: number }) {
  const style = { width: size, height: size }

  if (user?.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt={user.name}
        style={style}
        className="rounded-full border border-bio-line object-cover"
      />
    )
  }

  if (user) {
    return (
      <div
        style={style}
        className="flex items-center justify-center rounded-full border border-bio-line bg-bio-surface font-display text-xs font-bold text-bio-lime"
      >
        {initials(user.name)}
      </div>
    )
  }

  return (
    <div
      style={style}
      className="flex items-center justify-center rounded-full border border-bio-line bg-bio-surface text-bio-ink-soft"
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM4 20.5c1.6-3.5 4.7-5.5 8-5.5s6.4 2 8 5.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

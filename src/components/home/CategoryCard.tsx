import { Link } from 'react-router-dom'
import { CategoryIcon } from '@/components/home/CategoryIcon'
import type { MuscleGroup } from '@/types'

/**
 * CategoryCard
 * ------------
 * Tile grande de grupo muscular para a grade 2 colunas da Home — mesmo
 * conceito do mock de referência (nome grande + selo em inglês + selo
 * secundário, sobre uma superfície escura com um acento de cor por
 * grupo), mas sem depender de fotos de banco de imagens: o acento vem de
 * um gradiente + glow + ícone grande, o que fica consistente em qualquer
 * tela, carrega instantâneo e não tem risco de licença.
 */
export function CategoryCard({ group }: { group: MuscleGroup }) {
  return (
    <Link
      to={`/exercicios?grupo=${group.id}`}
      className="group relative flex h-40 flex-col justify-end overflow-hidden rounded-bio-lg border border-bio-line bg-bio-surface p-4 transition-transform active:scale-[0.98]"
    >
      {/* Fundo: gradiente escuro + glow do acento do grupo, no canto superior direito */}
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(120% 100% at 100% 0%, ${group.accent}33 0%, transparent 55%), linear-gradient(160deg, #1D201D 0%, #101210 100%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full opacity-30 blur-2xl transition-opacity group-active:opacity-45"
        style={{ backgroundColor: group.accent }}
      />

      {/* Ícone grande ao fundo, translúcido — ocupa o lugar da "foto" */}
      <CategoryIcon
        groupId={group.id}
        className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 opacity-[0.16]"
        style={{ color: group.accent }}
      />

      {/* Selo em inglês, canto superior esquerdo — igual ao mock (CHEST, BACK...) */}
      <span
        className="absolute left-4 top-4 z-10 rounded-bio-pill px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-wide"
        style={{ backgroundColor: `${group.accent}26`, color: group.accent }}
      >
        {group.tag}
      </span>

      {/* Conteúdo: nome grande + selo secundário, ancorados embaixo */}
      <div className="relative z-10">
        <h3 className="font-display text-xl font-bold leading-none text-bio-paper">{group.name}</h3>
        <span className="mt-2 inline-block rounded-bio-sm bg-black/30 px-2 py-0.5 font-body text-[11px] font-medium text-bio-ink-soft">
          {group.subtag}
        </span>
      </div>
    </Link>
  )
}

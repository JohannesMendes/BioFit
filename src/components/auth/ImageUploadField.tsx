import { useRef } from 'react'
import { Camera } from 'lucide-react'
import { Avatar } from '@/components/layout/Avatar'

/**
 * ImageUploadField
 * ----------------
 * Upload real de arquivo (não URL): a pessoa escolhe uma foto do próprio
 * dispositivo (galeria/câmera no celular), e convertemos para uma data
 * URL (base64) guardada no localStorage junto com a conta.
 *
 * Isso é suficiente para o protótipo, mas vale documentar a limitação:
 * localStorage tem um limite de alguns MB por domínio, então em produção
 * o ideal é enviar o arquivo para um bucket (S3/Cloudinary/Supabase
 * Storage) e guardar só a URL resultante — a troca é direta, já que
 * `onChange` aqui já entrega a imagem pronta para upload.
 */
export function ImageUploadField({
  label,
  name,
  email,
  value,
  onChange,
}: {
  label: string
  name: string
  email: string
  value: string
  onChange: (dataUrl: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File | undefined) {
    if (!file) return
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') onChange(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex items-center gap-3">
      <Avatar user={{ name: name || '?', email, avatarUrl: value }} size={52} />
      <div className="flex-1">
        <span className="mb-1.5 block font-body text-xs font-medium text-bio-ink-soft">{label}</span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-bio-md border border-dashed border-bio-line bg-bio-surface px-3.5 py-3 font-body text-sm font-semibold text-bio-paper"
        >
          <Camera className="h-4 w-4 text-bio-lime" strokeWidth={1.75} />
          {value ? 'Trocar foto' : 'Enviar foto'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    </div>
  )
}

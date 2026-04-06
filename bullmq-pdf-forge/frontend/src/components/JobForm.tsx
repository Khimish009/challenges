import { useState, useRef } from 'react'
import { createJob } from '../api/jobs'
import styles from './JobForm.module.css'

interface Props {
  onJobCreated: (jobId: string) => void
}

export function JobForm({ onJobCreated }: Props) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    setLoading(true)
    setError(null)

    try {
      const { jobId } = await createJob(text.trim())
      onJobCreated(jobId)
      setText('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <span className={styles.badge}>PDF FORGE</span>
        <h2 className={styles.title}>Generate Document</h2>
        <p className={styles.subtitle}>Enter your content below and we'll render it into a PDF</p>
      </div>

      <div className={styles.field}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste your content here…"
          rows={7}
          disabled={loading}
        />
        <div className={styles.charCount}>{text.length} chars</div>
      </div>

      {error && (
        <div className={styles.error}>
          <span className={styles.errorIcon}>!</span>
          {error}
        </div>
      )}

      <button
        type="submit"
        className={styles.button}
        disabled={loading || !text.trim()}
      >
        {loading ? (
          <>
            <span className={styles.spinner} />
            Queuing job…
          </>
        ) : (
          <>
            <span className={styles.buttonArrow}>→</span>
            Generate PDF
          </>
        )}
      </button>
    </form>
  )
}

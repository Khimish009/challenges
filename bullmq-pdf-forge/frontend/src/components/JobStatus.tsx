import { useJobPolling } from '../hooks/useJobPolling'
import { getDownloadUrl } from '../api/jobs'
import styles from './JobStatus.module.css'
import { STATUS_DESCRIPTION, STATUS_LABEL } from '../constants'

export function JobStatus({ jobId }: { jobId: string }) {
  const { job, error } = useJobPolling(jobId)

  const status = job?.status ?? 'waiting'
  const label = STATUS_LABEL[status] ?? status
  const description = STATUS_DESCRIPTION[status] ?? ''
  const isTerminal = status === 'completed' || status === 'failed'

  return (
    <div className={`${styles.card} ${styles[status] ?? ''}`}>
      <div className={styles.topRow}>
        <div className={styles.idTag}>
          <span className={styles.idLabel}>JOB</span>
          <span className={styles.idValue}>#{jobId}</span>
        </div>
        <span className={`${styles.badge} ${styles[`badge_${status}`] ?? ''}`}>
          {label}
        </span>
      </div>

      <div className={styles.body}>
        {error && (
          <div className={styles.networkError}>
            <span>⚠</span> {error} — retrying…
          </div>
        )}

        {!error && !isTerminal && (
          <div className={styles.pulseRow}>
            <span className={styles.pulse} />
            <span className={styles.pulseLabel}>{description}</span>
          </div>
        )}

        {status === 'failed' && (
          <p className={styles.failDesc}>{description}</p>
        )}

        {status === 'completed' && (
          <div className={styles.completedBlock}>
            <div className={styles.checkmark}>✓</div>
            <p className={styles.completedDesc}>{description}</p>
            <a
              href={getDownloadUrl(jobId)}
              className={styles.downloadBtn}
              download
            >
              <span className={styles.downloadIcon}>↓</span>
              Download PDF
            </a>
          </div>
        )}
      </div>

      {!isTerminal && (
        <div className={styles.progress}>
          <div className={styles.progressBar} />
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { JobForm } from './components/JobForm'
import { JobStatus } from './components/JobStatus'
import './App.css'

function App() {
  const [jobId, setJobId] = useState<string | null>(null)

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-symbol">⬡</span>
          <span className="logo-text">BullMQ <em>PDF Forge</em></span>
        </div>
        <p className="app-tagline">Background job processing — powered by BullMQ + Redis</p>
      </header>

      <main className="app-main">
        <JobForm onJobCreated={setJobId} />
        {jobId && <JobStatus jobId={jobId} />}
      </main>

      <footer className="app-footer">
        <span>Polling every 4s</span>
        <span className="dot" />
        <span>NestJS · BullMQ · Redis</span>
      </footer>
    </div>
  )
}

export default App

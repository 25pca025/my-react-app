import { useEffect, useState } from 'react'
import './App.css'

const stages = [
  {
    id: 1,
    icon: '⬆️',
    title: 'Code Push',
    command: 'git push origin main',
    summary: 'You send your latest code from your computer to GitHub.',
    details:
      'Pushing to the main branch is the trigger. GitHub notices the new commit and automatically starts the workflow written in .github/workflows/deploy.yml.',
  },
  {
    id: 2,
    icon: '📦',
    title: 'Install Dependencies',
    command: 'npm ci',
    summary: 'GitHub installs the exact packages your project needs.',
    details:
      'The command npm ci reads package-lock.json and installs the exact versions listed there. This makes every build clean, repeatable and predictable.',
  },
  {
    id: 3,
    icon: '🛠️',
    title: 'Build Application',
    command: 'npm run build',
    summary: 'Vite turns your React code into fast, optimized files.',
    details:
      'Vite bundles and minifies your code into a dist folder. If there is a mistake in the code, this stage fails and nothing gets deployed.',
  },
  {
    id: 4,
    icon: '🌐',
    title: 'Deploy Website',
    command: 'actions/deploy-pages',
    summary: 'The built website is published on GitHub Pages.',
    details:
      'The dist folder is uploaded as an artifact and then published. Your website is updated automatically, with no manual upload.',
  },
]

const STEP_DURATION_MS = 1400

function App() {
  // -1 = not started, 0..3 = stage in progress, 4 = all stages finished
  const [activeStage, setActiveStage] = useState(-1)

  const isIdle = activeStage < 0
  const isSuccess = activeStage >= stages.length
  const isRunning = !isIdle && !isSuccess

  useEffect(() => {
    if (!isRunning) return undefined
    const timer = setTimeout(() => {
      setActiveStage((current) => current + 1)
    }, STEP_DURATION_MS)
    return () => clearTimeout(timer)
  }, [activeStage, isRunning])

  const startPipeline = () => setActiveStage(0)

  const getStageState = (index) => {
    if (isSuccess || index < activeStage) return 'done'
    if (index === activeStage) return 'running'
    return 'pending'
  }

  const progress = isIdle
    ? 0
    : (Math.min(activeStage, stages.length) / stages.length) * 100

  let statusLabel = 'Idle'
  let statusMessage = 'Click “Run Pipeline Demo” to watch the four stages.'
  let statusClass = 'idle'

  if (isRunning) {
    statusLabel = 'Running'
    statusMessage = `Stage ${activeStage + 1} of ${stages.length}: ${stages[activeStage].title}`
    statusClass = 'running'
  } else if (isSuccess) {
    statusLabel = 'Success'
    statusMessage = 'All stages passed. The website is live.'
    statusClass = 'success'
  }

  return (
    <div className="app">
      <header className="hero">
        <p className="hero__tag">GitHub Actions · Vite · GitHub Pages</p>
        <h1>React CI/CD Pipeline</h1>
        <p className="hero__text">
          Every time you push code to GitHub, an automatic pipeline installs,
          builds and publishes your React website. No manual steps needed.
        </p>
        <button
          type="button"
          className="btn"
          onClick={startPipeline}
          disabled={isRunning}
        >
          {isRunning
            ? 'Pipeline running…'
            : isSuccess
              ? 'Run Demo Again'
              : 'Run Pipeline Demo'}
        </button>
      </header>

      <main className="content">
        <section className="status-card" aria-live="polite">
          <div className="status-card__top">
            <h2>Pipeline Status</h2>
            <span className={`badge badge--${statusClass}`}>{statusLabel}</span>
          </div>
          <p className="status-card__message">{statusMessage}</p>
          <div
            className="progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div className="progress__bar" style={{ width: `${progress}%` }} />
          </div>
          <p className="status-card__note">
            This is a demo animation. To see your real pipeline, open the
            Actions tab of your GitHub repository.
          </p>
        </section>

        <section>
          <h2 className="section-title">The Four Pipeline Stages</h2>
          <ol className="stages">
            {stages.map((stage, index) => {
              const state = getStageState(index)
              return (
                <li key={stage.id} className={`stage stage--${state}`}>
                  <div className="stage__number">
                    {state === 'done' ? '✓' : stage.id}
                  </div>
                  <div className="stage__body">
                    <h3>
                      <span aria-hidden="true">{stage.icon}</span> {stage.title}
                    </h3>
                    <p className="stage__summary">{stage.summary}</p>
                    <code className="stage__command">{stage.command}</code>
                    <p className="stage__details">{stage.details}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        <section className="info-grid">
          <article className="info-card">
            <h3>What is CI?</h3>
            <p>
              Continuous Integration means your code is installed and built
              automatically on every change, so mistakes are found early.
            </p>
          </article>
          <article className="info-card">
            <h3>What is CD?</h3>
            <p>
              Continuous Deployment means a successful build is published
              automatically, so your website is always up to date.
            </p>
          </article>
          <article className="info-card">
            <h3>Pull Requests</h3>
            <p>
              For pull requests the pipeline only runs the build check. The
              deploy stage runs only after a push to main.
            </p>
          </article>
        </section>
      </main>

      <footer className="footer">
        <p>React CI/CD Pipeline · Built with React, Vite and GitHub Actions</p>
      </footer>
    </div>
  )
}

export default App

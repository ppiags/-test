import { render } from 'preact'
import { StrictMode } from 'react'
import { Select } from './components/Select/Select'
import './style.css'

export function App() {
  return (
    <StrictMode>
      <div className="main-container">
        <Select />
      </div>
    </StrictMode>
  )
}

render(<App />, document.getElementById('app'))

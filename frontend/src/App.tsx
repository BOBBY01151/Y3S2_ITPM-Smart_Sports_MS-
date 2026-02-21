import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [status, setStatus] = useState<string>('Loading...')
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001'

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setStatus(response.data)
      })
      .catch(error => {
        console.error('API Error:', error)
        setStatus('Error connecting to API')
      })
  }, [apiUrl])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>MERN Stack + TypeScript</h1>
      <p>Backend Status: <strong>{status}</strong></p>
      <div style={{ marginTop: '20px' }}>
        <p>Edit <code>src/App.tsx</code> to start building your Smart Sports MS.</p>
      </div>
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from './components/Loader'

function App() {
  const [status, setStatus] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001'

  useEffect(() => {
    // Simulate a minimum loading time for visual appeal
    const timer = setTimeout(() => {
      axios.get(apiUrl)
        .then(response => {
          setStatus(response.data)
        })
        .catch(error => {
          console.error('API Error:', error)
          setStatus('Error connecting to API')
        })
        .finally(() => {
          setLoading(false)
        })
    }, 2000);

    return () => clearTimeout(timer);
  }, [apiUrl])

  if (loading) {
    return <Loader />
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: "'Inter', sans-serif",
      backgroundColor: '#0a0e14',
      color: '#ffffff'
    }}>
      <h1 style={{
        color: '#00f2ff',
        fontSize: '3rem',
        marginBottom: '1rem',
        textShadow: '0 0 20px rgba(0, 242, 255, 0.3)'
      }}>
        Smart Sports MS
      </h1>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '2rem 4rem',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '1.2rem', color: '#8892b0' }}>Backend Status</p>
        <p style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: status.includes('Error') ? '#ff4b2b' : '#00f2ff'
        }}>
          {status}
        </p>
      </div>
      <div style={{ marginTop: '30px', color: '#4a5568' }}>
        <p>Your premium MERN stack environment is ready.</p>
      </div>
    </div>
  )
}

export default App

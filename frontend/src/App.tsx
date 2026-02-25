import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from './components/Loader'
import Login from './pages/Login'
import Register from './pages/Register'
import Stores from './pages/Stores'
import SettingsPage from './pages/Settings'
import { isAuthenticated, logoutUser, getCurrentUser } from './services/authService'
import { LogOut, User as UserIcon, Settings, Bell, Calendar, ShoppingBag } from 'lucide-react'

// Protected Route Component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />
}

function Dashboard() {
  const [status, setStatus] = useState<string>('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'overview' | 'stores' | 'settings'>('overview')
  const navigate = useNavigate();
  const user = getCurrentUser();
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

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Mobile Header */}
      <header className="mobile-header">
        <h1 className="logo-text">SMART<span>SPORTS</span></h1>
        <button onClick={toggleSidebar} className="menu-toggle">
          {isSidebarOpen ? <LogOut size={24} /> : <Calendar size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo-section">
          <h1 className="logo-text">SMART<span>SPORTS</span></h1>
        </div>
        <nav className="nav-menu">
          <div className={`nav-item ${currentView === 'overview' ? 'active' : ''}`} onClick={() => { setCurrentView('overview'); setIsSidebarOpen(false); }}><Calendar size={20} /> Overview</div>
          <div className={`nav-item ${currentView === 'stores' ? 'active' : ''}`} onClick={() => { setCurrentView('stores'); setIsSidebarOpen(false); }}><ShoppingBag size={20} /> Stores</div>
          <div className="nav-item" onClick={() => setIsSidebarOpen(false)}><UserIcon size={20} /> Athletes</div>
          <div className="nav-item" onClick={() => setIsSidebarOpen(false)}><Bell size={20} /> Notifications</div>
          <div className={`nav-item ${currentView === 'settings' ? 'active' : ''}`} onClick={() => { setCurrentView('settings'); setIsSidebarOpen(false); }}><Settings size={20} /> Settings</div>
        </nav>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <h2>{currentView === 'overview' ? `Welcome back, ${user?.firstName}!` : 'Product Catalog'}</h2>
          <div className="header-actions">
            <span className="api-status" style={{ color: status.includes('Error') ? '#ff4b2b' : '#00f2ff' }}>
              System: {status}
            </span>
            <div className="user-profile">
              <div className="avatar">{user?.firstName?.[0]}{user?.lastName?.[0]}</div>
            </div>
          </div>
        </header>

        {currentView === 'overview' ? (
          <>
            <section className="dashboard-grid">
              <div className="stat-card">
                <h3>Active Events</h3>
                <p className="stat-value">12</p>
              </div>
              <div className="stat-card">
                <h3>Total Athletes</h3>
                <p className="stat-value">248</p>
              </div>
              <div className="stat-card">
                <h3>Upcoming Matches</h3>
                <p className="stat-value">5</p>
              </div>
            </section>

            <section className="recent-activity">
              <h3>Your Account Details</h3>
              <div className="details-card">
                <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Phone:</strong> {user?.phoneNumber}</p>
              </div>
            </section>
          </>
        ) : currentView === 'stores' ? (
          <Stores />
        ) : (
          <SettingsPage />
        )}
      </main>

      <style>{`
        .dashboard-container {
          display: flex;
          color: #fff;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          position: relative;
        }

        .mobile-header {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: #0a0e14;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding: 0 20px;
          z-index: 1000;
          align-items: center;
          justify-content: space-between;
        }

        .menu-toggle {
          background: transparent;
          border: none;
          color: #00f2ff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sidebar {
          width: 260px;
          height: 100%;
          background: #0a0e14;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          padding: 30px 20px;
          transition: transform 0.3s ease;
          z-index: 1001;
          flex-shrink: 0;
        }

        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 1000;
        }

        .logo-section {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 50px;
          color: #fff;
        }

        .mobile-header .logo-text {
          margin-bottom: 0;
          font-size: 1.2rem;
        }

        .logo-text span {
          color: #00f2ff;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          color: #8892b0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-item.active, .nav-item:hover {
          background: rgba(0, 242, 255, 0.1);
          color: #00f2ff;
        }

        .logout-btn {
          margin-top: auto;
          background: transparent;
          border: 1px solid rgba(255, 75, 43, 0.3);
          color: #ff4b2b;
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: rgba(255, 75, 43, 0.1);
        }

        .main-content {
          flex: 1;
          height: 100%;
          overflow-y: auto;
          padding: 40px;
          background: #0a0e14;
        }

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .api-status {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .avatar {
          width: 40px;
          height: 40px;
          background: #00f2ff;
          color: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.03);
          padding: 24px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .stat-card h3 {
          color: #8892b0;
          font-size: 0.9rem;
          margin-bottom: 12px;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: #00f2ff;
        }

        .details-card {
          margin-top: 20px;
          background: rgba(255, 255, 255, 0.03);
          padding: 30px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .details-card p {
          color: #8892b0;
        }

        .details-card strong {
          color: #fff;
          margin-right: 10px;
        }

        @media (max-width: 991px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            transform: translateX(-100%);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .mobile-header {
            display: flex;
          }

          .main-content {
            padding-top: 80px;
            padding-left: 20px;
            padding-right: 20px;
          }

          .content-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .stat-value {
            font-size: 1.5rem;
          }
          
          .details-card {
            padding: 20px;
          }
          
          .api-status {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

function App() {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000);
    return () => clearTimeout(timer);
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { Mail, Lock, ArrowRight, LogIn } from 'lucide-react';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginUser(credentials);
      navigate('/'); // Redirect to dashboard/home after login
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-icon-wrapper">
          <LogIn size={40} color="#00f2ff" />
        </div>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to your Smart Sports account</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label><Mail size={16} /> Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label><Lock size={16} /> Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'} <ArrowRight size={18} />
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>

      <style>{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .auth-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 40px;
          border-radius: 24px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 480px) {
          .auth-card {
            padding: 30px 20px;
            border-radius: 16px;
          }
          
          .auth-title {
            font-size: 1.5rem;
          }

          .auth-icon-wrapper {
            padding: 15px;
            margin-bottom: 20px;
          }
          
          .auth-icon-wrapper svg {
            width: 32px;
            height: 32px;
          }
        }

        .auth-icon-wrapper {
          align-self: center;
          background: rgba(0, 242, 255, 0.1);
          padding: 20px;
          border-radius: 50%;
          margin-bottom: 24px;
          border: 1px solid rgba(0, 242, 255, 0.2);
        }

        .auth-title {
          color: #fff;
          font-size: 2rem;
          margin-bottom: 8px;
          font-weight: 800;
          text-align: center;
        }

        .auth-subtitle {
          color: #8892b0;
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          color: #00f2ff;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .input-group input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px 16px;
          border-radius: 12px;
          color: #fff;
          transition: all 0.3s ease;
        }

        .input-group input:focus {
          border-color: #00f2ff;
          background: rgba(255, 255, 255, 0.08);
          outline: none;
          box-shadow: 0 0 15px rgba(0, 242, 255, 0.2);
        }

        .auth-button {
          background: #00f2ff;
          color: #000;
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }

        .auth-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 242, 255, 0.3);
        }

        .auth-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error-message {
          background: rgba(255, 75, 43, 0.1);
          border: 1px solid rgba(255, 75, 43, 0.3);
          color: #ff4b2b;
          padding: 12px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-size: 0.9rem;
          text-align: center;
        }

        .auth-switch {
          text-align: center;
          margin-top: 24px;
          color: #8892b0;
          font-size: 0.9rem;
        }

        .auth-switch a {
          color: #00f2ff;
          text-decoration: none;
          font-weight: 600;
        }

        .auth-switch a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await registerUser(formData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join the Smart Sports community</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="input-group">
              <label><User size={16} /> First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label><User size={16} /> Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label><Mail size={16} /> Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label><Phone size={16} /> Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="+1 234 567 890"
              value={formData.phoneNumber}
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
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label><Lock size={16} /> Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'} <ArrowRight size={18} />
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
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
          max-width: 500px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 600px) {
          .auth-card {
            padding: 30px 20px;
            border-radius: 16px;
          }
          
          .auth-title {
            font-size: 1.5rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 15px;
          }
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

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
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

export default Register;

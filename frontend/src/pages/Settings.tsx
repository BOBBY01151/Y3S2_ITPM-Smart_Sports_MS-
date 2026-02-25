import React, { useState } from 'react';
import { User, Shield, Bell, Camera, Save, Lock, Trash2 } from 'lucide-react';
import { getCurrentUser } from '../services/authService';

const Settings: React.FC = () => {
    const user = getCurrentUser();
    const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'notifications'>('profile');

    return (
        <div className="settings-container">
            <header className="settings-header">
                <h2 className="title">Account Settings</h2>
                <p className="subtitle">Manage your profile, security, and application preferences</p>
            </header>

            <div className="settings-layout">
                {/* Settings Navigation */}
                <aside className="settings-nav">
                    <button
                        className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <User size={18} /> Profile
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'account' ? 'active' : ''}`}
                        onClick={() => setActiveTab('account')}
                    >
                        <Shield size={18} /> Security
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <Bell size={18} /> Notifications
                    </button>
                </aside>

                {/* Settings Content */}
                <main className="settings-content">
                    {activeTab === 'profile' && (
                        <div className="settings-section">
                            <div className="profile-upload">
                                <div className="avatar-large">{user?.firstName?.[0]}{user?.lastName?.[0]}</div>
                                <div className="upload-info">
                                    <h3>Profile Picture</h3>
                                    <p>PNG or JPG, max 5MB</p>
                                    <button className="secondary-btn"><Camera size={14} /> Change Photo</button>
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" defaultValue={user?.firstName} />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" defaultValue={user?.lastName} />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" defaultValue={user?.email} disabled />
                                    <span className="input-hint">Email cannot be changed after registration.</span>
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" defaultValue={user?.phoneNumber} />
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label>Bio</label>
                                <textarea placeholder="Tell us about yourself..." rows={4}></textarea>
                            </div>

                            <div className="section-footer">
                                <button className="primary-btn"><Save size={18} /> Save Changes</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'account' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h3><Lock size={18} /> Change Password</h3>
                                <p>Ensure your account is using a long, random password to stay secure.</p>
                            </div>
                            <div className="form-grid stacked">
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <input type="password" placeholder="••••••••" />
                                </div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input type="password" placeholder="••••••••" />
                                </div>
                                <div className="form-group">
                                    <label>Confirm New Password</label>
                                    <input type="password" placeholder="••••••••" />
                                </div>
                            </div>

                            <div className="danger-zone">
                                <div className="danger-content">
                                    <h3>Delete Account</h3>
                                    <p>Once you delete your account, there is no going back. Please be certain.</p>
                                </div>
                                <button className="danger-btn"><Trash2 size={18} /> Delete Account</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="settings-section">
                            <div className="notification-list">
                                <div className="notification-item">
                                    <div className="noti-info">
                                        <h4>Event Updates</h4>
                                        <p>Get notified when event times or locations change.</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <div className="notification-item">
                                    <div className="noti-info">
                                        <h4>Store Recommendations</h4>
                                        <p>Updates on new gear listed in the Council Store.</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <div className="notification-item">
                                    <div className="noti-info">
                                        <h4>System Maintenance</h4>
                                        <p>Alerts about planned system downtime or updates.</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            <style>{`
        .settings-container {
          padding: 20px 0;
          color: #fff;
          font-family: 'Inter', sans-serif;
        }

        .settings-header {
          margin-bottom: 40px;
        }

        .settings-header .title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .settings-header .subtitle {
          color: #8892b0;
        }

        .settings-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 40px;
        }

        .settings-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          border: none;
          background: transparent;
          color: #8892b0;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .nav-btn.active, .nav-btn:hover {
          background: rgba(0, 242, 255, 0.1);
          color: #00f2ff;
        }

        .settings-content {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 40px;
        }

        .profile-upload {
          display: flex;
          align-items: center;
          gap: 25px;
          margin-bottom: 40px;
          padding-bottom: 30px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .avatar-large {
          width: 80px;
          height: 80px;
          background: #00f2ff;
          color: #000;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 800;
        }

        .upload-info h3 {
          font-size: 1.1rem;
          margin-bottom: 4px;
        }

        .upload-info p {
          color: #8892b0;
          font-size: 0.9rem;
          margin-bottom: 12px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 25px;
        }

        .form-grid.stacked {
          grid-template-columns: 1fr;
          max-width: 400px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #8892b0;
        }

        .form-group input, .form-group textarea {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 12px 16px;
          border-radius: 12px;
          color: #fff;
          outline: none;
          transition: all 0.3s ease;
        }

        .form-group input:focus, .form-group textarea:focus {
          border-color: #00f2ff;
          background: rgba(0, 242, 255, 0.05);
        }

        .input-hint {
          font-size: 0.8rem;
          color: #8892b0;
          font-style: italic;
        }

        .section-footer {
          margin-top: 30px;
          display: flex;
          justify-content: flex-end;
        }

        /* Buttons */
        .primary-btn {
          background: #00f2ff;
          color: #000;
          border: none;
          padding: 12px 30px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .primary-btn:hover {
          background: #33f5ff;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 242, 255, 0.3);
        }

        .secondary-btn {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .danger-btn {
          background: rgba(255, 75, 43, 0.1);
          color: #ff4b2b;
          border: 1px solid rgba(255, 75, 43, 0.2);
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .danger-btn:hover {
          background: #ff4b2b;
          color: #fff;
        }

        .danger-zone {
          margin-top: 50px;
          padding-top: 40px;
          border-top: 1px solid rgba(255, 75, 43, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
        }

        .danger-content h3 {
          color: #ff4b2b;
          margin-bottom: 5px;
        }

        .danger-content p {
          color: #8892b0;
          font-size: 0.9rem;
        }

        .notification-list {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .notification-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .noti-info h4 {
          margin-bottom: 4px;
          font-size: 1.1rem;
        }

        .noti-info p {
          color: #8892b0;
          font-size: 0.9rem;
        }

        /* Toggle Switch */
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.1);
          transition: .4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: #fff;
          transition: .4s;
        }

        input:checked + .slider {
          background-color: #00f2ff;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }

        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }

        @media (max-width: 991px) {
          .settings-layout {
            grid-template-columns: 1fr;
          }
          
          .settings-nav {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 15px;
          }

          .nav-btn {
            white-space: nowrap;
          }
        }

        @media (max-width: 600px) {
          .settings-content {
            padding: 25px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .danger-zone {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
        </div>
    );
};

export default Settings;

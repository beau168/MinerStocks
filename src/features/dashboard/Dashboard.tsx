import React from 'react';
import { useAuth } from '../../core/auth/AuthContext';
import { LogOut, User, LayoutDashboard, Settings, Bell, Search } from 'lucide-react';

export const DashboardComponent: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="dashboard-container">
            <nav className="nav">
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <h2 style={{ color: 'var(--primary)' }}>Platform</h2>
                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        <span style={{ color: 'var(--text)', cursor: 'pointer' }}>Overview</span>
                        <span style={{ cursor: 'pointer' }}>Analytics</span>
                        <span style={{ cursor: 'pointer' }}>Reports</span>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <Search size={20} className="text-muted" style={{ cursor: 'pointer' }} />
                    <Bell size={20} className="text-muted" style={{ cursor: 'pointer' }} />
                    <div className="user-badge">
                        <div className="avatar">
                            {user?.email?.[0].toUpperCase() || 'U'}
                        </div>
                        <span style={{ fontSize: '0.875rem' }}>{user?.email}</span>
                        <button
                            onClick={() => logout()}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </nav>

            <main>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Welcome back, {user?.email}! Here's what's happening today.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                    {[
                        { label: 'Total Users', value: '2,543', trend: '+12.5%', icon: User },
                        { label: 'Active Sessions', value: '432', trend: '+5.2%', icon: LayoutDashboard },
                        { label: 'API Health', value: '100%', trend: 'Stable', icon: Settings },
                    ].map((stat) => (
                        <div key={stat.label} className="auth-card" style={{ padding: '1.5rem', maxWidth: 'none' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{stat.label}</span>
                                <stat.icon size={20} color="var(--primary)" />
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stat.value}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.5rem' }}>{stat.trend}</div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

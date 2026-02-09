import React from 'react';
import { SquaresFour, Buildings, UsersThree, CalendarCheck, Gear, SignOut, Cube } from '@phosphor-icons/react';

const Sidebar = ({ currentPage, setCurrentPage }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <SquaresFour size={24} /> },
        { id: 'projects', label: 'Projects', icon: <Buildings size={24} /> },
        { id: 'leads', label: 'Leads Analytics', icon: <UsersThree size={24} /> },
        { id: 'visits', label: 'Site Visits', icon: <CalendarCheck size={24} /> },
    ];

    const sidebarStyle = {
        width: '260px',
        background: 'var(--pivot-blue-dark)',
        color: 'var(--white)',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1.5rem',
        position: 'fixed',
        height: '100vh',
        zIndex: 100,
    };

    const navLinkStyle = (active) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '0.8rem 1rem',
        color: active ? 'var(--white)' : 'rgba(255, 255, 255, 0.7)',
        textDecoration: 'none',
        borderRadius: 'var(--radius-md)',
        background: active ? 'var(--pivot-blue-light)' : 'transparent',
        transition: 'var(--transition)',
        cursor: 'pointer',
        marginBottom: '0.5rem',
    });

    return (
        <aside style={sidebarStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', fontWeight: 700, marginBottom: '3rem' }}>
                <div style={{ width: '32px', height: '32px', background: 'var(--pivot-blue-light)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px var(--pivot-blue-light)' }}>
                    <Cube size={20} weight="bold" color="white" />
                </div>
                <span>Reality-OS</span>
            </div>

            <nav style={{ flex: 1 }}>
                {navItems.map((item) => (
                    <div
                        key={item.id}
                        style={navLinkStyle(currentPage === item.id)}
                        onClick={() => setCurrentPage(item.id)}
                        onMouseEnter={(e) => { if (currentPage !== item.id) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}
                        onMouseLeave={(e) => { if (currentPage !== item.id) e.currentTarget.style.background = 'transparent'; }}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                ))}
            </nav>

            <div style={{ marginTop: 'auto' }}>
                <div
                    style={navLinkStyle(false)}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                    <Gear size={24} />
                    <span>Settings</span>
                </div>
                <div
                    style={navLinkStyle(false)}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                    <SignOut size={24} />
                    <span>Logout</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

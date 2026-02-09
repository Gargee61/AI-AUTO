import React from 'react';
import { MagnifyingGlass, Bell, ChatCircleDots } from '@phosphor-icons/react';

const Header = () => {
    const headerStyle = {
        height: '70px',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--glass-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 90,
    };

    return (
        <header style={headerStyle}>
            <div className="search-bar" style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--light-grey)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                width: '300px',
                border: '1px solid transparent',
                transition: 'var(--transition)'
            }}>
                <MagnifyingGlass size={20} />
                <input
                    type="text"
                    placeholder="Search leads, projects..."
                    style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: '10px', width: '100%' }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button className="icon-btn" style={{ background: 'none', border: 'none', color: 'var(--charcoal)', cursor: 'pointer', position: 'relative' }}>
                    <Bell size={24} />
                    <span style={{ width: '8px', height: '8px', background: '#ff4d4d', borderRadius: '50%', position: 'absolute', top: '-2px', right: '-2px', border: '2px solid var(--white)' }}></span>
                </button>
                <button className="icon-btn" style={{ background: 'none', border: 'none', color: 'var(--charcoal)', cursor: 'pointer' }}>
                    <ChatCircleDots size={24} />
                </button>
                <div className="profile" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>Alex Rodriguez</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--charcoal)', margin: 0 }}>Administrator</p>
                    </div>
                    <img src="https://ui-avatars.com/api/?name=Alex+Rodriguez&background=0047AB&color=fff" alt="Profile" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                </div>
            </div>
        </header>
    );
};

export default Header;

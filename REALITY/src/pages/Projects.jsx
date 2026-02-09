import React from 'react';
import { Buildings, HouseLine, Tree, Waves, MapPin } from '@phosphor-icons/react';

const ProjectCard = ({ name, location, progress, units, available, status, icon: Icon, statusColor }) => (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0', padding: '0', overflow: 'hidden' }}>
        <div style={{ height: '180px', background: 'var(--pivot-blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Icon size={64} weight="thin" style={{ color: 'var(--pivot-blue-light)', opacity: 0.3 }} />
            <span style={{
                position: 'absolute', top: '15px', right: '15px', padding: '4px 12px', borderRadius: '20px',
                fontSize: '0.75rem', fontWeight: 600, background: 'rgba(255, 255, 255, 0.9)',
                color: statusColor, boxShadow: 'var(--shadow-elevation)'
            }}>
                {status}
            </span>
        </div>
        <div style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{name}</h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--charcoal)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '1.2rem' }}>
                <MapPin size={16} />
                <span>{location}</span>
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px' }}>
                    <span>Construction Progress</span>
                    <span style={{ fontWeight: 600 }}>{progress}%</span>
                </div>
                <div style={{ height: '8px', background: 'var(--light-grey)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: 'var(--pivot-blue)', borderRadius: '4px' }}></div>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingTop: '1.2rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--charcoal)' }}>Total Units</span>
                    <div style={{ fontWeight: 600 }}>{units}</div>
                </div>
                <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--charcoal)' }}>Available</span>
                    <div style={{ fontWeight: 600 }}>{available}</div>
                </div>
            </div>
        </div>
    </div>
);

const Projects = () => {
    const projects = [
        { name: 'Skyline Towers', location: 'Downtown District', progress: 85, units: 240, available: 36, status: '85% Done', icon: Buildings, statusColor: '#4CAF50' },
        { name: 'Green Valley Estate', location: 'Northwood Suburbs', progress: 42, units: 120, available: 68, status: '42% Done', icon: Tree, statusColor: '#ff9f4d' },
        { name: 'Oceanfront Villas', location: 'Coastal Bay', progress: 12, units: 45, available: 40, status: '12% Done', icon: Waves, statusColor: '#ff4d4d' },
        { name: 'The Nexus Hub', location: 'Tech Park South', progress: 0, units: 80, available: 'Concept', status: 'Planning', icon: HouseLine, statusColor: 'var(--charcoal)' },
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Active Projects</h1>
                    <p style={{ color: 'var(--charcoal)', fontSize: 0.9, marginTop: 5 }}>Manage construction sites.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {['All', 'Construction', 'Planning'].map((f, i) => (
                        <button key={i} style={{
                            background: i === 0 ? 'var(--pivot-blue)' : 'var(--white)',
                            color: i === 0 ? 'var(--white)' : 'var(--soft-black)',
                            border: '1px solid var(--glass-border)', padding: '8px 16px', borderRadius: 'var(--radius-md)', cursor: 'pointer'
                        }}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
            </div>
        </div>
    );
};

export default Projects;

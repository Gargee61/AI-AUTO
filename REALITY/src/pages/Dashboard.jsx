import React from 'react';
import { UserPlus, Lightning, Calendar, CurrencyDollar, Plus } from '@phosphor-icons/react';
import LeadStatusChart from '../components/LeadStatusChart';

const MetricCard = ({ icon: Icon, title, value, detail, detailColor, action }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div
            className="card overview-card"
            style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'var(--pivot-blue-soft)', color: 'var(--pivot-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                    <Icon size={24} weight="bold" />
                </div>
                {action && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--pivot-blue-soft)',
                        transition: 'all 0.3s ease',
                        color: 'var(--pivot-blue)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }} className="metric-action-btn">
                        <Plus size={20} weight="bold" />
                        <span style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{action.label}</span>
                    </div>
                )}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--charcoal)', fontWeight: 500 }}>{title}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{value}</div>
            <div style={{ fontSize: '0.75rem', marginTop: '5px', color: detailColor || 'inherit' }}>
                {typeof detail === 'string' ? detail : detail(isHovered)}
            </div>
        </div>
    );
};

const Dashboard = ({ setCurrentPage }) => {
    const [hoveredStatus, setHoveredStatus] = React.useState(null);
    const [selectedStatus, setSelectedStatus] = React.useState(null);

    const activeStatus = hoveredStatus || selectedStatus;

    const analyticsData = {
        'Hot': { color: '#ff4d4d', projects: ['Skyline Towers', 'Green Valley'], conversion: '85%', visits: 12 },
        'Warm': { color: '#ff9f4d', projects: ['Oceanview', 'Central Park'], conversion: '45%', visits: 24 },
        'Cold': { color: '#4d9fff', projects: ['Oak Ridge', 'Sunset Villas'], conversion: '12%', visits: 12 },
    };

    const leads = [
        { name: 'Johnathan Smith', budget: '$450k - $600k', status: 'Hot', color: '#ff4d4d', bg: '#ffebeb', assigned: 'Sarah Jenkins', last: '2h ago' },
        { name: 'Elena Rodriguez', budget: '$1.2M - $1.5M', status: 'Warm', color: '#ff9f4d', bg: '#fff4eb', assigned: 'Michael Chen', last: '5h ago' },
        { name: 'David Wilson', budget: '$300k - $400k', status: 'Cold', color: '#4d9fff', bg: '#ebf4ff', assigned: 'Sarah Jenkins', last: 'Yesterday' },
    ];

    const renderLeadsDetail = (isHovered) => (
        <div style={{ display: 'flex', gap: '8px', transition: 'all 0.3s ease' }}>
            <span style={{ color: isHovered ? '#ff4d4d' : 'inherit', fontWeight: isHovered ? 700 : 500 }}>120 Hot</span>
            <span style={{ opacity: 0.3 }}>•</span>
            <span style={{ color: isHovered ? '#ff9f4d' : 'inherit', fontWeight: isHovered ? 700 : 500 }}>450 Warm</span>
            <span style={{ opacity: 0.3 }}>•</span>
            <span style={{ color: isHovered ? '#4d9fff' : 'inherit', fontWeight: isHovered ? 700 : 500 }}>714 Cold</span>
        </div>
    );

    return (
        <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            <MetricCard
                icon={UserPlus}
                title="Total Leads"
                value="1,284"
                detail={renderLeadsDetail}
            />
            <MetricCard
                icon={Lightning}
                title="Active Projects"
                value="12"
                detail="+2 this month"
                detailColor="#4CAF50"
                action={{ label: 'Add Projects' }}
            />
            <MetricCard icon={Calendar} title="Site Visits" value="48" detail="12 scheduled today" detailColor="var(--pivot-blue)" />
            <MetricCard icon={CurrencyDollar} title="Projected Revenue" value="$4.2M" detail="15% growth" detailColor="#4CAF50" />

            {/* Leads Distribution & Management Section */}
            <div className="card"
                style={{
                    gridColumn: 'span 3',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    cursor: selectedStatus ? 'pointer' : 'default'
                }}
                onDoubleClick={() => setSelectedStatus(null)}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 0.5rem' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Leads Distribution & Analysis</h2>
                    <span
                        style={{ color: 'var(--pivot-blue)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}
                        onClick={() => setCurrentPage('leads')}
                    >
                        View Full Analytics
                    </span>
                </div>

                {/* Top Section: Chart and Reveal Panel */}
                <div style={{ display: 'flex', gap: '2rem', minHeight: '260px', alignItems: 'center', background: 'rgba(0, 71, 171, 0.02)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
                    <div style={{ flexShrink: 0 }}>
                        <LeadStatusChart
                            compact={false}
                            onHover={setHoveredStatus}
                            onClick={setSelectedStatus}
                            selection={selectedStatus}
                        />
                    </div>

                    {/* Reveal Details Panel */}
                    <div style={{
                        flex: 1,
                        opacity: activeStatus ? 1 : 0.5,
                        transform: activeStatus ? 'translateX(0)' : 'translateX(10px)',
                        transition: 'all 0.4s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '1rem',
                        borderLeft: '1px solid var(--glass-border)'
                    }}>
                        {activeStatus ? (
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: analyticsData[activeStatus].color, marginBottom: '0.5rem' }}>
                                    {activeStatus} Status Impact
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                                    <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--charcoal)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '5px' }}>Top Projects</div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{analyticsData[activeStatus].projects.join(', ')}</div>
                                    </div>
                                    <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--charcoal)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '5px' }}>Conversion Rate</div>
                                        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: analyticsData[activeStatus].color }}>{analyticsData[activeStatus].conversion}</div>
                                    </div>
                                </div>
                                <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--charcoal)', opacity: 0.7 }}>
                                    {activeStatus === 'Hot' ? 'Primary focus for sales closure this week.' :
                                        activeStatus === 'Warm' ? 'Requires follow-up calls and site visit invitations.' :
                                            'Potential for long-term nurturing.'}
                                </p>
                                {selectedStatus && (
                                    <div style={{ marginTop: '1rem', fontSize: '0.7rem', color: 'var(--pivot-blue)', fontStyle: 'italic' }}>
                                        Double-click background to reset view
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', color: 'var(--charcoal)', opacity: 0.6 }}>
                                <div style={{ fontSize: '1rem', fontWeight: 500 }}>Hover over chart segments</div>
                                <div style={{ fontSize: '0.8rem' }}>to view contextual lead insights</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Section: Leads Management Table */}
                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--soft-black)', marginBottom: '1rem', padding: '0 0.5rem' }}>Recent Leads Performance</h3>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', color: 'var(--charcoal)', opacity: 0.6 }}>
                                <th style={{ padding: '0.8rem', fontSize: '0.8rem', fontWeight: 600 }}>Lead Name</th>
                                <th style={{ padding: '0.8rem', fontSize: '0.8rem', fontWeight: 600 }}>Status</th>
                                <th style={{ padding: '0.8rem', fontSize: '0.8rem', fontWeight: 600 }}>Last Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead, i) => (
                                <tr key={i} style={{ fontSize: '0.85rem', background: 'rgba(255, 255, 255, 0.4)', transition: 'var(--transition)' }} className="table-row">
                                    <td style={{ padding: '1rem 0.8rem', fontWeight: 600, borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>{lead.name}</td>
                                    <td style={{ padding: '1rem 0.8rem' }}>
                                        <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, background: lead.bg, color: lead.color }}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 0.8rem', borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>{lead.last}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Property Summary */}
            <div className="card" style={{ gridColumn: 'span 1' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Inventory Status</h2>
                {[
                    { name: 'Skyline Towers', progress: 85, color: 'var(--pivot-blue)' },
                    { name: 'Green Valley', progress: 42, color: 'var(--pivot-blue-light)' },
                    { name: 'Coastal Villas', progress: 12, color: '#ff9f4d' },
                ].map((p, i) => (
                    <div key={i} style={{ marginBottom: '1.2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '5px' }}>
                            <span>{p.name}</span>
                            <span style={{ fontWeight: 700 }}>{p.progress}%</span>
                        </div>
                        <div style={{ height: '8px', background: 'var(--light-grey)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${p.progress}%`, background: p.color, borderRadius: '4px' }}></div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Dashboard;

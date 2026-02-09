import React, { useState } from 'react';
import { Buildings, Calendar, ChartPieSlice, Info, ArrowRight, Cube } from '@phosphor-icons/react';

const LeadsAnalytics = () => {
    const [hoveredType, setHoveredType] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    const handleHover = (type) => {
        setHoveredType(type);
    };

    const handleSelection = (type) => {
        setSelectedType(selectedType === type ? null : type);
    };

    const activeType = hoveredType || selectedType;

    const analyticsData = {
        Hot: {
            count: 5,
            color: '#ff6b6b',
            projects: ['Skyline Towers', 'Green Valley Estate'],
            visits: 8,
            inventory: { available: 12, total: 100, soldPercent: 88 }
        },
        Warm: {
            count: 7,
            color: '#ff9f4d',
            projects: ['Oceanfront Villas'],
            visits: 15,
            inventory: { available: 40, total: 45, soldPercent: 11 }
        },
        Cold: {
            count: 8,
            color: '#4d9fff',
            projects: ['The Nexus Hub'],
            visits: 4,
            inventory: { available: 80, total: 80, soldPercent: 0 }
        }
    };

    const chartData = [
        { type: 'Hot', value: 5, color: '#ff6b6b' },
        { type: 'Warm', value: 7, color: '#ff9f4d' },
        { type: 'Cold', value: 8, color: '#4d9fff' },
    ];

    const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
    const size = 320;
    const radius = 120;
    const strokeWidth = 60;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;

    let accumulatedAngle = -90;

    return (
        <div
            style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', cursor: selectedType ? 'alias' : 'default' }}
            onDoubleClick={() => setSelectedType(null)}
        >
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Leads Overview</h1>
                <p style={{ color: 'var(--charcoal)', fontSize: '0.9rem', marginTop: '5px' }}>
                    Visual distribution of lead statuses and their impact on operational metrics.
                </p>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Top Row: Chart and Contextual Insight */}
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'stretch' }}>
                    {/* 1. Lead Status Donut Chart Card (Fixed Width) */}
                    <div className="card" style={{
                        flex: '0 0 420px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2.5rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ flexShrink: 0, textAlign: 'center', transition: 'var(--transition)', zIndex: 1, width: '100%' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '2rem' }}>Lead Status Distribution</h2>
                            <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
                                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                                    {chartData.map((item, index) => {
                                        const percentage = (item.value / total) * 100;
                                        const dashoffset = circumference - (percentage / 100) * circumference;
                                        const rotation = accumulatedAngle;
                                        accumulatedAngle += (percentage / 100) * 360;

                                        const isHovered = hoveredType === item.type;
                                        const isSelected = selectedType === item.type;

                                        return (
                                            <circle
                                                key={index}
                                                cx={center}
                                                cy={center}
                                                r={radius}
                                                fill="transparent"
                                                stroke={item.color}
                                                strokeWidth={isSelected ? strokeWidth + 12 : (isHovered ? strokeWidth + 8 : strokeWidth)}
                                                strokeDasharray={`${(percentage / 100) * circumference} ${circumference}`}
                                                transform={`rotate(${rotation} ${center} ${center})`}
                                                style={{
                                                    transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
                                                    cursor: 'pointer',
                                                    filter: isSelected || isHovered ? `drop-shadow(0 0 10px ${item.color}cc)` : 'none',
                                                    opacity: selectedType !== null && !isSelected ? 0.3 : 1
                                                }}
                                                onMouseEnter={() => handleHover(item.type)}
                                                onMouseLeave={() => handleHover(null)}
                                                onClick={() => handleSelection(item.type)}
                                            />
                                        );
                                    })}
                                </svg>
                                <div style={{
                                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                    textAlign: 'center', pointerEvents: 'none'
                                }}>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--soft-black)' }}>{total}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--charcoal)', textTransform: 'uppercase', letterSpacing: '2px' }}>Total</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '2.5rem' }}>
                                {chartData.map((item, i) => (
                                    <div key={i} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        cursor: 'pointer',
                                        opacity: (hoveredType === null && selectedType === null) || hoveredType === item.type || selectedType === item.type ? 1 : 0.4,
                                        transform: selectedType === item.type ? 'scale(1.1)' : 'scale(1)',
                                        color: selectedType === item.type || hoveredType === item.type ? item.color : 'inherit',
                                        transition: 'all 0.3s ease'
                                    }}
                                        onMouseEnter={() => handleHover(item.type)}
                                        onMouseLeave={() => handleHover(null)}
                                        onClick={() => handleSelection(item.type)}
                                    >
                                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: item.color }}></div>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{item.type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 2. Contextual Insight Panel (Expandable) */}
                    <div className="card" style={{
                        flex: 1,
                        opacity: activeType ? 1 : 0.4,
                        transform: activeType ? 'translateX(0)' : 'translateX(10px)',
                        padding: '2.5rem',
                        transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        border: activeType ? `1px solid ${analyticsData[activeType].color}40` : '1px solid var(--glass-border)',
                    }}>
                        {activeType ? (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2.5rem', minWidth: '320px' }}>
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: analyticsData[activeType].color, boxShadow: `0 0 10px ${analyticsData[activeType].color}` }}></div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--soft-black)' }}>{activeType} Lead Impact</h3>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', minWidth: '600px' }}>
                                    {/* Column 1: Projects & Visits */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <section>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: analyticsData[activeType].color, marginBottom: '12px' }}>
                                                <div style={{ padding: '8px', background: `${analyticsData[activeType].color}15`, borderRadius: '8px' }}>
                                                    <Buildings size={22} weight="bold" />
                                                </div>
                                                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Active Projects</h4>
                                            </div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--charcoal)', display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '8px' }}>
                                                {analyticsData[activeType].projects.map((p, i) => (
                                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <ArrowRight size={12} color={analyticsData[activeType].color} weight="bold" />
                                                        <span style={{ fontWeight: 500 }}>{p}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        <section>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: analyticsData[activeType].color, marginBottom: '12px' }}>
                                                <div style={{ padding: '8px', background: `${analyticsData[activeType].color}15`, borderRadius: '8px' }}>
                                                    <Calendar size={22} weight="bold" />
                                                </div>
                                                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Scheduled Site Visits</h4>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', paddingLeft: '8px' }}>
                                                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: analyticsData[activeType].color }}>{analyticsData[activeType].visits}</span>
                                                <span style={{ fontSize: '0.9rem', color: 'var(--charcoal)', fontWeight: 500 }}>upcoming</span>
                                            </div>
                                        </section>
                                    </div>

                                    {/* Column 2: Inventory */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <section>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: analyticsData[activeType].color, marginBottom: '12px' }}>
                                                <div style={{ padding: '8px', background: `${analyticsData[activeType].color}15`, borderRadius: '8px' }}>
                                                    <ChartPieSlice size={22} weight="bold" />
                                                </div>
                                                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Inventory Availability</h4>
                                            </div>
                                            <div style={{ paddingLeft: '8px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                                                    <span style={{ fontWeight: 500 }}>{analyticsData[activeType].inventory.soldPercent}% Sold</span>
                                                    <span style={{ fontWeight: 700, color: analyticsData[activeType].color }}>{analyticsData[activeType].inventory.available} Left</span>
                                                </div>
                                                <div style={{ height: '10px', background: 'var(--light-grey)', borderRadius: '5px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                                                    <div style={{
                                                        height: '100%',
                                                        width: `${analyticsData[activeType].inventory.soldPercent}%`,
                                                        background: `linear-gradient(90deg, ${analyticsData[activeType].color}, ${analyticsData[activeType].color}cc)`,
                                                        transition: 'width 1s cubic-bezier(0.165, 0.84, 0.44, 1)'
                                                    }}></div>
                                                </div>
                                            </div>
                                        </section>

                                        <section style={{ background: 'var(--pivot-blue-soft)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--pivot-blue-light)' }}>
                                            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--pivot-blue)', marginBottom: '8px' }}>Strategy Tip</h4>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--charcoal)', lineHeight: '1.4' }}>
                                                {activeType === 'Hot' ? 'Immediately assign high-priority sales executives for site closing.' :
                                                    activeType === 'Warm' ? 'Send follow-up catalogs and invite for weekend project walkthroughs.' :
                                                        'Add to monthly newsletter for long-term brand awareness.'}
                                            </p>
                                            {selectedType && (
                                                <div style={{ marginTop: '1rem', fontSize: '0.7rem', color: 'var(--pivot-blue)', fontStyle: 'italic', opacity: 0.8 }}>
                                                    Double-click page to reset selection
                                                </div>
                                            )}
                                        </section>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0.5 }}>
                                <Info size={48} weight="duotone" color="var(--pivot-blue)" />
                                <h3 style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>Interactive Analytics</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--charcoal)' }}>Hover over the chart segments to reveal contextual insights</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Row: Leads Management List Card */}
                <div className="card" style={{
                    padding: '2rem',
                    transition: 'all 0.4s ease',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--soft-black)', margin: 0 }}>Leads Management</h2>
                            <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--charcoal)', marginTop: '5px' }}>Recent Performance History</h3>
                        </div>
                        <span style={{ color: 'var(--pivot-blue)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', padding: '8px 16px', background: 'var(--pivot-blue-soft)', borderRadius: 'var(--radius-md)' }}>
                            View All Leads
                        </span>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', color: 'var(--charcoal)', opacity: 0.7 }}>
                                <th style={{ padding: '0.8rem', fontSize: '0.9rem', fontWeight: 700 }}>Lead Name</th>
                                <th style={{ padding: '0.8rem', fontSize: '0.9rem', fontWeight: 700 }}>Project Interest</th>
                                <th style={{ padding: '0.8rem', fontSize: '0.9rem', fontWeight: 700 }}>Status</th>
                                <th style={{ padding: '0.8rem', fontSize: '0.9rem', fontWeight: 700 }}>Last Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: 'Johnathan Smith', project: 'Skyline Towers', status: 'Hot', color: '#ff4d4d', bg: '#ffebeb', last: '2h ago' },
                                { name: 'Elena Rodriguez', project: 'Oceanfront Villas', status: 'Warm', color: '#ff9f4d', bg: '#fff4eb', last: '5h ago' },
                                { name: 'David Wilson', project: 'The Nexus Hub', status: 'Cold', color: '#4d9fff', bg: '#ebf4ff', last: 'Yesterday' },
                                { name: 'Sarah Parker', project: 'Green Valley', status: 'Warm', color: '#ff9f4d', bg: '#fff4eb', last: '3h ago' },
                                { name: 'Michael Brown', project: 'Skyline Towers', status: 'Hot', color: '#ff4d4d', bg: '#ffebeb', last: '12h ago' },
                            ].map((lead, i) => (
                                <tr key={i} className="table-row" style={{
                                    fontSize: '0.95rem',
                                    background: 'rgba(255, 255, 255, 0.5)',
                                    borderRadius: 'var(--radius-md)',
                                    transition: 'var(--transition)'
                                }}>
                                    <td style={{ padding: '1.2rem 0.8rem', fontWeight: 600, borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>{lead.name}</td>
                                    <td style={{ padding: '1.2rem 0.8rem', color: 'var(--charcoal)' }}>{lead.project}</td>
                                    <td style={{ padding: '1.2rem 0.8rem' }}>
                                        <span style={{
                                            padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
                                            background: lead.bg, color: lead.color, boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                        }}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.2rem 0.8rem', color: 'var(--charcoal)', borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>{lead.last}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 3D Shapes (Decorative CSS) */}
            <div className="bg-decoration shape-1" style={{ bottom: '10%', left: '5%' }}></div>
            <div className="bg-decoration shape-2" style={{ top: '10%', right: '10%', transform: 'rotate(20deg)', background: 'linear-gradient(white, var(--pivot-blue-soft))' }}></div>
        </div>
    );
};

export default LeadsAnalytics;

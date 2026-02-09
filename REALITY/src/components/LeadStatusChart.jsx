import React, { useState } from 'react';

const LeadStatusChart = ({ compact = false, onHover, onClick, selection }) => {
    const data = [
        { label: 'Hot', value: 5, color: '#ff4d4d', detail: 'High conversion potential' },
        { label: 'Warm', value: 7, color: '#ff9f4d', detail: 'Active engagement' },
        { label: 'Cold', value: 8, color: '#4d9fff', detail: 'Initial contact made' },
    ];

    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Convert selection label back to index for internal logic
    const selectedIndex = selection ? data.findIndex(d => d.label === selection) : null;

    const handleHover = (index) => {
        setHoveredIndex(index);
        if (onHover) {
            onHover(index !== null ? data[index].label : (selection || null));
        }
    };

    const handleSelection = (index) => {
        const newLabel = selection === data[index].label ? null : data[index].label;
        if (onClick) onClick(newLabel);
    };
    const total = data.reduce((acc, item) => acc + item.value, 0);

    // Adjusted dimensions for compact view
    const size = compact ? 180 : 260;
    const radius = compact ? 70 : 100;
    const strokeWidth = compact ? 35 : 50;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;

    let accumulatedAngle = -90;

    const containerStyle = compact ? {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
    } : {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '1rem'
    };

    return (
        <div style={containerStyle}>
            {!compact && <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Lead Status</h2>}

            <div style={{
                display: 'flex',
                flexDirection: compact ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: compact ? '20px' : '30px',
                position: 'relative'
            }}>
                {/* SVG Donut */}
                <div style={{ position: 'relative', width: size, height: size }}>
                    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                        {data.map((item, index) => {
                            const percentage = (item.value / total) * 100;
                            const dasharray = (percentage / 100) * circumference;
                            const rotation = accumulatedAngle;
                            accumulatedAngle += (percentage / 100) * 360;

                            const isHovered = hoveredIndex === index;
                            const isSelected = selectedIndex === index;

                            return (
                                <circle
                                    key={index}
                                    cx={center}
                                    cy={center}
                                    r={radius}
                                    fill="transparent"
                                    stroke={item.color}
                                    strokeWidth={isSelected ? strokeWidth + 12 : (isHovered ? strokeWidth + 6 : strokeWidth)}
                                    strokeDasharray={`${dasharray} ${circumference - dasharray}`}
                                    strokeDashoffset={0}
                                    transform={`rotate(${rotation} ${center} ${center})`}
                                    style={{
                                        transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                                        cursor: 'pointer',
                                        strokeLinecap: 'butt',
                                        filter: isSelected || isHovered ? `drop-shadow(0 0 8px ${item.color}cc)` : 'none',
                                        opacity: selectedIndex !== null && !isSelected ? 0.3 : 1
                                    }}
                                    onMouseEnter={() => handleHover(index)}
                                    onMouseLeave={() => handleHover(null)}
                                    onClick={() => handleSelection(index)}
                                />
                            );
                        })}
                    </svg>

                    {/* Center Label */}
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        textAlign: 'center', pointerEvents: 'none'
                    }}>
                        <div style={{ fontSize: compact ? '1.2rem' : '1.5rem', fontWeight: 700, color: 'var(--soft-black)' }}>{total}</div>
                        <div style={{ fontSize: compact ? '0.65rem' : '0.75rem', color: 'var(--charcoal)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Leads</div>
                    </div>
                </div>

                {/* Legend */}
                <div style={{
                    display: 'flex',
                    flexDirection: compact ? 'row' : 'column',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: compact ? '15px' : '15px'
                }}>
                    {data.map((item, index) => {
                        const isHovered = hoveredIndex === index;
                        const isSelected = selectedIndex === index;
                        return (
                            <div
                                key={index}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    opacity: (hoveredIndex === null && selectedIndex === null) || isHovered || isSelected ? 1 : 0.3,
                                    transition: 'var(--transition)',
                                    cursor: 'pointer',
                                    color: isSelected || isHovered ? item.color : 'inherit',
                                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                                    fontWeight: isSelected ? 700 : 500
                                }}
                                onMouseEnter={() => handleHover(index)}
                                onMouseLeave={() => handleHover(null)}
                                onClick={() => handleSelection(index)}
                            >
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }}></div>
                                <div style={{ fontSize: '0.8rem' }}>
                                    {item.label}: {item.value}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LeadStatusChart;

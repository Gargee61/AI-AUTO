import React from 'react';
import { Calendar, Users, MapPin, Phone, Clock, CaretLeft, CaretRight, Info } from '@phosphor-icons/react';
import './SiteVisits.css';

const SummaryCard = ({ icon: Icon, title, value }) => (
    <div className="card summary-card">
        <div className="icon-box">
            <Icon size={28} weight="bold" />
        </div>
        <div className="summary-info">
            <h3>{title}</h3>
            <div className="value">{value}</div>
        </div>
    </div>
);

const CalendarPreview = () => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const currentMonth = "February 2026";

    // Static calendar for February 2026 (starts on Sunday)
    const dates = Array.from({ length: 28 }, (_, i) => i + 1);
    const visitDates = [10, 12, 15, 18, 22, 25];

    return (
        <div className="card calendar-card">
            <div className="calendar-header">
                <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>Calendar</h2>
                <div style={{ display: 'flex', gap: '8px', color: 'var(--pivot-blue)' }}>
                    <CaretLeft size={18} weight="bold" style={{ cursor: 'pointer' }} />
                    <CaretRight size={18} weight="bold" style={{ cursor: 'pointer' }} />
                </div>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '1.2rem', fontWeight: 600, fontSize: '0.9rem' }}>
                {currentMonth}
            </div>
            <div className="calendar-grid">
                {days.map(day => (
                    <div key={day} className="calendar-day-label">{day}</div>
                ))}
                {dates.map(date => (
                    <div
                        key={date}
                        className={`calendar-day ${visitDates.includes(date) ? 'has-visit' : ''} ${date === 9 ? 'today' : ''}`}
                    >
                        {date}
                    </div>
                ))}
                {/* Fill rest of grid if needed, though Feb 2026 fits nicely */}
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--pivot-blue-soft)', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px', color: 'var(--pivot-blue)' }}>TODAY'S SCHEDULE</h4>
                <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                    <div style={{ marginBottom: '6px' }}>• 10:30 AM - Skyline Towers</div>
                    <div style={{ marginBottom: '6px' }}>• 02:00 PM - Green Valley</div>
                    <div>• 04:30 PM - Coastal Villas</div>
                </div>
            </div>
        </div>
    );
};

const SiteVisits = () => {
    const visits = [
        { id: 1, lead: 'Alice Thompson', project: 'Skyline Towers', date: 'Feb 10, 2026', time: '10:30 AM', executive: 'Sarah Jenkins', status: 'Scheduled', phone: '+1 (555) 123-4567', location: 'Section A, Floor 12' },
        { id: 2, lead: 'Mark Johnson', project: 'Green Valley', date: 'Feb 10, 2026', time: '02:00 PM', executive: 'Michael Chen', status: 'Scheduled', phone: '+1 (555) 987-6543', location: 'Clubhouse Entrance' },
        { id: 3, lead: 'Sarah Miller', project: 'Coastal Villas', date: 'Feb 10, 2026', time: '04:30 PM', executive: 'Sarah Jenkins', status: 'Scheduled', phone: '+1 (555) 234-5678', location: 'Villa 42 Site' },
        { id: 4, lead: 'Robert Davis', project: 'Skyline Towers', date: 'Feb 09, 2026', time: '11:00 AM', executive: 'Michael Chen', status: 'Completed', phone: '+1 (555) 345-6789', location: 'Sales Gallery' },
        { id: 5, lead: 'Emily Wilson', project: 'Oak Ridge', date: 'Feb 12, 2026', time: '09:30 AM', executive: 'Sarah Jenkins', status: 'Scheduled', phone: '+1 (555) 456-7890', location: 'Main Gate' },
        { id: 6, lead: 'James Brown', project: 'Green Valley', date: 'Feb 12, 2026', time: '03:15 PM', executive: 'Michael Chen', status: 'Rescheduled', phone: '+1 (555) 567-8901', location: 'Project Model' },
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case 'Scheduled': return 'status-scheduled';
            case 'Completed': return 'status-completed';
            case 'Rescheduled': return 'status-rescheduled';
            default: return '';
        }
    };

    return (
        <div className="site-visits-container">
            <header className="page-header">
                <h1>Upcoming Site Visits</h1>
                <p>Scheduled property visits and client meetings</p>
            </header>

            <div className="summary-row">
                <SummaryCard icon={Calendar} title="Total Upcoming Visits" value="24" />
                <SummaryCard icon={Clock} title="Today's Visits" value="3" />
                <SummaryCard icon={Users} title="This Week's Visits" value="12" />
            </div>

            <div className="main-content-grid">
                <div className="card visits-list-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Visit Schedule</h2>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--pivot-blue-soft)', background: 'white', fontSize: '0.85rem', fontWeight: 600, color: 'var(--charcoal)', cursor: 'pointer' }}>Filter</button>
                            <button style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'var(--pivot-blue)', color: 'white', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>Download Report</button>
                        </div>
                    </div>

                    <table className="visits-table">
                        <thead>
                            <tr>
                                <th>Lead Name</th>
                                <th>Project Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Assigned Executive</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visits.map((visit) => (
                                <tr key={visit.id} className="visit-row">
                                    <td style={{ fontWeight: 600 }}>{visit.lead}</td>
                                    <td>{visit.project}</td>
                                    <td>{visit.date}</td>
                                    <td>{visit.time}</td>
                                    <td>{visit.executive}</td>
                                    <td>
                                        <span className={`status-badge ${getStatusClass(visit.status)}`}>
                                            {visit.status}
                                        </span>
                                    </td>

                                    {/* Detail Preview Popover */}
                                    <div className="visit-preview-popover">
                                        <div className="preview-header">
                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--pivot-blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--pivot-blue)' }}>
                                                <Users size={20} weight="bold" />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{visit.lead}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--charcoal)', opacity: 0.6 }}>Client Details</div>
                                            </div>
                                        </div>
                                        <div className="preview-body">
                                            <p><Phone size={16} color="var(--pivot-blue)" /> {visit.phone}</p>
                                            <p><MapPin size={16} color="var(--pivot-blue)" /> {visit.location}</p>
                                            <p><Info size={16} color="var(--pivot-blue)" /> Project: {visit.project}</p>
                                        </div>
                                    </div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <CalendarPreview />
            </div>

            {/* Abstract Background Element */}
            <div style={{
                position: 'fixed', bottom: '5%', right: '5%',
                width: '150px', height: '150px',
                background: 'linear-gradient(135deg, var(--pivot-blue-soft), transparent)',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                filter: 'blur(40px)', opacity: 0.3, zIndex: -1
            }}></div>
        </div>
    );
};

export default SiteVisits;

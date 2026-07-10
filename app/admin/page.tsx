"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Inbox,
  Calendar,
  MessageSquare,
  CheckCircle,
  Trash2,
  Phone,
  Clock,
  Bike,
  RefreshCw,
  ArrowLeft,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Calculator
} from 'lucide-react';

interface Enquiry {
  id: string;
  type: 'booking' | 'inquiry' | 'finance';
  name: string;
  phone: string;
  vehicleTitle?: string;
  variant?: string;
  date?: string;
  slot?: string;
  message?: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'resolved';
}

export default function AdminPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filter, setFilter] = useState<'all' | 'booking' | 'inquiry' | 'new'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/enquiries');
      const result = await res.json();
      if (result.success && Array.isArray(result.data)) {
        setEnquiries(result.data);
        setIsDemoMode(false);
      } else {
        const stored = localStorage.getItem('sb_tvs_enquiries');
        if (stored) {
          setEnquiries(JSON.parse(stored));
        }
        setIsDemoMode(true);
      }
    } catch (e) {
      const stored = localStorage.getItem('sb_tvs_enquiries');
      if (stored) {
        setEnquiries(JSON.parse(stored));
      }
      setIsDemoMode(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const updateStatus = (id: string, status: Enquiry['status']) => {
    const updated = enquiries.map(e => e.id === id ? { ...e, status } : e);
    setEnquiries(updated);
    localStorage.setItem('sb_tvs_enquiries', JSON.stringify(updated));
  };

  const deleteEnquiry = (id: string) => {
    const updated = enquiries.filter(e => e.id !== id);
    setEnquiries(updated);
    localStorage.setItem('sb_tvs_enquiries', JSON.stringify(updated));
  };

  const clearAll = () => {
    if (confirm('Delete ALL enquiries? This cannot be undone.')) {
      setEnquiries([]);
      localStorage.removeItem('sb_tvs_enquiries');
    }
  };

  const filtered = enquiries.filter(e => {
    if (filter === 'all') return true;
    if (filter === 'new') return e.status === 'new';
    if (filter === 'inquiry') return e.type === 'inquiry' || e.type === 'finance';
    return e.type === filter;
  }).sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  const stats = {
    total: enquiries.length,
    bookings: enquiries.filter(e => e.type === 'booking').length,
    inquiries: enquiries.filter(e => e.type === 'inquiry' || e.type === 'finance').length,
    newCount: enquiries.filter(e => e.status === 'new').length,
  };

  const statusColor = (s: Enquiry['status']) => {
    if (s === 'new') return '#3B82F6';
    if (s === 'contacted') return '#F59E0B';
    return '#10B981';
  };

  const statusLabel = (s: Enquiry['status']) => {
    if (s === 'new') return '● New';
    if (s === 'contacted') return '◑ Contacted';
    return '✓ Resolved';
  };

  return (
    <div className="main-content-wrapper" style={{ minHeight: '100vh' }}>

      {/* Top Bar */}
      <section style={{ padding: '20px 0', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', fontSize: '13px' }}>
              <ArrowLeft size={14} /> Back to Site
            </Link>
            <span style={{ opacity: 0.3 }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LayoutDashboard size={16} style={{ color: 'var(--brand)' }} />
              <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)' }}>Admin Dashboard</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={loadEnquiries}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
            >
              <RefreshCw size={12} /> Refresh
            </button>
            {enquiries.length > 0 && (
              <button
                onClick={clearAll}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1px solid #EF444433', background: '#EF444411', color: '#EF4444', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
              >
                <Trash2 size={12} /> Clear All
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '40px 0 80px' }}>

        {isDemoMode && (
          <div style={{ 
            padding: '16px 20px', 
            background: 'rgba(245, 158, 11, 0.05)', 
            border: '1px solid rgba(245, 158, 11, 0.15)', 
            borderRadius: '12px', 
            marginBottom: '30px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            fontSize: '13px',
            color: 'var(--text-secondary)'
          }}>
            <AlertCircle size={20} style={{ color: '#F59E0B', flexShrink: 0 }} />
            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>Demo Mode (Showing local submissions only)</strong>
              To view real-time customer submissions from all devices, configure your Google Sheet Web App URL in your Vercel Project Settings.
            </div>
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {[
            { label: 'Total Enquiries', val: stats.total, icon: Inbox, color: '#3B82F6' },
            { label: 'Test Ride Bookings', val: stats.bookings, icon: Calendar, color: '#8B5CF6' },
            { label: 'Inquiries', val: stats.inquiries, icon: MessageSquare, color: '#F59E0B' },
            { label: 'New (Unread)', val: stats.newCount, icon: AlertCircle, color: '#EF4444' },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${stat.color}18`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} />
                  </div>
                  {stat.label === 'New (Unread)' && stat.val > 0 && (
                    <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '10px', background: '#EF444418', color: '#EF4444', fontWeight: '700' }}>Action Needed</span>
                  )}
                </div>
                <div style={{ fontSize: '32px', fontWeight: '900', color: stat.color, fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>{stat.val}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {([
            { val: 'all', label: `All (${stats.total})` },
            { val: 'new', label: `New (${stats.newCount})` },
            { val: 'booking', label: `Bookings (${stats.bookings})` },
            { val: 'inquiry', label: `Inquiries (${stats.inquiries})` },
          ] as const).map(tab => (
            <button
              key={tab.val}
              onClick={() => setFilter(tab.val)}
              className={filter === tab.val ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ padding: '8px 16px', fontSize: '12px' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Enquiry List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <RefreshCw size={36} className="spinner" style={{ color: 'var(--brand)', animation: 'spin 1.5s linear infinite' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>Syncing bookings from Google Sheets...</p>
            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <Inbox size={40} style={{ color: 'var(--text-secondary)', margin: '0 auto 16px' }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>No enquiries yet</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
              Submit a test ride booking or contact form on the website — they will appear here automatically.
            </p>
            <Link href="/contact" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-flex', textDecoration: 'none' }}>
              Go to Contact Page
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map(enq => (
              <div
                key={enq.id}
                style={{
                  background: 'var(--bg-secondary)',
                  borderRadius: '14px',
                  border: `1px solid ${enq.status === 'new' ? '#3B82F644' : 'var(--border-color)'}`,
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Row Summary */}
                <div
                  style={{ padding: '20px 24px', display: 'flex', gap: '16px', alignItems: 'center', cursor: 'pointer', flexWrap: 'wrap' }}
                  onClick={() => setExpanded(expanded === enq.id ? null : enq.id)}
                >
                  {/* Type Badge */}
                  <span style={{
                    fontSize: '10px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px',
                    background: enq.type === 'booking' ? '#8B5CF618' : enq.type === 'finance' ? '#10B98118' : '#F59E0B18',
                    color: enq.type === 'booking' ? '#8B5CF6' : enq.type === 'finance' ? '#10B981' : '#F59E0B',
                    display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0
                  }}>
                    {enq.type === 'booking' ? <Calendar size={10} /> : enq.type === 'finance' ? <Calculator size={10} /> : <MessageSquare size={10} />}
                    {enq.type === 'booking' ? 'TEST RIDE' : enq.type === 'finance' ? 'FINANCE / EMI' : 'INQUIRY'}
                  </span>

                  {/* Name & Phone */}
                  <div style={{ flex: 1, minWidth: '160px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)' }}>{enq.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <Phone size={10} /> {enq.phone}
                    </div>
                  </div>

                  {/* Bike */}
                  {enq.vehicleTitle && (
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Bike size={12} /> {enq.vehicleTitle}
                    </div>
                  )}

                  {/* Date */}
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={10} /> {new Date(enq.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>

                  {/* Status */}
                  <span style={{ fontSize: '11px', fontWeight: '700', color: statusColor(enq.status), flexShrink: 0 }}>
                    {statusLabel(enq.status)}
                  </span>

                  {/* Expand icon */}
                  {expanded === enq.id ? <ChevronUp size={16} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} /> : <ChevronDown size={16} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />}
                </div>

                {/* Expanded Details */}
                {expanded === enq.id && (
                  <div style={{ padding: '0 24px 24px', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ paddingTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                      {enq.vehicleTitle && <div><span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase' }}>Vehicle</span><br /><span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '600' }}>{enq.vehicleTitle}</span></div>}
                      {enq.variant && <div><span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase' }}>Variant</span><br /><span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '600' }}>{enq.variant}</span></div>}
                      {enq.date && <div><span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase' }}>Preferred Date</span><br /><span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '600' }}>{enq.date}</span></div>}
                      {enq.slot && <div><span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase' }}>Time Slot</span><br /><span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '600' }}>{enq.slot}</span></div>}
                      {enq.message && <div style={{ gridColumn: '1 / -1' }}><span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase' }}>Message</span><br /><span style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.6' }}>{enq.message}</span></div>}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <a href={`tel:${enq.phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', background: 'rgba(var(--brand-rgb), 0.1)', color: 'var(--brand)', textDecoration: 'none', fontSize: '12px', fontWeight: '700' }}>
                        <Phone size={12} /> Call Now
                      </a>
                      {enq.status === 'new' && (
                        <button onClick={() => updateStatus(enq.id, 'contacted')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1px solid #F59E0B33', background: '#F59E0B11', color: '#F59E0B', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}>
                          <Phone size={12} /> Mark Contacted
                        </button>
                      )}
                      {enq.status !== 'resolved' && (
                        <button onClick={() => updateStatus(enq.id, 'resolved')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1px solid #10B98133', background: '#10B98111', color: '#10B981', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}>
                          <CheckCircle size={12} /> Mark Resolved
                        </button>
                      )}
                      <button onClick={() => deleteEnquiry(enq.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1px solid #EF444433', background: '#EF444411', color: '#EF4444', cursor: 'pointer', fontSize: '12px', fontWeight: '700', marginLeft: 'auto' }}>
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

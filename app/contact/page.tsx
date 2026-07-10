"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Award, 
  Bike, 
  Check, 
  AlertCircle,
  MessageSquare,
  CheckCircle
} from 'lucide-react';
import { useVehicles } from '../../components/DataContext';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info';
}

function ContactContent() {
  const searchParams = useSearchParams();
  const shouldBook = searchParams.get('book') === 'true';
  const paramVehicleId = searchParams.get('vehicle') || '';
  const paramVariant = searchParams.get('variant') || '';

  const vehicles = useVehicles();
  const [activeTab, setActiveTab] = useState<'inquiry' | 'booking'>(shouldBook ? 'booking' : 'inquiry');
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // Submission result states
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedType, setLastSubmittedType] = useState<'booking' | 'inquiry' | null>(null);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');

  // Update tab if parameter changes
  useEffect(() => {
    if (shouldBook) {
      setActiveTab('booking');
    }
  }, [shouldBook]);

  // Form states
  const [inquiryForm, setInquiryForm] = useState({ name: '', phone: '', message: '' });
  const [bookingForm, setBookingForm] = useState({
    vehicleId: paramVehicleId || (vehicles[0]?.id || ''),
    variant: paramVariant || (vehicles[0]?.variants[0]?.name || ''),
    name: '',
    phone: '',
    date: '',
    slot: '10:00 AM - 12:00 PM',
  });

  // Sync parameters & initial values when dynamic vehicles load
  useEffect(() => {
    if (vehicles && vehicles.length > 0) {
      setBookingForm((prev) => {
        const vId = paramVehicleId || prev.vehicleId || vehicles[0].id;
        const vVariant = paramVariant || (paramVehicleId ? (vehicles.find(v => v.id === paramVehicleId)?.variants[0]?.name || '') : prev.variant) || vehicles[0].variants[0]?.name || '';
        return {
          ...prev,
          vehicleId: vId,
          variant: vVariant,
        };
      });
    }
  }, [paramVehicleId, paramVariant, vehicles]);

  // Sync variant selections when vehicle selection changes in form
  const handleBookingVehicleChange = (id: string) => {
    const found = vehicles.find((v) => v.id === id);
    setBookingForm({
      ...bookingForm,
      vehicleId: id,
      variant: found?.variants[0]?.name || '',
    });
  };

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const [submitting, setSubmitting] = React.useState(false);

  const SHOWROOM_WHATSAPP = '918059212212';

  const openWhatsApp = (message: string) => {
    const url = `https://wa.me/${SHOWROOM_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const saveLocal = (entry: object) => {
    try {
      const existing = JSON.parse(localStorage.getItem('sb_tvs_enquiries') || '[]');
      existing.push(entry);
      localStorage.setItem('sb_tvs_enquiries', JSON.stringify(existing));
    } catch (e) {}
  };

  const sendToSheet = async (entry: object) => {
    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
    } catch (err) {
      console.error('Failed to save to sheet:', err);
    }
  };


  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.phone) {
      showToast('Please fill in your name and phone number.', 'info');
      return;
    }
    setSubmitting(true);
    const entry = {
      id: Math.random().toString(36).substring(2, 12),
      type: 'inquiry',
      name: inquiryForm.name,
      phone: inquiryForm.phone,
      message: inquiryForm.message,
      submittedAt: new Date().toISOString(),
      status: 'new'
    };
    saveLocal(entry);
    await sendToSheet(entry);
    setSubmitting(false);
    const msg =
      `*New Enquiry — Shree Balaji TVS*\n\n` +
      `👤 Name: ${inquiryForm.name}\n` +
      `📞 Phone: ${inquiryForm.phone}\n` +
      (inquiryForm.message ? `💬 Message: ${inquiryForm.message}\n` : '') +
      `\n_Submitted from website_`;
    setWhatsAppMessage(msg);
    setLastSubmittedType('inquiry');
    setIsSubmitted(true);
    setInquiryForm({ name: '', phone: '', message: '' });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.date) {
      showToast('Please fill in all required fields marked with *', 'info');
      return;
    }
    setSubmitting(true);
    const chosenVehicle = vehicles.find((v) => v.id === bookingForm.vehicleId);
    const entry = {
      id: Math.random().toString(36).substring(2, 12),
      type: 'booking',
      name: bookingForm.name,
      phone: bookingForm.phone,
      vehicleTitle: chosenVehicle?.title || bookingForm.vehicleId,
      variant: bookingForm.variant,
      date: bookingForm.date,
      slot: bookingForm.slot,
      submittedAt: new Date().toISOString(),
      status: 'new'
    };
    saveLocal(entry);
    await sendToSheet(entry);
    setSubmitting(false);
    const msg =
      `*🏍️ Test Ride Booking — Shree Balaji TVS*\n\n` +
      `👤 Name: ${bookingForm.name}\n` +
      `📞 Phone: ${bookingForm.phone}\n` +
      `🏍️ Vehicle: ${chosenVehicle?.title || bookingForm.vehicleId}\n` +
      `⚙️ Variant: ${bookingForm.variant}\n` +
      `📅 Date: ${bookingForm.date}\n` +
      `🕐 Slot: ${bookingForm.slot}\n` +
      `\n_Submitted from website_`;
    setWhatsAppMessage(msg);
    setLastSubmittedType('booking');
    setIsSubmitted(true);
    setBookingForm({
      vehicleId: vehicles[0]?.id || '',
      variant: vehicles[0]?.variants[0]?.name || '',
      name: '',
      phone: '',
      date: '',
      slot: '10:00 AM - 12:00 PM',
    });
  };

  return (
    <div className="main-content-wrapper">
      {/* Toast Portal */}
      <div className="toast-portal">
        {toasts.map((t) => (
          <div key={t.id} className={`toast-card ${t.type}`}>
            {t.type === 'success' ? <Check size={14} /> : <AlertCircle size={14} />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      <section className="section-padding">
        <div className="container dealer-grid">
          {/* Address & Business Details */}
          <div className="dealer-details-panel">
            <h1 className="dealer-name">SHREE BALAJI TVS</h1>
            <div className="dealer-subtitle">TVS MOTOR Authorized Dealership</div>
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '15px' }}>
              Welcome to Shree Balaji TVS. We supply Jhajjar district with high-performance TVS two-wheelers, genuine spare parts, and diagnostic workshop servicing. Drop by our showroom or get in touch.
            </p>

            <div className="contact-info-list">
              <div className="contact-item">
                <div className="contact-icon"><MapPin /></div>
                <div className="contact-text">
                  <h4>Showroom Address</h4>
                  <p>
                    <a 
                      href="https://maps.app.goo.gl/bKa63nkPRHHgrDVu5" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="call-link"
                      style={{ textDecoration: 'none' }}
                    >
                      Marot Road Chhuchhakwas, near Bright Mission School, Jhajjar, Haryana, 124106
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Phone /></div>
                <div className="contact-text">
                  <h4>Dealer Mobile Line</h4>
                  <p>
                    <a href="tel:8059212212" className="call-link">+91 80592 12212</a>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Clock /></div>
                <div className="contact-text">
                  <h4>Working Hours</h4>
                  <p>Open Daily: 09:00 AM - 07:30 PM (Sunday Open)</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div className="contact-text">
                  <h4>Social Connect</h4>
                  <p style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                    <a 
                      href="https://www.instagram.com/tvs_chhuchhakwas" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="call-link"
                      style={{ fontWeight: '600' }}
                    >
                      Instagram
                    </a>
                    <span style={{ color: 'var(--text-muted)' }}>•</span>
                    <a 
                      href="https://wa.me/918059212212" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="call-link"
                      style={{ fontWeight: '600' }}
                    >
                      WhatsApp
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Interactive Landmark Vector Map */}
            <div className="dealer-map-mock">
              <div className="map-graphic">
                {/* Simulated Roads */}
                <div className="map-line road-1"></div>
                <div className="map-line road-2"></div>
                <span className="road-name">Marot Road</span>
                
                {/* Landmarks */}
                <div className="map-marker school-marker">
                  <Award size={14} style={{ color: 'var(--text-secondary)' }} />
                  <span className="marker-label">Bright Mission School</span>
                </div>
                
                <div className="map-marker showroom-marker">
                  <div className="marker-ping"></div>
                  <Bike size={14} />
                  <span className="marker-label" style={{ fontWeight: 'bold' }}>Shree Balaji TVS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact / Booking Panel */}
          <div className="dealer-contact-form">
            <div className="form-container">
              {isSubmitted ? (
                <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 24px',
                    color: '#10B981'
                  }}>
                    <CheckCircle size={36} />
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px' }}>Thank You!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '30px' }}>
                    {lastSubmittedType === 'booking' 
                      ? 'Your test ride request has been saved in our system. We will call you shortly to confirm your booking and coordinate your visit.'
                      : 'Your inquiry has been successfully received. Our customer team will review it and get in touch with you shortly.'
                    }
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setLastSubmittedType(null);
                        setWhatsAppMessage('');
                      }}
                      className="btn btn-primary"
                      style={{ padding: '12px 24px', fontSize: '13px', width: '100%' }}
                    >
                      Done / Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Tab Switcher */}
                  <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
                    <button
                      className={`btn ${activeTab === 'inquiry' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1, padding: '10px 14px', fontSize: '13px' }}
                      onClick={() => setActiveTab('inquiry')}
                    >
                      General Inquiry
                    </button>
                    <button
                      className={`btn ${activeTab === 'booking' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1, padding: '10px 14px', fontSize: '13px' }}
                      onClick={() => setActiveTab('booking')}
                    >
                      Book Test Ride
                    </button>
                  </div>

                  {activeTab === 'inquiry' ? (
                    <>
                      <h3>Drop Us an Inquiry</h3>
                      <p>Have questions about pricing, finance, or spare parts? Send a query below.</p>
                      <form onSubmit={handleInquirySubmit} style={{ marginTop: '20px' }}>
                        <div className="form-group" style={{ marginBottom: '14px' }}>
                          <label htmlFor="contact-name">Your Full Name</label>
                          <input 
                            type="text" 
                            id="contact-name"
                            placeholder="Enter name"
                            value={inquiryForm.name}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                          />
                        </div>

                        <div className="form-group" style={{ marginBottom: '14px' }}>
                          <label htmlFor="contact-phone">Phone Number</label>
                          <input 
                            type="tel" 
                            id="contact-phone"
                            placeholder="Enter mobile number"
                            maxLength={10}
                            value={inquiryForm.phone}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                          />
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                          <label htmlFor="contact-msg">Your Message</label>
                          <textarea 
                            id="contact-msg"
                            rows={4} 
                            placeholder="Write your questions about pricing, colors, or booking details..."
                            value={inquiryForm.message}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                          ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary btn-large btn-block" disabled={submitting}>
                          {submitting ? 'Sending...' : 'Send Showroom Inquiry'}
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <h3>Schedule a Showroom Test Ride</h3>
                      <p>Reserve your slot at Shree Balaji TVS for a personal experience</p>
                      <form onSubmit={handleBookingSubmit} style={{ marginTop: '20px' }}>
                        <div className="form-row split">
                          <div className="form-group">
                            <label htmlFor="book-veh">Select Vehicle</label>
                            <select 
                              id="book-veh"
                              className="comp-select" 
                              value={bookingForm.vehicleId}
                              onChange={(e) => handleBookingVehicleChange(e.target.value)}
                            >
                              {vehicles.map((vehicle) => (
                                <option key={vehicle.id} value={vehicle.id}>{vehicle.title}</option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="book-var">Select Variant</label>
                            <select
                              id="book-var"
                              className="comp-select"
                              value={bookingForm.variant}
                              onChange={(e) => setBookingForm({ ...bookingForm, variant: e.target.value })}
                            >
                              {vehicles.find((v) => v.id === bookingForm.vehicleId)?.variants.map((v) => (
                                <option key={v.name} value={v.name}>
                                  {v.name}
                                </option>
                              )) || <option value="">Standard Base</option>}
                            </select>
                          </div>
                        </div>

                        <div className="form-row split">
                          <div className="form-group">
                            <label htmlFor="book-name">Full Name *</label>
                            <input 
                              type="text" 
                              id="book-name" 
                              placeholder="Enter name"
                              required
                              value={bookingForm.name}
                              onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="book-phone">Mobile Number *</label>
                            <input 
                              type="tel" 
                              id="book-phone" 
                              placeholder="10-digit number"
                              maxLength={10}
                              required
                              value={bookingForm.phone}
                              onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-row split">
                          <div className="form-group">
                            <label htmlFor="book-date">Preferred Date *</label>
                            <input 
                              type="date" 
                              id="book-date" 
                              required
                              value={bookingForm.date}
                              onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="book-slot">Preferred Slot</label>
                            <select 
                              id="book-slot"
                              className="comp-select" 
                              value={bookingForm.slot}
                              onChange={(e) => setBookingForm({ ...bookingForm, slot: e.target.value })}
                            >
                              <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                              <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                              <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                              <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                            </select>
                          </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-large btn-block" disabled={submitting}>
                          {submitting ? 'Reserving...' : 'Reserve Test Ride Slot'}
                        </button>
                      </form>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Loading Form...</div>}>
      <ContactContent />
    </Suspense>
  );
}

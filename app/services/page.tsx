"use client";

import Link from 'next/link';
import {
  Wrench,
  Droplets,
  CircleDot,
  Cpu,
  Battery,
  Sparkles,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  Shield,
  Award
} from 'lucide-react';

const SERVICES = [
  {
    id: 'periodic',
    icon: Wrench,
    title: 'Periodic Service',
    subtitle: 'Recommended Every 3,000 km',
    desc: 'Complete OEM-spec scheduled maintenance including air filter cleaning, chain tension, tyre pressure, brake inspection, all fluid top-ups, and a full 35-point safety checklist.',
    duration: '2–3 Hours',
    highlights: ['35-point safety inspection', 'Chain lubrication & adjustment', 'Brake pad check', 'All fluid top-ups', 'Free tyre pressure check'],
    color: '#3B82F6'
  },
  {
    id: 'oil',
    icon: Droplets,
    title: 'Oil Change',
    subtitle: 'TVS TRU4 Genuine Engine Oil',
    desc: `TVS-genuine TRU4 engine oil drain, filter replacement, and refill using the exact manufacturer-spec viscosity grade for your specific model's engine.`,
    duration: '30–45 Minutes',
    highlights: ['TVS TRU4 genuine oil', 'Oil filter replacement', 'Drain & clean sump', 'Mileage-optimized viscosity', 'Lubrication report'],
    color: '#F59E0B'
  },
  {
    id: 'brakes',
    icon: CircleDot,
    title: 'Brake Service',
    subtitle: 'Disc & Drum Overhaul',
    desc: 'Comprehensive brake system inspection and overhaul — including petal disc pad replacement, drum shoe adjustment, brake fluid flush and bleed, and ABS calibration verification.',
    duration: '1–2 Hours',
    highlights: ['OEM disc pads & drum shoes', 'Brake fluid flush & bleed', 'ABS sensor calibration', 'Caliper piston clean', 'Lever free-play adjustment'],
    color: '#EF4444'
  },
  {
    id: 'engine',
    icon: Cpu,
    title: 'Engine Diagnostics & Repair',
    subtitle: 'TVS OBD Computer Diagnostics',
    desc: 'Advanced ECU-level computer diagnostics using TVS factory tools to read live engine data, detect fault codes, tune fuel injection, and perform engine rebuilds or cylinder decarb.',
    duration: 'Depends on Fault',
    highlights: ['ECU fault code scanning', 'Live sensor data analysis', 'Fuel injector calibration', 'Carburetor cleaning', 'Engine decarb & top overhaul'],
    color: '#8B5CF6'
  },
  {
    id: 'battery',
    icon: Battery,
    title: 'Battery Check & EV Service',
    subtitle: 'For Petrol & Electric Models',
    desc: 'Full electrical health check — battery capacity test, charging system diagnosis, starter motor inspection, alternator output check, and iQube/TVS X battery pack health assessment.',
    duration: '45–90 Minutes',
    highlights: ['Battery load test', 'iQube BMS diagnostics', 'Charging circuit check', 'Wiring harness inspection', 'TVS X battery health scan'],
    color: '#10B981'
  },
  {
    id: 'wash',
    icon: Sparkles,
    title: 'Wash, Detail & Polish',
    subtitle: 'Showroom Finish Guaranteed',
    desc: `Professional wash, foam detailing, chain cleaning, alloy wheel polish, seat conditioning, and a showroom-level wax coat to protect your bike's paint and shine.`,
    duration: '1–1.5 Hours',
    highlights: ['Full foam hand wash', 'Chain degreasing & lube', 'Alloy wheel polish', 'Seat leather conditioner', 'Protective wax coat'],
    color: '#06B6D4'
  }
];

const WHY_CHOOSE = [
  { icon: Shield, title: '100% Genuine Parts', desc: 'Only OEM TVS spares — no counterfeit components, ever.' },
  { icon: Award, title: 'Factory-Trained Technicians', desc: 'Our mechanics are certified directly by TVS Motor Company.' },
  { icon: Clock, title: 'Fast Turnaround', desc: 'Most services completed same day. Express bays available.' },
  { icon: CheckCircle, title: 'Transparent Pricing', desc: 'Job cards with itemized billing. No surprise charges.' }
];

export default function ServicesPage() {
  return (
    <div className="main-content-wrapper">

      {/* Page Hero */}
      <section style={{ padding: '80px 0 60px', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border-color)' }}>
        <div className="glow-bg" style={{ top: '-10%', left: '5%', opacity: 0.07 }}></div>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <span className="section-subtitle">TVS Authorized Workshop</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 52px)', marginTop: '12px' }}>
            Expert Service &amp; Repairs
          </h1>
          <p className="section-desc" style={{ maxWidth: '600px', margin: '0 auto 32px' }}>
            At Shree Balaji TVS, our certified workshop delivers factory-spec servicing for every TVS model — from routine oil changes to complete engine overhauls and EV battery diagnostics.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="tel:8059212212"
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '14px 28px' }}
            >
              <Phone size={16} /> Call for Booking
            </a>
            <Link
              href="/contact"
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '14px 28px' }}
            >
              <Calendar size={16} /> Online Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header align-center">
            <span className="section-subtitle">What We Offer</span>
            <h2 className="section-title">Our Service Menu</h2>
            <p className="section-desc">Choose from our full range of authorized TVS workshop services below.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px', marginTop: '48px' }}>
            {SERVICES.map(service => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="elevated-panel"
                  style={{
                    padding: '32px',
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0'
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 40px rgba(0,0,0,0.15)`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '';
                  }}
                >
                  {/* Icon + Duration */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '14px',
                      background: `${service.color}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: service.color
                    }}>
                      <Icon size={26} />
                    </div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: service.color,
                      background: `${service.color}18`,
                      padding: '4px 10px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Clock size={10} /> {service.duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: service.color, fontWeight: '600', marginBottom: '14px' }}>
                    {service.subtitle}
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '20px' }}>
                    {service.desc}
                  </p>

                  {/* Highlights */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1 }}>
                    {service.highlights.map(h => (
                      <li key={h} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                        <CheckCircle size={13} style={{ color: service.color, flexShrink: 0 }} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="tel:8059212212"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      border: `1.5px solid ${service.color}`,
                      color: service.color,
                      background: `${service.color}0d`,
                      fontSize: '13px',
                      fontWeight: '700',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <Phone size={14} /> Book This Service
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header align-center">
            <span className="section-subtitle">Our Promise</span>
            <h2 className="section-title">Why Choose Shree Balaji Workshop</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '28px', marginTop: '48px' }}>
            {WHY_CHOOSE.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} style={{ textAlign: 'center', padding: '32px 20px', background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '14px',
                    background: 'rgba(var(--brand-rgb), 0.1)',
                    color: 'var(--brand)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <Icon size={26} />
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>{item.title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '80px 0', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border-color)' }}>
        <div className="glow-bg" style={{ bottom: '-20%', left: '30%', opacity: 0.12, background: 'radial-gradient(circle, var(--brand) 0%, transparent 60%)', width: '300px', height: '300px', position: 'absolute' }}></div>
        <div className="container">
          <div className="elevated-panel" style={{ 
            padding: '48px 40px', 
            borderRadius: '24px', 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--border-color)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap', 
            gap: '32px',
            position: 'relative',
            zIndex: 2,
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ flex: '1', minWidth: '280px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '12px', fontFamily: "'Outfit', sans-serif" }}>
                Ready to Service Your Bike?
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>
                Walk in at our Chhuchhakwas showroom or call us to book your slot. Same-day service is available!
              </p>
            </div>
            <div>
              <a
                href="tel:8059212212"
                className="btn btn-primary"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none',
                  padding: '16px 36px', borderRadius: '12px', fontSize: '15px', fontWeight: '800',
                  letterSpacing: '0.05em'
                }}
              >
                <Phone size={16} /> Book Slot: +91 80592 12212
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

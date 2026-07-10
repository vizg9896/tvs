"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Award, Shield, Users, Calendar, Target, Eye, Heart, Bike, Zap } from 'lucide-react';

function AnimatedCounter({ end, duration = 1800, prefix = "", suffix = "", start = 0 }: {
  end: number; duration?: number; prefix?: string; suffix?: string; start?: number;
}) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const eased = progress * (2 - progress);
          setCount(Math.floor(eased * (end - start) + start));
          if (progress < 1) requestAnimationFrame(step);
          else setCount(end);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, start]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const MILESTONES = [
  { year: '2019', title: 'Showroom Founded', desc: 'Shree Balaji TVS opened its doors in Chhuchhakwas, Jhajjar — bringing the full TVS range to rural Haryana.' },
  { year: '2020', title: 'Service Bay Launched', desc: 'Expanded to include a dedicated TVS-certified workshop with computer diagnostics equipment.' },
  { year: '2022', title: 'EV Ready Showroom', desc: 'Became one of the first EV-ready TVS dealerships in Jhajjar district with iQube demo units and fast chargers.' },
  { year: '2024', title: '1000+ Happy Customers', desc: 'Crossed the milestone of 1,000 satisfied vehicle owners across our motorcycle, scooter, and EV lineup.' },
  { year: '2025', title: 'TVS X Premium Launch', desc: 'First in the district to showcase the TVS X electric crossover and Apache RTR 310 flagship models.' },
];

const TEAM_VALUES = [
  { icon: Target, label: 'Our Mission', desc: 'To be the most trusted TVS dealership in Haryana — offering honest pricing, genuine spare parts, and expert workshop services to every customer, from first-time buyers to seasoned riders.' },
  { icon: Eye, label: 'Our Vision', desc: 'To become the premier mobility partner for the Jhajjar district — empowering local communities to own world-class motorcycles, electric scooters, and connected smart vehicles at accessible prices.' },
  { icon: Heart, label: 'Our Values', desc: 'Customer-first service, zero compromise on parts quality, radical pricing transparency, community involvement, and a passion for Indian motorsport culture at every level of the showroom experience.' },
];

export default function AboutPage() {
  return (
    <div className="main-content-wrapper">

      {/* Hero Banner */}
      <section style={{ padding: '90px 0 70px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-bg" style={{ top: '-5%', right: '5%', opacity: 0.08 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <div>
              <span className="section-subtitle">Our Story · Since 2019</span>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: '900', color: 'var(--text-primary)', lineHeight: '1.1', margin: '12px 0 20px' }}>
                Shree Balaji <span style={{ color: 'var(--brand)' }}>TVS</span> — Built on Trust
              </h1>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.75', marginBottom: '16px' }}>
                Founded in 2019 on the Marot Road in Chhuchhakwas, Jhajjar, Shree Balaji TVS began with a simple belief: every local rider deserves access to the best bikes in India with honest, transparent service.
              </p>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.75', marginBottom: '32px' }}>
                Today, we are one of Haryana's fastest-growing TVS dealerships — selling motorcycles, premium scooters, and India's most exciting electric vehicles, while operating a state-of-the-art certified service workshop on the same premises.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/catalog" className="btn btn-primary" style={{ textDecoration: 'none', padding: '14px 28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Bike size={16} /> Explore Our Range
                </Link>
                <Link href="/contact" className="btn btn-secondary" style={{ textDecoration: 'none', padding: '14px 28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} /> Contact Us
                </Link>
              </div>
            </div>

            {/* Quick Info Card */}
            <div style={{ padding: '36px', background: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '24px' }}>Showroom Details</h3>
              {[
                { icon: MapPin, label: 'Location', val: 'Marot Road, Chhuchhakwas, near Bright Mission School, Jhajjar, Haryana' },
                { icon: Phone, label: 'Phone', val: '+91 80592 12212' },
                { icon: Calendar, label: 'Open Since', val: '2019' },
                { icon: Award, label: 'Dealer Type', val: 'TVS Authorized Dealer & Certified Workshop' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} style={{ display: 'flex', gap: '14px', marginBottom: '20px', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(var(--brand-rgb), 0.1)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginBottom: '3px' }}>{item.label}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.4' }}>{item.val}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats */}
      <section style={{ padding: '56px 0', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', textAlign: 'center' }}>
            {[
              { end: 7, suffix: '+ Yrs', label: 'Years of Service', icon: Calendar },
              { end: 1200, suffix: '+', label: 'Bikes Sold', icon: Bike },
              { end: 1000, suffix: '+', label: 'Happy Customers', icon: Users },
              { end: 5, suffix: '★ Rating', label: 'Customer Satisfaction', icon: Zap },
              { end: 100, suffix: '%', label: 'Genuine OEM Parts', icon: Shield },
            ].map(stat => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} style={{ padding: '28px 16px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <div style={{ color: 'var(--brand)', marginBottom: '10px' }}><Icon size={24} /></div>
                  <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--brand)', fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '8px' }}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header align-center">
            <span className="section-subtitle">What We Stand For</span>
            <h2 className="section-title">Mission, Vision & Values</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', marginTop: '48px' }}>
            {TEAM_VALUES.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} style={{ padding: '36px', background: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(var(--brand-rgb), 0.1)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '12px' }}>{item.label}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.75' }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Milestones */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header align-center">
            <span className="section-subtitle">Our Journey</span>
            <h2 className="section-title">Key Milestones</h2>
          </div>
          <div style={{ maxWidth: '700px', margin: '48px auto 0', position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '50px', top: 0, bottom: 0, width: '2px', background: 'var(--border-color)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
              {MILESTONES.map((m, idx) => (
                <div key={m.year} style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', position: 'relative' }}>
                  {/* Year badge */}
                  <div style={{ flexShrink: 0, width: '100px', textAlign: 'right', paddingRight: '28px', position: 'relative' }}>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--brand)', background: 'var(--bg-primary)', padding: '2px 6px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>{m.year}</span>
                    {/* Dot */}
                    <div style={{ position: 'absolute', right: '-6px', top: '50%', transform: 'translateY(-50%)', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--brand)', border: '3px solid var(--bg-primary)' }} />
                  </div>
                  <div style={{ padding: '20px 24px', background: 'var(--bg-secondary)', borderRadius: '14px', border: '1px solid var(--border-color)', flex: 1 }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>{m.title}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
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
                Visit Shree Balaji TVS Today
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>
                Marot Road, Chhuchhakwas, Jhajjar, Haryana — Open 7 days a week
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="tel:8059212212"
                className="btn btn-primary"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none',
                  padding: '16px 32px', borderRadius: '12px', fontSize: '14px', fontWeight: '800',
                  letterSpacing: '0.05em'
                }}
              >
                <Phone size={16} /> Call +91 80592 12212
              </a>
              <Link
                href="/catalog"
                className="btn btn-secondary"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none',
                  padding: '16px 32px', borderRadius: '12px', fontSize: '14px', fontWeight: '800',
                  letterSpacing: '0.05em'
                }}
              >
                <Bike size={16} /> See All Bikes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

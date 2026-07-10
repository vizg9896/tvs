"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Zap, ArrowRight, CheckCircle, Phone, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useVehicles } from '../../../components/DataContext';

export default function BikeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const vehicles = useVehicles();
  const id = params?.id as string;

  const vehicle = vehicles.find(v => v.id === id);
  const [activeColor, setActiveColor] = useState(0);
  const [activeVariant, setActiveVariant] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    if (vehicles.length > 0 && !vehicle) {
      router.push('/catalog');
    }
  }, [vehicle, vehicles, router]);

  useEffect(() => {
    setActiveColor(0);
    setActiveVariant(0);
    setImgIdx(0);
  }, [id]);

  if (!vehicle) {
    return (
      <div className="main-content-wrapper" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏍️</div>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Loading vehicle...</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Please wait a moment.</p>
        </div>
      </div>
    );
  }

  // Similar bikes: same category, exclude current
  const similarBikes = vehicles.filter(v => v.category === vehicle.category && v.id !== vehicle.id).slice(0, 3);

  const currentColor = vehicle.colorways[activeColor];
  const currentVariant = vehicle.variants[activeVariant];
  const displayPrice = currentVariant?.price || vehicle.price;

  return (
    <div className="main-content-wrapper">

      {/* Breadcrumb */}
      <section style={{ padding: '20px 0', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/catalog" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Catalog</Link>
            <span>/</span>
            <span style={{ color: 'var(--brand)', fontWeight: '600' }}>{vehicle.title}</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-bg" style={{ top: '-10%', right: '-5%', opacity: 0.08 }}></div>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '60px', alignItems: 'center' }}>

          {/* Image Showcase */}
          <div style={{ position: 'relative' }}>
            {vehicle.isEV && (
              <span className="tag-ev" style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 2 }}>
                <Zap size={10} style={{ fill: 'currentColor' }} /> Electric
              </span>
            )}
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              aspectRatio: '16/10',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px'
            }}>
              {/* Glow blob */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse at center, ${currentColor?.color}18 0%, transparent 70%)`,
                pointerEvents: 'none'
              }} />
              <img
                src={vehicle.image}
                alt={vehicle.title}
                style={{
                  width: '100%',
                  maxHeight: '280px',
                  objectFit: 'contain',
                  filter: currentColor?.filter,
                  transition: 'filter 0.4s ease',
                  position: 'relative',
                  zIndex: 1
                }}
              />
            </div>

            {/* Color Swatches */}
            {vehicle.colorways.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {vehicle.colorways.map((cw, idx) => (
                  <button
                    key={cw.name}
                    onClick={() => setActiveColor(idx)}
                    title={cw.name}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: cw.color,
                      border: activeColor === idx
                        ? `3px solid var(--brand)`
                        : '3px solid var(--border-color)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      transform: activeColor === idx ? 'scale(1.2)' : 'scale(1)',
                      boxShadow: activeColor === idx ? `0 0 10px ${cw.color}66` : 'none'
                    }}
                  />
                ))}
              </div>
            )}
            {currentColor && (
              <p style={{ textAlign: 'center', marginTop: '8px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                {currentColor.name}
              </p>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="section-subtitle">{vehicle.category} · {vehicle.isEV ? 'Electric' : 'Petrol'}</span>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '900', color: 'var(--text-primary)', lineHeight: '1.1', margin: '12px 0 8px' }}>
              {vehicle.title}
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--brand)', fontWeight: '700', marginBottom: '16px' }}>{vehicle.subtitle}</p>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '28px' }}>
              {vehicle.desc}
            </p>

            {/* Quick specs */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginBottom: '28px',
              padding: '20px',
              background: 'var(--bg-secondary)',
              borderRadius: '14px',
              border: '1px solid var(--border-color)'
            }}>
              {[
                { label: 'Top Speed', val: vehicle.speed },
                { label: 'Power', val: vehicle.power },
                { label: 'Acceleration', val: vehicle.acceleration }
              ].map(spec => (
                <div key={spec.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--brand)', fontFamily: "'Outfit', sans-serif" }}>
                    {spec.val}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
                    {spec.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Variant Selector */}
            {vehicle.variants.length > 1 && (
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                  Select Variant
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {vehicle.variants.map((v, idx) => (
                    <button
                      key={v.name}
                      onClick={() => setActiveVariant(idx)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: activeVariant === idx ? '2px solid var(--brand)' : '1px solid var(--border-color)',
                        background: activeVariant === idx ? 'rgba(var(--brand-rgb), 0.07)' : 'var(--bg-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textAlign: 'left',
                        width: '100%'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{v.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{v.desc}</div>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--brand)', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                        ₹ {v.price.toLocaleString('en-IN')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Display */}
            <div style={{ marginBottom: '28px' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Ex-Showroom Price, Jhajjar</p>
              <p style={{ fontSize: '36px', fontWeight: '900', color: 'var(--brand)', fontFamily: "'Outfit', sans-serif" }}>
                ₹ {displayPrice.toLocaleString('en-IN')}
              </p>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href={`/contact?book=true&vehicle=${vehicle.id}&variant=${encodeURIComponent(currentVariant?.name || '')}`}
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '14px 28px', fontSize: '14px' }}
              >
                <Calendar size={16} /> Book Test Ride
              </Link>
              <a
                href={`https://wa.me/918059212212?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(vehicle.title)}%20%E2%80%93%20${encodeURIComponent(currentVariant?.name || '')}%20at%20Shree%20Balaji%20TVS.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '14px 28px', fontSize: '14px' }}
              >
                <Phone size={16} /> WhatsApp Enquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Full Specifications */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header align-center">
            <span className="section-subtitle">Technical Data</span>
            <h2 className="section-title">Full Specifications</h2>
          </div>
          <div style={{
            marginTop: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2px',
            background: 'var(--border-color)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)'
          }}>
            {Object.entries(vehicle.specs).map(([key, val], idx) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '20px 24px',
                  background: 'var(--bg-secondary)',
                  alignItems: 'flex-start'
                }}
              >
                <CheckCircle size={16} style={{ color: 'var(--brand)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    {key}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                    {val}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry CTA Banner */}
      <section style={{ padding: '60px 0', background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-dark, #b91c1c) 100%)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#fff', marginBottom: '12px' }}>
            Ready to Own the {vehicle.title}?
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', marginBottom: '28px', maxWidth: '500px', margin: '0 auto 28px' }}>
            Visit Shree Balaji TVS, Chhuchhakwas or call us at +91 80592 12212 to schedule a free test ride today.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href={`/contact?book=true&vehicle=${vehicle.id}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none',
                padding: '14px 32px', borderRadius: '10px', fontSize: '14px', fontWeight: '700',
                background: '#fff', color: 'var(--brand)'
              }}
            >
              <Calendar size={16} /> Book Test Ride
            </Link>
            <a
              href="tel:8059212212"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none',
                padding: '14px 32px', borderRadius: '10px', fontSize: '14px', fontWeight: '700',
                background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)'
              }}
            >
              <Phone size={16} /> Call Showroom
            </a>
          </div>
        </div>
      </section>

      {/* Similar Bikes */}
      {similarBikes.length > 0 && (
        <section className="section-padding">
          <div className="container">
            <div className="section-header align-center">
              <span className="section-subtitle">You May Also Like</span>
              <h2 className="section-title">Similar Models</h2>
            </div>
            <div className="range-grid" style={{ marginTop: '40px' }}>
              {similarBikes.map(bike => (
                <div key={bike.id} className="elevated-panel vehicle-card">
                  {bike.isEV && (
                    <span className="tag-ev">
                      <Zap size={9} style={{ fill: 'currentColor' }} /> Electric
                    </span>
                  )}
                  <div className="card-img-wrap">
                    <img src={bike.image} alt={bike.title} />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{bike.title}</h3>
                    <p className="card-desc">{bike.subtitle}</p>
                    <div className="card-footer" style={{ marginTop: 'auto' }}>
                      <div className="card-price">
                        <span className="price-lbl">From</span>
                        <span className="price-val">₹ {bike.price.toLocaleString('en-IN')}</span>
                      </div>
                      <Link
                        href={`/catalog/${bike.id}`}
                        className="btn btn-primary"
                        style={{ padding: '8px 16px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                      >
                        View Details <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

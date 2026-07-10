"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Zap, Search, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { useVehicles } from '../../components/DataContext';

const PRICE_RANGES = [
  { label: 'All Budgets', min: 0, max: Infinity },
  { label: 'Under ₹75,000', min: 0, max: 75000 },
  { label: '₹75K – ₹1.25L', min: 75000, max: 125000 },
  { label: '₹1.25L – ₹2L', min: 125000, max: 200000 },
  { label: 'Above ₹2L', min: 200000, max: Infinity },
];

export default function CatalogPage() {
  const vehicles = useVehicles();
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Motorcycle' | 'Scooter' | 'EV' | 'Moped'>('All');
  const [priceRange, setPriceRange] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const range = PRICE_RANGES[priceRange];

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchCat = categoryFilter === 'All' ? true : categoryFilter === 'EV' ? vehicle.isEV : vehicle.category === categoryFilter;
    const matchPrice = vehicle.price >= range.min && vehicle.price <= range.max;
    const matchSearch = search.trim() === '' || vehicle.title.toLowerCase().includes(search.toLowerCase()) || vehicle.subtitle.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchPrice && matchSearch;
  });

  return (
    <div className="main-content-wrapper">
      <section className="section-padding">
        <div className="container">
          <div className="section-header align-center">
            <span className="section-subtitle">TVS Showroom Range</span>
            <h1 className="section-title">Explore Shree Balaji Lineup</h1>
            <p className="section-desc">Browse our complete catalog of {vehicles.length} TVS models. Use search and filters to find your dream ride.</p>
          </div>

          {/* Search Bar */}
          <div style={{ maxWidth: '500px', margin: '28px auto 20px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search bikes... (e.g. Apache, iQube, Ronin)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Filters Row */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
            {/* Category Tabs */}
            {(['All', 'Motorcycle', 'Scooter', 'EV', 'Moped'] as const).map((tab) => (
              <button
                key={tab}
                className={`btn ${categoryFilter === tab ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCategoryFilter(tab)}
                style={{ padding: '8px 16px', fontSize: '12px' }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
              <SlidersHorizontal size={12} /> Price:
            </span>
            {PRICE_RANGES.map((r, idx) => (
              <button
                key={r.label}
                onClick={() => setPriceRange(idx)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '20px',
                  border: `1px solid ${priceRange === idx ? 'var(--brand)' : 'var(--border-color)'}`,
                  background: priceRange === idx ? 'rgba(var(--brand-rgb), 0.1)' : 'transparent',
                  color: priceRange === idx ? 'var(--brand)' : 'var(--text-secondary)',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Confused / Contact Callout Banner */}
          <div className="confused-banner">
            <div className="confused-text">
              <h3 className="confused-title">Confused between choosing the perfect bike?</h3>
              <p className="confused-desc">
                Don't worry! Our showroom experts at Shree Balaji TVS Chhuchhakwas are just one step away to guide you, or you can compare models side-by-side.
              </p>
            </div>
            <div className="confused-actions">
              <Link 
                href="/compare" 
                className="btn btn-secondary"
              >
                Compare Models
              </Link>
              <a 
                href="tel:8059212212" 
                className="btn btn-primary"
              >
                📞 Call: +91 80592 12212
              </a>
            </div>
          </div>

          {/* Result count */}
          <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Showing <strong style={{ color: 'var(--brand)' }}>{filteredVehicles.length}</strong> of {vehicles.length} models
          </p>

          {filteredVehicles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>No bikes found</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Try adjusting your search or filters.</p>
              <button onClick={() => { setSearch(''); setCategoryFilter('All'); setPriceRange(0); }} className="btn btn-primary" style={{ marginTop: '16px' }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="range-grid">
              {filteredVehicles.map((vehicle) => {
                const activeVarName = selectedVariants[vehicle.id] || vehicle.variants[0]?.name || '';
                const activeVar = vehicle.variants.find(v => v.name === activeVarName) || vehicle.variants[0];
                const displayedPrice = activeVar ? activeVar.price : vehicle.price;

                return (
                  <div key={vehicle.id} className="elevated-panel vehicle-card">
                    {vehicle.isEV && (
                      <span className="tag-ev">
                        <Zap size={9} style={{ fill: 'currentColor' }} /> Electric
                      </span>
                    )}
                    <div className="card-img-wrap">
                      <img src={vehicle.image} alt={vehicle.title} />
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">{vehicle.title}</h3>
                      <p className="card-desc">{vehicle.desc}</p>

                      {vehicle.variants && vehicle.variants.length > 0 && (
                        <div className="form-group" style={{ marginBottom: '16px' }}>
                          <label htmlFor={`variant-${vehicle.id}`} style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Trim Variant</label>
                          <select
                            id={`variant-${vehicle.id}`}
                            className="comp-select"
                            style={{ padding: '6px 10px', fontSize: '12px', height: '32px', marginTop: '4px', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                            value={activeVarName}
                            onChange={(e) => setSelectedVariants({ ...selectedVariants, [vehicle.id]: e.target.value })}
                          >
                            {vehicle.variants.map((v) => (
                              <option key={v.name} value={v.name}>{v.name}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div className="card-specs-row">
                        <div className="card-spec-item">
                          <span className="card-spec-val">{vehicle.speed}</span>
                          <span className="card-spec-lbl">Top Speed</span>
                        </div>
                        <div className="card-spec-item">
                          <span className="card-spec-val">
                            {vehicle.isEV ? (
                              vehicle.id === 'iqube' ? '100 km' :
                              vehicle.id === 'tvs_x' ? '140 km' :
                              '158 km'
                            ) : vehicle.power}
                          </span>
                          <span className="card-spec-lbl">
                            {vehicle.isEV ? 'IDC Range' : 'Power'}
                          </span>
                        </div>
                        <div className="card-spec-item">
                          <span className="card-spec-val">
                            {vehicle.isEV ? (
                              vehicle.id === 'iqube' ? '3.04 kWh' :
                              vehicle.id === 'tvs_x' ? '4.44 kWh' :
                              '3.1 kWh'
                            ) : vehicle.acceleration}
                          </span>
                          <span className="card-spec-lbl">
                            {vehicle.isEV ? 'Battery' : 'Accel'}
                          </span>
                        </div>
                      </div>

                      <div className="card-footer">
                        <div className="card-price">
                          <span className="price-lbl">Starting Price</span>
                          <span className="price-val">₹ {displayedPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          <Link
                            href={`/catalog/${vehicle.id}`}
                            className="btn btn-secondary"
                            style={{ padding: '7px 11px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                          >
                            Details <ArrowRight size={11} />
                          </Link>
                          <Link
                            href={`/contact?book=true&vehicle=${vehicle.id}&variant=${encodeURIComponent(activeVarName)}`}
                            className="btn btn-primary"
                            style={{ padding: '7px 11px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
                          >
                            Book
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState, useEffect } from 'react';
import { Vehicle, Colorway } from '../data';
import { useVehicles } from '../../components/DataContext';

export default function ComparePage() {
  const vehicles = useVehicles();
  const [compVeh1, setCompVeh1] = useState<Vehicle>(vehicles[0]);
  const [compVeh2, setCompVeh2] = useState<Vehicle>(vehicles[1] || vehicles[0]);

  const [colorVeh1, setColorVeh1] = useState<Colorway>(vehicles[0]?.colorways[0]);
  const [colorVeh2, setColorVeh2] = useState<Colorway>((vehicles[1] || vehicles[0])?.colorways[0]);

  const handleVeh1Change = (vehicle: Vehicle) => {
    setCompVeh1(vehicle);
    setColorVeh1(vehicle.colorways[0]);
  };

  const handleVeh2Change = (vehicle: Vehicle) => {
    setCompVeh2(vehicle);
    setColorVeh2(vehicle.colorways[0]);
  };

  // Sync state if dynamic vehicles load or update
  useEffect(() => {
    if (vehicles && vehicles.length > 0) {
      const updatedVeh1 = vehicles.find(v => v.id === compVeh1.id) || vehicles[0];
      const updatedVeh2 = vehicles.find(v => v.id === compVeh2.id) || vehicles[1] || vehicles[0];
      setCompVeh1(updatedVeh1);
      setCompVeh2(updatedVeh2);

      const color1 = updatedVeh1.colorways.find(c => c.name === colorVeh1?.name) || updatedVeh1.colorways[0];
      setColorVeh1(color1);

      const color2 = updatedVeh2.colorways.find(c => c.name === colorVeh2?.name) || updatedVeh2.colorways[0];
      setColorVeh2(color2);
    }
  }, [vehicles]);

  return (
    <div className="main-content-wrapper">
      <section className="section-padding comparator-section">
        <div className="container">
          <div className="section-header align-center">
            <span className="section-subtitle">Side-by-Side Comparator & Color Lab</span>
            <h1 className="section-title">Compare & Customize TVS Models</h1>
            <p className="section-desc">Select any two vehicles to compare specs, pricing, and interactively customize their showroom colors side-by-side.</p>
          </div>

          {/* Side-by-Side Visual Customizer Controls */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginTop: '40px', marginBottom: '40px' }}>
            
            {/* Column 1 */}
            <div className="elevated-panel" style={{ padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label htmlFor="comp-1" style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>Select Vehicle 1</label>
                <select 
                  id="comp-1"
                  className="comp-select" 
                  value={compVeh1.id} 
                  onChange={(e) => {
                    const v = vehicles.find((v) => v.id === e.target.value) || vehicles[0];
                    handleVeh1Change(v);
                  }}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontWeight: '600' }}
                >
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>{vehicle.title}</option>
                  ))}
                </select>
              </div>

              {/* Visual Preview */}
              <div className="customizer-visual" style={{ height: '220px', position: 'relative', overflow: 'hidden', borderRadius: '12px', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="glow-bg" style={{ position: 'absolute', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, var(--brand) 0%, transparent 70%)', opacity: 0.15, filter: 'blur(30px)' }}></div>
                {compVeh1 && (
                  <img 
                    src={compVeh1.image} 
                    alt={compVeh1.title} 
                    className="vehicle-custom-preview"
                    style={{ filter: colorVeh1?.filter, maxHeight: '170px', objectFit: 'contain', transition: 'all 0.3s ease' }}
                  />
                )}
                {colorVeh1 && (
                  <span className="color-badge" style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', color: '#fff', padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold' }}>{colorVeh1.name}</span>
                )}
              </div>

              {/* Swatches */}
              {compVeh1 && compVeh1.colorways && (
                <div>
                  <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>Select Colorway</span>
                  <div className="color-swatches" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {compVeh1.colorways.map((colorway) => (
                      <button
                        key={colorway.name}
                        className={`swatch ${colorVeh1?.name === colorway.name ? 'active' : ''}`}
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          border: colorVeh1?.name === colorway.name ? '2px solid var(--brand)' : '1px solid var(--border-color)', 
                          backgroundColor: colorway.color, 
                          cursor: 'pointer',
                          padding: 0,
                          transform: colorVeh1?.name === colorway.name ? 'scale(1.15)' : 'scale(1)',
                          transition: 'all 0.2s ease'
                        }}
                        onClick={() => setColorVeh1(colorway)}
                        title={colorway.name}
                        aria-label={`Select ${colorway.name}`}
                        type="button"
                      ></button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Column 2 */}
            <div className="elevated-panel" style={{ padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label htmlFor="comp-2" style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>Select Vehicle 2</label>
                <select 
                  id="comp-2"
                  className="comp-select" 
                  value={compVeh2.id} 
                  onChange={(e) => {
                    const v = vehicles.find((v) => v.id === e.target.value) || vehicles[1] || vehicles[0];
                    handleVeh2Change(v);
                  }}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontWeight: '600' }}
                >
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>{vehicle.title}</option>
                  ))}
                </select>
              </div>

              {/* Visual Preview */}
              <div className="customizer-visual" style={{ height: '220px', position: 'relative', overflow: 'hidden', borderRadius: '12px', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="glow-bg" style={{ position: 'absolute', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, var(--brand) 0%, transparent 70%)', opacity: 0.15, filter: 'blur(30px)' }}></div>
                {compVeh2 && (
                  <img 
                    src={compVeh2.image} 
                    alt={compVeh2.title} 
                    className="vehicle-custom-preview"
                    style={{ filter: colorVeh2?.filter, maxHeight: '170px', objectFit: 'contain', transition: 'all 0.3s ease' }}
                  />
                )}
                {colorVeh2 && (
                  <span className="color-badge" style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', color: '#fff', padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold' }}>{colorVeh2.name}</span>
                )}
              </div>

              {/* Swatches */}
              {compVeh2 && compVeh2.colorways && (
                <div>
                  <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>Select Colorway</span>
                  <div className="color-swatches" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {compVeh2.colorways.map((colorway) => (
                      <button
                        key={colorway.name}
                        className={`swatch ${colorVeh2?.name === colorway.name ? 'active' : ''}`}
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          border: colorVeh2?.name === colorway.name ? '2px solid var(--brand)' : '1px solid var(--border-color)', 
                          backgroundColor: colorway.color, 
                          cursor: 'pointer',
                          padding: 0,
                          transform: colorVeh2?.name === colorway.name ? 'scale(1.15)' : 'scale(1)',
                          transition: 'all 0.2s ease'
                        }}
                        onClick={() => setColorVeh2(colorway)}
                        title={colorway.name}
                        aria-label={`Select ${colorway.name}`}
                        type="button"
                      ></button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Comparison Table */}
          <div className="comparison-table-wrapper" style={{ marginTop: '40px' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Specifications</th>
                  <th>{compVeh1.title}</th>
                  <th>{compVeh2.title}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="highlight-row">
                  <td>Starting Showroom Price</td>
                  <td style={{ fontWeight: 'bold', color: 'var(--brand)' }}>₹ {compVeh1.price.toLocaleString('en-IN')}</td>
                  <td style={{ fontWeight: 'bold', color: 'var(--brand)' }}>₹ {compVeh2.price.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td>Available Trims & Pricing</td>
                  <td>
                    <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0 }}>
                      {compVeh1.variants.map((v) => (
                        <li key={v.name} style={{ fontSize: '11px', marginBottom: '4px' }}>
                          • {v.name} - <strong>₹ {v.price.toLocaleString('en-IN')}</strong>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0 }}>
                      {compVeh2.variants.map((v) => (
                        <li key={v.name} style={{ fontSize: '11px', marginBottom: '4px' }}>
                          • {v.name} - <strong>₹ {v.price.toLocaleString('en-IN')}</strong>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>{compVeh1.category}</td>
                  <td>{compVeh2.category}</td>
                </tr>
                <tr>
                  <td>Engine/Battery Technology</td>
                  <td>{compVeh1.isEV ? 'EV Battery Pack' : 'Petrol Internal Combustion'}</td>
                  <td>{compVeh2.isEV ? 'EV Battery Pack' : 'Petrol Internal Combustion'}</td>
                </tr>
                <tr>
                  <td>Max Power Output</td>
                  <td>{compVeh1.power}</td>
                  <td>{compVeh2.power}</td>
                </tr>
                <tr>
                  <td>Top Speed</td>
                  <td>{compVeh1.speed}</td>
                  <td>{compVeh2.speed}</td>
                </tr>
                <tr>
                  <td>0 - 60 km/h acceleration</td>
                  <td>{compVeh1.acceleration}</td>
                  <td>{compVeh2.acceleration}</td>
                </tr>
                {[
                  'Engine & Transmission',
                  'Power & Torque',
                  'Suspension Setup',
                  'Braking & Safety',
                  'Smart Dashboard & Console'
                ].map((specName) => (
                  <tr key={specName}>
                    <td>{specName}</td>
                    <td>{compVeh1.specs[specName] || 'Not specified'}</td>
                    <td>{compVeh2.specs[specName] || 'Not specified'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

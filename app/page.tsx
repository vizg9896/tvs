"use client";

import Link from 'next/link';
import { 
  Shield, 
  Zap, 
  Award, 
  Clock,
  ArrowRight,
  Bike,
  Compass,
  Sliders,
  Layers,
  Calculator,
  Percent
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import { VEHICLES } from './data';

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  start?: number;
}

function AnimatedCounter({ end, duration = 2000, prefix = "", suffix = "", start = 0 }: CounterProps) {
  const [count, setCount] = useState(start);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = progress * (2 - progress);
            const currentCount = Math.floor(easedProgress * (end - start) + start);

            setCount(currentCount);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [end, duration, start]);

  return (
    <span ref={elementRef}>{prefix}{count.toLocaleString()}{suffix}</span>
  );
}

export default function HomePage() {
  const [selectedEmiVehicleId, setSelectedEmiVehicleId] = useState(VEHICLES[0].id);
  const [customPrice, setCustomPrice] = useState(VEHICLES[0].price);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [emiTenure, setEmiTenure] = useState(36);
  const [emiInterestRate, setEmiInterestRate] = useState(9.5);

  const [financeName, setFinanceName] = useState('');
  const [financePhone, setFinancePhone] = useState('');
  const [financeSubmitted, setFinanceSubmitted] = useState(false);
  const [financeSubmitting, setFinanceSubmitting] = useState(false);
  const [financeError, setFinanceError] = useState('');

  const handleVehicleChange = (id: string) => {
    setSelectedEmiVehicleId(id);
    const v = VEHICLES.find(x => x.id === id);
    if (v) {
      setCustomPrice(v.price);
    }
  };

  const selectedVehicle = VEHICLES.find(v => v.id === selectedEmiVehicleId) || VEHICLES[0];
  const vehiclePrice = customPrice;
  const downPayment = Math.round((vehiclePrice * downPaymentPercent) / 100);
  const loanAmount = vehiclePrice - downPayment;
  const monthlyRate = (emiInterestRate / 100) / 12;
  const exactEmi = monthlyRate > 0 
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, emiTenure)) / (Math.pow(1 + monthlyRate, emiTenure) - 1)
    : loanAmount / emiTenure;
  const emiVal = Math.round(exactEmi);
  const totalRepayment = Math.round(exactEmi * emiTenure);
  const totalInterest = Math.max(0, totalRepayment - loanAmount);

  const getWhatsAppUrl = () => {
    const text = `Hello Shree Balaji TVS,\n\nI want to apply for finance for the *${selectedVehicle.title}*:\n\n*Finance Calculation Details:*\n- Ex-Showroom Price: ₹${vehiclePrice.toLocaleString('en-IN')}\n- Down Payment: ₹${downPayment.toLocaleString('en-IN')} (${downPaymentPercent}%)\n- Loan Amount: ₹${loanAmount.toLocaleString('en-IN')}\n- Monthly EMI: ₹${emiVal.toLocaleString('en-IN')}/month\n- Tenure: ${emiTenure} Months\n- Interest Rate: ${emiInterestRate}% P.A.\n\n${financeName ? `*My Contact Details:*\n- Name: ${financeName}\n- Phone: ${financePhone || ''}\n\n` : ''}Please guide me on the next steps for approval.`;
    return `https://wa.me/918059212212?text=${encodeURIComponent(text)}`;
  };

  const handleFinanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!financeName.trim() || !financePhone.trim()) {
      setFinanceError('Please fill in all fields.');
      return;
    }
    if (financePhone.replace(/\D/g, '').length < 10) {
      setFinanceError('Please enter a valid 10-digit phone number.');
      return;
    }

    setFinanceSubmitting(true);
    setFinanceError('');

    const message = `EMI Application: Selected: ${selectedVehicle.title}. Down Payment: ₹${downPayment.toLocaleString('en-IN')} (${downPaymentPercent}%), Tenure: ${emiTenure} Months, Interest Rate: ${emiInterestRate}%, Monthly EMI: ₹${emiVal.toLocaleString('en-IN')}/month.`;

    const payload = {
      type: 'finance' as any,
      name: financeName,
      phone: financePhone,
      vehicleTitle: selectedVehicle.title,
      message,
      submittedAt: new Date().toISOString()
    };

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        const stored = localStorage.getItem('sb_tvs_enquiries');
        let currentEnquiries = [];
        if (stored) {
          try { currentEnquiries = JSON.parse(stored); } catch (err) {}
        }
        const localPayload = {
          id: Date.now().toString(),
          type: 'finance',
          name: financeName,
          phone: financePhone,
          vehicleTitle: selectedVehicle.title,
          message,
          submittedAt: payload.submittedAt,
          status: 'new'
        };
        currentEnquiries.push(localPayload);
        localStorage.setItem('sb_tvs_enquiries', JSON.stringify(currentEnquiries));

        setFinanceSubmitted(true);
        setFinanceName('');
        setFinancePhone('');
      } else {
        setFinanceError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setFinanceError('Network error. Please try again.');
    } finally {
      setFinanceSubmitting(false);
    }
  };

  return (
    <div className="main-content-wrapper">
      {/* Premium Hero Slider */}
      <HeroSlider />

      {/* Trust & Features Ribbon */}
      <section className="features-ribbon">
        <div className="container ribbon-grid">
          <div className="ribbon-item">
            <div className="ribbon-icon"><Shield size={18} /></div>
            <div className="ribbon-text">
              <h4>100% Genuine TVS Parts</h4>
              <p>Direct from TVS manufacturing units</p>
            </div>
          </div>
          <div className="ribbon-item">
            <div className="ribbon-icon"><Zap size={18} /></div>
            <div className="ribbon-text">
              <h4>EV Infrastructure Hub</h4>
              <p>Equipped with TVS fast chargers</p>
            </div>
          </div>
          <div className="ribbon-item">
            <div className="ribbon-icon"><Award size={18} /></div>
            <div className="ribbon-text">
              <h4>Hassle-Free Booking</h4>
              <p>Lowest interest rates & fast approval</p>
            </div>
          </div>
          <div className="ribbon-item">
            <div className="ribbon-icon"><Clock size={18} /></div>
            <div className="ribbon-text">
              <h4>Rapid Service Bays</h4>
              <p>Top mechanics & computer diagnostics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dealership Legacy & Milestone Stats */}
      <section className="stats-strip" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '40px 0', position: 'relative', zIndex: 5 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--brand)', fontFamily: "'Outfit', sans-serif" }}>
              <AnimatedCounter start={2000} end={2019} duration={1200} />
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Established Showroom</div>
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--brand)', fontFamily: "'Outfit', sans-serif" }}>
              <AnimatedCounter end={7} suffix="+ Years" duration={1200} />
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Trusted TVS Service</div>
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--brand)', fontFamily: "'Outfit', sans-serif" }}>
              <AnimatedCounter end={1000} suffix="+" duration={1500} />
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Satisfied Customers</div>
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--brand)', fontFamily: "'Outfit', sans-serif" }}>
              <AnimatedCounter end={100} suffix="%" duration={1200} />
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>TVS Genuine Spares</div>
          </div>
        </div>
      </section>

      {/* TVS Authorized Services & Certified Workshop */}
      <section className="section-padding" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-secondary)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="glow-bg" style={{ top: '10%', right: '5%', opacity: '0.07' }}></div>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
          <div>
            <span className="section-subtitle">TVS Certified Workshop</span>
            <h2 className="section-title">Authorized Dealer Services</h2>
            <p className="section-desc" style={{ marginBottom: '28px' }}>
              At Shree Balaji TVS, our support doesn't end when you ride out of the showroom. We host a state-of-the-art authorized service workshop to keep your machine in peak racing condition.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(var(--brand-rgb), 0.1)', color: 'var(--brand)', flexShrink: 0 }}>
                  <Sliders size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>TVS Factory-Trained Mechanics</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>Our diagnostics are run by mechanics certified directly by TVS Motor Company, using official OBD computer diagnostic gear.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(var(--brand-rgb), 0.1)', color: 'var(--brand)', flexShrink: 0 }}>
                  <Shield size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>100% Genuine TVS Spares & Fluids</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>We carry a complete catalog of original spare parts, accessories, and TVS TRU4 high-performance engine lubricants directly matching manufacturer specs.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(var(--brand-rgb), 0.1)', color: 'var(--brand)', flexShrink: 0 }}>
                  <Clock size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>Rapid Turnaround Diagnostic Bays</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>Multiple hydraulic service lifts, laser wheel aligners, and automated wash bays guarantee speedy routine servicing and customized tune-ups.</p>
                </div>
              </div>
            </div>
          </div>

          {/* High-quality big visual showcase */}
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '420px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '1px solid var(--border-color)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,10,15,0) 40%, rgba(8,10,15,0.85) 100%)', zIndex: 1 }}></div>
            <img 
              src="/assets/tvs_service_workshop.png" 
              alt="TVS Authorized Service Workshop - Shree Balaji TVS Chhuchhakwas" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', zIndex: 2 }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand)' }}>Authorized Facility</span>
              <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginTop: '6px' }}>Diagnostic Workshop Center</h4>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>Equipped for advanced tune-ups, tire alignment, and official parts integration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Portal Hub / Shortcuts Section */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 5 }}>
        <div className="container">
          <div className="section-header align-center">
            <span className="section-subtitle">Shree Balaji Digital Experience</span>
            <h2 className="section-title">Explore Our Showroom Features</h2>
            <p className="section-desc">Experience the best of TVS online. Navigate to dedicated pages to view the showroom, customize colors, configure specs, or compare models side-by-side.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px', marginTop: '40px' }}>
            {/* Shortcut 1 */}
            <div className="elevated-panel vehicle-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="card-content" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '24px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(var(--brand-rgb), 0.1)', color: 'var(--brand)', marginBottom: '20px' }}>
                  <Bike size={24} />
                </div>
                <h3 className="card-title" style={{ fontSize: '18px', fontWeight: '800', marginBottom: '10px' }}>Showroom Catalog</h3>
                <p className="card-desc" style={{ flexGrow: 1, marginBottom: '24px', fontSize: '14px', lineHeight: '1.5' }}>
                  Filter and browse our complete dealership range of TVS motorcycles, scooters, electric vehicles, and mopeds. Check specifications and local prices.
                </p>
                <Link href="/catalog" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', gap: '6px' }}>
                  Open Catalog <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Shortcut 2: Compare & Customize */}
            <div className="elevated-panel vehicle-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="card-content" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '24px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(var(--brand-rgb), 0.1)', color: 'var(--brand)', marginBottom: '20px' }}>
                  <Compass size={24} />
                </div>
                <h3 className="card-title" style={{ fontSize: '18px', fontWeight: '800', marginBottom: '10px' }}>Compare & Customize</h3>
                <p className="card-desc" style={{ flexGrow: 1, marginBottom: '24px', fontSize: '14px', lineHeight: '1.5' }}>
                  Compare technical specifications, ex-showroom prices, and customize model colorways interactively side-by-side.
                </p>
                <Link href="/compare" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', gap: '6px' }}>
                  Compare & Customize <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Finance & EMI Calculator Section */}
      <section className="section-padding" style={{ position: 'relative', background: 'var(--bg-secondary)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <div className="section-header align-center">
            <span className="section-subtitle">Easy Ownership Plans</span>
            <h2 className="section-title">Finance & EMI Calculator</h2>
            <p className="section-desc">Calculate your customized EMI and down payment schemes in real-time. Apply instantly for financing at our Shree Balaji TVS showroom.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginTop: '40px' }}>
            
            {/* Form and Controls */}
            <div className="elevated-panel" style={{ padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', color: 'var(--text-primary)' }}>Customize Your Loan</h3>

              {/* Select Bike & Editable Price */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div>
                  <label htmlFor="emi-vehicle-select" style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>Select Model</label>
                  <select 
                    id="emi-vehicle-select"
                    className="comp-select"
                    value={selectedEmiVehicleId}
                    onChange={(e) => handleVehicleChange(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontWeight: '600' }}
                  >
                    {VEHICLES.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="emi-price-input" style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>Price (₹)</label>
                  <input 
                    id="emi-price-input"
                    type="number"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(Number(e.target.value))}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontWeight: '600' }}
                  />
                </div>
              </div>

              {/* Down Payment Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label htmlFor="down-payment-range" style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Down Payment</label>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--brand)' }}>{downPaymentPercent}% (₹{downPayment.toLocaleString('en-IN')})</span>
                </div>
                <input 
                  id="down-payment-range"
                  type="range"
                  min="10"
                  max="80"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--brand)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  <span>Min: 10%</span>
                  <span>Max: 80%</span>
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label htmlFor="interest-rate-range" style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Interest Rate (P.A.)</label>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--brand)' }}>{emiInterestRate}%</span>
                </div>
                <input 
                  id="interest-rate-range"
                  type="range"
                  min="7.5"
                  max="15.0"
                  step="0.1"
                  value={emiInterestRate}
                  onChange={(e) => setEmiInterestRate(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--brand)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  <span>Min: 7.5%</span>
                  <span>Max: 15.0%</span>
                </div>
              </div>

              {/* Loan Tenure Toggle Buttons */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>Tenure Period</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {[12, 24, 36, 48].map((months) => (
                    <button
                      key={months}
                      onClick={() => setEmiTenure(months)}
                      className={emiTenure === months ? 'btn btn-primary' : 'btn btn-secondary'}
                      style={{ padding: '10px 0', fontSize: '12px', textAlign: 'center' }}
                      type="button"
                    >
                      {months} Mo
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* EMI Summary and Application Form */}
            <div className="elevated-panel" style={{ padding: '32px', borderRadius: '16px', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calculator size={18} style={{ color: 'var(--brand)' }} /> Calculation Details
                </h3>

                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderBottom: '1px dashed var(--border-color)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Ex-Showroom Price</span>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>₹ {vehiclePrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderBottom: '1px dashed var(--border-color)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Down Payment</span>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>- ₹ {downPayment.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderBottom: '1px dashed var(--border-color)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Loan Principal</span>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>₹ {loanAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderBottom: '1px dashed var(--border-color)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Total Interest Payable</span>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>₹ {totalInterest.toLocaleString('en-IN')}</span>
                  </div>
                  
                  {/* Highlighted EMI Box */}
                  <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(var(--brand-rgb), 0.05)', border: '1px solid rgba(var(--brand-rgb), 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                    <div>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.05em', color: 'var(--brand)' }}>Monthly EMI</span>
                      <h4 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--brand)', fontFamily: "'Outfit', sans-serif", margin: '4px 0 0' }}>₹ {emiVal.toLocaleString('en-IN')}</h4>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'right' }}>For {emiTenure} Months <br /> @ {emiInterestRate}% P.A.</span>
                  </div>
                </div>
              </div>

              {/* Lead Application Form */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                {financeSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '12px' }}>
                    <h4 style={{ color: '#10B981', fontWeight: '800', fontSize: '15px', marginBottom: '4px' }}>✓ Application Submitted!</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Our finance representative from Chhuchhakwas branch will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFinanceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)', margin: '0 0 4px' }}>Apply For Instant Approval</h4>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <input 
                        type="text" 
                        placeholder="Your Name"
                        value={financeName}
                        onChange={(e) => setFinanceName(e.target.value)}
                        style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '13px' }}
                        required
                      />
                      <input 
                        type="tel" 
                        placeholder="Mobile Number"
                        value={financePhone}
                        onChange={(e) => setFinancePhone(e.target.value)}
                        style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '13px' }}
                        required
                      />
                    </div>

                    {financeError && <p style={{ color: '#EF4444', fontSize: '12px', margin: 0 }}>{financeError}</p>}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        style={{ padding: '10px 8px', fontSize: '12px', fontWeight: '700', width: '100%', textTransform: 'uppercase', letterSpacing: '0.05em', height: '40px', justifyContent: 'center', alignItems: 'center' }}
                        disabled={financeSubmitting}
                      >
                        {financeSubmitting ? 'Submitting...' : 'Apply Online'}
                      </button>

                      <a 
                        href={getWhatsAppUrl()}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn"
                        style={{ 
                          padding: '10px 8px', 
                          fontSize: '12px', 
                          fontWeight: '700', 
                          width: '100%', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.05em', 
                          height: '40px',
                          backgroundColor: '#25D366', 
                          color: '#FFFFFF', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: '6px',
                          border: 'none',
                          borderRadius: '8px',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          textDecoration: 'none',
                          boxShadow: '0 4px 14px 0 rgba(37, 211, 102, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#20BA5A';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 6px 20px 0 rgba(37, 211, 102, 0.45)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#25D366';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(37, 211, 102, 0.3)';
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
                          <path d="M12.031 2c-5.514 0-9.99 4.477-9.99 9.99 0 2.057.625 4.002 1.799 5.61L2 22l4.584-1.726a9.907 9.907 0 005.445 1.716c5.515 0 9.99-4.477 9.99-9.99 0-5.514-4.475-9.99-9.99-9.99zM6.837 17.567l-.295-.171a8.277 8.277 0 01-3.323-6.84c0-4.57 3.719-8.29 8.29-8.29 4.57 0 8.29 3.72 8.29 8.29 0 4.57-3.72 8.29-8.29 8.29a8.22 8.22 0 01-4.498-1.325l-.323-.19-2.98.747.749-2.821zm8.39-2.288c-.22-.11-.1.1-.383-.343-.284-.443-.11-.22-.383-.343-.22-.11-1.312-.647-1.503-.787a.386.386 0 00-.518.056c-.197.23-.42.505-.59.712-.139.168-.278.182-.498.072a7.357 7.357 0 01-2.277-1.407 8.124 8.124 0 01-1.577-1.964c-.139-.237-.015-.363.097-.475.101-.102.22-.259.33-.391.109-.133.146-.224.22-.378a.417.417 0 00-.022-.392c-.066-.133-.591-1.428-.81-1.954-.213-.513-.448-.443-.618-.452-.16-.008-.344-.01-.528-.01a1.018 1.018 0 00-.737.346c-.259.283-1 .976-1 2.378 0 1.403 1.02 2.76 1.162 2.952.143.192 2.007 3.067 4.863 4.298 2.856 1.23 2.856.82 3.37.773.513-.047 1.657-.677 1.89-1.332.233-.655.233-1.218.163-1.332-.07-.115-.259-.22-.48-.33z"/>
                        </svg>
                        <span>Send to WhatsApp</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials / Reviews Section */}
      <section className="section-padding" style={{ position: 'relative', background: 'var(--bg-primary)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <div className="section-header align-center">
            <span className="section-subtitle">Real Buyer Experiences</span>
            <h2 className="section-title">Reviews from Chhuchhakwas Riders</h2>
            <p className="section-desc">Read why local riders rate Shree Balaji TVS as the premier destination for TVS motorcycles and electric scooters in Chhuchhakwas.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginTop: '40px' }}>
            {/* Review 1 */}
            <div className="elevated-panel vehicle-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '16px' }}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.5' }}>
                "Bought my Apache RTR 310 from Balaji TVS last month. The showroom staff is extremely knowledgeable, and the BTO custom kits were fitted perfectly. Outstanding delivery experience!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--brand)', fontSize: '14px' }}>
                  RS
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)' }}>Ramesh Singh</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Chhuchhakwas</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="elevated-panel vehicle-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '16px' }}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.5' }}>
                "Superb service support! My TVS Raider got its first routine checkup today. The trained mechanics did a computer scan of the ECU and resolved a minor throttle issue in 30 minutes. Recommended!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--brand)', fontSize: '14px' }}>
                  AK
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)' }}>Amit Kumar</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Jhajjar, Chhuchhakwas</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="elevated-panel vehicle-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '16px' }}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.5' }}>
                "Smooth financing process for our new TVS iQube EV. Got the vehicle delivered on the same day with a free fast-charger installation setup. Best EV dealer in the region!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--brand)', fontSize: '14px' }}>
                  SY
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)' }}>Sanjay Yadav</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Chhuchhakwas</span>
                </div>
              </div>
            </div>

            {/* Review 4 */}
            <div className="elevated-panel vehicle-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '16px' }}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.5' }}>
                "Very polite staff and clean showroom. Bought a Jupiter 125 for my son. They explained all variant features in detail and gave us the best trade-in value for our old scooter."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--brand)', fontSize: '14px' }}>
                  SD
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)' }}>Sunita Devi</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Jhajjar, Chhuchhakwas</span>
                </div>
              </div>
            </div>

            {/* Review 5 */}
            <div className="elevated-panel vehicle-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '16px' }}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.5' }}>
                "The customized Ronin cruiser is a dream to ride on local roads. Shree Balaji TVS provided outstanding post-sales support, including custom crash-guard and touring visors fitment."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--brand)', fontSize: '14px' }}>
                  VS
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)' }}>Vikram Shinde</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Chhuchhakwas</span>
                </div>
              </div>
            </div>

            {/* Review 6 */}
            <div className="elevated-panel vehicle-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '16px' }}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.5' }}>
                "Got my NTorq 125 Race Edition here. The staff helped me choose the right color variant and accessories. Delivery was quick and the paperwork was handled smoothly. Very happy!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--brand)', fontSize: '14px' }}>
                  PK
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)' }}>Pradeep Kumawat</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Jhajjar, Chhuchhakwas</span>
                </div>
              </div>
            </div>

            {/* Review 7 */}
            <div className="elevated-panel vehicle-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '16px' }}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.5' }}>
                "Service team is top-notch. They serviced my old TVS Victor and it runs like new again. Honest pricing, no hidden charges. This is the most trustworthy workshop in Jhajjar district."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--brand)', fontSize: '14px' }}>
                  MR
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)' }}>Manoj Rawat</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Jhajjar</span>
                </div>
              </div>
            </div>

            {/* Review 8 */}
            <div className="elevated-panel vehicle-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '16px' }}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.5' }}>
                "Booked the Apache RTR 200 4V online and received a call within minutes. The test ride was arranged immediately and EMI plan was very flexible. Great experience overall!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--brand)', fontSize: '14px' }}>
                  DM
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)' }}>Deepak Malik</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Chhuchhakwas</span>
                </div>
              </div>
            </div>

            {/* Review 9 */}
            <div className="elevated-panel vehicle-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '16px' }}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.5' }}>
                "My daughter's first scooter — a TVS Scooty Pep+. The team at Shree Balaji TVS was very patient and helped us pick the right colour. Insurance and registration was done the same day. 5 stars!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--brand)', fontSize: '14px' }}>
                  KS
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)' }}>Kavita Sharma</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Jhajjar, Chhuchhakwas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

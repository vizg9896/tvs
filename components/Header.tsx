"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  MapPin, 
  Sun, 
  Moon, 
  Calendar, 
  Menu, 
  X 
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [colorTheme, setColorTheme] = useState<'red' | 'volt' | 'orange'>('red');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync dark/light mode class on body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDarkMode]);

  // Sync color theme class on body
  useEffect(() => {
    document.body.classList.remove('theme-volt', 'theme-orange');
    if (colorTheme === 'volt') {
      document.body.classList.add('theme-volt');
    } else if (colorTheme === 'orange') {
      document.body.classList.add('theme-orange');
    }
  }, [colorTheme]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Compare & Customize', path: '/compare' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Contact Ribbon */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-info">
            <span className="top-location">
              <MapPin size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: 'var(--brand)' }} />
              Marot Road Chhuchhakwas, near Bright Mission School, Jhajjar, Haryana
            </span>
            <span className="separator">|</span>
            <a href="tel:8059212212" className="top-phone">
              <Phone size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: 'var(--brand)' }} />
              Call Dealer: +91 80592 12212
            </a>
          </div>
          <div className="top-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => {
                if (colorTheme === 'red') setColorTheme('volt');
                else if (colorTheme === 'volt') setColorTheme('orange');
                else setColorTheme('red');
              }}
              title={`Switch color theme (Current: ${colorTheme})`}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 'bold', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              aria-label="Toggle Theme Color"
            >
              <span style={{ 
                display: 'inline-block', 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                backgroundColor: colorTheme === 'red' ? '#00e5ff' : colorTheme === 'volt' ? '#d946ef' : '#dc4226' 
              }}></span>
              {colorTheme === 'red' ? 'Ice Cyan Theme' : colorTheme === 'volt' ? 'Ultraviolet Theme' : 'Official TVS Theme'}
            </button>
            <span style={{ opacity: 0.2 }}>|</span>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="main-header">
        <div className="container header-container">
          <Link href="/" className="logo-area" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* TVS Official Uploaded Logo Image (Transparent PNG) */}
            <img 
              src="/tvs_logo_transparent.png" 
              alt="TVS Logo" 
              height="48" 
              style={{ objectFit: 'contain', display: 'block' }}
            />
            <div style={{ 
              paddingLeft: '16px', 
              borderLeft: '1px solid var(--border-color)',
              marginLeft: '4px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <span className="logo-text" style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: '1.1' }}>
                SHREE BALAJI
              </span>
              <span className="logo-subtext" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6, marginTop: '2px' }}>
                Authorized Dealer
              </span>
            </div>
          </Link>

          {/* Nav menu */}
          <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <ul>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path} 
                    className={`nav-link ${pathname === link.path ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-cta">
            <Link href="/contact?book=true" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
              <Calendar size={15} style={{ marginRight: '6px' }} /> <span>Book Test Ride</span>
            </Link>
            <button 
              className="mobile-nav-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

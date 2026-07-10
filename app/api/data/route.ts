import { NextResponse } from 'next/server';
import { VEHICLES, ACCESSORIES } from '../../data';
import { SLIDES } from '../../../components/HeroSlider/slideData';

// Simple in-memory cache for development/production hot starts
let cachedResponse: any = null;
let lastFetched = 0;
const CACHE_TTL = 60000; // 1 minute in milliseconds

// Custom robust CSV parser that handles quotes and commas within cells
function parseCSV(csvText: string): string[][] {
  const lines: string[][] = [];
  const rows = csvText.split(/\r?\n/);
  
  for (const row of rows) {
    if (!row.trim()) continue;
    const cols: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        cols.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    cols.push(current.trim());
    
    // Clean up quotes from cells
    const cleanedCols = cols.map(cell => {
      let val = cell;
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      }
      return val.replace(/""/g, '"').trim();
    });
    
    lines.push(cleanedCols);
  }
  return lines;
}

// Convert a parsed CSV array into an array of objects mapping headers to values
function csvToObjects(csvRows: string[][]): Record<string, string>[] {
  if (csvRows.length < 2) return [];
  const headers = csvRows[0];
  const dataRows = csvRows.slice(1);
  
  return dataRows.map(row => {
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      if (header) {
        obj[header.trim()] = row[index] || '';
      }
    });
    return obj;
  });
}

// Fetch a single sheet as CSV from the Google Spreadsheet
async function fetchSheetCSV(spreadsheetId: string, sheetName: string): Promise<string> {
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&sheet=${encodeURIComponent(sheetName)}`;
  const res = await fetch(url, { 
    next: { revalidate: 60 }, // ISR Cache for Vercel
    headers: {
      'Accept': 'text/csv; charset=utf-8'
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch sheet "${sheetName}": Status ${res.status}`);
  }
  return await res.text();
}

export async function GET() {
  const now = Date.now();
  if (cachedResponse && (now - lastFetched < CACHE_TTL)) {
    return NextResponse.json(cachedResponse, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=30'
      }
    });
  }

  const spreadsheetId = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
  
  if (!spreadsheetId) {
    // If no spreadsheet ID is provided, immediately return the static fallback data
    return NextResponse.json({
      vehicles: VEHICLES,
      accessories: ACCESSORIES,
      slides: SLIDES,
      source: 'fallback (no spreadsheet ID)'
    });
  }

  try {
    // Fetch all sheets in parallel
    const [vehiclesCSV, accessoriesCSV, slidesCSV] = await Promise.all([
      fetchSheetCSV(spreadsheetId, 'Vehicles').catch(() => null),
      fetchSheetCSV(spreadsheetId, 'Accessories').catch(() => null),
      fetchSheetCSV(spreadsheetId, 'Slides').catch(() => null),
    ]);

    // Parse Vehicles
    let parsedVehicles = VEHICLES;
    if (vehiclesCSV) {
      const rows = parseCSV(vehiclesCSV);
      const objects = csvToObjects(rows);
      
      if (objects.length > 0) {
        parsedVehicles = objects.map(obj => {
          const id = obj.id;
          // Find matching original vehicle for properties we might fall back on
          const origVeh = VEHICLES.find(v => v.id === id);
          
          // Helper: parse colorways string
          let colorways = origVeh?.colorways || [];
          if (obj.colorways && obj.colorways.trim()) {
            colorways = obj.colorways.split('|').map(item => {
              const parts = item.split('=').map(p => p.trim());
              return {
                name: parts[0] || '',
                color: parts[1] || '#ffffff',
                filter: parts[2] || 'hue-rotate(0deg) saturate(1) brightness(1)'
              };
            }).filter(c => c.name);
          }

          // Helper: parse specs string
          let specs = origVeh?.specs || {};
          if (obj.specs && obj.specs.trim()) {
            const parsedSpecs: Record<string, string> = {};
            obj.specs.split('|').forEach(item => {
              const index = item.indexOf(':');
              if (index !== -1) {
                const key = item.substring(0, index).trim();
                const val = item.substring(index + 1).trim();
                if (key) {
                  parsedSpecs[key] = val;
                }
              }
            });
            if (Object.keys(parsedSpecs).length > 0) {
              specs = parsedSpecs;
            }
          }

          // Helper: parse variants string
          let variants = origVeh?.variants || [];
          if (obj.variants && obj.variants.trim()) {
            variants = obj.variants.split('|').map(item => {
              const parts = item.split('=').map(p => p.trim());
              return {
                name: parts[0] || '',
                price: parseFloat(parts[1]) || 0,
                desc: parts[2] || ''
              };
            }).filter(v => v.name);
          }

          return {
            id,
            title: obj.title || origVeh?.title || '',
            subtitle: obj.subtitle || origVeh?.subtitle || '',
            image: obj.image || origVeh?.image || '',
            price: parseFloat(obj.price) || origVeh?.price || 0,
            speed: obj.speed || origVeh?.speed || '',
            power: obj.power || origVeh?.power || '',
            acceleration: obj.acceleration || origVeh?.acceleration || '',
            category: (obj.category || origVeh?.category || 'Motorcycle') as any,
            isEV: obj.isEV ? obj.isEV.toUpperCase() === 'TRUE' : !!origVeh?.isEV,
            desc: obj.desc || origVeh?.desc || '',
            colorways,
            specs,
            variants
          };
        });
      }
    }

    // Parse Accessories
    let parsedAccessories = ACCESSORIES;
    if (accessoriesCSV) {
      const rows = parseCSV(accessoriesCSV);
      const objects = csvToObjects(rows);
      if (objects.length > 0) {
        parsedAccessories = objects.map(obj => {
          const origAcc = ACCESSORIES.find(a => a.id === obj.id);
          return {
            id: obj.id,
            name: obj.name || origAcc?.name || '',
            desc: obj.desc || origAcc?.desc || '',
            price: parseFloat(obj.price) || origAcc?.price || 0
          };
        });
      }
    }

    // Parse Slides
    let parsedSlides = SLIDES;
    if (slidesCSV) {
      const rows = parseCSV(slidesCSV);
      const objects = csvToObjects(rows);
      if (objects.length > 0) {
        parsedSlides = objects.map(obj => {
          const origSlide = SLIDES.find(s => s.id === obj.id);
          return {
            id: obj.id,
            tag: obj.tag || origSlide?.tag || '',
            title: obj.title || origSlide?.title || '',
            desc: obj.desc || origSlide?.desc || '',
            image: obj.image || origSlide?.image || '',
            speed: obj.speed || origSlide?.speed || '',
            power: obj.power || origSlide?.power || '',
            acceleration: obj.acceleration || origSlide?.acceleration || '',
            primaryCta: {
              label: obj.primaryCtaLabel || origSlide?.primaryCta.label || '',
              href: obj.primaryCtaHref || origSlide?.primaryCta.href || ''
            },
            secondaryCta: {
              label: obj.secondaryCtaLabel || origSlide?.secondaryCta.label || '',
              href: obj.secondaryCtaHref || origSlide?.secondaryCta.href || ''
            },
            accentColor: obj.accentColor || origSlide?.accentColor || '#3B82F6',
            glowColor: obj.glowColor || origSlide?.glowColor || 'rgba(59, 130, 246, 0.18)'
          };
        });
      }
    }

    cachedResponse = {
      vehicles: parsedVehicles,
      accessories: parsedAccessories,
      slides: parsedSlides,
      source: 'google-sheets'
    };
    lastFetched = now;

    return NextResponse.json(cachedResponse, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=30'
      }
    });

  } catch (error: any) {
    console.error('Error fetching Google Sheet, falling back to static data:', error);
    
    // Fall back gracefully to local static files
    return NextResponse.json({
      vehicles: VEHICLES,
      accessories: ACCESSORIES,
      slides: SLIDES,
      source: `fallback (error: ${error.message})`
    });
  }
}

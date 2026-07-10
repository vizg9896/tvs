export interface Colorway {
  name: string;
  filter: string;
  color: string;
}

export interface VehicleSpecs {
  [key: string]: string;
}

export interface VehicleVariant {
  name: string;
  price: number;
  desc: string;
}

export interface Vehicle {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  price: number;
  speed: string;
  power: string;
  acceleration: string;
  category: 'Motorcycle' | 'Scooter' | 'Moped';
  isEV: boolean;
  desc: string;
  colorways: Colorway[];
  specs: VehicleSpecs;
  variants: VehicleVariant[];
}

export interface Accessory {
  id: string;
  name: string;
  desc: string;
  price: number;
}

export const VEHICLES: Vehicle[] = [

  // ─── MOTORCYCLES ──────────────────────────────────────────────────────────

  {
    id: 'apache_rr',
    title: 'TVS Apache RR 310',
    subtitle: 'Ultimate Racing Supersport Flagship',
    image: '/assets/apache_rr310.jpg',
    price: 262271,
    speed: '160 km/h',
    power: '38.0 PS',
    acceleration: '2.93s (0-60)',
    category: 'Motorcycle',
    isEV: false,
    desc: 'TVS Racing flagship supersport motorcycle. Built for track performance with aerodynamic fairing, race-tuned trellis frame, and custom RAM air intake system.',
    colorways: [
      { name: 'Racing Red', filter: 'hue-rotate(0deg) saturate(1) brightness(1)', color: '#E31B23' },
      { name: 'Titanium Grey', filter: 'hue-rotate(240deg) saturate(0.3) brightness(0.6)', color: '#686868' }
    ],
    specs: {
      'Engine & Transmission': '312.2 cc Reverse DOHC Liquid-Cooled engine with RAM Air Intake',
      'Power & Torque': '38.0 PS power @ 9800 rpm & 29.0 Nm torque @ 6700 rpm',
      'Suspension Setup': 'KYB fully adjustable USD Front Forks & Gas-assisted Rear Monoshock',
      'Braking & Safety': 'Race-tuned Dual-Channel Cornering ABS with Rear Wheel Lift-off Protection',
      'Smart Dashboard & Console': '5-inch TFT cluster with SmartXonnect, telemetry logger & custom ride modes'
    },
    variants: [
      { name: 'Standard Edition (Red)', price: 262271, desc: 'Racing Red finish' },
      { name: 'Racing Edition (Quickshifter)', price: 272000, desc: 'Racing Red with bi-directional Quickshifter & assist clutch' },
      { name: 'Bomber Grey Premium', price: 278000, desc: 'Stealth Bomber Grey with fully adjustable KYB suspension' }
    ]
  },
  {
    id: 'apache',
    title: 'TVS Apache RTR 310',
    subtitle: 'The Restless Naked Roadster',
    image: '/assets/apache_310.jpg',
    price: 225280,
    speed: '150 km/h',
    power: '35.6 PS',
    acceleration: '2.81s (0-60)',
    category: 'Motorcycle',
    isEV: false,
    desc: 'Engineering that provokes adrenaline. Experience hyper-spec racing performance with bi-directional quickshifter, dynamic LED headlight, and 5-inch TFT SmartXonnect console.',
    colorways: [
      { name: 'Racing Yellow', filter: 'hue-rotate(0deg) saturate(1) brightness(1)', color: '#FFD700' },
      { name: 'Red Fury', filter: 'hue-rotate(330deg) saturate(1.8) brightness(0.8)', color: '#E31B23' },
      { name: 'Shadow Black', filter: 'hue-rotate(0deg) saturate(0) brightness(0.25)', color: '#1a1a1a' }
    ],
    specs: {
      'Engine & Transmission': '312.2 cc Reverse Liquid-Cooled engine with 6-speed Bi-Directional Quickshifter',
      'Power & Torque': '35.6 PS power @ 9700 rpm & 28.7 Nm torque @ 6650 rpm',
      'Suspension Setup': 'KYB USD Front Forks & Preload/Rebound adjustable Rear Monoshock',
      'Braking & Safety': 'Cornering ABS, Traction Control, Slope Dependent Control & Rear Lift Protection',
      'Smart Dashboard & Console': '5-inch TFT console with SmartXonnect, GoPro control & Tyre Pressure Monitoring'
    },
    variants: [
      { name: 'Arsenal Black (Standard)', price: 225280, desc: 'Base variant in Arsenal Black' },
      { name: 'Arsenal Black (Quickshifter)', price: 236000, desc: 'Arsenal Black with Bi-directional Quickshifter' },
      { name: 'Fury Yellow', price: 242000, desc: 'Premium Fury Yellow finish with fully adjustable suspension' }
    ]
  },
  {
    id: 'apache_rtx',
    title: 'TVS Apache RTX 300',
    subtitle: 'Adventure Rally Tourer',
    image: '/assets/apache_rtx_300.png',
    price: 199000,
    speed: '140 km/h',
    power: '36.0 PS',
    acceleration: '3.5s (0-60)',
    category: 'Motorcycle',
    isEV: false,
    desc: `TVS's first adventure motorcycle. Purpose-built for the Indian adventurer with 500 mm water-wading capability, 4 ride modes, long-travel suspension, and a 5-inch TFT with map mirroring.`,
    colorways: [
      { name: 'Rally Orange', filter: 'hue-rotate(25deg) saturate(1.8) brightness(0.9)', color: '#E55A00' },
      { name: 'Midnight Black', filter: 'hue-rotate(0deg) saturate(0) brightness(0.2)', color: '#111111' },
      { name: 'Glacier White', filter: 'hue-rotate(0deg) saturate(0) brightness(1.3)', color: '#f0f0f0' }
    ],
    specs: {
      'Engine & Transmission': '299.1 cc Single-Cylinder, Liquid-Cooled SOHC — RT-XD4 Platform',
      'Power & Torque': '36.0 PS power @ 9000 rpm & 28.5 Nm torque @ 7000 rpm',
      'Suspension Setup': 'Long-travel 43 mm USD front forks & linkage-based rear monoshock (500 mm wading)',
      'Braking & Safety': 'Dual-Channel Cornering ABS, Cruise Control, and Off-road Rally modes',
      'Smart Dashboard & Console': '5-inch TFT cluster with Bluetooth SmartXonnect & map mirroring'
    },
    variants: [
      { name: 'RTX 300 Standard', price: 199000, desc: 'Base adventure variant with full off-road capability' },
      { name: 'RTX 300 Rally Pro', price: 219000, desc: 'Top variant with spoked wheels, bash plate & rally pack' }
    ]
  },
  {
    id: 'apache_200',
    title: 'TVS Apache RTR 200 4V',
    subtitle: 'Track-Focused Street Fighter',
    image: '/assets/apache_200.jpg',
    price: 147820,
    speed: '127 km/h',
    power: '20.82 PS',
    acceleration: '3.9s (0-60)',
    category: 'Motorcycle',
    isEV: false,
    desc: 'Race-derived performance with first-in-class riding modes (Sport, Urban, Rain), Showa adjustable suspension, and race-tuned slipper clutch.',
    colorways: [
      { name: 'Gloss Black', filter: 'hue-rotate(0deg) saturate(0) brightness(0.3)', color: '#222222' },
      { name: 'Pearl White', filter: 'hue-rotate(0deg) saturate(0) brightness(1.2)', color: '#eeeeee' }
    ],
    specs: {
      'Engine & Transmission': '197.75 cc Oil-Cooled engine with Ram-Air Assist and slipper clutch',
      'Power & Torque': '20.82 PS power @ 9000 rpm & 17.25 Nm torque @ 7250 rpm',
      'Suspension Setup': 'Segment-first Showa adjustable front suspension & Showa rear monoshock',
      'Braking & Safety': 'Dual-Channel ABS with Rear Lift Protection (RLP) & Euro-spec disc brakes',
      'Smart Dashboard & Console': 'SmartXonnect Bluetooth cluster with Turn-by-Turn Navigation & Lean Angle indicator'
    },
    variants: [
      { name: 'Single-Channel ABS', price: 138391, desc: 'Super-slick front ABS braking only' },
      { name: 'Dual-Channel ABS (Showa Adj)', price: 147820, desc: 'Dual-channel ABS with fully adjustable Showa front suspension & ride modes' }
    ]
  },
  {
    id: 'apache_180',
    title: 'TVS Apache RTR 180',
    subtitle: 'The Original Street Racer',
    image: '/assets/apache_180.jpg',
    price: 126987,
    speed: '114 km/h',
    power: '17.02 PS',
    acceleration: '4.7s (0-60)',
    category: 'Motorcycle',
    isEV: false,
    desc: 'A racing icon reloaded. The Apache RTR 180 features a high-revving engine, signature aggressive tank scoops, and intelligent SmartXonnect console with voice assist.',
    colorways: [
      { name: 'Racing Blue', filter: 'hue-rotate(220deg) saturate(1.5) brightness(0.8)', color: '#0A3B7C' },
      { name: 'Pearl White', filter: 'hue-rotate(0deg) saturate(0) brightness(1.2)', color: '#eeeeee' }
    ],
    specs: {
      'Engine & Transmission': '177.4 cc Single-Cylinder Air-Cooled high-revving block',
      'Power & Torque': '17.02 PS power @ 8500 rpm & 15.5 Nm torque @ 7000 rpm',
      'Suspension Setup': 'Telescopic Front Forks & MIG Gas-Filled Monoshock with 5-step adjustability',
      'Braking & Safety': 'Single-Channel Super-Slick ABS with petal disc layout',
      'Smart Dashboard & Console': 'SmartXonnect voice-activated digital cluster with race telemetry indicators'
    },
    variants: [
      { name: 'Standard Disc (SmartXonnect)', price: 126987, desc: 'Standard variant with front/rear petal disc brakes and SmartXonnect console' }
    ]
  },
  {
    id: 'apache_160_4v',
    title: 'TVS Apache RTR 160 4V',
    subtitle: 'The Undisputed 160cc Champion',
    image: '/assets/apache_160_4v.jpg',
    price: 114000,
    speed: '114 km/h',
    power: '17.55 PS',
    acceleration: '4.8s (0-60)',
    category: 'Motorcycle',
    isEV: false,
    desc: 'Setting the benchmark in the 160cc segment. Features a class-leading 4-valve engine, segment-first riding modes, and radial tubeless rear tyre for track stability.',
    colorways: [
      { name: 'Knight Black', filter: 'hue-rotate(0deg) saturate(0) brightness(0.2)', color: '#111111' },
      { name: 'Racing Red', filter: 'hue-rotate(330deg) saturate(1.8) brightness(0.8)', color: '#E31B23' },
      { name: 'Metallic Blue', filter: 'hue-rotate(200deg) saturate(1.3) brightness(0.9)', color: '#2563EB' }
    ],
    specs: {
      'Engine & Transmission': '159.7 cc Oil-Cooled patented O3C engine block with Slipper Clutch',
      'Power & Torque': '17.55 PS power @ 9250 rpm & 14.73 Nm torque @ 7250 rpm',
      'Suspension Setup': 'Telescopic front suspension & Showa racing rear monoshock',
      'Braking & Safety': 'Single-Channel Super-Lock ABS with 270mm front petal disc',
      'Smart Dashboard & Console': 'Fully digital LCD cluster with SmartXonnect telemetry and crash alert'
    },
    variants: [
      { name: 'Drum Edition', price: 114000, desc: 'Base variant with rear drum brakes' },
      { name: 'Disc Edition', price: 118500, desc: 'Upgraded rear petal disc brake variant' },
      { name: 'Bluetooth Disc (SmartXonnect)', price: 124000, desc: 'Disc brakes with Bluetooth console & turn-by-turn nav' },
      { name: 'Special Edition', price: 138000, desc: 'Bullpup racing exhaust, red alloys & adjustable levers' }
    ]
  },
  {
    id: 'apache_160',
    title: 'TVS Apache RTR 160',
    subtitle: 'Classic Streetfighter Racer',
    image: '/assets/apache_160.png',
    price: 109971,
    speed: '107 km/h',
    power: '16.04 PS',
    acceleration: '5.3s (0-60)',
    category: 'Motorcycle',
    isEV: false,
    desc: 'The machine that started the RTR legacy. Combining everyday urban commuting ease with race-tuned throttle response and aggressive streetfighter styling.',
    colorways: [
      { name: 'Matte Blue', filter: 'hue-rotate(200deg) saturate(0.8) brightness(0.8)', color: '#3B82F6' },
      { name: 'Racing Red', filter: 'hue-rotate(330deg) saturate(1.8) brightness(0.8)', color: '#E31B23' },
      { name: 'T-Grey', filter: 'hue-rotate(0deg) saturate(0) brightness(0.6)', color: '#777777' }
    ],
    specs: {
      'Engine & Transmission': '159.7 cc Single-Cylinder 2-Valve Air-Cooled engine',
      'Power & Torque': '16.04 PS power @ 8750 rpm & 13.85 Nm torque @ 7000 rpm',
      'Suspension Setup': 'Telescopic Front Forks & Monoshock dual-spring MIG rear shocks',
      'Braking & Safety': 'Single-Channel ABS with petal front disc and drum/disc rear layouts',
      'Smart Dashboard & Console': 'Digital LCD cluster with Bluetooth connectivity & voice assist'
    },
    variants: [
      { name: 'Drum Braking', price: 109971, desc: 'Base variant with 130mm rear drum brakes' },
      { name: 'Rear Disc Braking', price: 114500, desc: 'Upgraded 200mm rear petal disc brake variant' },
      { name: 'Disc with SmartXonnect', price: 119000, desc: 'Top variant with rear disc and Bluetooth SmartXonnect console' }
    ]
  },
  {
    id: 'ronin',
    title: 'TVS Ronin',
    subtitle: 'Unscripted Modern-Retro Roadster',
    image: '/assets/ronin_clean.png',
    price: 128731,
    speed: '120 km/h',
    power: '20.4 PS',
    acceleration: '4.1s (0-60)',
    category: 'Motorcycle',
    isEV: false,
    desc: 'Modern-retro scrambler crafted for the unscripted. Perfect blend of highway cruiser comfort and urban agility with dual-channel ABS and Rain & Urban traction modes.',
    colorways: [
      { name: 'Galactic Grey', filter: 'hue-rotate(0deg) saturate(0.2) brightness(0.8)', color: '#555A60' },
      { name: 'Dawn Orange', filter: 'hue-rotate(20deg) saturate(1.8) brightness(0.9)', color: '#FF7F50' },
      { name: 'Signature Black', filter: 'hue-rotate(0deg) saturate(0) brightness(0.2)', color: '#111111' }
    ],
    specs: {
      'Engine & Transmission': '225.9 cc Single-Cylinder SOHC Oil-Cooled engine with Slipper Clutch',
      'Power & Torque': '20.4 PS power @ 7750 rpm & 19.93 Nm torque @ 3750 rpm',
      'Suspension Setup': 'Premium 41mm Showa USD Front Forks & Gas-charged Rear Monoshock',
      'Braking & Safety': 'Dual-Channel ABS with Urban and Rain Traction Modes',
      'Smart Dashboard & Console': 'Asymmetric circular digital cluster with SmartXonnect & turn-by-turn navigation'
    },
    variants: [
      { name: 'Ronin SS (Single Tone)', price: 128731, desc: 'Single-tone colors, Single-Channel ABS' },
      { name: 'Ronin DS (Dual Tone)', price: 136000, desc: 'Dual-tone premium paint with single-channel ABS' },
      { name: 'Ronin TD (Triple Tone)', price: 149500, desc: 'Triple-tone graphics, Dual-Channel ABS with modes & SmartXonnect' }
    ]
  },
  {
    id: 'raider',
    title: 'TVS Raider 125',
    subtitle: 'Wicked Sporty Commuter',
    image: '/assets/raider_125.jpg',
    price: 85344,
    speed: '99 km/h',
    power: '11.38 PS',
    acceleration: '5.9s (0-60)',
    category: 'Motorcycle',
    isEV: false,
    desc: 'Premium sporty 125cc commuter that stands out. First-in-class riding modes (Eco/Power), 5-inch digital TFT panel, and distinctive robotic LED headlight.',
    colorways: [
      { name: 'Fiery Yellow', filter: 'hue-rotate(0deg) saturate(1) brightness(1)', color: '#FFCC00' },
      { name: 'Wicked Red', filter: 'hue-rotate(330deg) saturate(1.5) brightness(0.8)', color: '#D2143A' },
      { name: 'Striking Blue', filter: 'hue-rotate(200deg) saturate(1.3) brightness(0.9)', color: '#0F52BA' }
    ],
    specs: {
      'Engine & Transmission': '124.8 cc SOHC Air & Oil Cooled engine with silent start & 2 riding modes',
      'Power & Torque': '11.38 PS power @ 7500 rpm & 11.2 Nm torque @ 6000 rpm',
      'Suspension Setup': 'Telescopic front suspension & 5-step adjustable gas-charged rear monoshock',
      'Braking & Safety': 'Synchronized disc brakes with high-grip tubeless compound tyres',
      'Smart Dashboard & Console': '5-inch TFT digital screen with SmartXonnect navigation & voice commands'
    },
    variants: [
      { name: 'Single Seat (Drum)', price: 85344, desc: 'Single-piece seat with rear drum brakes' },
      { name: 'Split Seat (Disc)', price: 90000, desc: 'Sporty split-seat styling with 240mm front disc brake' },
      { name: 'SmartXonnect (TFT Screen)', price: 99000, desc: 'Split-seat, front disc, and 5-inch colour TFT Bluetooth cluster' }
    ]
  },
  {
    id: 'radeon',
    title: 'TVS Radeon 110',
    subtitle: 'Robust Heavy-Duty Commuter',
    image: '/assets/radeon.jpg',
    price: 73346,
    speed: '90 km/h',
    power: '8.4 PS',
    acceleration: '8.2s (0-60)',
    category: 'Motorcycle',
    isEV: false,
    desc: 'Built tough for Indian roads. Radeon offers class-leading fuel economy, premium chrome detailing, a comfortable wide seat, and synchronized braking technology.',
    colorways: [
      { name: 'Royal Red', filter: 'hue-rotate(330deg) saturate(1) brightness(0.6)', color: '#A52A2A' },
      { name: 'Chrome Black', filter: 'hue-rotate(0deg) saturate(0) brightness(0.2)', color: '#111111' }
    ],
    specs: {
      'Engine & Transmission': '109.7 cc Single-Cylinder 2-Valve, Air-Cooled DuraLife engine with ET-Fi',
      'Power & Torque': '8.4 PS power @ 7350 rpm & 8.7 Nm torque @ 4500 rpm',
      'Suspension Setup': 'Telescopic front forks & 5-step adjustable hydraulic dual shock absorbers',
      'Braking & Safety': 'Synchronized Braking Technology (SBT) with optional front disc',
      'Smart Dashboard & Console': 'Chrome bezel analog-digital console with side stand indicator & USB charger'
    },
    variants: [
      { name: 'Drum Base', price: 73346, desc: 'Base commuter with 130mm drum brakes' },
      { name: 'Disc Dual-Tone Edition', price: 78500, desc: 'Premium dual-tone paint with front petal disc brake' }
    ]
  },
  {
    id: 'sport',
    title: 'TVS Sport',
    subtitle: 'Maximum Mileage Icon',
    image: '/assets/tvs_sport.jpg',
    price: 65577,
    speed: '90 km/h',
    power: '8.29 PS',
    acceleration: '8.5s (0-60)',
    category: 'Motorcycle',
    isEV: false,
    desc: 'The mileage champion. Highly reliable and incredibly economical commuter bike featuring sporty graphics, electric start system, and a lightweight body layout.',
    colorways: [
      { name: 'Mercury Grey', filter: 'hue-rotate(0deg) saturate(0) brightness(0.5)', color: '#555555' },
      { name: 'Athletic Red', filter: 'hue-rotate(330deg) saturate(1.8) brightness(0.8)', color: '#E31B23' }
    ],
    specs: {
      'Engine & Transmission': '109.7 cc Single-Cylinder 4-Stroke Air-Cooled fuel-injected engine',
      'Power & Torque': '8.29 PS power @ 7350 rpm & 8.7 Nm torque @ 4500 rpm',
      'Suspension Setup': 'Telescopic hydraulic front & 5-stage adjustable hydraulic rear shocks',
      'Braking & Safety': 'Synchronized Braking System (SBS) on dual hub drum configuration',
      'Smart Dashboard & Console': 'Sporty analog cluster with fuel indicator & economy-speed riding guide'
    },
    variants: [
      { name: 'Kick Start (Spoke)', price: 65577, desc: 'Traditional spoke wheels with kick start' },
      { name: 'Self Start (Alloy)', price: 71500, desc: 'Modern alloy wheels with electric self-start' }
    ]
  },
  {
    id: 'star_city',
    title: 'TVS Star City Plus',
    subtitle: 'Premium Executive Commuter',
    image: '/assets/star_city.jpg',
    price: 79200,
    speed: '90 km/h',
    power: '8.19 PS',
    acceleration: '8.4s (0-60)',
    category: 'Motorcycle',
    isEV: false,
    desc: 'Sophisticated style meets dependable performance. The Star City Plus offers a premium dual-tone seat, digital-analog console, LED headlamp, and class-leading comfort.',
    colorways: [
      { name: 'Black Red', filter: 'hue-rotate(340deg) saturate(1.2) brightness(0.6)', color: '#9B1C1C' },
      { name: 'Blue Silver', filter: 'hue-rotate(210deg) saturate(1.2) brightness(0.8)', color: '#1E3A8A' }
    ],
    specs: {
      'Engine & Transmission': '109.7 cc Single-Cylinder EcoThrust engine block with ET-Fi',
      'Power & Torque': '8.19 PS power @ 7350 rpm & 8.7 Nm torque @ 4500 rpm',
      'Suspension Setup': 'Telescopic front forks & 5-step adjustable shock absorbers',
      'Braking & Safety': 'Synchronized Braking Technology with premium alloy wheels & tubeless tyres',
      'Smart Dashboard & Console': 'Premium digital-analog speedometer with service reminder & eco mode indicator'
    },
    variants: [
      { name: 'Mono-Tone Style', price: 79200, desc: 'Classic single-color premium paint graphics' },
      { name: 'Dual-Tone Premium', price: 82500, desc: 'Modern dual-tone colors with premium textured seat stitching' }
    ]
  },

  // ─── SCOOTERS ─────────────────────────────────────────────────────────────

  {
    id: 'ntorq_150',
    title: 'TVS Ntorq 150',
    subtitle: 'Hyper-Sport Performance Scooter',
    image: '/assets/ntorq_125.jpg',
    price: 111395,
    speed: '104 km/h',
    power: '13.2 PS',
    acceleration: '6.3s (0-60)',
    category: 'Scooter',
    isEV: false,
    desc: 'The most powerful TVS scooter ever made. Ntorq 150 delivers hyper-sport performance with iGO torque-boost assist, traction control, TFT console, Alexa integration, and Race riding mode.',
    colorways: [
      { name: 'Nitro Green', filter: 'hue-rotate(80deg) saturate(1.5) brightness(0.9)', color: '#2EA32E' },
      { name: 'Racing Red', filter: 'hue-rotate(330deg) saturate(1.8) brightness(0.8)', color: '#E31B23' },
      { name: 'Stealth Silver', filter: 'hue-rotate(0deg) saturate(0) brightness(0.65)', color: '#888888' },
      { name: 'Turbo Blue', filter: 'hue-rotate(200deg) saturate(1.4) brightness(0.9)', color: '#1D4ED8' }
    ],
    specs: {
      'Engine & Transmission': '149.7 cc Single-Cylinder 3-Valve Air-Cooled CVTi with iGO Hybrid assist boost',
      'Power & Torque': '13.2 PS power @ 7000 rpm & 14.2 Nm torque @ 5500 rpm',
      'Suspension Setup': 'Telescopic front forks & gas-charged rear monoshock',
      'Braking & Safety': 'Front disc brake with CBS; ABS on TFT variant, Traction Control',
      'Smart Dashboard & Console': 'Color TFT console with SmartXonnect, Amazon Alexa, SOS, geofencing & crash alerts'
    },
    variants: [
      { name: 'Ntorq 150 Standard', price: 111395, desc: 'Full performance with Street & Race modes' },
      { name: 'Ntorq 150 TFT', price: 121000, desc: 'Top variant — Color TFT, Alexa, ABS, live tracking & crash alert' }
    ]
  },
  {
    id: 'ntorq',
    title: 'TVS Ntorq 125',
    subtitle: 'Sporty Connected Race Edition Scooter',
    image: '/assets/ntorq_125.jpg',
    price: 89177,
    speed: '98 km/h',
    power: '9.38 PS',
    acceleration: '8.9s (0-60)',
    category: 'Scooter',
    isEV: false,
    desc: `India's premier high-performance 125cc scooter. Racing-inspired stealth aircraft lines, Bluetooth SmartXonnect console, lap timer, and 3-valve engine tech.`,
    colorways: [
      { name: 'Combat Yellow', filter: 'hue-rotate(0deg) saturate(1) brightness(1)', color: '#FFDB58' },
      { name: 'Stealth Black', filter: 'hue-rotate(0deg) saturate(0) brightness(0.25)', color: '#2b2b2b' },
      { name: 'Race Edition Red', filter: 'hue-rotate(330deg) saturate(1.8) brightness(0.9)', color: '#E31B23' }
    ],
    specs: {
      'Engine & Transmission': '124.8 cc Single-Cylinder 3-Valve, CVTi Fuel Injection air-cooled engine',
      'Power & Torque': '9.38 PS power @ 7000 rpm & 10.5 Nm torque @ 5500 rpm',
      'Suspension Setup': 'Telescopic front forks & hydraulic rear shock absorber',
      'Braking & Safety': '220mm Front Roto Petal Disc brakes with synchronized ABS',
      'Smart Dashboard & Console': 'Gaming-style digital console with SmartXonnect, lap timer & navigation'
    },
    variants: [
      { name: 'Drum Edition', price: 89177, desc: 'Base variant with 130mm drum brakes' },
      { name: 'Disc Edition', price: 95000, desc: 'Adds front roto-petal disc brakes' },
      { name: 'Race Edition', price: 99000, desc: 'Signature TVS Racing decals and hazard light switch' },
      { name: 'Race XP (Riding Modes)', price: 103500, desc: 'Dual riding modes (Race/Street) with increased 10.2 PS output' }
    ]
  },
  {
    id: 'jupiter',
    title: 'TVS Jupiter 125',
    subtitle: 'Premium Smart Family Scooter',
    image: '/assets/jupiter_125.jpg',
    price: 86110,
    speed: '95 km/h',
    power: '8.15 PS',
    acceleration: '9.1s (0-60)',
    category: 'Scooter',
    isEV: false,
    desc: 'The gold standard of family scooters. Re-engineered with massive 33L dual helmet storage, front external fuel filling, and smooth TVS IntelliGo stop-start technology.',
    colorways: [
      { name: 'Copper Bronze', filter: 'hue-rotate(0deg) saturate(1) brightness(1)', color: '#B87333' },
      { name: 'Royal Wine', filter: 'hue-rotate(300deg) saturate(0.8) brightness(0.6)', color: '#722F37' },
      { name: 'Pristine White', filter: 'hue-rotate(0deg) saturate(0) brightness(1.2)', color: '#F8F9FA' }
    ],
    specs: {
      'Engine & Transmission': '124.8 cc Air-Cooled ET-Fi engine with IntelliGo auto start-stop',
      'Power & Torque': '8.15 PS power @ 6500 rpm & 10.5 Nm torque @ 4500 rpm',
      'Suspension Setup': 'Telescopic hydraulic front & canister gas-charged rear monoshock',
      'Braking & Safety': 'SBT (Synchronized Braking) with drum front & rear, optional front disc',
      'Smart Dashboard & Console': 'IntelliGo stop-start, massive 33L underseat storage & external fuel fill cap'
    },
    variants: [
      { name: 'Drum Steel Wheel', price: 86110, desc: 'Base variant with steel wheels' },
      { name: 'Drum Alloy Edition', price: 90000, desc: 'Mid variant with alloy wheels and drum brakes' },
      { name: 'Disc Alloy SmartXonnect', price: 96500, desc: 'Top-spec with front disc, alloy wheels & SmartXonnect Bluetooth' }
    ]
  },
  {
    id: 'jupiter_110',
    title: 'TVS Jupiter 110',
    subtitle: 'Classic Everyday Family Scooter',
    image: '/assets/jupiter_110.jpg',
    price: 76716,
    speed: '85 km/h',
    power: '7.88 PS',
    acceleration: '9.8s (0-60)',
    category: 'Scooter',
    isEV: false,
    desc: `India's favourite family scooter. Combining an all-metal body with broad comfort seats, advanced digital console, and external fuel filling facility.`,
    colorways: [
      { name: 'Titanium Grey', filter: 'hue-rotate(0deg) saturate(0) brightness(0.55)', color: '#5a5a5a' },
      { name: 'Midnight Black', filter: 'hue-rotate(0deg) saturate(0) brightness(0.2)', color: '#111111' },
      { name: 'Pristine White', filter: 'hue-rotate(0deg) saturate(0) brightness(1.2)', color: '#f5f5f5' }
    ],
    specs: {
      'Engine & Transmission': '109.7 cc Single-Cylinder CVTi fuel injection air-cooled engine',
      'Power & Torque': '7.88 PS power @ 7500 rpm & 8.8 Nm torque @ 5500 rpm',
      'Suspension Setup': 'Telescopic front forks & 3-step adjustable gas-charged rear monoshock',
      'Braking & Safety': 'SBT (Synchronized Braking) with 130mm drum brakes & tubeless alloy layout',
      'Smart Dashboard & Console': 'Analog-digital cluster, underseat storage & rear external fuel fill cap'
    },
    variants: [
      { name: 'Drum Sheet Metal', price: 76716, desc: 'Base variant with steel wheels and drum brakes' },
      { name: 'Drum Alloy Edition', price: 80000, desc: 'Lightweight alloy wheels with synchronized drum brakes' },
      { name: 'Disc SmartXonnect', price: 86500, desc: 'Top variant with front disc brake, alloy wheels & Bluetooth cluster' }
    ]
  },
  {
    id: 'zest',
    title: 'TVS Zest 110',
    subtitle: 'Lightweight Agile City Scooter',
    image: '/assets/jupiter_110.jpg',
    price: 70850,
    speed: '80 km/h',
    power: '7.81 PS',
    acceleration: '10.2s (0-60)',
    category: 'Scooter',
    isEV: false,
    desc: 'The nimble city companion. Zest 110 features ETFi fuel injection, a lightweight 103 kg body, USB charging port, 19-litre underseat storage, and an optional Bluetooth SmartXonnect console.',
    colorways: [
      { name: 'Pearl White', filter: 'hue-rotate(0deg) saturate(0) brightness(1.2)', color: '#f5f5f5' },
      { name: 'Coral Red', filter: 'hue-rotate(350deg) saturate(1.3) brightness(0.85)', color: '#D64242' },
      { name: 'Metallic Grey', filter: 'hue-rotate(0deg) saturate(0) brightness(0.55)', color: '#777777' }
    ],
    specs: {
      'Engine & Transmission': '109.7 cc Single-Cylinder 4-Stroke Air-Cooled ETFi engine',
      'Power & Torque': '7.81 PS power @ 7500 rpm & 8.8 Nm torque @ 5500 rpm',
      'Suspension Setup': 'Telescopic front forks & hydraulic rear monoshock absorber',
      'Braking & Safety': '10-inch alloy wheels, tubeless tyres, and drum brakes at both ends',
      'Smart Dashboard & Console': 'Spacious 19L underseat storage, USB charging port & front glove box'
    },
    variants: [
      { name: 'Gloss Series', price: 70850, desc: 'Classic gloss paint finish, analog console' },
      { name: 'Matte Series', price: 73850, desc: 'Matte premium paint finish' },
      { name: 'SXC (SmartXonnect)', price: 77150, desc: 'Top variant with digital console & Bluetooth smartphone connectivity' }
    ]
  },

  // ─── ELECTRIC ─────────────────────────────────────────────────────────────

  {
    id: 'tvs_x',
    title: 'TVS X Premium EV',
    subtitle: 'High-Performance Electric Crossover',
    image: '/assets/tvs_x.jpg',
    price: 264617,
    speed: '105 km/h',
    power: '11.0 kW',
    acceleration: '2.6s (0-40)',
    category: 'Scooter',
    isEV: true,
    desc: 'A futuristic electric masterpiece. The TVS X is an ultra-premium performance EV scooter with high-rigidity alumicast frame, 10.2-inch customizable PlaySmart screen, and active cooling battery packs.',
    colorways: [
      { name: 'Liquid Blue', filter: 'hue-rotate(0deg) saturate(1) brightness(1)', color: '#3B82F6' },
      { name: 'Pulse Orange', filter: 'hue-rotate(40deg) saturate(1.8) brightness(0.95)', color: '#EF4444' }
    ],
    specs: {
      'Engine & Transmission': 'Liquid-cooled PMSM mid-drive motor with 4.44 kWh Lithium-ion battery',
      'Power & Torque': '11.0 kW peak power & 140 km certified range per charge',
      'Suspension Setup': 'USD front forks & offset rear monoshock on Alumicast crossover framework',
      'Braking & Safety': 'Dual disc brakes with single-channel ABS & regenerative braking system',
      'Smart Dashboard & Console': '10.2-inch PlaySmart panoramic tilt screen with custom widgets, maps & browser'
    },
    variants: [
      { name: 'TVS X (Standard)', price: 264617, desc: 'Full crossover edition with complete connectivity suite' }
    ]
  },
  {
    id: 'iqube',
    title: 'TVS iQube Electric',
    subtitle: 'Connected Smart Urban EV',
    image: '/assets/iqube.png',
    price: 113742,
    speed: '78 km/h',
    power: '4.4 kW',
    acceleration: '4.2s (0-40)',
    category: 'Scooter',
    isEV: true,
    desc: 'The future of urban mobility. Zero emissions, zero noise, and packed with smart features like 17.78 cm TFT cluster, turn-by-turn navigation, and geo-fencing safety.',
    colorways: [
      { name: 'Pearl White', filter: 'hue-rotate(0deg) saturate(0) brightness(1.2)', color: '#FFFFFF' },
      { name: 'Titanium Grey', filter: 'hue-rotate(0deg) saturate(0) brightness(0.65)', color: '#707070' },
      { name: 'Shining Blue', filter: 'hue-rotate(200deg) saturate(1.2) brightness(0.9)', color: '#0052cc' }
    ],
    specs: {
      'Engine & Transmission': 'Brushless DC Hub Motor (BLDC) IP67 with 3.04 kWh Li-ion battery',
      'Power & Torque': '4.4 kW peak power & 100 km range per charge (Eco mode)',
      'Suspension Setup': 'Telescopic front forks & hydraulic twin tube rear shock absorbers',
      'Braking & Safety': 'Front disc brake with CBS & regenerative braking system',
      'Smart Dashboard & Console': '17.78 cm TFT touchscreen with SmartXonnect, Alexa sync & Geo-fencing'
    },
    variants: [
      { name: 'iQube Base (2.2 kWh)', price: 113742, desc: '75 km real-world range, 95 cm TFT console' },
      { name: 'iQube Base (3.4 kWh)', price: 128000, desc: '100 km real-world range, 12.7 cm TFT cluster' },
      { name: 'iQube S (3.4 kWh)', price: 138000, desc: '100 km range with joystick control & premium colors' },
      { name: 'iQube ST (3.4 kWh)', price: 153000, desc: '100 km range, 17.78 cm touchscreen dashboard' },
      { name: 'iQube ST (5.1 kWh Flagship)', price: 183000, desc: '5.1 kWh battery with certified 185 km range' }
    ]
  },
  {
    id: 'orbiter',
    title: 'TVS Orbiter',
    subtitle: 'Affordable Urban Electric Scooter',
    image: '/assets/iqube.png',
    price: 84500,
    speed: '68 km/h',
    power: 'BLDC Motor',
    acceleration: '6.3s (0-40)',
    category: 'Scooter',
    isEV: true,
    desc: 'The practical everyday EV. TVS Orbiter is designed for sensible urban commuting with a 34-litre boot, cruise control, hill-hold assist, Bluetooth connectivity, and up to 158 km range on a full charge.',
    colorways: [
      { name: 'Cosmic Titanium', filter: 'hue-rotate(0deg) saturate(0) brightness(0.5)', color: '#555555' },
      { name: 'Martian Copper', filter: 'hue-rotate(25deg) saturate(1.2) brightness(0.85)', color: '#8B4513' },
      { name: 'Neon Sunburst', filter: 'hue-rotate(40deg) saturate(1.8) brightness(1)', color: '#FFC107' },
      { name: 'Stratos Blue', filter: 'hue-rotate(210deg) saturate(1.3) brightness(0.85)', color: '#1565C0' }
    ],
    specs: {
      'Engine & Transmission': 'BLDC Hub Motor with 1.8 kWh / 3.1 kWh battery pack options',
      'Power & Torque': '68 km/h top speed & up to 158 km certified range',
      'Suspension Setup': 'High-rigidity tubular framework with large 14-inch front wheel',
      'Braking & Safety': 'Sync disc/drum brakes, Cruise control & hill-hold assist',
      'Smart Dashboard & Console': 'Bluetooth, GPS navigation, geofencing, anti-theft & fall alerts'
    },
    variants: [
      { name: 'Orbiter V1 (1.8 kWh)', price: 84500, desc: '86 km range, ideal for short city commutes' },
      { name: 'Orbiter V2 (3.1 kWh)', price: 105000, desc: '158 km certified range — perfect for longer daily routes' }
    ]
  },

  // ─── MOPED ────────────────────────────────────────────────────────────────

  {
    id: 'xl_100',
    title: 'TVS XL 100 Heavy Duty',
    subtitle: 'Unbreakable Utility Moped Partner',
    image: '/assets/xl_100.jpg',
    price: 47686,
    speed: '60 km/h',
    power: '4.4 PS',
    acceleration: '12.0s (0-40)',
    category: 'Moped',
    isEV: false,
    desc: `India's most trusted utility moped. Robust heavy-duty framework, high load-carrying capacity, split seats with removable rear utility rack, and simple fuel-injection engine.`,
    colorways: [
      { name: 'Mineral Green', filter: 'hue-rotate(0deg) saturate(1) brightness(1)', color: '#2E5A44' },
      { name: 'Sporty Red', filter: 'hue-rotate(330deg) saturate(1.5) brightness(0.9)', color: '#C61E34' }
    ],
    specs: {
      'Engine & Transmission': '99.7 cc Single-Cylinder 4-Stroke SOHC, Air-Cooled DuraLife block',
      'Power & Torque': '4.4 PS power @ 6000 rpm & 6.5 Nm torque @ 3500 rpm',
      'Suspension Setup': 'Telescopic hydraulic front & 5-step adjustable rear shock absorbers',
      'Braking & Safety': 'Synchronized Braking Technology (SBT) on dual hub drum setups',
      'Smart Dashboard & Console': 'i-TOUCH silent start, detachable rear seat & broad luggage grid'
    },
    variants: [
      { name: 'Comfort (Kick Start)', price: 47686, desc: 'Base kick start model with spoke wheels' },
      { name: 'Heavy Duty i-Touch Start', price: 52500, desc: 'Alloy wheels, heavy duty luggage guard & silent i-Touch starter' },
      { name: 'Comfort i-Touch Start', price: 57000, desc: 'Self-start with metallic dual-tone paint and chrome leg guards' }
    ]
  }
];

export const ACCESSORIES: Accessory[] = [
  { id: 'acc-bt', name: 'SmartXonnect Console', desc: 'Bluetooth navigation & caller alert module', price: 9990 },
  { id: 'acc-ex', name: 'Performance Carbon Exhaust', desc: 'Race-tuned lightweight exhaust (sound upgrade)', price: 15490 },
  { id: 'acc-dc', name: 'Pro-Racing Graphic Kit', desc: 'Showroom signature high-quality body decals', price: 4990 },
  { id: 'acc-sb', name: 'Touring Saddlebags (30L)', desc: 'Water-resistant quick-release hard cases', price: 8990 },
  { id: 'acc-hl', name: 'TVS Premium Smart Helmet', desc: 'ISI & DOT certified dual-visor smart helmet', price: 5990 },
  { id: 'acc-abs', name: 'Cornering ABS Sync Chip', desc: 'Enhanced track stability race module', price: 12000 }
];

export interface SlideData {
  id: string;
  tag: string;
  title: string;
  desc: string;
  image: string;
  speed: string;
  power: string;
  acceleration: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  accentColor: string; // CSS color value for slide specific highlight
  glowColor: string; // rgba color for slide glow shadow
}

export const SLIDES: SlideData[] = [
  {
    id: "jupiter-125",
    tag: "TVS Jupiter 125",
    title: "The Smart Family Scooter",
    desc: "Designed for ultimate family comfort. Experience class-leading 33L storage (fits two helmets), external front fuel filling, and advanced IntelliGo silent start-stop technology.",
    image: "/assets/jupiter_125.png",
    speed: "95 km/h",
    power: "8.15 PS",
    acceleration: "9.1s (0-60 km/h)",
    primaryCta: {
      label: "Book Test Ride",
      href: "/contact?book=true&vehicle=jupiter"
    },
    secondaryCta: {
      label: "Explore Colors",
      href: "/color-lab?vehicle=jupiter"
    },
    accentColor: "#F59E0B", // Warm Gold Accent
    glowColor: "rgba(245, 158, 11, 0.18)" // Soft Glow
  },
  {
    id: "chronos-310",
    tag: "TVS Apache RR 310",
    title: "Pure Racing DNA",
    desc: "Unleash the racer in you. Combining track-bred power, aggressive aerodynamic styling, and smart safety controls that keep you confident and stable on every turn.",
    image: "/assets/apache_rr310.jpg",
    speed: "160 km/h",
    power: "38 PS @ 9800 rpm",
    acceleration: "2.67s (0-60 km/h)",
    primaryCta: {
      label: "Book Test Ride",
      href: "/contact?book=true&vehicle=apache"
    },
    secondaryCta: {
      label: "Explore Colors",
      href: "/color-lab?vehicle=apache"
    },
    accentColor: "#3B82F6", // Primary Accent
    glowColor: "rgba(59, 130, 246, 0.18)" // Soft Glow
  },
  {
    id: "ronin-commander",
    tag: "TVS Ronin",
    title: "The Modern-Retro Cruiser",
    desc: "Your perfect partner for spontaneous weekend road trips and effortless city cruising. Featuring standard retro charm, comfortable upright seating, and smart turn-by-turn navigation.",
    image: "/assets/ronin.jpg",
    speed: "120 km/h",
    power: "20.4 PS @ 7750 rpm",
    acceleration: "4.2s (0-60 km/h)",
    primaryCta: {
      label: "Reserve Cruiser",
      href: "/contact?book=true&vehicle=ronin"
    },
    secondaryCta: {
      label: "Explore Palette",
      href: "/color-lab?vehicle=ronin"
    },
    accentColor: "#8B5CF6", // Purple Accent
    glowColor: "rgba(139, 92, 246, 0.18)" // Soft Glow
  },
  {
    id: "x-over",
    tag: "TVS iQube",
    title: "The Smart Family EV",
    desc: "The smart, silent family electric scooter. Save big on fuel with super-easy home charging, generous floorboard space, and smart navigation that makes commuting a breeze.",
    image: "/assets/iqube.png",
    speed: "78 km/h",
    power: "4.4 kW (6 PS)",
    acceleration: "4.2s (0-40 km/h)",
    primaryCta: {
      label: "Book Online",
      href: "/contact?book=true&vehicle=iqube"
    },
    secondaryCta: {
      label: "Compare Variants",
      href: "/compare?vehicle=iqube"
    },
    accentColor: "#22D3EE", // Cyan Accent
    glowColor: "rgba(34, 211, 238, 0.18)" // Soft Glow
  }
];

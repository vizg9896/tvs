'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { VEHICLES, ACCESSORIES, Vehicle, Accessory } from '../app/data';
import { SLIDES, SlideData } from './HeroSlider/slideData';

interface DataContextType {
  vehicles: Vehicle[];
  accessories: Accessory[];
  slides: SlideData[];
  loading: boolean;
}

const DataContext = createContext<DataContextType>({
  vehicles: VEHICLES,
  accessories: ACCESSORIES,
  slides: SLIDES,
  loading: true
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(VEHICLES);
  const [accessories, setAccessories] = useState<Accessory[]>(ACCESSORIES);
  const [slides, setSlides] = useState<SlideData[]>(SLIDES);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadDynamicData() {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error(`Data fetch failed: status ${response.status}`);
        }
        const data = await response.json();
        
        if (data.vehicles && data.vehicles.length > 0) {
          setVehicles(data.vehicles);
        }
        if (data.accessories && data.accessories.length > 0) {
          setAccessories(data.accessories);
        }
        if (data.slides && data.slides.length > 0) {
          setSlides(data.slides);
        }
      } catch (error) {
        console.warn('Failed to load Google Sheets data, using static fallbacks:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDynamicData();
  }, []);

  return (
    <DataContext.Provider value={{ vehicles, accessories, slides, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useVehicles = () => useContext(DataContext).vehicles;
export const useAccessories = () => useContext(DataContext).accessories;
export const useSlides = () => useContext(DataContext).slides;
export const useDataLoading = () => useContext(DataContext).loading;

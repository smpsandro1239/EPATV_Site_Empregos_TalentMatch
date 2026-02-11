'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BrandingData {
  primaryColor?: string;
  secondaryColor?: string;
  logoUrl?: string;
}

interface BrandingContextType {
  branding: BrandingData | null;
  setBranding: (data: BrandingData | null) => void;
}

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export function BrandingProvider({ children }: { children: ReactNode }) {
  const [branding, setBranding] = useState<BrandingData | null>(null);

  useEffect(() => {
    if (branding) {
      const root = document.documentElement;
      if (branding.primaryColor) {
        root.style.setProperty('--dynamic-primary', branding.primaryColor);
        root.style.setProperty('--dynamic-primary-transparent', `${branding.primaryColor}10`);
      }
      if (branding.secondaryColor) {
        root.style.setProperty('--dynamic-secondary', branding.secondaryColor);
        root.style.setProperty('--dynamic-secondary-transparent', `${branding.secondaryColor}10`);
      }
    } else {
      // Reset to defaults or remove properties
      const root = document.documentElement;
      root.style.removeProperty('--dynamic-primary');
      root.style.removeProperty('--dynamic-primary-transparent');
      root.style.removeProperty('--dynamic-secondary');
      root.style.removeProperty('--dynamic-secondary-transparent');
    }
  }, [branding]);

  return (
    <BrandingContext.Provider value={{ branding, setBranding }}>
      {children}
    </BrandingContext.Provider>
  );
}

export function useBranding() {
  const context = useContext(BrandingContext);
  if (context === undefined) {
    throw new Error('useBranding must be used within a BrandingProvider');
  }
  return context;
}

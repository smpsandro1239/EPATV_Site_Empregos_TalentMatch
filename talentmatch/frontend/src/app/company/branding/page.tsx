'use client';

import Header from '@/components/Header';
import PageTransition from '@/components/PageTransition';
import { useAuth } from '@/providers/AuthProvider';
import { companiesService } from '@/services/companiesService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function BrandingPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [branding, setBranding] = useState({
    primaryColor: '#4f46e5',
    secondaryColor: '#10b981',
    subdomain: '',
    logoUrl: '',
  });

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'COMPANY')) {
      router.push('/auth/login');
    } else if (user) {
      loadBranding();
    }
  }, [user, isLoading, router]);

  const loadBranding = async () => {
    try {
      const data = await companiesService.getBranding();
      if (data) setBranding(data);
    } catch (error) {
      console.error('Erro ao carregar branding:', error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await companiesService.updateBranding(branding);
      toast.success('Branding atualizado!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar branding');
    }
  };

  if (isLoading) return null;

  return (
    <>
      <Header />
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Personalização de Marca</h1>
          <form onSubmit={handleSave} className="bg-white p-6 rounded-xl shadow-lg border space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cor Primária</label>
                <input type="color" value={branding.primaryColor} onChange={e => setBranding({...branding, primaryColor: e.target.value})} className="w-full h-10" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cor Secundária</label>
                <input type="color" value={branding.secondaryColor} onChange={e => setBranding({...branding, secondaryColor: e.target.value})} className="w-full h-10" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subdomínio</label>
              <input type="text" value={branding.subdomain} onChange={e => setBranding({...branding, subdomain: e.target.value})} placeholder="empresa" className="w-full border rounded p-2" />
            </div>
            <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded-lg font-bold">Guardar</button>
          </form>
        </div>
      </PageTransition>
    </>
  );
}

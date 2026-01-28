'use client';
import Header from '@/components/Header';
import PageTransition from '@/components/PageTransition';
import { useAuth } from '@/providers/AuthProvider';
import { billingService } from '@/services/billingService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function BillingPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'COMPANY')) {
      router.push('/auth/login');
    } else if (user) {
      loadSubscription();
    }
  }, [user, isLoading, router]);

  const loadSubscription = async () => {
    try {
      const data = await billingService.getSubscription();
      setSubscription(data);
    } catch (error) {
      console.error('Erro ao carregar subscrição:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (plan: string) => {
    try {
      const { url } = await billingService.createCheckoutSession(plan);
      if (url) window.location.href = url;
    } catch (error: any) {
      toast.error(error.message || 'Erro ao iniciar checkout');
    }
  };

  if (isLoading || loading) return null;

  return (
    <>
      <Header />
      <PageTransition>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-12">Planos e Faturação</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`border p-8 rounded-xl shadow ${(!subscription || subscription.plan === 'FREE') ? 'border-primary-500 ring-2 ring-primary-500' : ''}`}>
               <h3 className="text-2xl font-bold mb-4">FREE</h3>
               <p className="text-4xl font-bold mb-6">0€</p>
               <button disabled={!subscription || subscription.plan === 'FREE'} className="w-full bg-gray-200 py-2 rounded">
                 {!subscription || subscription.plan === 'FREE' ? 'Plano Atual' : 'Selecionar'}
               </button>
            </div>
            <div className={`border p-8 rounded-xl shadow ${subscription?.plan === 'PRO' ? 'border-primary-500 ring-2 ring-primary-500' : ''}`}>
               <h3 className="text-2xl font-bold mb-4">PRO</h3>
               <p className="text-4xl font-bold mb-6">49€/mês</p>
               <button
                 onClick={() => handleUpgrade('PRO')}
                 disabled={subscription?.plan === 'PRO'}
                 className="w-full bg-primary-600 text-white py-2 rounded font-bold"
               >
                 {subscription?.plan === 'PRO' ? 'Plano Atual' : 'Upgrade'}
               </button>
            </div>
            <div className={`border p-8 rounded-xl shadow ${subscription?.plan === 'ENTERPRISE' ? 'border-primary-500 ring-2 ring-primary-500' : ''}`}>
               <h3 className="text-2xl font-bold mb-4">ENTERPRISE</h3>
               <p className="text-4xl font-bold mb-6">199€/mês</p>
               <button
                 onClick={() => handleUpgrade('ENTERPRISE')}
                 disabled={subscription?.plan === 'ENTERPRISE'}
                 className="w-full bg-gray-800 text-white py-2 rounded font-bold"
               >
                 {subscription?.plan === 'ENTERPRISE' ? 'Plano Atual' : 'Upgrade'}
               </button>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}

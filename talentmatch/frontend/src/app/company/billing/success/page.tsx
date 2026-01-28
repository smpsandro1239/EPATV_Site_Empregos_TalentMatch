'use client';

import Header from '@/components/Header';
import PageTransition from '@/components/PageTransition';
import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function BillingSuccessPage() {
  useEffect(() => {
    toast.success('Assinatura processada com sucesso!');
  }, []);

  return (
    <>
      <Header />
      <PageTransition>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Parabéns!</h1>
          <p className="text-xl text-gray-600 mb-12">
            O seu plano foi atualizado com sucesso. Já pode desfrutar de todas as funcionalidades premium.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/company"
              className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition"
            >
              Ir para o Painel
            </Link>
          </div>
        </div>
      </PageTransition>
    </>
  );
}

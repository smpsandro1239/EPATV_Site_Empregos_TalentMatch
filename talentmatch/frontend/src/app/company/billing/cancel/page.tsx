'use client';

import Header from '@/components/Header';
import PageTransition from '@/components/PageTransition';
import Link from 'next/link';

export default function BillingCancelPage() {
  return (
    <>
      <Header />
      <PageTransition>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pagamento Cancelado</h1>
          <p className="text-xl text-gray-600 mb-12">
            O processo de pagamento foi interrompido. Nenhuma cobrança foi efetuada.
          </p>
          <Link
            href="/company/billing"
            className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition"
          >
            Voltar aos Planos
          </Link>
        </div>
      </PageTransition>
    </>
  );
}

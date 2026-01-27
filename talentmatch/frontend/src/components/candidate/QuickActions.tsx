// src/components/candidate/dashboard/QuickActions.tsx
"use client";

import Link from 'next/link';

const QuickActions = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-xl font-semibold mb-4">Ações Rápidas</h3>
    <div className="flex flex-col sm:flex-row gap-4">
      <Link href="/candidate/profile" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center transition">
        Editar Perfil
      </Link>
      <Link href="/candidate/applications" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded text-center transition">
        Ver Candidaturas
      </Link>
      <Link href="/jobs" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center transition">
        Procurar Vagas
      </Link>
    </div>
  </div>
);

export default QuickActions;

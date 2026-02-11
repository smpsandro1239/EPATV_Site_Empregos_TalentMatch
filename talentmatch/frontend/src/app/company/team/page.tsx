'use client';

import Header from '@/components/Header';
import PageTransition from '@/components/PageTransition';
import { useAuth } from '@/providers/AuthProvider';
import { companiesService } from '@/services/companiesService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function TeamPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [members, setMembers] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('RECRUITER');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'COMPANY')) {
      router.push('/auth/login');
    } else if (user) {
      loadMembers();
    }
  }, [user, isLoading, router]);

  const loadMembers = async () => {
    try {
      const data = await companiesService.getMembers();
      setMembers(data);
    } catch (error: any) {
      console.error('Erro ao carregar membros:', error);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAdding(true);
      await companiesService.addMember(email, role);
      toast.success('Membro adicionado com sucesso!');
      setEmail('');
      loadMembers();
    } catch (error: any) {
      toast.error(error.message || 'Erro ao adicionar membro. Verifique o seu plano.');
    } finally {
      setAdding(false);
    }
  };

  if (isLoading) return null;

  return (
    <>
      <Header />
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Gestão de Equipa</h1>
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <h2 className="text-xl font-semibold mb-4">Adicionar Novo Membro</h2>
            <form onSubmit={handleAddMember} className="flex flex-col md:flex-row gap-4 mb-10">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email do membro"
                className="flex-1 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border rounded-lg p-3 bg-white outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="RECRUITER">Recrutador</option>
                <option value="ADMIN">Administrador</option>
              </select>
              <button
                type="submit"
                disabled={adding}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition disabled:opacity-50"
              >
                {adding ? 'A Adicionar...' : 'Adicionar'}
              </button>
            </form>

            <h2 className="text-xl font-semibold mb-4 border-t pt-6">Membros Atuais</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 font-semibold text-gray-600">Utilizador</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Email</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Função</th>
                    <th className="py-3 px-4 font-semibold text-gray-600 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {members.length === 0 ? (
                    <tr>
                        <td colSpan={4} className="py-8 text-center text-gray-500 italic">Nenhum membro adicional encontrado.</td>
                    </tr>
                  ) : (
                    members.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50 transition">
                        <td className="py-4 px-4 font-medium">
                          {member.user?.companyProfile?.name || member.user?.candidateProfile?.name || 'Sem nome'}
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {member.user?.email || member.userId}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            member.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {member.role}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button className="text-red-600 hover:text-red-800 text-sm font-semibold">Remover</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}

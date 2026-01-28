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
            <form onSubmit={handleAddMember} className="flex gap-4 mb-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email do membro"
                className="flex-1 border rounded-lg p-2"
                required
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border rounded-lg p-2"
              >
                <option value="RECRUITER">Recrutador</option>
                <option value="ADMIN">Administrador</option>
              </select>
              <button
                type="submit"
                disabled={adding}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50"
              >
                Adicionar
              </button>
            </form>
            <div className="divide-y">
              {members.map((member) => (
                <div key={member.id} className="py-4 flex justify-between">
                  <span>{member.userId}</span>
                  <span className="font-bold">{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}

'use client';

import { companyService } from '@/services/companyService';
import { useAuth } from '@/providers/AuthProvider';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  candidate: {
    name: string;
  };
}

interface ReviewsSectionProps {
  companyId: string;
}

export default function ReviewsSection({ companyId }: ReviewsSectionProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const data = await companyService.getReviews(companyId);
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await companyService.addReview(companyId, rating, comment);
      toast.success('Avaliação enviada!');
      setComment('');
      setShowForm(false);
      fetchReviews();
    } catch (error: any) {
      toast.error(error.message || 'Erro ao enviar avaliação');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-4">A carregar avaliações...</div>;

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 'N/A';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Avaliações da Empresa</h2>
          <p className="text-gray-600">Média: <span className="font-bold text-yellow-500">{averageRating} ⭐</span> ({reviews.length} avaliações)</p>
        </div>
        {user?.role === 'CANDIDATE' && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition font-bold"
          >
            Deixar Avaliação
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg space-y-4 border">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Classificação (1-5)</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comentário (Opcional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded-lg p-2 h-24"
              placeholder="Conta a tua experiência com esta empresa..."
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold disabled:opacity-50"
            >
              {submitting ? 'A enviar...' : 'Enviar'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-white text-gray-700 border px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Ainda não há avaliações para esta empresa.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-gray-900">{review.candidate.name}</span>
                <div className="text-yellow-500">
                  {'⭐'.repeat(review.rating)}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

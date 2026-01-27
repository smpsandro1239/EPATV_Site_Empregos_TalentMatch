import { motion } from 'framer-motion';
import JobCard from './JobCard';

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  level: string;
  contractType: string;
  remoteType: string;
  salaryMin?: number;
  salaryMax?: number;
  company: {
    id: string;
    name: string;
    logoUrl?: string;
  };
  createdAt: string;
}

interface JobListProps {
  jobs: Job[];
  loading?: boolean;
  error?: string;
  onClearFilters?: () => void;
}

export default function JobList({ jobs, loading, error, onClearFilters }: JobListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
        {error}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">Não foram encontradas vagas correspondentes aos teus critérios</p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="mt-4 text-primary-600 hover:text-primary-700 font-semibold transition"
          >
            Limpar filtros
          </button>
        )}
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
    >
      {jobs.map((job) => (
        <motion.div key={job.id} variants={item}>
          <JobCard job={job} />
        </motion.div>
      ))}
    </motion.div>
  );
}

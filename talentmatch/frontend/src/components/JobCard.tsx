import Link from 'next/link';

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

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 h-full cursor-pointer">
        {/* Company Info */}
        <div className="flex items-start justify-between mb-4">
          {job.company.logoUrl && (
            <img
              src={job.company.logoUrl}
              alt={job.company.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
          <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded">
            {job.level}
          </span>
        </div>

        {/* Job Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>

        {/* Company Name */}
        <p className="text-gray-600 text-sm mb-3">{job.company.name}</p>

        {/* Job Description Snippet */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {job.description}
        </p>

        {/* Job Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-20">📍 Location:</span>
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-20">💼 Type:</span>
            <span>{job.contractType}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-20">🌐 Remote:</span>
            <span>{job.remoteType}</span>
          </div>
          {job.salaryMin && job.salaryMax && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-20">💰 Salary:</span>
              <span>${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Posted Date */}
        <p className="text-xs text-gray-500">
          Posted {new Date(job.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

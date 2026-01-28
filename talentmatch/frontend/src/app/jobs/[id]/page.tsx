import { Metadata } from 'next';
import JobClientPage from './JobClientPage';

interface Props {
  params: { id: string };
}

async function getJob(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getJob(params.id);

  if (!job) {
    return {
      title: 'Vaga não encontrada',
    };
  }

  return {
    title: `${job.title} na ${job.company.name}`,
    description: job.description.substring(0, 160),
    openGraph: {
      title: `${job.title} na ${job.company.name}`,
      description: job.description.substring(0, 160),
      type: 'article',
    },
  };
}

export default function Page({ params }: Props) {
  return <JobClientPage params={params} />;
}

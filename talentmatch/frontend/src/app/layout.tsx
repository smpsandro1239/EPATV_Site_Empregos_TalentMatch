import { AuthProvider } from '@/providers/AuthProvider';
import { I18nProvider } from '@/providers/I18nProvider';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '@/components/ErrorBoundary';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'TalentMatch - Plataforma de Recrutamento Inteligente',
    template: '%s | TalentMatch'
  },
  description: 'Conectamos os melhores talentos às empresas certas através de IA e matching inteligente.',
  keywords: ['recrutamento', 'emprego', 'ia', 'matching', 'carreira', 'talentos'],
  authors: [{ name: 'TalentMatch Team' }],
  openGraph: {
    title: 'TalentMatch - Plataforma de Recrutamento Inteligente',
    description: 'Conectamos os melhores talentos às empresas certas através de IA e matching inteligente.',
    url: 'https://talentmatch.com',
    siteName: 'TalentMatch',
    locale: 'pt_PT',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>
        <ErrorBoundary>
          <I18nProvider>
            <AuthProvider>
              {children}
              <Toaster position="bottom-right" />
            </AuthProvider>
          </I18nProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

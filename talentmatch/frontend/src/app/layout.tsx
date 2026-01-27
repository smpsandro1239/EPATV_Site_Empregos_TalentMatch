import { AuthProvider } from '@/providers/AuthProvider';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '@/components/ErrorBoundary';
import './globals.css';

export const metadata: Metadata = {
  title: 'TalentMatch - Recruitment Platform',
  description: 'Connect talented professionals with the right opportunities',
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
          <AuthProvider>
            {children}
            <Toaster position="bottom-right" />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

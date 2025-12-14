'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <p>Cargando...</p>;

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      {children}
    </div>
  );
}

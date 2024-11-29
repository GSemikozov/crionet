import { ReactNode } from 'react';

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
        {children}
    </main>
  );
}

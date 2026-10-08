import type { Metadata } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  title: 'Plano B da Mamãe | Atividades prontas pra quando ele pedir a tela',
  description: 'Guia digital com atividades prontas para mães de crianças de 3 a 10 anos. Quando seu filho pedir a tela, você já tem um Plano B na mão.',
  openGraph: {
    title: 'Plano B da Mamãe | Atividades prontas pra quando ele pedir a tela',
    description: 'Guia digital com atividades prontas para mães de crianças de 3 a 10 anos. Sem culpa, sem briga, apenas brincadeira real.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plano B da Mamãe | Atividades prontas pra quando ele pedir a tela',
    description: 'Guia digital com atividades prontas para mães de crianças de 3 a 10 anos.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning className="font-sans antialiased text-[#29252D] bg-[#FFF9F2]">
        {children}
      </body>
    </html>
  );
}

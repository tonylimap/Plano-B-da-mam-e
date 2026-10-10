import type { Metadata } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];
            t=b.createElement(e);t.async=!0;t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}
            (window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1449339573724840');
            fbq('track', 'PageView');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}

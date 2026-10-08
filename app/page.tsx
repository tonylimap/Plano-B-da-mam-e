'use client';

import React, { useState, useEffect } from 'react';
import { 
  Check, 
  ChevronDown, 
  Clock, 
  Smartphone, 
  ShieldCheck, 
  X, 
  Plus, 
  MessageCircle,
  Heart,
  Zap,
  CloudRain,
  Palette,
  Coffee,
  Smile,
  Layout,
  Printer,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

// ==========================================
// 1. CONFIGURAÇÃO (FÁCIL DE TROCAR)
// ==========================================

const CHECKOUT_BASICO_URL = 'https://app.zuptos.com.br/checkout/8396871a43268bb3';
const CHECKOUT_PREMIUM_URL = 'https://app.zuptos.com.br/checkout/73eb8ac8567c725d';
const CHECKOUT_PREMIUM_POPUP_URL = 'https://app.zuptos.com.br/checkout/02557f77866eed8b';
const NUM_ATIVIDADES = "+250 Atividades dinâmicas + Bônus";

// Preços oficiais
const PRECO_BASICO = "37,90";
const PRECO_PREMIUM = "67,90";
const PRECO_PREMIUM_PROMO = "54,32"; // 20% OFF de 67,90
const PRECO_PREMIUM_ORIGINAL = "97,90";

// Adicione depoimentos reais aqui quando tiver
const DEPOIMENTOS: any[] = [];

// ==========================================
// COMPONENTES DE APOIO
// ==========================================

const Button = ({ 
  children, 
  onClick, 
  className = "", 
  variant = "primary",
  size = "md"
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string; 
  variant?: "primary" | "secondary" | "outline" | "white";
  size?: "sm" | "md" | "lg";
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-bold transition-all duration-300 rounded-full active:scale-95 shadow-md overflow-hidden group whitespace-nowrap";
  
  const variants = {
    primary: "bg-[#8C56E4] text-white hover:bg-[#7a49c9]",
    secondary: "bg-[#F4DCE8] text-[#8C56E4] hover:bg-[#ebd0dd]",
    outline: "border-2 border-[#8C56E4] text-[#8C56E4] hover:bg-[#8C56E4] hover:text-white",
    white: "bg-white text-[#8C56E4] hover:bg-brand-creme"
  };

  const sizes = {
    sm: "px-6 py-2.5 text-sm",
    md: "px-8 py-4 text-lg",
    lg: "px-10 py-5 text-xl"
  };

  const scrollToOffer = () => {
    const el = document.getElementById('planos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button 
      onClick={onClick || scrollToOffer} 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
    </button>
  );
};

const Section = ({ 
  children, 
  id, 
  className = "", 
  containerClassName = "max-w-6xl mx-auto px-6 py-12 md:py-20" 
}: { 
  children: React.ReactNode; 
  id?: string; 
  className?: string; 
  containerClassName?: string;
}) => (
  <section id={id} className={`w-full overflow-hidden ${className}`}>
    <div className={containerClassName}>
      {children}
    </div>
  </section>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#29252D]/5 ${className}`}>
    {children}
  </div>
);

const Accordion = ({ items }: { items: { q: string, a: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border-b border-[#29252D]/10">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full py-4 flex items-center justify-between text-left group"
          >
            <span className="text-lg font-bold text-[#29252D] group-hover:text-[#8C56E4] transition-colors">
              {item.q}
            </span>
            <ChevronDown 
              className={`w-5 h-5 text-[#8C56E4] transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} 
            />
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="pb-4 text-[#29252D]/70 leading-relaxed">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

// ==========================================
// PÁGINA PRINCIPAL
// ==========================================

export default function LandingPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Garantir que o cronômetro só rode no cliente para evitar hydration mismatch
  useEffect(() => {
    setTimeout(() => setIsMounted(true), 0);
    
    // O cronômetro deve iniciar em 10:00 toda vez que a página for carregada
    const duration = 600; // 10 minutos
    const startTime = Date.now();
    
    const tick = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      const remaining = Math.max(0, duration - elapsed);
      
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        setIsTimerExpired(true);
      }
    };

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBasicoClick = () => {
    setIsPopupOpen(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="relative min-h-screen bg-[#FFF9F2] text-[#29252D]">
      {/* --------------------------------------------------
          CRONÔMETRO DO TOPO
      -------------------------------------------------- */}
      <div className="bg-[#8C56E4] text-white py-2 fixed top-0 left-0 w-full z-[60] shadow-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center">
          <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] opacity-80 mb-0.5">
            Sua oferta especial expira em:
          </p>
          <span className="font-mono text-xl md:text-2xl font-black tabular-nums tracking-tight">
            {isMounted ? formatTime(timeLeft) : "10:00"}
          </span>
        </div>
      </div>

      {/* Pop-up Premium */}
      <AnimatePresence>
        {isPopupOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="flex items-center justify-center p-4 md:p-8 w-full max-h-full overflow-y-auto pointer-events-none">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsPopupOpen(false)}
                className="fixed inset-0 bg-brand-text/60 backdrop-blur-sm pointer-events-none"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-white rounded-[2.5rem] p-8 md:p-10 max-w-lg w-full shadow-2xl text-center my-8 pointer-events-auto"
              >
              <button 
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-brand-creme transition-colors text-brand-text/30"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="inline-block bg-brand-pink text-brand-purple px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-4">
                Condição única
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-brand-text mb-4">
                Espera um pouquinho, mamãe…
              </h2>
              <p className="text-brand-text/60 text-sm mb-6 leading-relaxed">
                Você pode levar o pacote <span className="font-bold">Premium</span> agora e economizar 20%.
                <br />
                São apenas <span className="text-brand-purple font-bold">R$6,42 a mais</span> para ter o material completo.
              </p>

              <div className="bg-brand-creme rounded-2xl p-5 mb-6 text-left text-sm">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-purple" /> Cartas &quot;Missão do Dia&quot;
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-purple" /> Modo Sossego
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-purple" /> Pacote Férias
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <span className="text-brand-text/30 line-through text-lg">R${PRECO_PREMIUM}</span>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <span className="text-5xl font-black text-brand-purple">R${PRECO_PREMIUM_PROMO}</span>
                  <span className="bg-brand-green text-brand-text px-2 py-1 rounded text-[10px] font-black uppercase">20% OFF</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a 
                  href={CHECKOUT_PREMIUM_POPUP_URL}
                  className="w-full bg-brand-purple text-white py-4 rounded-full text-lg font-black shadow-lg hover:bg-[#7a49c9] transition-all active:scale-95 flex items-center justify-center"
                >
                  Aceito essa oferta
                </a>
                <div className="p-1 bg-gray-300 rounded-full">
                  <a 
                    href={CHECKOUT_BASICO_URL}
                    className="w-full bg-[#f3f4f6] text-black py-5 rounded-full text-lg font-black shadow-sm hover:bg-[#e5e7eb] transition-all active:scale-95 flex items-center justify-center"
                  >
                    Continuar com o Básico
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>

      {/* --------------------------------------------------
          SEÇÃO 1: HERO
      -------------------------------------------------- */}
      <Section id="hero" className="pt-24 md:pt-32">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-brand-purple font-black uppercase tracking-[0.2em] text-xs md:text-sm mb-4">Plano B da Mamãe</h2>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-8 max-w-4xl">
            “Mãe, posso pegar o celular?”
            <span className="block text-brand-purple/80 text-2xl md:text-4xl mt-2 italic">
              Agora você tem um plano B com {NUM_ATIVIDADES}
            </span>
          </h1>

          <div className="relative w-full max-w-2xl mx-auto mb-10 aspect-video rounded-3xl overflow-hidden shadow-2xl border border-black/5">
            <Image 
              src="/mockup-v8.jpg"
              alt="Mockup do Plano B"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <Button size="lg">QUERO O MEU PLANO B</Button>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------
          SEÇÃO 2: PROBLEMA
      -------------------------------------------------- */}
      <Section id="problema" className="bg-white/50 border-y border-black/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-brand-text/40 font-bold uppercase tracking-[0.2em] text-xs mb-8">Isso acontece aí na sua casa também?</p>
          <div className="relative w-full max-w-2xl mx-auto mb-12 aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-xl border border-black/5">
            <Image 
              src="/emotional-crisis.jpg"
              alt="Criança pedindo celular"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif mb-6 px-4">
            Eu sei como é: o difícil não é só tirar a tela. <br className="hidden md:block" />
            <span className="text-brand-purple">É saber o que oferecer no lugar</span>
          </h2>

        </div>
      </Section>



      {/* --------------------------------------------------
          SEÇÃO 4: O QUE RECEBE
      -------------------------------------------------- */}
      <Section id="oque-receber" className="bg-[#8C56E4] text-white rounded-[3rem] my-10 md:my-20">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
              +250 Atividades dinâmicas + Bônus prontas para para sua rotina com seu pequeno ou sua pequena.
            </h2>
            <div className="flex items-start justify-center gap-3 bg-white/10 p-5 rounded-2xl border border-white/5 mb-8">
               <Printer className="w-6 h-6 flex-shrink-0" />
               <p className="text-sm"><b>É só imprimir e brincar.</b> Cada atividade mostra Tempo, Materiais, Idade e Passo a Passo. Perfeito para crianças de 3 a 9 anos.</p>
            </div>
          </div>
          <div className="relative w-full max-w-2xl mx-auto aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
            <Image 
              src="/aprendi.jpg"
              alt="Criança mostrando o que aprendeu"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------
          SEÇÃO 5: EXEMPLOS
      -------------------------------------------------- */}
      <Section id="exemplos">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Olha só o que espera por vocês</h2>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { t: "Máscaras Super-Heróis", d: "Imprima, recorte e deixe ele(a) criar sua própria identidade secreta para brincar.", info: "Pronto para Imprimir · 3-9 anos", img: "/superhero-masks.jpg" },
                { t: "", d: "Vários temas que as crianças amam, prontos para imprimir e começar a pintar.", info: "Pronto para Imprimir · 3-9 anos", img: "/coloring-pages-v2.jpg" },
                { t: "Desafio Muita Energia", d: "Atividades físicas simples para gastar aquela energia acumulada dentro de casa.", info: "Sem material · 3-9 anos", img: "/energy-kids.jpg" }
              ].map((ex, i) => (
                <Card key={i} className="flex flex-col justify-between hover:shadow-lg transition-all border-none bg-brand-creme/50">
                  <div>
                    {ex.info && <span className="text-[10px] font-black text-brand-purple/50 uppercase tracking-widest mb-3 block">{ex.info}</span>}
                    {ex.t && <h3 className="text-xl font-bold mb-3">{ex.t}</h3>}
                    {ex.d && <p className="text-sm text-brand-text/60 leading-relaxed">{ex.d}</p>}
                  </div>
                  <div className={`mt-6 rounded-xl border border-black/5 flex items-center justify-center overflow-hidden relative bg-white ${ex.t === "Desafio Muita Energia" ? "aspect-square" : "aspect-video"}`}>
                    {ex.img ? (
                      <Image 
                        src={ex.img} 
                        alt={ex.t} 
                        fill 
                        className="object-contain"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-[10px] font-bold opacity-20">Foto Real da Atividade</span>
                    )}
                  </div>
                </Card>
              ))}
          </div>
          <p className="text-center text-brand-text/40 text-xs italic">
            E essas são apenas algumas. O guia completo reúne {NUM_ATIVIDADES} para vocês aproveitarem.
          </p>

          <div className="mt-16 bg-[#FFF9F2] p-8 md:p-12 rounded-[2.5rem] border border-brand-purple/10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="flex-1">
              <h3 className="text-2xl font-serif mb-2">Já consegue imaginar vocês brincando?</h3>
              <p className="text-brand-text/60">Dê adeus ao tédio do seu filho sem precisar das telas</p>
            </div>
            <Button variant="outline">VER OS PLANOS</Button>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------
          SEÇÃO 6: BÔNUS
      -------------------------------------------------- */}
      <Section id="bonus" className="bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Preparei 2 presentes especiais para você</h2>
          <p className="text-brand-text/60">Eles ajudam naqueles momentos que pesam mais na nossa rotina.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { t: "Roteiro do Desligar sem Guerra", d: "Frases prontas e um passo a passo para o desligar ser tranquilo, sem transformar tudo em uma briga." },
            { t: "Kit Fora de Casa", d: "Ideias simples para quando vocês estiverem no restaurante ou em esperas e o tédio bater." }
          ].map((b, i) => (
            <Card key={i} className="relative overflow-hidden group border-none bg-brand-creme/30 p-8">
               <div className="absolute top-0 right-0 p-4">
                  <div className="bg-brand-purple text-white px-3 py-1 rounded-full text-[10px] font-black">BÔNUS</div>
               </div>
               <h3 className="text-xl font-bold mb-3 pr-12">{b.t}</h3>
               <p className="text-sm text-brand-text/60 leading-relaxed mb-6">{b.d}</p>
               <div className="flex items-center gap-3">
                  <span className="text-brand-text/30 line-through font-bold text-sm">R$27</span>
                  <span className="text-brand-purple font-black text-xl">R$0 hoje</span>
               </div>
            </Card>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
           <Button>QUERO GARANTIR MEUS BÔNUS</Button>
        </div>
      </Section>

      {/* --------------------------------------------------
          SEÇÃO 7: PLANOS
      -------------------------------------------------- */}
      <Section id="planos" className="bg-brand-creme">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Escolha o melhor caminho para vocês hoje</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto items-stretch px-4">
          {/* Plano Básico */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] p-8 md:p-10 shadow-xl flex flex-col border border-black/5"
          >
            <h3 className="text-2xl font-serif mb-1">Plano Básico</h3>
            <p className="text-brand-text/40 font-bold text-xs uppercase tracking-widest mb-8">Seu Plano B, na mão</p>
            
            <ul className="space-y-4 mb-10 flex-1">
              {[
                `Plano B da Mamãe — ${NUM_ATIVIDADES}`,
                "Desafio Muita Energia",
                "Kit Fora de Casa",
                "Acesso vitalício",
                "Uso no celular ou impressão"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium">
                  <Check className="w-5 h-5 text-brand-green flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mb-8 border-t border-black/5 pt-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif opacity-40">R$</span>
                <span className="text-6xl font-serif">{PRECO_BASICO}</span>
              </div>
              <p className="text-[10px] font-bold text-brand-text/40 uppercase tracking-widest mt-2">Acesso digital imediato</p>
            </div>

            <button 
              onClick={handleBasicoClick}
              className="w-full bg-brand-creme text-brand-purple py-5 rounded-full text-lg font-black shadow-sm hover:bg-[#F4DCE8] transition-all active:scale-95"
            >
              QUERO O BÁSICO
            </button>
            <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] font-black uppercase tracking-widest text-brand-text/30">
               <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Compra segura</span>
               <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Acesso imediato</span>
               <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> 7 dias de garantia</span>
            </div>
          </motion.div>

          {/* Plano Premium */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-brand-purple rounded-[3rem] p-8 md:p-10 shadow-2xl flex flex-col relative text-white"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-green text-brand-text px-6 py-2 rounded-full text-[10px] font-black shadow-lg whitespace-nowrap uppercase tracking-widest">
              Mais Completo
            </div>

            <h3 className="text-2xl font-serif mb-1">Plano Premium</h3>
            <p className="text-white/60 font-bold text-xs uppercase tracking-widest mb-8">O pacote completo</p>
            
            <ul className="space-y-4 mb-10 flex-1">
              {[
                "Tudo do Plano Básico",
                "Cartas “Missão do Dia”",
                "Modo Sossego",
                "Pacote Férias",
                "Acesso vitalício",
                "Uso no celular ou impressão"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium">
                  <div className="flex-shrink-0 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-brand-purple" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mb-8 border-t border-white/10 pt-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif opacity-60">R$</span>
                <span className="text-6xl font-serif">{PRECO_PREMIUM}</span>
              </div>
              <div className="mt-1">
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mr-2">Depois do lançamento:</span>
                <span className="text-white/40 text-sm line-through">R${PRECO_PREMIUM_ORIGINAL}</span>
              </div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-4">Acesso digital imediato</p>
            </div>

            <a 
              href={CHECKOUT_PREMIUM_URL}
              className="block w-full bg-white text-brand-purple py-6 rounded-full text-xl font-black shadow-xl hover:bg-brand-creme transition-all hover:scale-[1.02] active:scale-95 text-center"
            >
              QUERO O PREMIUM
            </a>
            <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] font-black uppercase tracking-widest text-white/40">
               <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Compra segura</span>
               <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Acesso imediato</span>
               <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> 7 dias de garantia</span>
            </div>
          </motion.div>
        </div>

      </Section>

      {/* --------------------------------------------------
          SEÇÃO 8: GARANTIA
      -------------------------------------------------- */}
      <Section id="garantia" className="bg-white">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-10 p-10 bg-brand-creme rounded-[2.5rem]">
           <div className="w-40 h-40 flex-shrink-0 relative">
              <Image
                src="/guarantee-seal-final.webp"
                alt="Garantia de 7 dias"
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
           </div>
           <div>
              <h2 className="text-3xl font-serif mb-4">Garantia de 7 dias</h2>
              <p className="text-brand-text/70 text-sm leading-relaxed mb-6">
                Abra, escolha algumas atividades e veja se o Plano B combina com a sua rotina. Se não fizer sentido para você, poderá solicitar o reembolso dentro do prazo da garantia.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-purple">
                 <ShieldCheck className="w-4 h-4" /> 100% de Garantia
              </div>
           </div>
        </div>
      </Section>

      {/* --------------------------------------------------
          SEÇÃO 9: FAQ
      -------------------------------------------------- */}
      <Section id="faq">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">Dúvidas frequentes</h2>
          <Accordion items={[
            { q: "Pra qual idade serve?", a: "O material foi feito especialmente para crianças de 3 a 9 anos. O material possui +250 Atividades dinâmicas + Bônus com diferentes níveis de simplicidade e podem ser adaptadas conforme a idade e o interesse do seu pequeno." },
            { q: "Preciso imprimir?", a: "Não é obrigatório, mamãe! O material foi feito para ser consultado direto pelo celular na correria do dia, mas se você preferir, pode imprimir as atividades que seu filho mais gostar." },
            { q: "Preciso comprar materiais caros?", a: "De jeito nenhum. Quase tudo usa o que você já tem em casa: papel, lápis, almofadas ou fita. Algumas não precisam de material nenhum, só da criatividade de vocês." },
            { q: "Meu filho é muito apegado ao celular. Serve?", a: "Eu sei bem como é! O Plano B não é mágica, mas é uma alternativa real. A ideia é ter algo pronto para oferecer quando ele pedir a tela, tornando a transição mais suave e menos cansativa para você." },
            { q: "Quanto tempo duram as atividades?", a: "Tem de tudo: desde brincadeiras rápidas de 5 minutos para aquele momento de pressa, até atividades mais longas para quando vocês tiverem mais tempo juntos." },
            { q: "Como recebo o material?", a: "Assim que a compra for confirmada, você recebe tudo no seu e-mail." },
            { q: "O que muda no Premium?", a: "O Premium é o nosso pacote mais completo. Além de tudo do Básico, você leva as Cartas 'Missão do Dia' e o Modo Sossego (brincadeiras com menos ajuda da mãe)." },
            { q: "Tem garantia?", a: "Com certeza. Se sentir que não é para vocês, é só pedir o reembolso sem complicação." }
          ]} />
        </div>
      </Section>

      {/* --------------------------------------------------
          SEÇÃO 10: CTA FINAL
      -------------------------------------------------- */}
      <Section id="final" className="bg-[#29252D] text-white text-center rounded-t-[4rem]">
        <h2 className="text-3xl md:text-5xl font-serif mb-6 px-4">Comece com suas {NUM_ATIVIDADES} hoje mesmo.</h2>
        <Button size="lg" className="mb-8">QUERO O MEU PLANO B</Button>
      </Section>

      {/* RODAPÉ */}
      <footer className="bg-[#29252D] text-white/40 py-12 border-t border-white/5 text-center px-6">
         <p className="font-serif text-xl text-white mb-6">Plano B da Mamãe</p>
         <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-widest mb-6">
            <a href="#" className="hover:text-brand-purple transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-brand-purple transition-colors">Privacidade</a>
         </div>
         <p className="text-[10px] max-w-xl mx-auto leading-relaxed">
           Este material é educativo e recreativo e não substitui orientação de profissionais de saúde ou educação. © 2026 Plano B da Mamãe.
         </p>
      </footer>
    </main>
  );
}

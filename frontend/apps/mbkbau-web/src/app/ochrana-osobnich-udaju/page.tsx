import type { Metadata } from 'next';
import { Footer } from '@/components/layout/footer';
import { BTN_PRIMARY, FOCUS_RING } from '@/components/ui/button-styles';
import { PRIVACY_EFFECTIVE_FROM, PRIVACY_SECTIONS } from '@/data/privacy';
import { cn } from '@/lib/utils';

export const metadata: Metadata = { title: 'Ochrana osobních údajů | MBK BAU' };

export default function PrivacyPage() {
  return (
    <>
      <header className="border-outline-variant/30 border-b bg-surface">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-4 md:px-8">
          <a aria-label="MBK BAU – hlavní stránka" className={cn('rounded-brand', FOCUS_RING)} href="/">
            {/* biome-ignore lint/correctness/useImageSize: statický export bez optimalizace obrázků */}
            <img alt="MBK BAU" className="h-9 w-auto md:h-11" src="/mbkbau.png" />
          </a>
          <a className={cn(BTN_PRIMARY, FOCUS_RING)} href="/">
            ← Zpět na MBK BAU
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[760px] px-5 py-16 md:px-8 md:py-24">
        <h1 className="mb-10 font-black text-[clamp(2rem,6vw,3rem)] text-on-surface leading-[1.05] tracking-[-0.03em]">
          Ochrana osobních údajů
        </h1>

        {PRIVACY_SECTIONS.map((section) => (
          <section className="mb-10" key={section.heading}>
            <h2 className="mb-3 font-extrabold text-[1.25rem] text-on-surface tracking-[-0.02em]">{section.heading}</h2>
            {section.paragraphs.map((text) => (
              <p className="mb-3 text-on-surface-variant leading-[1.65]" key={text}>
                {text}
              </p>
            ))}
          </section>
        ))}

        <p className="text-on-surface-variant text-sm">Účinnost od {PRIVACY_EFFECTIVE_FROM}.</p>
      </main>

      <Footer />
    </>
  );
}

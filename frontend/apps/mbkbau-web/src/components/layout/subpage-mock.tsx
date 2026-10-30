import type { CSSProperties } from 'react';
import { BTN_BASE, BTN_PRIMARY, FOCUS_RING } from '@/components/ui/button-styles';
import { SectionIntro } from '@/components/ui/section-intro';
import type { Subpage } from '@/data/subpages';
import { cn } from '@/lib/utils';

interface Props {
  page: Subpage;
}

export const SubpageMock = ({ page }: Props) => {
  const { accent, on, glow } = page.accent;
  const style = { '--hero-accent': accent, '--hero-on': on, '--hero-glow': glow } as CSSProperties;

  return (
    <div style={style}>
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

      <main>
        <section className="relative flex min-h-[70svh] items-center overflow-hidden bg-[#1c1b1b]">
          {/* biome-ignore lint/correctness/useImageSize: statický export bez optimalizace obrázků */}
          <img
            alt={page.image.alt}
            className="absolute inset-0 size-full object-cover object-center"
            src={page.image.src}
          />
          <div className="absolute inset-0 bg-[image:linear-gradient(105deg,rgba(28,27,27,0.88)_0%,rgba(28,27,27,0.64)_50%,rgba(28,27,27,0.25)_100%)]" />
          <div className="relative mx-auto w-full max-w-[1280px] px-5 py-24 md:px-8">
            <span className="text-(color:--hero-accent) mb-5 inline-block font-bold text-[0.75rem] uppercase tracking-[0.18em]">
              {page.eyebrow}
            </span>
            <h1 className="mb-6 max-w-[12ch] font-black text-[clamp(3rem,10vw,7rem)] text-white leading-[0.92] tracking-[-0.04em]">
              {page.title[0]}
              <br />
              <span className="text-(color:--hero-accent)">{page.title[1]}</span>
            </h1>
            <p className="max-w-[44ch] text-[clamp(1rem,2vw,1.2rem)] text-white/[0.78] leading-[1.65]">{page.intro}</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-5 py-20 md:px-8 md:py-28">
          <SectionIntro eyebrow="Co nabízíme" title="Naše služby" />
          <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
            {page.items.map((item) => (
              <li className="rounded-brand bg-surface-low p-8" key={item.title}>
                <h3 className="mb-3 font-extrabold text-[1.25rem] text-on-surface tracking-[-0.02em]">{item.title}</h3>
                <p className="m-0 text-on-surface-variant leading-[1.65]">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-surface-low">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
            <p className="m-0 font-bold text-on-surface">Připravujeme – tato stránka je zatím ukázková.</p>
            <div className="flex flex-wrap gap-4">
              <a className={cn(BTN_PRIMARY, FOCUS_RING)} href="/">
                ← Zpět na MBK BAU
              </a>
              <a
                className={cn(
                  BTN_BASE,
                  FOCUS_RING,
                  'bg-(color:--hero-accent) text-(color:--hero-on) px-6 py-[0.7rem] transition-[filter] duration-200 hover:brightness-[1.08]'
                )}
                href="/#kontakt"
              >
                Kontakt
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

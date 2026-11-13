import type { CSSProperties } from 'react';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { TopBar } from '@/components/layout/top-bar';
import { BTN_BASE, BTN_GLASS, FOCUS_RING } from '@/components/ui/button-styles';
import { MailIcon } from '@/components/ui/icons';
import { PhotoComposition } from '@/components/ui/photo-composition';
import { SectionIntro } from '@/components/ui/section-intro';
import { SITE } from '@/data/site';
import type { Subpage } from '@/data/subpages';
import { cn } from '@/lib/utils';

interface Props {
  page: Subpage;
}

const CONTAINER = 'mx-auto w-full max-w-[1280px] px-5 md:px-8';
const BTN_ACCENT = cn(
  BTN_BASE,
  FOCUS_RING,
  'bg-(color:--hero-accent) text-(color:--hero-on) px-6 py-[0.7rem] shadow-[0_8px_40px_var(--hero-glow)] transition-[filter] duration-200 hover:brightness-[1.08]'
);
const CARD_TITLE = 'mb-2 font-extrabold text-[1.125rem] text-on-surface tracking-[-0.02em]';
const CARD_TEXT = 'm-0 text-on-surface-variant leading-[1.65]';

/** Podstránka služby (elektro, voda a topení): hero, proč my, služby, téma s fotkami, další služby, postup, otázky a kontakt. */
export const ServiceSubpage = ({ page }: Props) => {
  const { accent, on, glow } = page.accent;
  const style = { '--hero-accent': accent, '--hero-on': on, '--hero-glow': glow } as CSSProperties;

  return (
    <div style={style}>
      <Header topBar={<TopBar />} />

      <main>
        <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-[#1c1b1b]">
          {/* biome-ignore lint/correctness/useImageSize: statický export bez optimalizace obrázků */}
          <img
            alt={page.image.alt}
            className="absolute inset-0 size-full object-cover object-center"
            src={page.image.src}
          />
          <div className="absolute inset-0 bg-[image:linear-gradient(105deg,rgba(28,27,27,0.88)_0%,rgba(28,27,27,0.64)_50%,rgba(28,27,27,0.25)_100%)]" />
          <div className={cn(CONTAINER, 'relative pt-40 pb-24 md:pt-44')}>
            <span className="text-(color:--hero-accent) mb-5 inline-block font-bold text-[0.75rem] uppercase tracking-[0.18em]">
              {page.eyebrow}
            </span>
            <h1 className="mb-6 max-w-[12ch] font-black text-[clamp(2.25rem,10vw,7rem)] text-white leading-[0.92] tracking-[-0.04em]">
              {page.title[0]}
              <br />
              <span className="text-(color:--hero-accent)">{page.title[1]}</span>
            </h1>
            <p className="mb-10 max-w-[44ch] text-[clamp(1rem,2vw,1.2rem)] text-white/[0.78] leading-[1.65]">
              {page.intro}
            </p>
            <div className="flex flex-wrap gap-4">
              <a className={BTN_ACCENT} href="#kontakt">
                Nezávazná poptávka
              </a>
              <a className={cn(BTN_GLASS, FOCUS_RING, 'rounded-brand px-6 py-[0.7rem]')} href="#sluzby">
                Co děláme
              </a>
            </div>
          </div>
        </section>

        <section className={cn(CONTAINER, 'py-20 md:py-28')}>
          <SectionIntro eyebrow="Proč my" title={`${page.eyebrow} od stavební firmy`} />
          <ul className="m-0 grid list-none gap-x-10 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {page.reasons.map((item) => (
              <li className="border-(color:--hero-accent) border-t-[3px] pt-5" key={item.title}>
                <h3 className={CARD_TITLE}>{item.title}</h3>
                <p className={CARD_TEXT}>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-surface-low" id="sluzby">
          <div className={cn(CONTAINER, 'py-20 md:py-28')}>
            <SectionIntro eyebrow={page.services.eyebrow} title={page.services.title} />
            <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {page.services.items.map((item) => (
                <li className="rounded-brand bg-surface p-7" key={item.title}>
                  <h3 className={CARD_TITLE}>{item.title}</h3>
                  <p className={CARD_TEXT}>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[#1c1b1b]">
          <div className={cn(CONTAINER, 'grid items-center gap-16 py-20 md:grid-cols-2 md:py-28')}>
            <div>
              <span className="text-(color:--hero-accent) mb-4 inline-block font-bold text-[0.75rem] uppercase tracking-[0.18em]">
                {page.focus.eyebrow}
              </span>
              <h2 className="mb-6 font-black text-[clamp(2rem,4vw,3.25rem)] text-white leading-[1.05] tracking-[-0.04em]">
                {page.focus.title}
              </h2>
              <p className="mb-8 max-w-[48ch] text-[1.0625rem] text-white/70 leading-[1.75]">{page.focus.text}</p>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {page.focus.points.map((point) => (
                  <li className="flex items-baseline gap-3 text-white/85" key={point}>
                    <span aria-hidden="true" className="text-(color:--hero-accent) font-black">
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <PhotoComposition
              insetAlt={page.focus.photos.insetAlt}
              insetSrc={page.focus.photos.insetSrc}
              mainAlt={page.focus.photos.mainAlt}
              mainSrc={page.focus.photos.mainSrc}
            />
          </div>
        </section>

        <section className={cn(CONTAINER, 'py-20 md:py-28')}>
          <SectionIntro eyebrow={page.more.eyebrow} title={page.more.title} />
          <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {page.more.items.map((item) => (
              <li className="rounded-brand bg-surface-low p-7" key={item.title}>
                <h3 className={CARD_TITLE}>{item.title}</h3>
                <p className={CARD_TEXT}>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-surface-low">
          <div className={cn(CONTAINER, 'py-20 md:py-28')}>
            <SectionIntro eyebrow="Postup" title="Jak zakázka probíhá" />
            <ol className="m-0 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {page.steps.map((step, index) => (
                <li key={step.title}>
                  <span className="bg-(color:--hero-accent) text-(color:--hero-on) mb-5 inline-flex size-11 items-center justify-center rounded-full font-black text-[1.125rem]">
                    {index + 1}
                  </span>
                  <h3 className={CARD_TITLE}>{step.title}</h3>
                  <p className={CARD_TEXT}>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={cn(CONTAINER, 'grid gap-12 py-20 md:grid-cols-[1fr_2fr] md:py-28')}>
          <SectionIntro eyebrow="Otázky" title="Na co se nás ptáte" />
          <div className="divide-y divide-on-surface/10 border-on-surface/10 border-y">
            {page.faq.map((item) => (
              <details className="group py-5" key={item.question}>
                <summary
                  className={cn(
                    'flex cursor-pointer list-none items-center justify-between gap-6 font-bold text-[1.0625rem] text-on-surface [&::-webkit-details-marker]:hidden',
                    FOCUS_RING
                  )}
                >
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="text-[1.5rem] text-on-surface-variant leading-none transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 mb-0 max-w-[65ch] text-on-surface-variant leading-[1.7]">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-(color:--hero-accent) text-(color:--hero-on)" id="kontakt">
          <div className={cn(CONTAINER, 'flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between')}>
            <div>
              <h2 className="mb-3 font-black text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
                {page.cta.title}
              </h2>
              <p className="m-0 max-w-[48ch] text-[1.0625rem] leading-[1.65] opacity-80">{page.cta.text}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                className={cn(
                  BTN_BASE,
                  FOCUS_RING,
                  'inline-flex items-center gap-2 bg-[#1c1b1b] px-6 py-[0.7rem] text-white'
                )}
                href={`mailto:${SITE.email}`}
              >
                <MailIcon className="size-4 fill-current" />
                {SITE.email}
              </a>
              <a
                className={cn(BTN_BASE, FOCUS_RING, 'text-(color:--hero-on) border-2 border-current px-6 py-[0.6rem]')}
                href="/#kontakt"
              >
                Všechny kontakty
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

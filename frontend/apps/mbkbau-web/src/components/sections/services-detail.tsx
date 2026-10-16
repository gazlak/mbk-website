'use client';

import { useEffect, useRef, useState } from 'react';
import { FOCUS_RING } from '@/components/ui/button-styles';
import { PhotoComposition } from '@/components/ui/photo-composition';
import { SectionIntro } from '@/components/ui/section-intro';
import { SERVICES } from '@/data/services';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap } from '@/lib/gsap';
import { at, cn } from '@/lib/utils';

const pad = (n: number) => String(n + 1).padStart(2, '0');

export const ServicesDetail = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  // na mobilu jde aktivní službu klikem sbalit
  const [open, setOpen] = useState(true);
  const mainRef = useRef<HTMLImageElement>(null);
  const insetRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const token = useRef(0);
  const first = at(SERVICES, 0);
  const current = at(SERVICES, active);

  // výměna fotek: fade out → nový zdroj → decode → fade in (token zahodí zastaralé výměny)
  const swap = (index: number) => {
    const main = mainRef.current;
    const inset = insetRef.current;
    if (!(main && inset)) {
      return;
    }
    const svc = at(SERVICES, index);
    token.current += 1;
    const t = token.current;
    const apply = () => {
      main.src = svc.main;
      main.alt = svc.alt;
      inset.src = svc.inset;
      inset.alt = `${svc.alt} – detail`;
    };
    if (reduce) {
      apply();
      return;
    }
    gsap.to([main, inset], {
      autoAlpha: 0,
      duration: 0.25,
      overwrite: 'auto',
      onComplete: () => {
        if (t !== token.current) {
          return;
        }
        apply();
        Promise.all([main, inset].map((im) => im.decode().catch(() => undefined))).then(() => {
          if (t === token.current) {
            gsap.to([main, inset], { autoAlpha: 1, duration: 0.3, overwrite: 'auto' });
          }
        });
      },
    });
  };

  const select = (index: number) => {
    if (index === active) {
      if (window.matchMedia('(max-width: 767px)').matches) {
        setOpen((v) => !v);
      }
      return;
    }
    setOpen(true);
    setActive(index);
    swap(index);
  };

  // dopředné načtení fotek, jakmile se sekce blíží k viewportu
  useEffect(() => {
    const sec = sectionRef.current;
    if (!(sec && 'IntersectionObserver' in window)) {
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) {
          return;
        }
        io.disconnect();
        for (const s of SERVICES) {
          new Image().src = s.main;
          new Image().src = s.inset;
        }
      },
      { rootMargin: '300px' }
    );
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-surface px-8 py-24" id="co-delame" ref={sectionRef}>
      <div className="mx-auto grid max-w-[1280px] grid-cols-[1fr] items-center gap-16 md:grid-cols-[1fr_1fr] md:items-start">
        <div className="hidden md:sticky md:top-28 md:block">
          <PhotoComposition
            insetAlt={`${first.alt} – detail`}
            insetRef={insetRef}
            insetSrc={first.inset}
            mainAlt={first.alt}
            mainClassName="md:h-[420px]"
            mainRef={mainRef}
            mainSrc={first.main}
            reversed
          />
          <div
            aria-live="polite"
            className="hidden min-h-32 border-primary border-l-[3px] pl-5 md:mt-7 md:ml-[30px] md:block"
          >
            <h3 className="mb-2 font-extrabold text-[1.25rem] text-on-surface tracking-[-0.02em]">{current.name}</h3>
            <p className="text-[1rem] text-on-surface-variant leading-[1.75]">{current.desc}</p>
          </div>
        </div>

        <SectionIntro eyebrow="Co děláme" title="Kompletní stavební služby pod jednou střechou.">
          <ul className="flex list-none flex-col" data-services-list="">
            {SERVICES.map((svc, i) => {
              const on = i === active && open;
              return (
                <li
                  className={cn(
                    "relative border-surface-high border-b font-bold text-[1.0625rem] tracking-[-0.01em] transition-colors duration-200 before:absolute before:top-1/2 before:left-[-1rem] before:h-0 before:w-[3px] before:-translate-y-1/2 before:bg-primary before:transition-[height] before:duration-250 before:content-[''] first:border-t",
                    on ? 'text-primary before:h-[1.4rem]' : 'text-on-surface'
                  )}
                  key={svc.name}
                >
                  <button
                    aria-pressed={on}
                    className={cn('flex w-full cursor-pointer items-center gap-4 py-[1.1rem] text-left', FOCUS_RING)}
                    onClick={() => select(i)}
                    type="button"
                  >
                    <span className="min-w-6 font-bold text-[0.7rem] text-primary tracking-[0.12em]">{pad(i)}</span>
                    <span>{svc.name}</span>
                  </button>
                  <div
                    className={cn(
                      'grid transition-[grid-template-rows] duration-[350ms] ease-[ease] md:hidden',
                      on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-1 font-normal text-[0.95rem] text-on-surface-variant leading-[1.7] tracking-normal">
                        {svc.desc}
                      </p>
                      {/* biome-ignore lint/correctness/useImageSize: statický export bez optimalizace obrázků */}
                      <img
                        alt={svc.alt}
                        className="mt-4 mb-5 block aspect-video w-full rounded-brand object-cover"
                        loading="lazy"
                        src={svc.main}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </SectionIntro>
      </div>
    </section>
  );
};

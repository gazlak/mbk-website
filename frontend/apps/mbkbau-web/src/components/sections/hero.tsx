'use client';

import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { BTN_BASE, BTN_GLASS } from '@/components/ui/button-styles';
import { HERO_SLIDES } from '@/data/hero';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

const INTERVAL = 4000;
const SWIPE_MIN = 50;
const COUNT = HERO_SLIDES.length;

const accentStyle = (i: number): CSSProperties | undefined => {
  const a = HERO_SLIDES[i]?.accent;
  return a ? ({ '--hero-accent': a.accent, '--hero-on': a.on, '--hero-glow': a.glow } as CSSProperties) : undefined;
};

const pad = (n: number) => String(n).padStart(2, '0');

export const Hero = () => {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const [cur, setCur] = useState(0);
  // `tick` restartuje animaci průběhové linky při každé změně (i na stejný slide)
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);

  const curRef = useRef(0);
  curRef.current = cur;

  const go = useCallback((i: number) => {
    setCur(((i % COUNT) + COUNT) % COUNT);
    setTick((t) => t + 1);
  }, []);
  const goRef = useRef(go);
  goRef.current = go;

  // `tick` jen restartuje časovač (klik na stejný slide)
  // biome-ignore lint/correctness/useExhaustiveDependencies: tick slouží jako spouštěč restartu
  useEffect(() => {
    if (reduce || paused || hidden) {
      return;
    }
    const id = setTimeout(() => go(cur + 1), INTERVAL);
    return () => clearTimeout(id);
  }, [reduce, paused, hidden, cur, tick, go]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // klávesy, hover, focus a swipe
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    let sx: number | null = null;
    const pause = () => setPaused(true);
    // po pauze začíná nových 4 s, linka se restartuje společně s časovačem
    const resume = () => {
      setPaused(false);
      setTick((t) => t + 1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goRef.current(curRef.current - 1);
      } else if (e.key === 'ArrowRight') {
        goRef.current(curRef.current + 1);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') {
        sx = e.clientX;
      }
    };
    const onUp = (e: PointerEvent) => {
      if (sx === null) {
        return;
      }
      const dx = e.clientX - sx;
      sx = null;
      if (Math.abs(dx) >= SWIPE_MIN) {
        goRef.current(curRef.current + (dx < 0 ? 1 : -1));
      }
    };
    const onCancel = () => {
      sx = null;
    };
    root.addEventListener('mouseenter', pause);
    root.addEventListener('mouseleave', resume);
    root.addEventListener('focusin', pause);
    root.addEventListener('focusout', resume);
    root.addEventListener('keydown', onKey);
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('pointerup', onUp);
    root.addEventListener('pointercancel', onCancel);
    return () => {
      root.removeEventListener('mouseenter', pause);
      root.removeEventListener('mouseleave', resume);
      root.removeEventListener('focusin', pause);
      root.removeEventListener('focusout', resume);
      root.removeEventListener('keydown', onKey);
      root.removeEventListener('pointerdown', onDown);
      root.removeEventListener('pointerup', onUp);
      root.removeEventListener('pointercancel', onCancel);
    };
  }, []);

  // dopředné načtení všech fotek po načtení stránky
  useEffect(() => {
    const preload = () => {
      for (const s of HERO_SLIDES) {
        new Image().src = s.image.src;
      }
    };
    if (document.readyState === 'complete') {
      preload();
      return;
    }
    window.addEventListener('load', preload);
    return () => window.removeEventListener('load', preload);
  }, []);

  const playing = !reduce;

  return (
    <section
      aria-label="Naše obory"
      aria-roledescription="carousel"
      className="group/hero relative flex min-h-svh touch-pan-y items-center overflow-hidden [--hero-accent:var(--primary)] [--hero-glow:rgba(240,79,18,0.28)] [--hero-on:var(--on-primary)]"
      data-hero=""
      data-paused={paused ? 'true' : 'false'}
      ref={rootRef}
    >
      <div
        className="absolute inset-0 z-0 after:absolute after:inset-0 after:z-[1] after:bg-[image:linear-gradient(to_top,rgba(28,27,27,0.7)_0%,rgba(28,27,27,0)_28%),linear-gradient(105deg,rgba(28,27,27,0.88)_0%,rgba(28,27,27,0.64)_50%,rgba(28,27,27,0.25)_100%)] after:content-['']"
        data-hero-bg=""
      >
        {HERO_SLIDES.map((s, i) => (
          // biome-ignore lint/correctness/useImageSize: statický export bez optimalizace obrázků
          <img
            alt={s.image.alt}
            className={cn(
              'absolute inset-0 size-full object-cover object-center opacity-0 transition-opacity duration-[1200ms] ease-[ease] motion-reduce:duration-300',
              i === cur && 'animate-hero-kenburns opacity-100 motion-reduce:animate-none'
            )}
            key={s.image.src}
            loading={i === 0 ? 'eager' : 'lazy'}
            src={s.image.src}
          />
        ))}
      </div>

      <div
        aria-live="off"
        className="hero-content relative z-[1] mx-auto grid w-full max-w-[1280px] px-5 pt-[6.5rem] pb-28 md:px-8 md:pt-32 md:pb-32"
        data-hero-content=""
      >
        {HERO_SLIDES.map((s, i) => {
          const active = i === cur;
          return (
            // biome-ignore lint/a11y/useSemanticElements: slide karuselu, fieldset by změnil sémantiku
            <div
              aria-hidden={active ? undefined : true}
              aria-label={`${i + 1} z ${COUNT}`}
              aria-roledescription="slide"
              className={cn(
                'transition-[opacity,translate] ease-[ease] [grid-area:1/1] motion-reduce:translate-y-0 motion-reduce:delay-0 motion-reduce:duration-300',
                active
                  ? 'translate-y-0 opacity-100 delay-200 duration-[600ms]'
                  : 'pointer-events-none translate-y-4 opacity-0 delay-0 duration-[400ms]'
              )}
              data-active={active ? 'true' : 'false'}
              data-hero-slide=""
              inert={!active}
              key={s.label}
              role="group"
              style={accentStyle(i)}
            >
              <span
                className="text-(color:--hero-accent) mb-5 inline-block font-bold text-[0.75rem] uppercase tracking-[0.18em]"
                data-hero-eyebrow=""
              >
                {s.eyebrow}
              </span>
              <h1 className="mb-6 max-w-[12ch] font-black text-[clamp(3rem,10vw,7rem)] text-white leading-[0.92] tracking-[-0.04em]">
                {s.title[0]}
                <br />
                <span className="text-(color:--hero-accent)">{s.title[1]}</span>
              </h1>
              <p
                className="mb-10 max-w-[44ch] font-normal text-[clamp(1rem,2vw,1.2rem)] text-white/[0.78] leading-[1.65]"
                data-hero-subtitle=""
              >
                {s.subtitle.map((line, li) => (
                  <span key={line}>
                    {li > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
              <div className="flex flex-wrap gap-4" data-hero-ctas="">
                <a
                  className={cn(
                    BTN_BASE,
                    'bg-(color:--hero-accent) text-(color:--hero-on) px-8 py-[0.9rem] shadow-[0_8px_40px_var(--hero-glow)] transition-[filter,transform] duration-200 hover:brightness-[1.08] active:scale-[0.97]'
                  )}
                  href={s.cta.href}
                  {...(s.cta.external ? { target: '_blank', rel: 'noopener' } : {})}
                >
                  {s.cta.label}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-x-0 bottom-6 z-[2] mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 md:bottom-9 md:justify-start md:gap-8 md:px-8">
        <div className="flex shrink-0 gap-3">
          <button
            aria-label="Předchozí obor"
            className={cn(
              BTN_GLASS,
              'inline-flex size-[42px] items-center justify-center rounded-full p-0 text-[1.25rem] leading-none md:size-12'
            )}
            onClick={() => go(cur - 1)}
            type="button"
          >
            ←
          </button>
          <button
            aria-label="Další obor"
            className={cn(
              BTN_GLASS,
              'inline-flex size-[42px] items-center justify-center rounded-full p-0 text-[1.25rem] leading-none md:size-12'
            )}
            onClick={() => go(cur + 1)}
            type="button"
          >
            →
          </button>
        </div>
        <ul className="m-0 flex min-w-0 list-none items-end gap-2 p-0 md:flex-1 md:gap-5">
          {HERO_SLIDES.map((s, i) => {
            const active = i === cur;
            return (
              <li className="contents" key={s.label}>
                <button
                  aria-current={active ? 'true' : undefined}
                  aria-label={s.label}
                  className={cn(
                    'relative w-[26px] flex-none cursor-pointer whitespace-nowrap border-0 bg-transparent pt-3 text-left font-bold uppercase tracking-[0.06em] transition-[color,font-size] duration-300 md:w-auto md:max-w-[260px] md:flex-1 md:whitespace-normal md:pt-4',
                    active
                      ? 'w-auto min-w-[26px] font-extrabold text-[0.95rem] text-white md:text-[1.125rem]'
                      : 'text-[0px] text-white/50 hover:text-white/85 md:text-[0.9rem]'
                  )}
                  onClick={() => go(i)}
                  style={i === 0 ? undefined : accentStyle(i)}
                  type="button"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute top-0 left-0 w-full rounded-[2px] transition-[height,background-color] duration-300',
                      active ? 'bg-(color:--hero-accent) h-1 md:h-[5px]' : 'h-[3px] bg-white/25'
                    )}
                  />
                  {active && playing && (
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 h-1 w-full origin-left animate-hero-progress rounded-[2px] bg-white/85 [transform:scaleX(0)] md:h-[5px] group-data-[paused=true]/hero:[animation-play-state:paused]"
                      key={tick}
                    />
                  )}
                  <span className="text-(color:--hero-accent) mr-[0.5em]">{pad(i + 1)}</span>
                  {s.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

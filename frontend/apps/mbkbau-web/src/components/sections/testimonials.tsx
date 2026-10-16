'use client';

import { useEffect, useRef, useState } from 'react';
import { TESTIMONIALS } from '@/data/references';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

const INTERVAL = 7000;
const COUNT = TESTIMONIALS.length;

export const Testimonials = () => {
  const reduce = useReducedMotion();
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || paused) {
      return;
    }
    const id = setTimeout(() => setCur((cur + 1) % COUNT), INTERVAL);
    return () => clearTimeout(id);
  }, [cur, reduce, paused]);

  // pozastavení rotace při najetí myší / fokusu
  useEffect(() => {
    const box = boxRef.current;
    if (!box) {
      return;
    }
    const pause = () => setPaused(true);
    const resume = () => setPaused(false);
    box.addEventListener('mouseenter', pause);
    box.addEventListener('mouseleave', resume);
    box.addEventListener('focusin', pause);
    box.addEventListener('focusout', resume);
    return () => {
      box.removeEventListener('mouseenter', pause);
      box.removeEventListener('mouseleave', resume);
      box.removeEventListener('focusin', pause);
      box.removeEventListener('focusout', resume);
    };
  }, []);

  return (
    <div className="mt-16 max-w-[52rem]" data-ref-quote="" id="ref-quotes" ref={boxRef}>
      <span aria-hidden="true" className="block h-12 font-black text-[6rem] text-primary leading-[0.6]">
        “
      </span>
      <div aria-live="off" className="grid">
        {TESTIMONIALS.map((t, i) => {
          const on = i === cur;
          return (
            <figure
              aria-hidden={on ? undefined : true}
              className={cn(
                'transition-opacity duration-[600ms] ease-[ease] [grid-area:1/1]',
                on ? 'opacity-100' : 'pointer-events-none opacity-0'
              )}
              inert={!on}
              key={t.author}
            >
              <blockquote>
                <p className="mb-5 font-normal text-[1.25rem] text-white leading-[1.6]">{t.text}</p>
              </blockquote>
              <figcaption className="mb-1 font-bold text-[0.6875rem] text-white/55 uppercase tracking-[0.14em]">
                {t.author}
              </figcaption>
            </figure>
          );
        })}
      </div>
      <div aria-label="Reference" className="mt-6 flex gap-2" role="tablist">
        {TESTIMONIALS.map((t, i) => (
          <button
            aria-label={`Reference ${i + 1}`}
            aria-selected={i === cur}
            className={cn(
              'size-[0.6rem] cursor-pointer rounded-full border-0 p-0 transition-[background-color,scale] duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[3px]',
              i === cur ? 'scale-125 bg-primary' : 'bg-white/30'
            )}
            key={t.author}
            onClick={() => {
              setCur(i);
            }}
            role="tab"
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

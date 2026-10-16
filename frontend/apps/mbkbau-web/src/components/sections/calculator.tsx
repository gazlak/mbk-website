'use client';

import { useEffect, useRef, useState } from 'react';
import { PRICING } from '@/data/pricing';
import { type CalcItem, type CalcState, compute, INITIAL_STATE } from '@/lib/calculator';
import { cn } from '@/lib/utils';
import { CalcResultPanel, useCalcSummary } from './calculator/calc-result';
import { CalcSteps } from './calculator/calc-steps';

export const Calculator = () => {
  const [state, setState] = useState<CalcState>(INITIAL_STATE);
  const nextId = useRef(3);
  const sectionRef = useRef<HTMLElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [barOn, setBarOn] = useState(false);

  const update = (p: Partial<CalcState>) => setState((prev) => ({ ...prev, ...p }));
  const result = compute(state);
  const { barPrice } = useCalcSummary(state, result);

  const addItem = () => {
    if (!result) {
      return;
    }
    const item: CalcItem = { ...result, id: nextId.current++ };
    update({ items: [...state.items, item] });
  };

  const addOpening = (kind: 'window' | 'door') => {
    const d = PRICING.openings[kind];
    update({ openings: [...state.openings, { id: nextId.current++, k: kind, w: d.w, h: d.h, n: 1 }] });
  };

  // lišta s cenou: vidět v sekci, dokud není na obrazovce box s cenou
  useEffect(() => {
    const sec = sectionRef.current;
    const res = resultRef.current;
    if (!(sec && res && 'IntersectionObserver' in window)) {
      return;
    }
    let inSec = false;
    let resSeen = false;
    const obs = new IntersectionObserver((entries) => {
      for (const x of entries) {
        if (x.target === res) {
          resSeen = x.isIntersecting;
        } else {
          inSec = x.isIntersecting;
        }
      }
      setBarOn(inSec && !resSeen);
    });
    obs.observe(sec);
    obs.observe(res);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-surface px-4 py-24 md:px-8" id="kalkulacka" ref={sectionRef}>
      <div className="mx-auto max-w-[1280px]">
        <div
          className="grid grid-cols-[minmax(0,1fr)] gap-10 rounded-brand bg-surface-low px-5 py-6 shadow-[0_20px_80px_rgba(28,27,27,0.05)] md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:p-12 lg:p-16"
          data-reveal-card=""
        >
          <div className="contents md:short:static md:sticky md:top-32 md:block md:self-start">
            <div className="mb-0 md:mb-7" data-reveal-group="">
              <h3
                className="mb-3 font-black text-[clamp(2rem,4vw,2.75rem)] text-primary tracking-[-0.04em]"
                data-reveal-heading=""
              >
                Spočítejte si&nbsp;cenu
              </h3>
              <p className="text-[0.9375rem] text-on-surface-variant leading-[1.65]" data-reveal-sibling="">
                Vyberte práci, zadejte rozměry a hned uvidíte orientační cenu.
              </p>
            </div>
            <CalcResultPanel onAdd={addItem} result={result} resultRef={resultRef} state={state} update={update} />
          </div>

          <CalcSteps addOpening={addOpening} state={state} update={update} />
        </div>
        <a
          className={cn(
            'fixed inset-x-4 bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-[90] flex items-center gap-3 rounded-brand bg-on-surface px-4 py-3 font-semibold text-[0.8125rem] text-white no-underline shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-[translate,opacity] duration-250 ease-[ease] md:hidden',
            barOn ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[150%] opacity-0'
          )}
          href="#calc-result"
        >
          <span>Orientační cena</span>
          <strong className="ml-auto text-right font-black text-[1rem] text-primary">{barPrice}</strong> ↓
        </a>
      </div>
    </section>
  );
};

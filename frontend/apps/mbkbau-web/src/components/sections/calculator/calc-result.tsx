import type { Ref } from 'react';
import { BTN_PRIMARY, FOCUS_RING, LABEL } from '@/components/ui/button-styles';
import { PRICING } from '@/data/pricing';
import { SITE } from '@/data/site';
import {
  breakdownRows,
  buildMailto,
  type CalcResult,
  type CalcState,
  fmt,
  fmtM2,
  fmtOpenArea,
  getType,
  itemRange,
  openingsArea,
  priceRange,
  type Row,
  rangeLabel,
  round100,
  totalsOf,
  usesOpenings,
  vatFactor,
} from '@/lib/calculator';
import { cn } from '@/lib/utils';
import { CALC_OPTION } from './calc-steps';

const Rows = ({ rows }: { rows: Row[] }) => (
  <>
    {rows.map((r) => (
      <li
        className={cn('flex justify-between gap-4 text-on-surface-variant', r.sub && 'pl-[0.9rem] text-[0.8125rem]')}
        key={r.label}
      >
        <span>{r.label}</span>
        <strong className="font-bold text-on-surface">{r.value}</strong>
      </li>
    ))}
  </>
);

const BREAKDOWN = 'mb-4 flex list-none flex-col gap-[0.4rem] text-[0.875rem]';
const NOTE = 'text-[0.8125rem] leading-normal text-on-surface-variant';

interface Props {
  onAdd: () => void;
  result: CalcResult | null;
  resultRef: Ref<HTMLDivElement>;
  state: CalcState;
  update: (p: Partial<CalcState>) => void;
}

export const useCalcSummary = (state: CalcState, result: CalcResult | null) => {
  const k = vatFactor(state.vat);
  const min = PRICING.minOrder;
  const totals = totalsOf(state.items);
  const tlo = Math.max(totals.lo, min);
  const thi = Math.max(totals.hi, min);
  const hasItems = state.items.length > 0;
  const usesOpen = usesOpenings(getType(state));
  const openArea = usesOpen ? openingsArea(state.openings) : 0;
  const barPrice = (() => {
    if (hasItems) {
      return `Celkem ${rangeLabel(tlo * k, thi * k)}`;
    }
    if (result) {
      const { lo, hi } = priceRange(result, k);
      return `cca ${rangeLabel(lo, hi)}`;
    }
    return '—';
  })();
  return { k, min, totals, tlo, thi, hasItems, usesOpen, openArea, barPrice };
};

export const CalcResultPanel = ({ state, result, update, onAdd, resultRef }: Props) => {
  const { k, min, totals, tlo, thi, hasItems, usesOpen, openArea } = useCalcSummary(state, result);
  const vat = k > 1;

  let price = '—';
  let note = 'Zadejte kladné rozměry nebo plochu, abychom mohli cenu spočítat.';
  let rows: Row[] = [];
  if (result) {
    const { lo, hi } = priceRange(result, k);
    price = `cca ${rangeLabel(lo, hi)}`;
    note = `Orientační odhad, přesnou cenu stanovíme po prohlídce.${vat ? '' : ' Ceny jsou bez DPH.'}`;
    rows = [
      { label: 'Plocha', value: `${fmtM2(result.area)} m²` },
      ...(openArea > 0 ? [{ label: 'Odečteno (okna, dveře)', value: `− ${fmtOpenArea(openArea)} m²` }] : []),
      ...breakdownRows(result.labour, result.matGroups, result.material, k, false, result.noMat),
    ];
  }

  const totalRows: Row[] = hasItems
    ? [
        { label: 'Celkem', value: `${fmt(round100(tlo * k))} – ${fmt(round100(thi * k))}` },
        ...(totals.lo < min ? [{ label: 'Minimální zakázka', value: fmt(min * k) }] : []),
        ...breakdownRows(totals.labour, totals.g, totals.mat, k, false, !totals.mat),
      ]
    : [];

  const mailto = buildMailto({ state, result, totals, usesOpen, openArea, k }, SITE.email);
  const showMatNote = !!result && !!result.matNote && (state.material || result.noMat);

  return (
    <div
      aria-live="polite"
      className="scroll-mt-24 rounded-brand bg-surface p-5 max-md:order-2 md:max-h-[calc(100vh-9rem)] md:overflow-y-auto md:p-6"
      id="calc-result"
      ref={resultRef}
    >
      <p className={LABEL}>Orientační cena</p>
      <p className="mt-1 mb-4 font-black text-[clamp(1.5rem,3vw,1.875rem)] text-primary leading-[1.15] tracking-[-0.03em]">
        {price}
      </p>
      <ul className={BREAKDOWN}>
        <Rows rows={rows} />
      </ul>
      {showMatNote && result && <p className={cn(NOTE, 'mb-5')}>{result.matNote}</p>}
      {result && (
        <button
          className={cn(
            'mb-4 block w-full cursor-pointer rounded-brand border-[1.5px] border-primary bg-transparent px-4 py-[0.7rem] font-bold text-[0.875rem] text-primary hover:bg-primary hover:text-white',
            FOCUS_RING
          )}
          onClick={onAdd}
          type="button"
        >
          + Přidat do odhadu
        </button>
      )}
      {hasItems && (
        <div className="mb-4 border-[rgba(128,128,128,0.25)] border-t pt-3">
          <p className={LABEL}>Váš odhad</p>
          <ul className="mt-2 mb-3 flex list-none flex-col gap-[0.6rem] md:max-h-[25vh] md:overflow-y-auto">
            {state.items.map((it) => {
              const ir = itemRange(it);
              return (
                <li
                  className="grid grid-cols-[1fr_auto] items-start gap-x-2 gap-y-[0.1rem] text-[0.875rem] md:grid-cols-[1fr_auto_auto]"
                  key={it.id}
                >
                  <b className="col-start-1 row-start-1 font-bold text-on-surface">{it.title}</b>
                  <em className="col-span-full row-start-2 whitespace-nowrap font-bold text-on-surface not-italic md:col-span-1 md:col-start-2 md:row-start-1">
                    {fmt(round100(ir[0] * k))} – {fmt(round100(ir[1] * k))}
                  </em>
                  <button
                    aria-label="Odebrat položku"
                    className="col-start-2 row-start-1 cursor-pointer border-0 bg-transparent px-1 text-[1.1rem] text-on-surface-variant leading-none hover:text-primary md:col-start-3"
                    onClick={() => update({ items: state.items.filter((x) => x.id !== it.id) })}
                    type="button"
                  >
                    ×
                  </button>
                  <small className="col-span-full text-[0.75rem] text-on-surface-variant leading-[1.4] md:col-[1/3]">
                    {fmtM2(it.area)} m²{it.desc ? ` · ${it.desc}` : ''}
                    {it.material || it.noMat ? '' : ' · bez materiálu'}
                  </small>
                </li>
              );
            })}
          </ul>
          <ul className={BREAKDOWN}>
            <Rows rows={totalRows} />
          </ul>
        </div>
      )}
      <label className={cn(CALC_OPTION, 'mb-4')}>
        <input
          checked={state.vat}
          className="size-[1.1rem] accent-primary"
          onChange={(e) => update({ vat: e.target.checked })}
          type="checkbox"
        />{' '}
        Zobrazit s DPH (12&nbsp;%)
      </label>
      <p className={cn(NOTE, 'mb-5')}>{note}</p>
      <div className="flex flex-wrap items-center gap-4">
        <a className={BTN_PRIMARY} href={mailto}>
          Chci přesnou nabídku
        </a>
        <a className="font-semibold text-[0.875rem] text-on-surface no-underline hover:text-primary" href="#kontakt">
          Kontakt
        </a>
      </div>
    </div>
  );
};

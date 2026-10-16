import type { ReactNode } from 'react';
import { FOCUS_RING, LABEL } from '@/components/ui/button-styles';
import { PRICING } from '@/data/pricing';
import {
  type CalcMode,
  type CalcState,
  fmtOpenArea,
  getService,
  getType,
  lr,
  openingsArea,
  rangeText,
  selIndex,
  usesDimsHeight,
  usesOpenings,
  visibleOpts,
} from '@/lib/calculator';
import { cn } from '@/lib/utils';

const CHIP =
  'cursor-pointer rounded-brand border-2 border-transparent px-4 py-[0.6rem] font-semibold text-[0.875rem] transition-colors duration-200';
const OPTION = cn(
  'flex cursor-pointer items-center gap-3 rounded-brand border-2 border-transparent bg-surface px-4 py-3 font-semibold text-[0.9375rem] has-[input:checked]:border-primary has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-primary has-[input:focus-visible]:outline-offset-2 max-md:flex-wrap'
);
export const CALC_OPTION = OPTION;
const RADIO = 'size-[1.1rem] accent-primary';
const FIELD_INPUT = cn(
  'w-full rounded-brand border-2 border-transparent bg-surface px-[0.9rem] py-[0.7rem] text-[1rem] text-on-surface',
  FOCUS_RING
);

const Chip = ({
  active,
  children,
  onClick,
  className,
}: {
  active?: boolean;
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) => (
  <button
    className={cn(
      CHIP,
      FOCUS_RING,
      active ? 'bg-primary text-white' : 'bg-surface text-on-surface hover:text-primary',
      className
    )}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);

interface Props {
  addOpening: (kind: 'window' | 'door') => void;
  state: CalcState;
  update: (p: Partial<CalcState>) => void;
}

const Dimensions = ({ state, update }: Pick<Props, 'state' | 'update'>) => {
  const t = getType(state);
  const manual = t.area === 'manual';
  const room = state.mode === 'room' && !manual;
  const setDim = (k: keyof CalcState['dims'], v: string) => update({ dims: { ...state.dims, [k]: v } });
  const modes: [CalcMode, string][] = [
    ['room', 'Zadám rozměry'],
    ['area', 'Zadám plochu (m²)'],
  ];
  return (
    <>
      <div className={cn('mt-2 flex flex-wrap gap-2 max-md:grid max-md:grid-cols-[1fr_1fr]', manual && 'hidden')}>
        {modes.map(([mode, label]) => (
          <Chip
            active={state.mode === mode}
            className="max-md:px-2 max-md:text-center"
            key={mode}
            onClick={() => update({ mode })}
          >
            {label}
          </Chip>
        ))}
      </div>
      <div className={cn('mt-2 grid grid-cols-[1fr_1fr] gap-3 md:grid-cols-[repeat(3,1fr)]', !room && 'hidden')}>
        <div>
          <label className={cn(LABEL, 'block')} htmlFor="c-l">
            Délka (m)
          </label>
          <input
            className={FIELD_INPUT}
            id="c-l"
            min="0"
            onChange={(e) => setDim('l', e.target.value)}
            step="0.1"
            type="number"
            value={state.dims.l}
          />
        </div>
        <div>
          <label className={cn(LABEL, 'block')} htmlFor="c-w">
            Šířka (m)
          </label>
          <input
            className={FIELD_INPUT}
            id="c-w"
            min="0"
            onChange={(e) => setDim('w', e.target.value)}
            step="0.1"
            type="number"
            value={state.dims.w}
          />
        </div>
        <div className={cn(!usesDimsHeight(t) && 'hidden')}>
          <label className={cn(LABEL, 'block')} htmlFor="c-h">
            Výška (m)
          </label>
          <input
            className={FIELD_INPUT}
            id="c-h"
            min="0"
            onChange={(e) => setDim('h', e.target.value)}
            step="0.1"
            type="number"
            value={state.dims.h}
          />
        </div>
      </div>
      <div className={cn('mt-2 grid grid-cols-[1fr] gap-3', room && 'hidden')}>
        <div>
          <label className={cn(LABEL, 'block')} htmlFor="c-area">
            Plocha (m²)
          </label>
          <input
            className={FIELD_INPUT}
            id="c-area"
            min="0"
            onChange={(e) => setDim('area', e.target.value)}
            step="0.5"
            type="number"
            value={state.dims.area}
          />
        </div>
      </div>
    </>
  );
};

const OpeningRows = ({ state, update, addOpening }: Pick<Props, 'state' | 'update' | 'addOpening'>) => {
  const t = getType(state);
  const setField = (id: number, f: 'w' | 'h' | 'n', v: string) =>
    update({ openings: state.openings.map((o) => (o.id === id ? { ...o, [f]: v } : o)) });
  const cell = (id: number, f: 'w' | 'h' | 'n', label: string, step: string, val: number | string) => (
    <div>
      <label className={cn(LABEL, 'mb-0 flex flex-col gap-1')}>
        {label}
        <input
          className={cn(FIELD_INPUT, 'md:box-border md:h-[3.4rem]')}
          min="0"
          onChange={(e) => setField(id, f, e.target.value)}
          step={step}
          type="number"
          value={val}
        />
      </label>
    </div>
  );
  return (
    <div className={cn('mt-4', !usesOpenings(t) && 'hidden')}>
      <p className={LABEL}>Okna a dveře (odečtou se od plochy)</p>
      <div>
        {state.openings.map((o) => (
          <div
            className="mt-2 grid grid-cols-[repeat(3,1fr)] items-end gap-x-3 gap-y-2 md:grid-cols-[5rem_1fr_1fr_1fr_auto]"
            key={o.id}
          >
            <span className="col-[1/3] row-1 font-semibold text-on-surface md:col-auto md:row-auto md:flex md:h-[3.4rem] md:items-center md:self-end md:py-0">
              {PRICING.openings[o.k].name}
            </span>
            {cell(o.id, 'w', 'Šířka (m)', '0.1', o.w)}
            {cell(o.id, 'h', 'Výška (m)', '0.1', o.h)}
            {cell(o.id, 'n', 'Počet', '1', o.n)}
            <button
              aria-label="Odebrat"
              className={cn(
                'col-3 row-1 cursor-pointer justify-self-end border-0 bg-transparent px-2 py-1 text-[1.25rem] text-on-surface-variant leading-none hover:text-primary md:col-auto md:row-auto md:flex md:h-[3.4rem] md:items-center md:self-end md:py-0',
                FOCUS_RING
              )}
              onClick={() => update({ openings: state.openings.filter((x) => x.id !== o.id) })}
              type="button"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <Chip onClick={() => addOpening('window')}>+ Přidat okno</Chip>
        <Chip onClick={() => addOpening('door')}>+ Přidat dveře</Chip>
      </div>
      <p className="mt-2 text-right text-[0.9rem] text-on-surface-variant">
        Odečteno: {fmtOpenArea(usesOpenings(t) ? openingsArea(state.openings) : 0)} m²
      </p>
    </div>
  );
};

export const CalcSteps = ({ state, update, addOpening }: Props) => {
  const svc = getService(state);
  const t = getType(state);
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className={LABEL}>1 · Služba</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRICING.services.map((s, i) => (
            <Chip active={i === state.s} key={s.id} onClick={() => update({ s: i, t: 0, extras: {}, opts: {} })}>
              {s.name}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <p className={LABEL}>2 · Typ práce</p>
        <div className="mt-2 grid grid-cols-[1fr] gap-2 md:grid-cols-[1fr_1fr]">
          {svc.types.map((type, i) => (
            <label className={OPTION} key={type.name}>
              <input
                checked={i === state.t}
                className={RADIO}
                name="calc-type"
                onChange={() => update({ t: i, extras: {}, opts: {} })}
                type="radio"
                value={i}
              />{' '}
              {type.name}
            </label>
          ))}
        </div>
        <div>
          {visibleOpts(state).map((o) => (
            <div className="mt-5" key={o.id}>
              <p className={LABEL}>{o.label}</p>
              <div className="mt-2 grid grid-cols-[1fr] gap-2 md:grid-cols-[1fr_1fr]">
                {o.choices.map((c, i) => (
                  <label className={OPTION} key={c.n}>
                    <input
                      checked={selIndex(state, o) === i}
                      className={RADIO}
                      name={`calc-opt-${o.id}`}
                      onChange={() => update({ opts: { ...state.opts, [o.id]: i } })}
                      type="radio"
                      value={i}
                    />{' '}
                    {c.n}
                    {c.labour && (
                      <small className="ml-auto whitespace-nowrap font-medium text-on-surface-variant">
                        +{rangeText(c.labour)} Kč/m²
                      </small>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className={LABEL}>3 · Rozměry</p>
        <Dimensions state={state} update={update} />
        <OpeningRows addOpening={addOpening} state={state} update={update} />
      </div>

      <div>
        <p className={LABEL}>4 · Doplňky</p>
        <div className="mt-2 grid grid-cols-[1fr] gap-2 md:grid-cols-[1fr_1fr]">
          {t.extras.map((e, i) => {
            const l = lr(e[1]);
            return (
              <label className={OPTION} key={e[0]}>
                <input
                  checked={!!state.extras[i]}
                  className={RADIO}
                  onChange={(ev) => update({ extras: { ...state.extras, [i]: ev.target.checked } })}
                  type="checkbox"
                />{' '}
                {e[0]}
                <small className="ml-auto whitespace-nowrap font-medium text-on-surface-variant">
                  +{rangeText(l)} Kč/{e[3] === 'w' ? 'm³ suti' : 'm²'}
                </small>
              </label>
            );
          })}
          {!svc.noMat && (
            <label className={OPTION}>
              <input
                checked={state.material}
                className={RADIO}
                onChange={(ev) => update({ material: ev.target.checked })}
                type="checkbox"
              />{' '}
              Včetně materiálu
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

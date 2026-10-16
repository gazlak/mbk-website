import {
  BOARD_WASTE,
  type Extra,
  GROUPS,
  type GroupId,
  type Material,
  type OpeningKind,
  type Option,
  PRICING,
  type Range,
  SERVICE_DEFS,
  type ServiceDef,
  type WorkType,
} from '@/data/pricing';
import { at } from '@/lib/utils';

export interface Opening {
  h: number | string;
  id: number;
  k: OpeningKind;
  n: number | string;
  w: number | string;
}

export interface Dims {
  area: string;
  h: string;
  l: string;
  w: string;
}

export type CalcMode = 'room' | 'area';

export interface CalcState {
  dims: Dims;
  extras: Record<number, boolean>;
  items: CalcItem[];
  material: boolean;
  mode: CalcMode;
  openings: Opening[];
  opts: Record<string, number>;
  s: number;
  t: number;
  vat: boolean;
}

export type MatGroups = Record<GroupId, number>;

export interface CalcResult {
  area: number;
  desc: string;
  labour: Range;
  material: boolean;
  matGroups: MatGroups;
  matNote: string;
  noMat: boolean;
  title: string;
}

export type CalcItem = CalcResult & { id: number };

export interface Row {
  label: string;
  sub?: boolean;
  value: string;
}

export const INITIAL_STATE: CalcState = {
  s: 0,
  t: 0,
  mode: 'room',
  extras: {},
  opts: {},
  items: [],
  material: true,
  openings: [
    { id: 1, k: 'window', w: 1.2, h: 1.5, n: 1 },
    { id: 2, k: 'door', w: 0.8, h: 2.0, n: 1 },
  ],
  vat: false,
  dims: { l: '4', w: '3', h: '2.6', area: '20' },
};

// ── formátování ──
export const pos = (v: unknown): number => {
  const n = Number.parseFloat(String(v));
  return Number.isFinite(n) && n > 0 ? n : 0;
};
export const fmtNum = (n: number): string => n.toLocaleString('cs-CZ');
export const fmt = (n: number): string => `${fmtNum(Math.round(n))} Kč`;
export const round100 = (n: number): number => Math.round(n / 100) * 100;
export const fmtM2 = (n: number): string => n.toLocaleString('cs-CZ', { maximumFractionDigits: 1 });
const fmtDim = (n: number): string => n.toLocaleString('cs-CZ', { maximumFractionDigits: 2 });
export const fmtOpenArea = (n: number): string => fmtDim(n);
export const rangeText = (r: Range): string => (r[0] === r[1] ? String(r[0]) : `${r[0]}–${r[1]}`);
export const lr = (x: number | Range): Range => (typeof x === 'number' ? [x, x] : x);

// ── výběr služby / typu / voleb ──
export const getService = (state: CalcState): ServiceDef => at(SERVICE_DEFS, state.s);
export const getType = (state: CalcState): WorkType => at(getService(state).types, state.t);
export const selIndex = (state: CalcState, o: Option): number => state.opts[o.id] ?? o.def ?? 0;
export const optOn = (state: CalcState, o: Option): boolean => !o.when || (state.opts[o.when[0]] ?? 0) === o.when[1];
export const visibleOpts = (state: CalcState): Option[] => (getType(state).opts ?? []).filter((o) => optOn(state, o));

export const usesDimsHeight = (t: WorkType): boolean => t.area === 'walls' || t.area === 'both';
export const usesOpenings = (t: WorkType): boolean => usesDimsHeight(t) || t.area === 'manual';

// ── plochy ──
export const openingsArea = (openings: Opening[]): number =>
  openings.reduce((sum, o) => sum + pos(o.w) * pos(o.h) * pos(o.n), 0);

export const openingsText = (openings: Opening[]): string =>
  openings
    .filter((o) => pos(o.w) * pos(o.h) * pos(o.n) > 0)
    .map((o) => {
      const f = (n: number) => n.toLocaleString('cs-CZ', { maximumFractionDigits: 2 });
      return `${f(pos(o.n))}× ${PRICING.openings[o.k].name.toLowerCase()} ${f(pos(o.w))}×${f(pos(o.h))} m`;
    })
    .join(', ');

export const computeArea = (state: CalcState): number => {
  const t = getType(state);
  const open = openingsArea(state.openings);
  if (t.area === 'manual' || state.mode === 'area') {
    return Math.max(0, pos(state.dims.area) - open);
  }
  const l = pos(state.dims.l);
  const w = pos(state.dims.w);
  const h = pos(state.dims.h);
  const floor = l * w;
  const walls = 2 * (l + w) * h;
  const wallNet = Math.max(0, walls - open);
  if (t.area === 'ceiling' || t.area === 'floor') {
    return floor;
  }
  if (t.area === 'walls') {
    return wallNet;
  }
  return wallNet + floor; // both
};

// ── materiálové skupiny ──
export const emptyGroups = (): MatGroups => {
  const g = {} as MatGroups;
  for (const [id] of GROUPS) {
    g[id] = 0;
  }
  return g;
};
export const sumGroups = (g: MatGroups): number => GROUPS.reduce((s, [id]) => s + (g[id] || 0), 0);

interface Parts {
  board: number;
  d: string[];
  items: Material[];
  lab: Range;
  layers: number;
  waste: number;
}

// Práce a materiál z voleb (příplatky, spotřeby, vrstvy, deska, suť).
const collectOptions = (state: CalcState, t: WorkType): Parts => {
  const p: Parts = {
    lab: [t.labour[0], t.labour[1]],
    items: t.mat.slice(),
    layers: 1,
    board: 0,
    waste: t.waste || 0,
    d: [],
  };
  for (const o of visibleOpts(state)) {
    const c = at(o.choices, selIndex(state, o));
    if (c.labour) {
      p.lab[0] += c.labour[0];
      p.lab[1] += c.labour[1];
    }
    if (c.mat) {
      p.items = p.items.concat(c.mat);
    }
    p.board = c.board || p.board;
    p.layers = c.layers || p.layers;
    p.waste += c.waste || 0;
    if (c.d) {
      p.d.push(c.d);
    }
  }
  return p;
};

// Příplatky a materiál zaškrtnutých doplňků.
const applyExtras = (state: CalcState, t: WorkType, p: Parts): void => {
  t.extras.forEach((e: Extra, i) => {
    if (!state.extras[i]) {
      return;
    }
    const l = lr(e[1]);
    const m = e[3] === 'w' ? p.waste : 1;
    p.lab[0] += l[0] * m;
    p.lab[1] += l[1] * m;
    if (e[2]) {
      p.items = p.items.concat(e[2]);
    }
    p.d.push(e[0]);
  });
};

const materialMultiplier = (it: Material, layers: number, sides: number): number => {
  if (it.l) {
    return layers * sides;
  }
  return it.s ? sides : 1;
};

// Výpočet jedné práce: práce = základ + příplatky voleb; materiál = spotřeba × cena × přirážka.
export const compute = (state: CalcState): CalcResult | null => {
  const t = getType(state);
  const svc = getService(state);
  const a = computeArea(state);
  if (!(a > 0)) {
    return null;
  }
  const p = collectOptions(state, t);
  applyExtras(state, t, p);
  const g = emptyGroups();
  const sides = t.sides || 1;
  const k = PRICING.matMarkup;
  if (state.material) {
    if (p.board) {
      g.desky = a * BOARD_WASTE * p.layers * sides * p.board * k;
    }
    for (const it of p.items) {
      g[it.g] += a * it.q * materialMultiplier(it, p.layers, sides) * it.p * k;
    }
  }
  return {
    title: `${svc.name} – ${t.name}`,
    desc: p.d.join(', '),
    area: a,
    matNote: t.matNote || svc.matNote,
    noMat: !!svc.noMat,
    labour: [a * p.lab[0], a * p.lab[1]],
    matGroups: g,
    material: state.material,
  };
};

export const vatFactor = (vat: boolean): number => (vat ? 1 + PRICING.vat : 1);

export const itemRange = (it: CalcResult): Range => {
  const m = sumGroups(it.matGroups);
  return [it.labour[0] + m, it.labour[1] + m];
};

const groupRows = (g: MatGroups, k: number): Row[] => {
  const detail = GROUPS.some(([id]) => id !== 'ost' && g[id] > 0);
  if (!detail) {
    return [];
  }
  return GROUPS.filter(([id]) => g[id] > 0).map(([id, label]) => ({ label, value: fmt(g[id] * k), sub: true }));
};

// Rozpis práce + materiálu (volitelně po skupinách)
export const breakdownRows = (
  labour: Range,
  g: MatGroups,
  material: boolean,
  k: number,
  hasExtras: boolean,
  noMat: boolean
): Row[] => {
  const rows: Row[] = [
    { label: `Práce${hasExtras ? ' a doplňky' : ''}`, value: `${fmt(labour[0] * k)} – ${fmt(labour[1] * k)}` },
  ];
  if (!noMat) {
    rows.push({ label: 'Materiál', value: material ? fmt(sumGroups(g) * k) : 'ne' });
    if (material) {
      rows.push(...groupRows(g, k));
    }
  }
  return rows;
};

export const priceRange = (r: CalcResult, k: number): { lo: number; hi: number } => {
  const rg = itemRange(r);
  const min = PRICING.minOrder;
  return { lo: Math.max(rg[0], min) * k, hi: Math.max(rg[1], min) * k };
};

export const rangeLabel = (lo: number, hi: number): string => `${fmtNum(round100(lo))} – ${fmtNum(round100(hi))} Kč`;

export interface Totals {
  g: MatGroups;
  hi: number;
  labour: Range;
  lo: number;
  mat: boolean;
}

export const totalsOf = (items: CalcResult[]): Totals => {
  const tot: Totals = { labour: [0, 0], g: emptyGroups(), lo: 0, hi: 0, mat: false };
  for (const it of items) {
    tot.labour[0] += it.labour[0];
    tot.labour[1] += it.labour[1];
    for (const [id] of GROUPS) {
      tot.g[id] += it.matGroups[id];
    }
    const ir = itemRange(it);
    tot.lo += ir[0];
    tot.hi += ir[1];
    if (it.material && !it.noMat) {
      tot.mat = true;
    }
  }
  return tot;
};

interface MailtoInput {
  k: number;
  openArea: number;
  result: CalcResult | null;
  state: CalcState;
  totals: Totals;
  usesOpen: boolean;
}

const itemLine = (it: CalcResult, i: number, k: number): string => {
  const ir = itemRange(it);
  const f = fmtNum;
  return `${i + 1}. ${it.title}${it.desc ? ` (${it.desc})` : ''}, ${fmtM2(it.area)} m², ${f(round100(ir[0] * k))} – ${f(round100(ir[1] * k))} Kč${it.material || it.noMat ? '' : ', bez materiálu'}`;
};

const buildLines = ({ state, result, totals, usesOpen, openArea, k }: MailtoInput): string[] | null => {
  const f = fmtNum;
  const ds = state.vat ? 's DPH' : 'bez DPH';
  const min = PRICING.minOrder;
  const openTxt = openingsText(state.openings);
  if (state.items.length > 0) {
    const tlo = Math.max(totals.lo, min);
    const thi = Math.max(totals.hi, min);
    const lines = ['Dobrý den,', '', 'poptávám:'];
    state.items.forEach((it, i) => {
      lines.push(itemLine(it, i, k));
    });
    if (usesOpen && openTxt) {
      lines.push(`Okna/dveře: ${openTxt}`);
    }
    lines.push(
      `Celkem z kalkulačky: ${f(round100(tlo * k))} – ${f(round100(thi * k))} Kč ${ds}`,
      '',
      'Prosím o přesnou nabídku.'
    );
    return lines;
  }
  if (result) {
    const { lo, hi } = priceRange(result, k);
    const lines = [
      'Dobrý den,',
      '',
      `poptávám: ${result.title}`,
      `Plocha: ${fmtM2(result.area)} m²`,
      openArea > 0 && openTxt ? `Okna/dveře: ${openTxt}` : null,
      `Doplňky: ${result.desc || 'žádné'}`,
      result.noMat ? null : `Materiál: ${state.material ? 'ano' : 'ne'}`,
      `Orientační cena z kalkulačky: ${f(round100(lo))} – ${f(round100(hi))} Kč ${ds}`,
      '',
      'Prosím o přesnou nabídku.',
    ];
    return lines.filter((x): x is string => x !== null);
  }
  return null;
};

export const buildMailto = (input: MailtoInput, email: string): string => {
  const subject = `Poptávka – ${input.state.items.length > 0 ? 'kalkulačka' : getService(input.state).name}`;
  let href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  const lines = buildLines(input);
  if (lines) {
    href += `&body=${encodeURIComponent(lines.join('\n'))}`;
  }
  return href;
};

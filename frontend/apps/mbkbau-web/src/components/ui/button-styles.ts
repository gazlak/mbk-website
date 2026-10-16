/** Společný základ tlačítek (btn-primary / btn-glass z původního webu). */
export const BTN_BASE =
  'inline-block cursor-pointer border-0 font-bold text-[0.875rem] tracking-[-0.01em] no-underline rounded-brand';

export const BTN_PRIMARY = `${BTN_BASE} bg-primary px-6 py-[0.7rem] text-on-primary shadow-[0_8px_40px_rgba(240,79,18,0.18)] transition-[filter,transform] duration-200 hover:brightness-[1.08] active:scale-[0.97]`;

export const BTN_GLASS =
  'inline-block cursor-pointer border border-white/[0.22] bg-white/[0.12] font-bold text-[0.875rem] tracking-[-0.01em] text-white no-underline backdrop-blur-[12px] transition-colors duration-200 hover:bg-white/[0.22]';

export const FOCUS_RING = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

/** Popisek (contact-label). */
export const LABEL = 'mb-1 font-bold text-[0.6875rem] tracking-[0.14em] uppercase text-on-surface-variant';

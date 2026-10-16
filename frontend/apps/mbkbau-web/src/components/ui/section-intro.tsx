import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  children?: ReactNode;
  /** Světlý nadpis na tmavém pozadí. */
  dark?: boolean;
  eyebrow: string;
  title: string;
}

/** Eyebrow + h2 (approach-text z původního webu); `children` jdou pod nadpis. */
export const SectionIntro = ({ eyebrow, title, dark = false, children }: Props) => (
  <div data-reveal-group="">
    <span
      className="mb-4 inline-block font-bold text-[0.75rem] text-primary uppercase tracking-[0.18em]"
      data-reveal-sibling=""
    >
      {eyebrow}
    </span>
    <h2
      className={cn(
        'mb-6 font-black text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.04em]',
        dark ? 'mb-0 text-white' : 'text-on-surface'
      )}
      data-reveal-heading=""
    >
      {title}
    </h2>
    {children}
  </div>
);

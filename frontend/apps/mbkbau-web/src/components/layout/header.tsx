'use client';

import { type ReactNode, useState } from 'react';
import { BTN_PRIMARY } from '@/components/ui/button-styles';
import { CTA_LINK, NAV_LINKS, SITE } from '@/data/site';
import { cn } from '@/lib/utils';

const BAR = 'block h-0.5 rounded-[2px] bg-on-surface transition-[translate,rotate,opacity] duration-250';

export const Header = ({ topBar }: { topBar: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] bg-white/85 backdrop-blur-[16px]">
      {topBar}
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-8 py-[1.1rem]">
        {/* biome-ignore lint/a11y/useValidAnchor: odkaz na začátek stránky jako v originále */}
        <a className="inline-flex shrink-0 items-center no-underline" href="#">
          {/* biome-ignore lint/correctness/useImageSize: statický export bez optimalizace obrázků */}
          <img alt={SITE.name} className="block h-10 w-auto" src="/mbkbau.png" />
        </a>

        <nav aria-label="Hlavní navigace">
          <ul className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  className="font-bold text-[0.875rem] text-on-surface-variant tracking-[-0.01em] no-underline transition-colors duration-200 hover:text-primary"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          aria-expanded={open}
          aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
          className="flex size-8 cursor-pointer flex-col justify-center gap-[5px] p-1 md:hidden"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          <span className={cn(BAR, open && 'translate-y-[7px] rotate-45')} />
          <span className={cn(BAR, open && 'opacity-0')} />
          <span className={cn(BAR, open && '-translate-y-[7px] -rotate-45')} />
        </button>

        <a className={cn(BTN_PRIMARY, 'hidden md:inline-block')} href={CTA_LINK.href}>
          {CTA_LINK.label}
        </a>
      </div>

      <nav
        aria-label="Mobilní navigace"
        className={cn(
          'flex-col items-center gap-4 bg-white/[0.97] px-8 pt-4 pb-6 text-center backdrop-blur-[16px] md:hidden',
          open ? 'flex' : 'hidden'
        )}
      >
        {[...NAV_LINKS, CTA_LINK].map((link) => (
          <a
            className="py-[0.4rem] font-bold text-[1rem] text-on-surface-variant no-underline transition-colors duration-200 hover:text-primary"
            href={link.href}
            key={link.href}
            onClick={close}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

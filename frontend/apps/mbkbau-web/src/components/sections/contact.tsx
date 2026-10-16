import type { ReactNode } from 'react';
import { LABEL } from '@/components/ui/button-styles';
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from '@/components/ui/icons';
import { SITE } from '@/data/site';

const ITEMS: { label: string; icon: ReactNode; value: ReactNode }[] = [
  { label: 'Telefon', icon: <PhoneIcon className="size-5 fill-primary" />, value: SITE.phone },
  { label: 'E-mail', icon: <MailIcon className="size-5 fill-primary" />, value: SITE.email },
  {
    label: 'Adresa',
    icon: <PinIcon className="size-5 fill-primary" />,
    value: (
      <>
        {SITE.addressLines[0]}
        <br />
        {SITE.addressLines[1]}
      </>
    ),
  },
  { label: 'Provozní hodiny', icon: <ClockIcon className="size-5 fill-primary" />, value: SITE.hours },
];

export const Contact = () => (
  <section className="bg-surface-low px-8 py-24" id="kontakt">
    <div className="mx-auto max-w-[1280px]">
      <div
        className="grid grid-cols-[1fr] gap-10 rounded-brand bg-surface p-12 shadow-[0_20px_80px_rgba(28,27,27,0.05)] md:grid-cols-[1fr_2fr] lg:p-16"
        data-reveal-card=""
      >
        <div data-reveal-group="">
          <h3
            className="mb-3 font-black text-[clamp(2rem,4vw,2.75rem)] text-primary tracking-[-0.04em]"
            data-reveal-heading=""
          >
            Spojte se s&nbsp;námi
          </h3>
          <p className="text-[0.9375rem] text-on-surface-variant leading-[1.65]" data-reveal-sibling="">
            Máte dotaz nebo zájem o nezávaznou cenovou nabídku? Ozvěte se nám.
          </p>
        </div>

        <div className="grid grid-cols-[1fr] gap-7 md:grid-cols-[1fr_1fr]" data-contact-items="">
          {ITEMS.map((item) => (
            <div className="flex items-start gap-4" data-contact-item="" key={item.label}>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-brand bg-[rgba(240,79,18,0.1)]">
                {item.icon}
              </div>
              <div>
                <p className={LABEL}>{item.label}</p>
                <p className="font-bold text-[1.0625rem] text-on-surface tracking-[-0.01em]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

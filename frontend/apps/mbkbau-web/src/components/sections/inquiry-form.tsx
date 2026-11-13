'use client';

import { type FormEvent, useId, useState } from 'react';
import { BTN_PRIMARY, FOCUS_RING, LABEL } from '@/components/ui/button-styles';
import { SectionIntro } from '@/components/ui/section-intro';
import { SERVICES } from '@/data/services';
import { SITE } from '@/data/site';
import { cn } from '@/lib/utils';

const FIELD = cn(
  'w-full rounded-brand border-2 border-transparent bg-surface-low px-[0.9rem] py-[0.7rem] text-[1rem] text-on-surface',
  FOCUS_RING
);
const OTHER = 'Jiné';
const SUBMIT_URL = 'https://api.web3forms.com/submit';

type Status = 'idle' | 'sending' | 'sent' | 'failed';

const text = (data: FormData, key: string) => String(data.get(key) ?? '').trim();

const mailtoHref = (data: FormData) => {
  const service = text(data, 'service');
  const lines = [
    `Jméno: ${text(data, 'name')}`,
    `Telefon: ${text(data, 'phone') || '–'}`,
    `E-mail: ${text(data, 'email')}`,
    `Služba: ${service}`,
    `Místo stavby: ${text(data, 'place') || '–'}`,
    '',
    text(data, 'message'),
  ];
  return `mailto:${SITE.email}?subject=${encodeURIComponent(`Poptávka – ${service}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
};

const send = async (data: FormData): Promise<boolean> => {
  const response = await fetch(SUBMIT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: SITE.web3formsKey,
      subject: `Poptávka z webu – ${text(data, 'service')}`,
      from_name: 'Web MBK BAU',
      botcheck: data.get('botcheck') === 'on',
      name: text(data, 'name'),
      email: text(data, 'email'),
      telefon: text(data, 'phone') || 'neuvedeno',
      sluzba: text(data, 'service'),
      misto: text(data, 'place') || 'neuvedeno',
      message: text(data, 'message'),
    }),
  });
  const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
  return response.ok && result?.success === true;
};

/**
 * Poptávka nad mapou. Web je statický, poptávku odešle Web3Forms (jako na klimcom.cz) na e-mail, ke kterému
 * je vydaný klíč. Bez klíče nebo při chybě se otevře e-mail s vyplněnou poptávkou.
 */
export const InquiryForm = () => {
  const id = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [fallback, setFallback] = useState('');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!SITE.web3formsKey) {
      window.location.href = mailtoHref(data);
      return;
    }
    setStatus('sending');
    const ok = await send(data).catch(() => false);
    if (ok) {
      form.reset();
      setStatus('sent');
    } else {
      setFallback(mailtoHref(data));
      setStatus('failed');
    }
  };

  return (
    <section className="bg-surface-low px-5 pb-24 md:px-8" id="poptavka">
      <div className="mx-auto grid max-w-[1280px] gap-10 rounded-brand bg-surface p-8 md:grid-cols-[1fr_2fr] md:p-12 lg:p-16">
        <SectionIntro eyebrow="Poptávka" title="Napište nám, co chystáte">
          <p className="text-[0.9375rem] text-on-surface-variant leading-[1.65]">
            Vyplňte pár údajů a ozveme se s termínem prohlídky a cenovou nabídkou. Nezávazně.
          </p>
        </SectionIntro>

        <form className="grid gap-5 md:grid-cols-2" onSubmit={submit}>
          <div>
            <label className={cn(LABEL, 'mb-2 block')} htmlFor={`${id}-name`}>
              Jméno a příjmení
            </label>
            <input autoComplete="name" className={FIELD} id={`${id}-name`} name="name" required type="text" />
          </div>
          <div>
            <label className={cn(LABEL, 'mb-2 block')} htmlFor={`${id}-phone`}>
              Telefon
            </label>
            <input autoComplete="tel" className={FIELD} id={`${id}-phone`} name="phone" type="tel" />
          </div>
          <div>
            <label className={cn(LABEL, 'mb-2 block')} htmlFor={`${id}-email`}>
              E-mail
            </label>
            <input autoComplete="email" className={FIELD} id={`${id}-email`} name="email" required type="email" />
          </div>
          <div>
            <label className={cn(LABEL, 'mb-2 block')} htmlFor={`${id}-service`}>
              O co máte zájem
            </label>
            <select className={FIELD} defaultValue={SERVICES[0]?.name ?? OTHER} id={`${id}-service`} name="service">
              {SERVICES.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
              <option value={OTHER}>{OTHER}</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={cn(LABEL, 'mb-2 block')} htmlFor={`${id}-place`}>
              Místo stavby
            </label>
            <input className={FIELD} id={`${id}-place`} name="place" placeholder="Obec nebo adresa" type="text" />
          </div>
          <div className="md:col-span-2">
            <label className={cn(LABEL, 'mb-2 block')} htmlFor={`${id}-message`}>
              Popis zakázky
            </label>
            <textarea
              className={cn(FIELD, 'min-h-[140px] resize-y')}
              id={`${id}-message`}
              name="message"
              placeholder="Co je potřeba udělat, přibližný rozsah, kdy byste chtěli začít…"
              required
            />
          </div>
          {/* Past na roboty (Web3Forms botcheck): člověk pole nevidí, vyplněné odmítne služba. */}
          <input aria-hidden="true" className="hidden" name="botcheck" tabIndex={-1} type="checkbox" />
          <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
            <p className="m-0 text-[0.8125rem] text-on-surface-variant leading-[1.5]">
              {SITE.web3formsKey
                ? 'Poptávku dostaneme e-mailem a ozveme se vám.'
                : 'Otevře se vám e-mail s vyplněnou poptávkou, stačí ho odeslat.'}{' '}
              <a className="underline" href="/ochrana-osobnich-udaju/">
                Jak nakládáme s údaji
              </a>
            </p>
            <button
              className={cn(BTN_PRIMARY, FOCUS_RING, 'shrink-0 disabled:opacity-60')}
              disabled={status === 'sending'}
              type="submit"
            >
              {status === 'sending' ? 'Odesílám…' : 'Odeslat poptávku'}
            </button>
          </div>
          <div aria-live="polite" className="md:col-span-2">
            {status === 'sent' && (
              <p className="m-0 rounded-brand bg-[rgba(240,79,18,0.1)] px-4 py-3 font-bold text-on-surface">
                Děkujeme, poptávka je odeslaná. Ozveme se vám.
              </p>
            )}
            {status === 'failed' && (
              <p className="m-0 rounded-brand bg-surface-low px-4 py-3 text-on-surface">
                Poptávku se nepodařilo odeslat.{' '}
                <a className="font-bold underline" href={fallback}>
                  Pošlete ji e-mailem
                </a>{' '}
                nebo nám napište na {SITE.email}.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

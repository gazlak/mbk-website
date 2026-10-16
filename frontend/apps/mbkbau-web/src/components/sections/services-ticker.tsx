import { SERVICES_TICKER } from '@/data/services';

export const ServicesTicker = () => (
  <section aria-label="Naše služby" className="overflow-hidden bg-surface-low px-8 py-16" id="sluzby">
    <div aria-live="polite" className="relative flex h-14 items-center justify-center">
      {SERVICES_TICKER.map((name, i) => (
        <span
          className="absolute inset-0 flex animate-rotate-services items-center justify-center px-4 text-center font-black text-[clamp(1.2rem,3.5vw,2rem)] text-on-surface uppercase leading-[1.1] tracking-[-0.03em] opacity-0"
          key={name}
          style={{ animationDelay: `${i * 3}s` }}
        >
          {name}
        </span>
      ))}
    </div>
  </section>
);

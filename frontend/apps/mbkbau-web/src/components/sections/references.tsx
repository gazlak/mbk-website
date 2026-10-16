import { SectionIntro } from '@/components/ui/section-intro';
import { REFERENCES, REFERENCES_CTA } from '@/data/references';
import { Testimonials } from './testimonials';

export const References = () => (
  <section className="overflow-hidden bg-on-surface py-24" id="reference">
    <div className="mx-auto max-w-[1280px] px-8">
      <div className="mb-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <SectionIntro dark eyebrow="Reference" title="Projekty, za kterými si stojíme." />
      </div>

      <div
        className="mx-[calc(50%-50vw)] flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        data-refs-grid=""
      >
        {REFERENCES.map((r) => (
          <article
            className="group/card relative aspect-[4/5] flex-[0_0_80%] snap-start overflow-hidden rounded-brand bg-[#2a2929] md:max-h-[600px] md:flex-[0_0_min(34vw,640px)]"
            data-ref-card=""
            key={r.title}
          >
            {/* biome-ignore lint/correctness/useImageSize: statický export bez optimalizace obrázků */}
            <img
              alt={r.alt}
              className="absolute inset-0 size-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.06]"
              loading="lazy"
              src={r.image}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[image:linear-gradient(to_top,rgba(28,27,27,0.92)_0%,rgba(28,27,27,0.35)_45%,rgba(28,27,27,0)_70%)] transition-opacity duration-[400ms] group-hover/card:bg-[image:linear-gradient(to_top,rgba(28,27,27,0.97)_0%,rgba(28,27,27,0.5)_55%,rgba(28,27,27,0.1)_80%)]"
            />
            <div className="absolute inset-x-0 bottom-0 z-[1] p-6 pl-7 before:absolute before:bottom-6 before:left-0 before:h-0 before:w-1 before:bg-primary before:transition-[height] before:duration-[400ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:content-[''] group-hover/card:before:h-[calc(100%-3rem)]">
              <span className="mb-2 block font-bold text-[0.7rem] text-primary uppercase tracking-[0.14em]">
                {r.category}
              </span>
              <h3 className="mb-[0.35rem] font-bold text-[1.35rem] text-white leading-[1.25]">{r.title}</h3>
              <p className="text-[0.875rem] text-white/60">{r.place}</p>
              <p className="mt-3 text-[0.9rem] text-white/75 leading-normal">{r.desc}</p>
            </div>
          </article>
        ))}
        <article
          className="relative flex aspect-[4/5] flex-[0_0_80%] snap-start flex-col items-start justify-center gap-4 overflow-hidden rounded-brand bg-primary p-8 text-white md:max-h-[600px] md:flex-[0_0_min(34vw,640px)]"
          data-ref-card=""
        >
          <h3 className="font-black text-[1.75rem] leading-[1.1] tracking-[-0.02em]">{REFERENCES_CTA.title}</h3>
          <p className="text-[1rem] leading-normal opacity-90">{REFERENCES_CTA.text}</p>
          <a
            className="inline-block rounded-brand bg-white px-6 py-[0.85rem] font-bold text-on-surface no-underline"
            href={REFERENCES_CTA.href}
          >
            {REFERENCES_CTA.label}
          </a>
        </article>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 text-[0.8rem] text-white/55 uppercase tracking-[0.08em]">
        <span>Posuňte pro další reference</span>
      </div>

      <Testimonials />
    </div>
  </section>
);

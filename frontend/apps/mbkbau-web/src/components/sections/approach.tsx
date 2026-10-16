import { PhotoComposition } from '@/components/ui/photo-composition';
import { SectionIntro } from '@/components/ui/section-intro';

export const Approach = () => (
  <section className="bg-surface-low px-8 py-24" id="pristup">
    <div className="mx-auto grid max-w-[1280px] grid-cols-[1fr] items-center gap-16 md:grid-cols-[1fr_1fr]">
      <SectionIntro eyebrow="Náš přístup" title="Kvalita v každém detailu, preciznost v každém spoji.">
        <p
          className="max-w-[48ch] font-normal text-[1.0625rem] text-on-surface-variant leading-[1.75]"
          data-reveal-sibling=""
        >
          Věříme, že úspěšná stavba začíná u vzájemné důvěry. Naše procesy jsou transparentní, termíny závazné a
          materiály certifikované. Specializujeme se na rezidenční i komerční výstavbu. Důraz klademe na udržitelnost a
          moderní technologické postupy, které zaručují dlouhou životnost vašich investic.
        </p>
      </SectionIntro>

      <PhotoComposition
        insetAlt="Detail řemeslné práce"
        insetSrc="/images/about-inset.jpg"
        mainAlt="Stavba budovy"
        mainSrc="/images/about-main.jpg"
      />
    </div>
  </section>
);

import { PhotoComposition } from '@/components/ui/photo-composition';
import { SectionIntro } from '@/components/ui/section-intro';

export const Approach = () => (
  <section className="bg-surface-low px-8 py-24" id="pristup">
    <div className="mx-auto grid max-w-[1280px] grid-cols-[1fr] items-center gap-16 md:grid-cols-[1fr_1fr]">
      <SectionIntro eyebrow="Náš přístup" title="Řekneme cenu i termín. A platí to.">
        <p
          className="max-w-[48ch] font-normal text-[1.0625rem] text-on-surface-variant leading-[1.75]"
          data-reveal-sibling=""
        >
          Na stavbě je nejhorší čekat na řemeslníky a dohadovat se o vícepráce. Proto u nás dostanete rozpočet po
          položkách a termín, který držíme. Co neděláme sami, třeba střechu, zajistíme přes řemeslníky, se kterými
          dlouhodobě spolupracujeme. Domlouváte se jen s námi. Pracujeme na Znojemsku a Brněnsku pro domácnosti i firmy.
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

export interface HeroSlide {
  /** Barvy slidu; první slide používá výchozí (primární) barvy hera. */
  accent?: { accent: string; on: string; glow: string };
  cta: { label: string; href: string; external: boolean };
  eyebrow: string;
  image: { src: string; alt: string };
  label: string;
  subtitle: readonly string[];
  title: readonly [string, string];
}

export const ELEKTRO_ACCENT = { accent: '#F6C21B', on: '#2a2100', glow: 'rgba(246,194,27,0.3)' } as const;
export const VODA_TOPENI_ACCENT = { accent: '#2EC4B6', on: '#032a26', glow: 'rgba(46,196,182,0.3)' } as const;

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    label: 'Stavby',
    eyebrow: 'MBK BAU · Stavební firma · Znojmo',
    title: ['STAVBY A', 'REKONSTRUKCE'],
    subtitle: ['Precizní řemeslo a spolehlivost pro každý projekt.', 'Od základů po poslední detail.'],
    cta: { label: 'Kontaktujte nás', href: '#kontakt', external: false },
    image: { src: '/images/hero.jpg', alt: 'Stavební projekt v pohybu' },
  },
  {
    label: 'Klimatizace',
    eyebrow: 'Klimatizace',
    title: ['PŘÍJEMNÉ', 'KLIMA'],
    subtitle: ['Montáž a servis klimatizací a tepelných čerpadel pro domácnosti i firmy.'],
    cta: { label: 'Přejít na web →', href: 'https://klimcom.cz/', external: true },
    image: { src: '/images/hero-klimatizace.jpg', alt: 'Venkovní jednotka klimatizace' },
    accent: { accent: '#4DB8F0', on: '#06202e', glow: 'rgba(77,184,240,0.3)' },
  },
  {
    label: 'Elektromontáže',
    eyebrow: 'Elektromontáže',
    title: ['BEZPEČNÁ', 'ENERGIE'],
    subtitle: ['Elektroinstalace, rozvaděče a revize – od rodinných domů po komerční objekty.'],
    cta: { label: 'Zjistit více →', href: '/elektro/', external: false },
    image: { src: '/images/hero-elektro.jpg', alt: 'Elektrikář při práci na rozvaděči' },
    accent: ELEKTRO_ACCENT,
  },
  {
    label: 'Voda a topení',
    eyebrow: 'Voda a topení',
    title: ['VODA, TOPENÍ,', 'PLYN'],
    subtitle: ['Rozvody vody a plynu, kotle a podlahové topení navržené na desítky let.'],
    cta: { label: 'Zjistit více →', href: '/voda-topeni/', external: false },
    image: { src: '/images/hero-voda-topeni.jpg', alt: 'Instalatér při montáži vodoinstalace' },
    accent: VODA_TOPENI_ACCENT,
  },
];

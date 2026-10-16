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

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    label: 'Stavební práce',
    eyebrow: 'MBK BAU · Stavební práce · Znojmo',
    title: ['STAVÍME', 'BUDOUCNOST'],
    subtitle: ['Precizní řemeslo a spolehlivost pro každý projekt.', 'Od základů po poslední detail.'],
    cta: { label: 'Kontaktujte nás', href: '#kontakt', external: false },
    image: { src: '/images/hero.jpg', alt: 'Stavební projekt v pohybu' },
  },
  {
    label: 'Klimatizace',
    eyebrow: 'Klimatizace',
    title: ['PŘÍJEMNÉ', 'KLIMA'],
    subtitle: ['Montáž a servis klimatizací a tepelných čerpadel pro domácnosti i firmy.'],
    // TODO: doplnit URL
    cta: { label: 'Přejít na web →', href: '#', external: true },
    image: { src: '/images/hero-klimatizace.jpg', alt: 'Venkovní jednotka klimatizace' },
    accent: { accent: '#4DB8F0', on: '#06202e', glow: 'rgba(77,184,240,0.3)' },
  },
  {
    label: 'Elektromontáže',
    eyebrow: 'Elektromontáže',
    title: ['BEZPEČNÁ', 'ENERGIE'],
    subtitle: ['Elektroinstalace, rozvaděče a revize – od rodinných domů po komerční objekty.'],
    // TODO: doplnit URL
    cta: { label: 'Přejít na web →', href: '#', external: true },
    image: { src: '/images/hero-elektro.jpg', alt: 'Elektrikář při práci na rozvaděči' },
    accent: { accent: '#F6C21B', on: '#2a2100', glow: 'rgba(246,194,27,0.3)' },
  },
  {
    label: 'Voda a topení',
    eyebrow: 'Voda a topení',
    title: ['TEPLO', 'DOMOVA'],
    subtitle: ['Rozvody vody, kotle a podlahové topení navržené na desítky let.'],
    // TODO: doplnit URL
    cta: { label: 'Přejít na web →', href: '#', external: true },
    image: { src: '/images/hero-voda-topeni.jpg', alt: 'Instalatér při montáži vodoinstalace' },
    accent: { accent: '#2EC4B6', on: '#032a26', glow: 'rgba(46,196,182,0.3)' },
  },
];

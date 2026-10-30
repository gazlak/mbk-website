import { ELEKTRO_ACCENT, VODA_TOPENI_ACCENT } from '@/data/hero';

export interface Subpage {
  accent: { accent: string; on: string; glow: string };
  eyebrow: string;
  image: { src: string; alt: string };
  intro: string;
  items: readonly { title: string; text: string }[];
  title: readonly [string, string];
}

export const ELEKTRO_PAGE: Subpage = {
  eyebrow: 'Elektromontáže',
  title: ['BEZPEČNÁ', 'ENERGIE'],
  intro: 'Elektroinstalace, rozvaděče a revize – od rodinných domů po komerční objekty.',
  image: { src: '/images/hero-elektro.jpg', alt: 'Elektrikář při práci na rozvaděči' },
  accent: ELEKTRO_ACCENT,
  items: [
    { title: 'Elektroinstalace', text: 'Kompletní rozvody v novostavbách i rekonstrukcích.' },
    { title: 'Rozvaděče', text: 'Návrh, osazení a zapojení rozvaděčů na míru.' },
    { title: 'Revize', text: 'Pravidelné revize a odstraňování závad.' },
  ],
};

export const VODA_TOPENI_PAGE: Subpage = {
  eyebrow: 'Voda a topení',
  title: ['TEPLO', 'DOMOVA'],
  intro: 'Rozvody vody, kotle a podlahové topení navržené na desítky let.',
  image: { src: '/images/hero-voda-topeni.jpg', alt: 'Instalatér při montáži vodoinstalace' },
  accent: VODA_TOPENI_ACCENT,
  items: [
    { title: 'Rozvody vody a kanalizace', text: 'Nové rozvody i výměny starých za moderní materiály.' },
    { title: 'Kotle a radiátory', text: 'Montáž a servis kotlů a otopných těles.' },
    { title: 'Podlahové topení', text: 'Komfortní teplo rovnoměrně v celé místnosti.' },
  ],
};

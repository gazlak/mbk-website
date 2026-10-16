// MOCK: nahradit reálnými zakázkami
export interface Reference {
  alt: string;
  category: string;
  desc: string;
  image: string;
  place: string;
  title: string;
}

export const REFERENCES: readonly Reference[] = [
  {
    image: '/images/about-main.jpg',
    alt: 'Rekonstrukce rodinného domu',
    category: 'Rekonstrukce',
    title: 'Rekonstrukce rodinného domu',
    place: 'Znojmo · 2025',
    desc: 'Kompletní rekonstrukce od hrubé stavby po finální povrchy.',
  },
  {
    image: '/images/services-inset.jpg',
    alt: 'Fasáda bytového domu',
    category: 'Fasády a zateplení',
    title: 'Zateplení bytového domu',
    place: 'Moravský Krumlov · 2024',
    desc: 'Zateplení bytového domu s novou omítkou a sjednocenou fasádou.',
  },
  {
    image: '/images/about-inset.jpg',
    alt: 'Sádrokartonové příčky',
    category: 'Sádrokartony',
    title: 'Podkroví s novými příčkami',
    place: 'Hrušovany nad Jevišovkou · 2025',
    desc: 'Podkroví s novými příčkami, podhledy a připraveným rozvodem.',
  },
  {
    image: '/images/about-malovani.jpg',
    alt: 'Malování kancelářských prostor',
    category: 'Malířské práce',
    title: 'Kancelářské prostory',
    place: 'Znojmo · 2024',
    desc: 'Malba kancelářských prostor v provozu s minimálním omezením.',
  },
];

export const REFERENCES_CTA = {
  title: 'Budete další?',
  text: 'Nezávazně se u vás zastavíme, projdeme zakázku a připravíme cenovou nabídku.',
  label: 'Mám zájem →',
  href: '#kontakt',
} as const;

export interface Testimonial {
  author: string;
  text: string;
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    text: 'Práce byly hotové v termínu, na stavbě byl vždy pořádek a výsledek předčil naše očekávání. Určitě doporučuji.',
    author: '— Jan N., rekonstrukce RD, Znojmo',
  },
  {
    text: 'Sádrokartonové podhledy a nové rozvody zvládli rychle a čistě. Komunikace byla od začátku jasná, žádné nepříjemné překvapení v ceně.',
    author: '— Petra K., přestavba bytu, Znojmo',
  },
  {
    text: 'Zateplení fasády dokončili před zimou a dům je znatelně teplejší. Parta jednala ohleduplně i k sousedům.',
    author: '— Martin V., zateplení fasády, Moravský Krumlov',
  },
  {
    text: 'Od bourání příček po finální malování jsme měli jednoho člověka, na kterého jsme se mohli obrátit. Přesně tak má rekonstrukce vypadat.',
    author: '— Lucie a Tomáš H., rekonstrukce bytu, Jihlava',
  },
  {
    text: 'Potěry a omítky v novostavbě udělali precizně a v dohodnutém termínu. S radostí je doporučím dál.',
    author: '— Josef M., novostavba RD, Hrušovany nad Jevišovkou',
  },
];

export const SITE = {
  name: 'MBK BAU',
  phone: '+420 XXX XXX XXX',
  email: 'info@mbkbau.cz',
  /** Veřejný klíč Web3Forms pro poptávkový formulář (poptávky chodí na e-mail, ke kterému je vydaný). Prázdný = formulář otevře e-mail. */
  web3formsKey: '',
  addressShort: 'Nám. Kpt. Otmara Chlupa 822/1, Znojmo',
  addressLines: ['Nám. Kpt. Otmara Chlupa 822/1', 'Znojmo 669 02'],
  city: 'Znojmo 669 02',
  hours: 'Po – Pá: 07:00 – 16:00',
  copyright: '© 2026 MBK BAU. Všechna práva vyhrazena.',
  map: { lat: 48.8554, lon: 16.0592, zoom: 17 },
} as const;

// Dočasně vypnuté sekce – kód zůstává, přepnutím na true se vrátí
export const FEATURES = { calculator: false, references: false, companyId: false } as const;

type Feature = keyof typeof FEATURES;
interface NavLink {
  external?: boolean;
  feature?: Feature;
  href: string;
  label: string;
}

const isEnabled = (link: NavLink) => !link.feature || FEATURES[link.feature];

const ALL_NAV_LINKS: NavLink[] = [
  { href: '/#co-delame', label: 'Naše služby' },
  { href: '/#pristup', label: 'O nás' },
  { href: 'https://klimcom.cz/', label: 'Klimatizace', external: true },
  { href: '/elektro/', label: 'Elektromontáže' },
  { href: '/voda-topeni/', label: 'Voda a topení' },
  { href: '/#reference', label: 'Reference', feature: 'references' },
  { href: '/#kalkulacka', label: 'Kalkulačka', feature: 'calculator' },
];

export const NAV_LINKS = ALL_NAV_LINKS.filter(isEnabled);

export const CTA_LINK: NavLink = { href: '#kontakt', label: 'Kontaktujte nás' };

const ALL_FOOTER_LINKS: NavLink[] = [
  { href: '/#co-delame', label: 'Služby' },
  { href: '/#pristup', label: 'Náš přístup' },
  { href: '/#reference', label: 'Reference', feature: 'references' },
  { href: '/#kalkulacka', label: 'Kalkulačka', feature: 'calculator' },
  { href: '/#kontakt', label: 'Kontakt' },
  { href: '/ochrana-osobnich-udaju/', label: 'Ochrana údajů' },
];

export const FOOTER_LINKS = ALL_FOOTER_LINKS.filter(isEnabled);

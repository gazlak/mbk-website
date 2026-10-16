export const SITE = {
  name: 'MBK BAU',
  phone: '+420 XXX XXX XXX',
  email: 'info@mbkbau.cz',
  addressShort: 'Nám. Kpt. Otmara Chlupa 822/1, Znojmo',
  addressLines: ['Nám. Kpt. Otmara Chlupa 822/1', 'Znojmo 669 02'],
  city: 'Znojmo 669 02',
  hours: 'Po – Pá: 07:00 – 16:00',
  copyright: '© 2026 MBK BAU. Všechna práva vyhrazena.',
  map: { lat: 48.8559, lon: 16.0493, zoom: 16 },
} as const;

export const NAV_LINKS = [
  { href: '#co-delame', label: 'Služby' },
  { href: '#pristup', label: 'Náš přístup' },
  { href: '#reference', label: 'Reference' },
  { href: '#kalkulacka', label: 'Kalkulačka' },
] as const;

export const CTA_LINK = { href: '#kontakt', label: 'Kontaktujte nás' } as const;

export const FOOTER_LINKS = [
  { href: '#co-delame', label: 'Služby' },
  { href: '#pristup', label: 'Náš přístup' },
  { href: '#kalkulacka', label: 'Kalkulačka' },
  { href: '#kontakt', label: 'Kontakt' },
  { href: '#', label: 'Ochrana údajů' },
] as const;

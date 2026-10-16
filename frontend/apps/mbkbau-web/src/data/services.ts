export interface Service {
  alt: string;
  desc: string;
  inset: string;
  main: string;
  name: string;
}

const img = (slug: string, kind: 'main' | 'inset') => `/images/sluzby/${slug}-${kind}.jpg`;

const service = (slug: string, name: string, alt: string, desc: string): Service => ({
  name,
  desc,
  alt,
  main: img(slug, 'main'),
  inset: img(slug, 'inset'),
});

/** Služby rotující v pruhu pod herem. */
export const SERVICES_TICKER = [
  'Rekonstrukce',
  'Stavební práce',
  'Elektromontáže',
  'Voda a topení',
  'Klimatizace',
  'Sádrokartony',
  'Obkladačství',
  'Fasády a zateplení',
  'Malířské a natěračské práce',
  'Bourací práce',
] as const;

export const SERVICES: readonly Service[] = [
  service(
    'rekonstrukce',
    'Rekonstrukce',
    'Rekonstrukce interiéru',
    'Kompletní rekonstrukce bytů, domů i komerčních prostor – od projektu přes bourání a instalace až po finální povrchy. Celou zakázku koordinujeme sami, vy máte jednoho partnera.'
  ),
  service(
    'stavebni-prace',
    'Stavební práce',
    'Zedník při stavebních pracích',
    'Zdění, betonáže, příčky i hrubé stavby od základů po střechu. Pracujeme podle projektu, v dohodnutých termínech a s pravidelnou kontrolou kvality.'
  ),
  service(
    'elektro',
    'Elektromontáže',
    'Elektrikář při montáži rozvodů',
    'Nové rozvody, výměna rozvaděčů, osvětlení i zásuvky, včetně výchozí revize. Vše provádí kvalifikovaní elektrikáři podle platných norem.'
  ),
  service(
    'voda-topeni',
    'Voda a topení',
    'Instalatér při montáži rozvodů',
    'Rozvody vody a kanalizace, instalace kotlů, radiátorů i podlahového topení. Navrhneme řešení, které je úsporné a spolehlivé na dlouhé roky.'
  ),
  service(
    'klimatizace',
    'Klimatizace',
    'Montáž klimatizační jednotky',
    'Montáž a servis split i multisplit klimatizací pro domácnosti a firmy. Poradíme s výběrem jednotky a postaráme se o instalaci na klíč.'
  ),
  service(
    'sadrokartony',
    'Sádrokartony',
    'Sádrokartonové desky a nářadí',
    'Podhledy, příčky a předsazené stěny včetně tmelení a přípravy na malování. Rychlá a čistá práce s hladkým výsledkem.'
  ),
  service(
    'obklady',
    'Obkladačství',
    'Obkladač při pokládce dlažby',
    'Pokládka obkladů a dlažeb v koupelnách, kuchyních i na terasách. Důraz klademe na přesné spáry, hydroizolaci a čistý detail.'
  ),
  service(
    'fasady',
    'Fasády a zateplení',
    'Zateplování fasády rodinného domu',
    'Kontaktní zateplovací systémy a nové fasádní omítky, které snižují náklady na energie. Zajistíme lešení, zateplení i finální povrch.'
  ),
  service(
    'malovani',
    'Malířské a natěračské práce',
    'Malíř při natírání stěny',
    'Malování interiérů, nátěry fasád, oken i konstrukcí. Pracujeme čistě, s kvalitními barvami a s krytím okolního zařízení.'
  ),
  service(
    'bouraci',
    'Bourací práce',
    'Bourací práce na stavbě',
    'Bourání příček, vybourání otvorů i demolice celých objektů. Včetně odvozu a likvidace suti v souladu s předpisy.'
  ),
];

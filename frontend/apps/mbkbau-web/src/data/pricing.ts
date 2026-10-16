// Ceny v Kč bez DPH – upravte podle firemního ceníku.
// Materiál: Hornbach CZ, výtisk 16. 10. 2026, ceny s DPH ÷ 1,21.
// Práce: daibau.cz (pokládka obkladů akt. 8/2025, malování 8/2025, demolice 2026),
//        kolikmaterialu.cz (zateplení, vnitřní omítka, bourací práce, řemesla; 5/2026),
//        mobetony.cz (potěry 2026), megastroj.cz (ceník řemesel a kontejner 2026),
//        SDK: nejremeslnici.cz (1/2026), sdk-urban.cz ceník 2026.
// Spotřeby na m² jsou orientační podle technických listů výrobců (Knauf, Weber, Baumit, Primalex, Mapei).
// Položky označené „odhad – ověřit“ jsem v ceníku nenašel.
// area: walls | ceiling | floor | both (stěny+strop) | manual (zadává se m²)
// mat: { g: skupina, n: název, q: spotřeba na m², u: jednotka, p: cena bez DPH,
//        l: násobit vrstvami (nátěry, cm potěru) a stranami, s: násobit stranami }
// volba: { labour, mat, layers, board, waste (m³ suti na m²), d }; option: when [id, index] = zobrazit jen u dané volby, def = výchozí index
// doplněk: [název, Kč/m² (u 'w' Kč/m³ suti), mat, 'w']

export type GroupId =
  | 'desky'
  | 'prof'
  | 'dlaz'
  | 'spoj'
  | 'lep'
  | 'spar'
  | 'hydro'
  | 'izol'
  | 'kotvy'
  | 'omit'
  | 'poter'
  | 'barva'
  | 'ost';

export type Range = [number, number];

export interface Material {
  g: GroupId;
  l?: true;
  n: string;
  p: number;
  q: number;
  s?: true;
  u: string;
}

export interface Choice {
  board?: number;
  d: string;
  labour?: Range;
  layers?: number;
  mat?: Material[];
  n: string;
  waste?: number;
}

export interface Option {
  choices: Choice[];
  def?: number;
  id: string;
  label: string;
  when?: [string, number];
}

export type Extra = [name: string, labour: number | Range, mat?: Material[] | null, kind?: 'w'];

export type AreaKind = 'walls' | 'ceiling' | 'floor' | 'both' | 'manual';

export interface WorkType {
  area: AreaKind;
  extras: Extra[];
  labour: Range;
  mat: Material[];
  matNote?: string;
  name: string;
  opts?: Option[];
  sides?: number;
  waste?: number;
}

export interface ServiceDef {
  id: string;
  matNote: string;
  name: string;
  noMat?: boolean;
  types: WorkType[];
}

export type OpeningKind = 'window' | 'door';

const M = (g: GroupId, n: string, q: number, u: string, p: number, f?: 'l' | 's'): Material => {
  const o: Material = { g, n, q, u, p };
  if (f) {
    o[f] = true;
  }
  return o;
};

const MARKUP = 1.15; // doprava, ztratné, manipulace u SDK
export const BOARD_WASTE = 1.05;

// společný spojovací a tmelicí materiál SDK
const SDK_COMMON: Material[] = [
  M('spoj', 'Šroub TN 25', 17, 'ks', 0.31, 'l'), // Hornbach
  M('spoj', 'Hmoždinka / kotva', 2, 'ks', 3), // odhad – ověřit
  M('spoj', 'Spárovací páska', 1.5, 'm', 2, 's'), // odhad – ověřit
  M('spoj', 'Tmel Uniflott (Q2)', 0.35, 'kg', 36, 's'), // Hornbach
];
const CD_UD: Material[] = [M('prof', 'CD 60/27', 2.0, 'm', 23), M('prof', 'UD 28/27', 0.8, 'm', 15)];

const ST = (n: string, d?: string, extra?: Partial<Choice>): Choice => ({ n, d: d === undefined ? n : d, ...extra });

const sdkOpts = (construction: Choice[]): Option[] => [
  { id: 'con', label: 'Konstrukce', choices: construction },
  {
    id: 'board',
    label: 'Deska',
    choices: [
      ST('Standardní GKB 12,5 mm', 'GKB', { board: 81 }),
      ST('Impregnovaná GKBI (koupelny)', 'GKBI', { board: 127, labour: [20, 30] }),
      ST('Protipožární GKF', 'GKF', { board: 96 }),
    ],
  },
  {
    id: 'layers',
    label: 'Opláštění',
    choices: [
      ST('Jednoduché (1 vrstva)', '1 vrstva', { layers: 1 }),
      ST('Dvojité (2 vrstvy)', '2 vrstvy', { layers: 2, labour: [150, 250] }),
    ],
  },
  {
    id: 'izol',
    label: 'Izolace',
    choices: [
      ST('Bez izolace', ''),
      ST('Minerální vata 50 mm', 'vata 50 mm', {
        labour: [40, 70],
        mat: [M('izol', 'Minerální vata 50 mm', 1, 'm²', 70)], // odhad – ověřit
      }),
      ST('Minerální vata 100 mm', 'vata 100 mm', {
        labour: [40, 70],
        mat: [M('izol', 'Minerální vata 100 mm', 1, 'm²', 120)], // odhad – ověřit
      }),
    ],
  },
  {
    id: 'tmel',
    label: 'Tmelení',
    choices: [
      ST('Q2 (v ceně)', 'Q2'),
      // práce: daibau „stěrkování“; spotřeba odhad – ověřit
      ST('Q3 (celoplošná stěrka)', 'Q3', { labour: [40, 90], mat: [M('spoj', 'Stěrka Q3', 0.5, 'kg', 36, 's')] }),
      ST('Q4', 'Q4', { labour: [90, 160], mat: [M('spoj', 'Stěrka Q4', 1.0, 'kg', 36, 's')] }), // odhad – ověřit
    ],
  },
];

// ── Obkladačství ──
const MGRUNT = (q: number): Material => M('hydro', 'Penetrace Mapei M-Grunt', q, 'l', 62); // Hornbach
const LEP_STD: Material[] = [M('lep', 'Lepidlo C2T AKKIT 420', 4, 'kg', 8.2)]; // Hornbach

const obkOpts = (): Option[] => [
  {
    id: 'fmt',
    label: 'Formát',
    choices: [
      ST('Do 30×60 cm', 'do 30×60', { labour: [400, 900], mat: LEP_STD }), // práce: daibau
      ST('60×60 až 80×80 cm', '60×60 až 80×80', { labour: [700, 1150], mat: LEP_STD }),
      ST('Velkoformát (nad 100×100 cm)', 'velkoformát', {
        labour: [1300, 2000],
        mat: [M('lep', 'Lepidlo Knauf Flexkleber C2TE S1', 6, 'kg', 11.4)],
      }),
    ],
  },
  {
    id: 'dlaz',
    label: 'Dlaždice',
    choices: [
      ST('Dodá zákazník', ''),
      ST('Běžné (cca 400 Kč/m²)', 'dlaždice běžné', { mat: [M('dlaz', 'Dlaždice – běžné', 1.1, 'm²', 400)] }), // odhad – ověřit
      ST('Střední třída (cca 800 Kč/m²)', 'dlaždice střední třída', {
        mat: [M('dlaz', 'Dlaždice – střední třída', 1.1, 'm²', 800)], // odhad – ověřit
      }),
    ],
  },
  {
    id: 'lay',
    label: 'Pokládka',
    choices: [
      ST('Rovně', ''),
      ST('Diagonálně', 'diagonální pokládka', { labour: [150, 250] }), // odhad – ověřit
    ],
  },
];

const obkExtras = (hydroLabour: Range, oldName: string): Extra[] => [
  ['Penetrace', [45, 145], [MGRUNT(0.15)]], // daibau
  [
    'Hydroizolační stěrka',
    hydroLabour,
    [M('hydro', 'Hydroizolační stěrka Soudal 1K', 2, 'kg', 60), M('hydro', 'Těsnicí páska', 0.5, 'm', 25)], // materiál odhad – ověřit
  ],
  [oldName, [162, 666]], // daibau
];

// ── Malování ──
const malOpts = (): Option[] => [
  {
    id: 'col',
    label: 'Barva',
    choices: [
      ST('Bílá Primalex Plus', 'bílá Primalex Plus', { mat: [M('barva', 'Primalex Plus', 0.17, 'kg', 32.5, 'l')] }),
      ST('Bílá Primalex Polar (vyšší krytí)', 'bílá Primalex Polar', {
        mat: [M('barva', 'Primalex Polar', 0.17, 'kg', 45.2, 'l')],
      }),
      // práce: daibau syté odstíny 58–101
      ST('Tónovaná / barevná', 'tónovaná barva', {
        labour: [20, 35],
        mat: [M('barva', 'Tónovaná barva', 0.12, 'l', 211, 'l')],
      }),
    ],
  },
  {
    id: 'coats',
    label: 'Počet nátěrů',
    choices: [
      ST('2 nátěry', '2 nátěry', { layers: 2 }),
      ST('3 nátěry (sytý odstín, přetírání tmavé)', '3 nátěry', { layers: 3, labour: [15, 25] }),
    ],
  },
];

const MAL_EXTRAS: Extra[] = [
  ['Penetrace', [20, 30], [MGRUNT(0.1)]],
  ['Zakrývání podlah a nábytku', [18, 45]], // daibau
  ['Škrábání staré malby', [9, 67]], // daibau
  ['Stěrkování stěn 2×', [135, 324], [M('lep', 'Stěrka na stěny', 1.5, 'kg', 12)]], // daibau; materiál odhad – ověřit
];

// ── Fasády ──
const FAS_PEN = M('hydro', 'Penetrace pod omítku', 0.2, 'kg', 70); // odhad – ověřit
const EPS_ANCHOR = M('kotvy', 'Talířová hmoždinka Precit 140', 6, 'ks', 9.9);
const VATA_ANCHOR = M('kotvy', 'Talířová hmoždinka Precit 140', 8, 'ks', 9.9);
const FAS_OMIT: Option = {
  id: 'omit',
  label: 'Omítka',
  choices: [
    ST('Silikonová 1,5 mm (Baumit Silikon Top)', 'silikonová omítka', {
      mat: [M('omit', 'Silikonová omítka Baumit Silikon Top 1,5 mm', 2.5, 'kg', 54), FAS_PEN],
    }),
    ST('Akrylátová', 'akrylátová omítka', { mat: [M('omit', 'Akrylátová omítka', 2.5, 'kg', 40), FAS_PEN] }), // cena odhad – ověřit
  ],
};
const FAS_SCAFF: Extra = ['Lešení (pronájem, montáž, demontáž)', [120, 220]]; // kolikmaterialu

// ── Zednické práce ──
const PLASTER_FINISH = M('omit', 'Štuk Weber CZ 310', 4, 'kg', 5.45);
const BOU_WASTE_EXTRA: Extra = ['Odvoz a likvidace suti', [450, 650], null, 'w']; // kontejner 3–5 m³ za 1 800–2 500 Kč (megastroj)

const SPAR = (): Material[] => [M('spar', 'Spárovací hmota Knauf Fugenbunt', 0.4, 'kg', 28.9)];

const sdkWalls: WorkType = {
  // Obklad stěn: CD 2,0 m + UD 0,8 m + 1,5 přímého závěsu na m²
  name: 'Obklad stěn',
  area: 'walls',
  labour: [300, 550],
  mat: SDK_COMMON,
  opts: sdkOpts([
    ST('CD profily na přímých závěsech', 'CD na přímých závěsech', {
      mat: CD_UD.concat([M('prof', 'Přímý závěs', 1.5, 'ks', 10)]),
    }),
    ST('Volně stojící předstěna CW 50 (pro instalace)', 'předstěna CW 50', {
      labour: [50, 50],
      mat: [M('prof', 'CW 50', 2.0, 'm', 31), M('prof', 'UW 50', 0.8, 'm', 25)],
    }),
  ]),
  extras: [],
};

const sdkCeiling: WorkType = {
  // Podhled: přímý CD 2,3 m + UD 0,6 m + 1,5 závěsu; zavěšený CD 3,2 m + UD 0,6 m + 1,2 noniusu
  name: 'Podhled',
  area: 'ceiling',
  labour: [300, 550],
  mat: SDK_COMMON,
  opts: sdkOpts([
    ST('Přímo pod stropem (CD na přímých závěsech)', 'přímo pod stropem', {
      mat: [
        M('prof', 'CD 60/27', 2.3, 'm', 23),
        M('prof', 'UD 28/27', 0.6, 'm', 15),
        M('prof', 'Přímý závěs', 1.5, 'ks', 10),
      ],
    }),
    ST('Zavěšený křížový rošt (nonius)', 'zavěšený rošt', {
      labour: [100, 100],
      // nonius: odhad – ověřit
      mat: [
        M('prof', 'CD 60/27', 3.2, 'm', 23),
        M('prof', 'UD 28/27', 0.6, 'm', 15),
        M('prof', 'Noniusový závěs', 1.2, 'ks', 15),
      ],
    }),
  ]),
  extras: [['Parotěsná fólie', 50, [M('spoj', 'Parotěsná fólie', 1.1, 'm²', 20)]]], // fólie: odhad – ověřit
};

const sdkPartition: WorkType = {
  // Příčka: CW 2,0 m + UW 0,8 m dle šířky profilu, opláštění z obou stran
  name: 'Příčka',
  area: 'manual',
  sides: 2,
  labour: [350, 600],
  mat: SDK_COMMON,
  opts: sdkOpts([
    ST('Profil CW 50', 'CW 50', { mat: [M('prof', 'CW 50', 2.0, 'm', 31), M('prof', 'UW 50', 0.8, 'm', 25)] }),
    ST('Profil CW 75', 'CW 75', { mat: [M('prof', 'CW 75', 2.0, 'm', 36), M('prof', 'UW 75', 0.8, 'm', 30)] }),
    ST('Profil CW 100', 'CW 100', { mat: [M('prof', 'CW 100', 2.0, 'm', 46), M('prof', 'UW 100', 0.8, 'm', 36)] }),
  ]),
  extras: [],
};

export const PRICING = {
  matMarkup: MARKUP,
  services: [
    {
      id: 'sdk',
      name: 'Sádrokartony',
      matNote: 'Materiál zahrnuje desky, kovové profily, závěsy, šrouby, kotvy, pásku a tmel.',
      types: [sdkWalls, sdkCeiling, sdkPartition],
    },
    {
      id: 'obk',
      name: 'Obkladačství',
      matNote: 'Materiál zahrnuje lepidlo, spárovací hmotu, dlaždice (pokud je dodáváme) a materiál doplňků.',
      types: [
        {
          name: 'Obklad stěn',
          area: 'walls',
          labour: [0, 0],
          mat: SPAR(),
          opts: obkOpts(),
          extras: obkExtras([72, 351], 'Sekání starého obkladu'),
        },
        {
          name: 'Dlažba podlahy',
          area: 'floor',
          labour: [0, 0],
          mat: SPAR(),
          opts: obkOpts(),
          extras: obkExtras([99, 218], 'Sekání staré dlažby'),
        },
        {
          name: 'Koupelna (stěny + podlaha)',
          area: 'both',
          labour: [0, 0],
          mat: SPAR(),
          opts: obkOpts(),
          extras: obkExtras([72, 351], 'Sekání starého obkladu a dlažby'),
        },
      ],
    },
    {
      id: 'mal',
      name: 'Malování',
      matNote: 'Materiál zahrnuje barvu podle počtu nátěrů a materiál doplňků (penetrace, stěrka).',
      types: [
        { name: 'Stěny + strop', area: 'both', labour: [35, 60], mat: [], opts: malOpts(), extras: MAL_EXTRAS }, // práce 2 nátěry: daibau 40–67 vč. materiálu
        { name: 'Jen stěny', area: 'walls', labour: [35, 60], mat: [], opts: malOpts(), extras: MAL_EXTRAS },
        { name: 'Jen strop', area: 'ceiling', labour: [35, 60], mat: [], opts: malOpts(), extras: MAL_EXTRAS },
      ],
    },
    {
      id: 'fas',
      name: 'Fasády a zateplení',
      matNote: 'Materiál zahrnuje izolant, lepidlo a stěrku, kotvy, perlinku, penetraci a omítku.',
      types: [
        {
          name: 'Zateplení ETICS',
          area: 'walls',
          labour: [550, 1200], // kolikmaterialu
          mat: [
            M('lep', 'Lepidlo a stěrka Weber CZ 700', 8.5, 'kg', 6.9),
            M('kotvy', 'Perlinka Baumit', 1.15, 'm²', 21.7),
          ],
          opts: [
            {
              id: 'izol',
              label: 'Izolant',
              choices: [
                ST('EPS 70F 100 mm', 'EPS 100 mm', { mat: [M('izol', 'EPS 70F 100 mm', 1, 'm²', 190), EPS_ANCHOR] }),
                ST('EPS 70F 140 mm', 'EPS 140 mm', { mat: [M('izol', 'EPS 70F 140 mm', 1, 'm²', 266), EPS_ANCHOR] }),
                ST('EPS 70F 200 mm', 'EPS 200 mm', { mat: [M('izol', 'EPS 70F 200 mm', 1, 'm²', 380), EPS_ANCHOR] }),
                ST('Minerální vata Isover Fassil 100 mm', 'Fassil 100 mm', {
                  labour: [150, 250],
                  mat: [M('izol', 'Isover Fassil 100 mm', 1, 'm²', 224), VATA_ANCHOR],
                }),
                ST('Minerální vata Isover Fassil 140 mm', 'Fassil 140 mm', {
                  labour: [150, 250],
                  mat: [M('izol', 'Isover Fassil 140 mm', 1, 'm²', 314), VATA_ANCHOR],
                }),
              ],
            },
            FAS_OMIT,
          ],
          extras: [FAS_SCAFF, ['Složitá fasáda (arkýře, šambrány)', [200, 400]]],
        },
        {
          name: 'Fasádní omítka bez zateplení',
          area: 'walls',
          matNote: 'Materiál zahrnuje penetraci a fasádní omítku.',
          labour: [160, 320],
          mat: [],
          opts: [FAS_OMIT],
          extras: [FAS_SCAFF],
        },
      ],
    },
    {
      id: 'bou',
      name: 'Bourací práce',
      noMat: true,
      matNote: 'Cena zahrnuje vybourání, naložení a odvoz suti dle volby.',
      types: [
        {
          name: 'Příčky',
          area: 'manual',
          labour: [0, 0],
          mat: [],
          opts: [
            {
              id: 'wall',
              label: 'Materiál příčky',
              choices: [
                ST('Sádrokarton', 'SDK příčka', { labour: [150, 250], waste: 0.05 }), // odhad – ověřit
                ST('Příčkovka do 10 cm', 'příčkovka do 10 cm', { labour: [300, 500], waste: 0.15 }),
                ST('Plná cihla', 'plná cihla', { labour: [600, 900], waste: 0.25 }),
              ],
            },
          ],
          extras: [BOU_WASTE_EXTRA],
        },
        { name: 'Dlažba', area: 'floor', labour: [150, 400], waste: 0.03, mat: [], extras: [BOU_WASTE_EXTRA] },
        { name: 'Obklad stěn', area: 'walls', labour: [150, 400], waste: 0.03, mat: [], extras: [BOU_WASTE_EXTRA] },
        {
          name: 'Omítky',
          area: 'walls',
          labour: [0, 0],
          mat: [],
          opts: [
            {
              id: 'thick',
              label: 'Tloušťka omítky',
              choices: [
                ST('Do 1 cm', '1 cm', { labour: [60, 150], waste: 0.015 }),
                ST('2 cm', '2 cm', { labour: [120, 300], waste: 0.03 }),
              ],
            },
          ],
          extras: [BOU_WASTE_EXTRA],
        },
      ],
    },
    {
      id: 'zed',
      name: 'Zednické práce',
      matNote: 'Materiál zahrnuje omítkovou nebo potěrovou směs a materiál doplňků.',
      types: [
        {
          name: 'Vnitřní omítky',
          area: 'walls',
          labour: [0, 0],
          mat: [],
          opts: [
            {
              id: 'plaster',
              label: 'Skladba',
              choices: [
                ST('Jádro 15 mm + štuk 3 mm (ručně)', 'jádro + štuk', {
                  labour: [310, 730],
                  mat: [M('omit', 'Jádrová omítka Knauf MV2 (15 mm)', 21, 'kg', 4.13), PLASTER_FINISH],
                }),
                ST('Jen štuk na staré jádro', 'jen štuk', { labour: [150, 350], mat: [PLASTER_FINISH] }),
                ST('Strojní sádrová 10 mm', 'strojní sádrová omítka', {
                  labour: [160, 380],
                  mat: [M('omit', 'Sádrová omítka strojní', 10, 'kg', 7)], // materiál odhad – ověřit
                }),
              ],
            },
          ],
          extras: [
            ['Penetrace', [20, 30], [MGRUNT(0.1)]],
            ['Rohové lišty', [20, 40], [M('ost', 'Rohová lišta', 0.8, 'm', 20)]], // odhad – ověřit
          ],
        },
        {
          name: 'Potěr podlahy',
          area: 'floor',
          labour: [0, 0],
          mat: [],
          opts: [
            {
              id: 'druh',
              label: 'Druh potěru',
              choices: [
                // práce odhad – ověřit
                ST('Cementový potěr, míchaný', 'cementový potěr', {
                  labour: [150, 250],
                  mat: [M('poter', 'Cementový potěr Precit', 20, 'kg', 3.5, 'l')],
                }),
                // mobetony komplet 300–550; rozdělení odhad – ověřit
                ST('Litý anhydrit', 'litý anhydrit', {
                  labour: [120, 350],
                  mat: [M('poter', 'Litý anhydritový potěr', 1, 'm²', 180)],
                }),
              ],
            },
            {
              id: 'thk',
              label: 'Tloušťka (cementový potěr)',
              when: ['druh', 0],
              def: 1,
              choices: [
                ST('4 cm', '4 cm', { layers: 4 }),
                ST('5 cm', '5 cm', { layers: 5 }),
                ST('6 cm', '6 cm', { layers: 6 }),
              ],
            },
          ],
          extras: [],
        },
      ],
    },
  ] satisfies ServiceDef[],
  minOrder: 5000,
  vat: 0.12,
  openings: {
    window: { name: 'Okno', w: 1.2, h: 1.5 },
    door: { name: 'Dveře', w: 0.8, h: 2.0 },
  } satisfies Record<OpeningKind, { name: string; w: number; h: number }>,
};

export const SERVICE_DEFS: readonly ServiceDef[] = PRICING.services;

export const GROUPS: readonly [GroupId, string][] = [
  ['desky', 'Desky'],
  ['prof', 'Profily a závěsy'],
  ['dlaz', 'Dlaždice / obklad'],
  ['spoj', 'Spojovací a tmelicí materiál'],
  ['lep', 'Lepidla a stěrky'],
  ['spar', 'Spárovací hmota'],
  ['hydro', 'Hydroizolace a penetrace'],
  ['izol', 'Izolace'],
  ['kotvy', 'Kotvy a výztuž'],
  ['omit', 'Omítky'],
  ['poter', 'Potěrová směs'],
  ['barva', 'Barvy'],
  ['ost', 'Ostatní materiál'],
];

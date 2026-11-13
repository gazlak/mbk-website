import { ELEKTRO_ACCENT, VODA_TOPENI_ACCENT } from '@/data/hero';

interface Card {
  text: string;
  title: string;
}

export interface Subpage {
  accent: { accent: string; on: string; glow: string };
  /** Závěrečná výzva ke kontaktu. */
  cta: { title: string; text: string };
  eyebrow: string;
  faq: readonly { question: string; answer: string }[];
  /** Tematická část s fotkami a výčtem (u elektra připojení klimatizací a tepelných čerpadel). */
  focus: {
    eyebrow: string;
    title: string;
    text: string;
    points: readonly string[];
    photos: { mainSrc: string; mainAlt: string; insetSrc: string; insetAlt: string };
  };
  image: { src: string; alt: string };
  intro: string;
  /** Druhá skupina služeb (revize, servis). */
  more: { eyebrow: string; title: string; items: readonly Card[] };
  reasons: readonly Card[];
  services: { eyebrow: string; title: string; items: readonly Card[] };
  steps: readonly Card[];
  title: readonly [string, string];
}

export const ELEKTRO_PAGE: Subpage = {
  eyebrow: 'Elektromontáže',
  title: ['BEZPEČNÁ', 'ENERGIE'],
  intro: 'Elektroinstalace, rozvaděče a revize pro rodinné domy, byty i firmy. Od návrhu po předání s revizní zprávou.',
  image: { src: '/images/hero-elektro.jpg', alt: 'Elektrikář při práci na rozvaděči' },
  accent: ELEKTRO_ACCENT,
  reasons: [
    { title: 'Jeden dodavatel', text: 'Elektro uděláme v návaznosti na stavební práce, bez koordinace dalších firem.' },
    { title: 'Revize v ceně zakázky', text: 'Novou instalaci předáváme s výchozí revizí, ne až na vyžádání.' },
    { title: 'Jasná nabídka', text: 'Rozpočet po položkách: materiál, práce, revize. Bez překvapení na konci.' },
    { title: 'Čistá práce', text: 'Drážky, prostupy a začištění řešíme sami, takže po nás nezůstane nepořádek.' },
    { title: 'Domluvené termíny', text: 'Termín nástupu i předání víte předem a my ho držíme.' },
    { title: 'Dokumentace', text: 'K předání dostanete revizní zprávu a popis rozvaděče pro budoucí servis.' },
  ],
  services: {
    eyebrow: 'Co děláme',
    title: 'Kompletní elektroinstalace',
    items: [
      { title: 'Rozvody v novostavbách', text: 'Silnoproud od přípojky po poslední zásuvku podle projektu.' },
      { title: 'Rekonstrukce rozvodů', text: 'Výměna hliníkových a starých rozvodů za měděné, i v obydleném bytě.' },
      { title: 'Rozvaděče', text: 'Nové rozvaděče a výměna starých pojistkových skříní za jističe a chrániče.' },
      { title: 'Zásuvky a osvětlení', text: 'Vypínače, zásuvky, svítidla a LED pásky včetně stmívání.' },
      { title: 'Okruhy pro spotřebiče', text: 'Samostatné okruhy pro varnou desku, troubu, bojler nebo dílnu.' },
      { title: 'Přípojky a elektroměry', text: 'Příprava přípojky a elektroměrového rozvaděče pro distributora.' },
      { title: 'Slaboproud', text: 'Datové rozvody, Wi-Fi, televize, zvonky a příprava pro zabezpečení.' },
      { title: 'Hromosvody a uzemnění', text: 'Jímací soustava, svody a uzemnění pro domy i hospodářské budovy.' },
    ],
  },
  focus: {
    eyebrow: 'Klimatizace a tepelná čerpadla',
    title: 'Připojení, které zvládne zátěž',
    text: 'Klimatizace i tepelné čerpadlo potřebují vlastní jištěný okruh a u větších výkonů třífázový přívod. Připravíme elektro tak, aby montáž proběhla bez provizorií.',
    points: [
      'samostatný okruh s jističem a chráničem',
      'třífázový přívod pro tepelná čerpadla',
      'kabeláž k venkovní i vnitřní jednotce',
      'úprava nebo rozšíření rozvaděče',
      'revize po připojení',
    ],
    photos: {
      mainSrc: '/images/sluzby/elektro-main.jpg',
      mainAlt: 'Zapojování elektroinstalace',
      insetSrc: '/images/sluzby/elektro-inset.jpg',
      insetAlt: 'Detail zapojení zásuvky',
    },
  },
  more: {
    eyebrow: 'Revize',
    title: 'Revize elektro',
    items: [
      { title: 'Výchozí revize', text: 'Povinná u každé nové nebo upravené instalace před uvedením do provozu.' },
      { title: 'Pravidelné revize', text: 'Pro pronajímané byty, firmy a provozovny v intervalech podle norem.' },
      { title: 'Revize při prodeji', text: 'Stav instalace pro kupujícího, banku nebo pojišťovnu.' },
      { title: 'Odstranění závad', text: 'Co revize najde, rovnou opravíme a znovu přeměříme.' },
    ],
  },
  steps: [
    { title: 'Prohlídka a návrh', text: 'Projdeme objekt, domluvíme rozsah a připravíme rozpočet.' },
    { title: 'Montáž', text: 'Rozvody, rozvaděč, zásuvky a osvětlení v domluveném termínu.' },
    { title: 'Měření a revize', text: 'Instalaci přeměříme a revizní technik vystaví zprávu.' },
    { title: 'Předání', text: 'Předáme hotovou práci, revizní zprávu a vysvětlíme rozvaděč.' },
  ],
  faq: [
    {
      question: 'Je revize elektroinstalace povinná?',
      answer:
        'U nové nebo upravené instalace ano, bez výchozí revize ji nelze uvést do provozu. U pronajímaných prostor a firem jsou povinné i pravidelné revize.',
    },
    {
      question: 'Uděláte revizi i na instalaci od jiné firmy?',
      answer: 'Ano. Instalaci přeměříme, a pokud najdeme závady, nabídneme jejich opravu.',
    },
    {
      question: 'Potřebuje klimatizace vlastní okruh?',
      answer:
        'Doporučujeme ho vždy. Sdílený okruh se zásuvkami vede k vypadávání jističe a u větších jednotek to výrobce ani nedovolí.',
    },
    {
      question: 'Vyplatí se vyměnit starý rozvaděč?',
      answer:
        'Pokud máte pojistky nebo chybí proudový chránič, ano. Nový rozvaděč zvýší bezpečnost a připraví dům na další spotřebiče.',
    },
    {
      question: 'Jde měnit rozvody v obydleném bytě?',
      answer: 'Jde. Práci rozdělíme po místnostech, aby byt zůstal co nejvíc obyvatelný.',
    },
  ],
  cta: {
    title: 'Potřebujete elektrikáře?',
    text: 'Napište nám, co chystáte. Ozveme se, domluvíme prohlídku a připravíme nabídku.',
  },
};

export const VODA_TOPENI_PAGE: Subpage = {
  eyebrow: 'Voda a topení',
  title: ['VODA, TOPENÍ,', 'PLYN'],
  intro:
    'Rozvody vody, kanalizace a plynu, kotle, radiátory a podlahové topení. Navržené a zapojené tak, aby vydržely.',
  image: { src: '/images/hero-voda-topeni.jpg', alt: 'Instalatér při montáži vodoinstalace' },
  accent: VODA_TOPENI_ACCENT,
  reasons: [
    { title: 'Jeden dodavatel', text: 'Instalace navážeme na bourání, zednické práce i obklady.' },
    {
      title: 'Zkoušky před zakrytím',
      text: 'Každý rozvod projde tlakovou zkouškou dřív, než zmizí ve zdi nebo v podlaze.',
    },
    { title: 'Jasná nabídka', text: 'Rozpočet po položkách, materiál podle dohody, žádné dodatky na konci.' },
    { title: 'Ověřené materiály', text: 'Trubky a armatury od zavedených výrobců s dostupnými náhradními díly.' },
    { title: 'Domluvené termíny', text: 'Víte, kdy nastoupíme a kdy bude voda i topení zase v provozu.' },
    { title: 'Předání s dokumentací', text: 'Protokoly o zkouškách a nákres vedení trubek pro budoucí opravy.' },
  ],
  services: {
    eyebrow: 'Co děláme',
    title: 'Voda, kanalizace, topení a plyn',
    items: [
      { title: 'Rozvody vody', text: 'Nové rozvody studené i teplé vody a výměna starých ocelových trubek.' },
      { title: 'Kanalizace', text: 'Vnitřní odpady, stoupačky a napojení na přípojku nebo čističku.' },
      { title: 'Koupelny a kuchyně', text: 'Příprava a zapojení umyvadel, van, sprch, WC i dřezů.' },
      { title: 'Ohřev vody', text: 'Bojlery, zásobníky a cirkulace teplé vody.' },
      { title: 'Kotle', text: 'Montáž a výměna plynových i elektrokotlů včetně napojení na topný systém.' },
      { title: 'Radiátory', text: 'Nové otopné soustavy, výměna radiátorů, termostatické hlavice a vyregulování.' },
      { title: 'Podlahové topení', text: 'Teplovodní podlahové topení s rozdělovačem a regulací po místnostech.' },
      { title: 'Rozvody plynu', text: 'Plynové rozvody v domě, napojení kotle, sporáku a dalších spotřebičů.' },
    ],
  },
  focus: {
    eyebrow: 'Tepelná čerpadla',
    title: 'Topná soustava pro tepelné čerpadlo',
    text: 'Tepelné čerpadlo pracuje s nižší teplotou vody než kotel. Upravíme rozvody, akumulaci a podlahové topení tak, aby čerpadlo běželo úsporně.',
    points: [
      'posouzení stávajících radiátorů a rozvodů',
      'akumulační nádrž a zásobník teplé vody',
      'podlahové topení s nízkou teplotou vody',
      'napojení čerpadla na topný systém',
      'proplach a vyregulování soustavy',
    ],
    photos: {
      mainSrc: '/images/sluzby/voda-topeni-main.jpg',
      mainAlt: 'Montáž rozvodů topení',
      insetSrc: '/images/sluzby/voda-topeni-inset.jpg',
      insetAlt: 'Detail instalatérského spoje',
    },
  },
  more: {
    eyebrow: 'Servis',
    title: 'Opravy a údržba',
    items: [
      { title: 'Havárie a úniky', text: 'Najdeme a opravíme prasklou trubku nebo netěsný spoj.' },
      { title: 'Výměna baterií a armatur', text: 'Kohouty, ventily, baterie a splachovací systémy.' },
      { title: 'Odvzdušnění a proplach', text: 'Když radiátory topí jen napůl nebo soustava hučí.' },
      { title: 'Výměna kotle', text: 'Demontáž starého kotle a zapojení nového s minimální přestávkou v topení.' },
    ],
  },
  steps: [
    { title: 'Prohlídka a návrh', text: 'Projdeme dům, změříme a navrhneme vedení a zdroj tepla.' },
    { title: 'Montáž', text: 'Rozvody, kanalizace a topení v domluveném termínu.' },
    { title: 'Zkoušky', text: 'Tlakové zkoušky vody, topení i plynu a zkouška těsnosti odpadů.' },
    { title: 'Předání', text: 'Spustíme systém, vysvětlíme ovládání a předáme protokoly.' },
  ],
  faq: [
    {
      question: 'Vyplatí se měnit staré ocelové trubky?',
      answer:
        'Pokud dům prochází rekonstrukcí, ano. Ocelové rozvody uvnitř zarůstají a korodují a jejich výměna je nejlevnější, dokud jsou zdi otevřené.',
    },
    {
      question: 'Jde podlahové topení i do starého domu?',
      answer:
        'Většinou ano. Záleží na výšce podlahy, kterou si můžete dovolit. Po prohlídce řekneme, jaký systém se hodí.',
    },
    {
      question: 'Jsou staré radiátory vhodné k tepelnému čerpadlu?',
      answer:
        'Někdy stačí, někdy je potřeba větší plocha nebo podlahové topení. Posoudíme to podle tepelné ztráty a velikosti radiátorů.',
    },
    {
      question: 'Jak dlouho bude dům bez vody nebo topení?',
      answer: 'Práce rozplánujeme tak, aby odstávka byla co nejkratší. Výměna kotle obvykle zabere den až dva.',
    },
    {
      question: 'Potřebuje kotel pravidelný servis?',
      answer: 'Ano, výrobci obvykle požadují servisní prohlídku jednou ročně. Zachováte si tím i záruku.',
    },
  ],
  cta: {
    title: 'Chystáte vodu, topení nebo plyn?',
    text: 'Napište nám, co plánujete. Ozveme se, domluvíme prohlídku a připravíme nabídku.',
  },
};

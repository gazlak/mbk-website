import { FEATURES, SITE } from '@/data/site';

interface PrivacySection {
  heading: string;
  paragraphs: string[];
}

// IČO se zobrazí po doplnění údajů od klienta (FEATURES.companyId)
const COMPANY_ID = 'XXXXXXXX';
const COMPANY_ID_PART = FEATURES.companyId ? `, IČO: ${COMPANY_ID}` : '';

export const PRIVACY_EFFECTIVE_FROM = '30. 10. 2026';

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    heading: 'Správce osobních údajů',
    paragraphs: [
      `Správcem osobních údajů je ${SITE.name}${COMPANY_ID_PART}, se sídlem ${SITE.addressLines.join(', ')}.`,
      `Kontakt ve věcech ochrany osobních údajů: ${SITE.email}.`,
    ],
  },
  {
    heading: 'Jaké údaje zpracováváme',
    paragraphs: [
      'Pokud nás kontaktujete e-mailem nebo telefonicky, zpracováváme údaje, které nám sami sdělíte: jméno, e-mailovou adresu, telefonní číslo a obsah zprávy.',
      'Při návštěvě webu zpracovává poskytovatel hostingu technické údaje, zejména IP adresu, v provozních logech serveru.',
    ],
  },
  {
    heading: 'Účel a právní základ zpracování',
    paragraphs: [
      'Kontaktní údaje zpracováváme za účelem vyřízení vaší poptávky a jednání o smlouvě (čl. 6 odst. 1 písm. b) GDPR).',
      'Technické údaje v logech zpracováváme na základě oprávněného zájmu na bezpečném a spolehlivém provozu webu (čl. 6 odst. 1 písm. f) GDPR).',
    ],
  },
  {
    heading: 'Doba uložení',
    paragraphs: [
      'Údaje z poptávky uchováváme po dobu jejího vyřízení. Pokud dojde k uzavření smlouvy, uchováváme související údaje po dobu stanovenou zákonem, zejména účetními a daňovými předpisy.',
      'Logy serveru se uchovávají po dobu nezbytnou pro zajištění provozu a bezpečnosti webu.',
    ],
  },
  {
    heading: 'Příjemci údajů',
    paragraphs: [
      'Údaje mohou zpracovávat poskytovatel hostingu a poskytovatel e-mailových služeb.',
      'Mapa na webu využívá mapové podklady OpenStreetMap. Při jejich načtení se IP adresa návštěvníka předává serverům OpenStreetMap Foundation.',
    ],
  },
  {
    heading: 'Cookies',
    paragraphs: ['Web nepoužívá sledovací ani marketingové cookies, proto nevyžaduje souhlas s jejich používáním.'],
  },
  {
    heading: 'Vaše práva',
    paragraphs: [
      'Máte právo na přístup ke svým osobním údajům, jejich opravu nebo výmaz, omezení zpracování, vznést námitku proti zpracování a právo na přenositelnost údajů.',
      'Máte také právo podat stížnost u Úřadu pro ochranu osobních údajů (www.uoou.cz).',
    ],
  },
];

import type { Metadata } from 'next';
import { ServiceSubpage } from '@/components/layout/service-subpage';
import { VODA_TOPENI_PAGE } from '@/data/subpages';

export const metadata: Metadata = { title: 'Voda a topení | MBK BAU' };

export default function VodaTopeniPage() {
  return <ServiceSubpage page={VODA_TOPENI_PAGE} />;
}

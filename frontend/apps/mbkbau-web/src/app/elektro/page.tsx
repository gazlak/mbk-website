import type { Metadata } from 'next';
import { ServiceSubpage } from '@/components/layout/service-subpage';
import { ELEKTRO_PAGE } from '@/data/subpages';

export const metadata: Metadata = { title: 'Elektromontáže | MBK BAU' };

export default function ElektroPage() {
  return <ServiceSubpage page={ELEKTRO_PAGE} />;
}

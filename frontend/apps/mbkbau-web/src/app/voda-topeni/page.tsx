import type { Metadata } from 'next';
import { SubpageMock } from '@/components/layout/subpage-mock';
import { VODA_TOPENI_PAGE } from '@/data/subpages';

export const metadata: Metadata = { title: 'Voda a topení | MBK BAU' };

export default function VodaTopeniPage() {
  return <SubpageMock page={VODA_TOPENI_PAGE} />;
}

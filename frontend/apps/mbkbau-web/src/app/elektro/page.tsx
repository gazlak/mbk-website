import type { Metadata } from 'next';
import { SubpageMock } from '@/components/layout/subpage-mock';
import { ELEKTRO_PAGE } from '@/data/subpages';

export const metadata: Metadata = { title: 'Elektromontáže | MBK BAU' };

export default function ElektroPage() {
  return <SubpageMock page={ELEKTRO_PAGE} />;
}

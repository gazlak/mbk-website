import type { Ref } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  insetAlt: string;
  insetRef?: Ref<HTMLImageElement>;
  insetSrc: string;
  mainAlt: string;
  mainClassName?: string;
  mainRef?: Ref<HTMLImageElement>;
  mainSrc: string;
  reversed?: boolean;
}

/** Hlavní fotka s menší fotkou přesahující přes roh (photo-wrapper). */
export const PhotoComposition = ({
  mainSrc,
  mainAlt,
  insetSrc,
  insetAlt,
  reversed = false,
  mainRef,
  insetRef,
  mainClassName,
}: Props) => (
  <div
    className={cn('relative pb-[60px]', reversed && 'pl-[30px]')}
    data-photo=""
    data-reversed={reversed ? 'true' : undefined}
  >
    {/* biome-ignore lint/correctness/useImageSize: statický export bez optimalizace obrázků */}
    <img
      alt={mainAlt}
      className={cn('block h-[500px] w-full rounded-brand object-cover', mainClassName)}
      data-photo-main=""
      ref={mainRef}
      src={mainSrc}
    />
    {/* biome-ignore lint/correctness/useImageSize: statický export bez optimalizace obrázků */}
    <img
      alt={insetAlt}
      className={cn(
        'absolute bottom-0 h-[160px] w-[220px] rounded-brand border-4 border-surface object-cover shadow-[0_20px_60px_rgba(28,27,27,0.18)]',
        reversed ? 'left-[-1.5rem]' : 'right-[-1.5rem] lg:right-[-2rem]'
      )}
      data-photo-inset=""
      ref={insetRef}
      src={insetSrc}
    />
  </div>
);

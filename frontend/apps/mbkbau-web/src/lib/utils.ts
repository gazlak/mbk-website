import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/** Prvek pole, který musí existovat (indexy pocházejí z vlastních dat). */
export const at = <T>(arr: readonly T[], i: number): T => {
  const value = arr[i];
  if (value === undefined) {
    throw new Error(`Index ${i} je mimo rozsah`);
  }
  return value;
};

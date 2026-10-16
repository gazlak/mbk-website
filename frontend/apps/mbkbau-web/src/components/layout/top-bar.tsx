import { ClockFilledIcon, MailIcon, PhoneIcon, PinIcon } from '@/components/ui/icons';
import { SITE } from '@/data/site';
import { cn } from '@/lib/utils';

const ITEM =
  'inline-flex items-center gap-[0.45rem] whitespace-nowrap text-inherit no-underline transition-colors duration-200';
const ICON = 'size-[0.9rem] shrink-0 fill-primary';

export const TopBar = () => (
  <div className="bg-on-surface font-semibold text-[0.75rem] text-white/80 tracking-[0.02em]">
    <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-7 gap-y-2 px-8 py-2 md:justify-start">
      <span className={ITEM}>
        <PhoneIcon className={ICON} />
        {SITE.phone}
      </span>
      <a className={cn(ITEM, 'hover:text-white')} href={`mailto:${SITE.email}`}>
        <MailIcon className={ICON} />
        {SITE.email}
      </a>
      <span className={cn(ITEM, 'hidden md:inline-flex')}>
        <PinIcon className={ICON} />
        {SITE.addressShort}
      </span>
      <span className={cn(ITEM, 'hidden md:ml-auto md:inline-flex')}>
        <ClockFilledIcon className={ICON} />
        {SITE.hours}
      </span>
    </div>
  </div>
);

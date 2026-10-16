import { MailIcon, PhoneIcon, PinIcon } from '@/components/ui/icons';
import { FOOTER_LINKS, SITE } from '@/data/site';

const CONTACT_ITEM = 'mb-2 flex items-center gap-[0.6rem] text-[0.875rem] text-white/60';
const ICON = 'size-4 shrink-0 fill-primary';

export const Footer = () => (
  <footer className="bg-on-surface px-8 py-14 text-white/75">
    <div className="mx-auto grid max-w-[1280px] grid-cols-[1fr] gap-12 md:grid-cols-[1fr_1fr] md:items-start">
      <div>
        {/* biome-ignore lint/a11y/useValidAnchor: odkaz na začátek stránky jako v originále */}
        <a className="inline-flex shrink-0 items-center no-underline" href="#">
          {/* biome-ignore lint/correctness/useImageSize: statický export bez optimalizace obrázků */}
          <img alt={SITE.name} className="block h-40 w-auto" src="/mbkbau-white.png" />
        </a>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-8">
        <div>
          <h4 className="mb-4 font-bold text-[0.75rem] text-white uppercase tracking-[0.14em]">Odkazy</h4>
          <ul className="flex flex-col gap-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  className="text-[0.875rem] text-white/60 no-underline transition-colors duration-200 hover:text-primary"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-[0.75rem] text-white uppercase tracking-[0.14em]">Kontakt</h4>
          <div className={CONTACT_ITEM}>
            <PhoneIcon className={ICON} />
            {SITE.phone}
          </div>
          <div className={CONTACT_ITEM}>
            <MailIcon className={ICON} />
            {SITE.email}
          </div>
          <div className={CONTACT_ITEM}>
            <PinIcon className={ICON} />
            {SITE.city}
          </div>
        </div>
      </div>
    </div>

    <p className="mx-auto mt-10 max-w-[1280px] border-white/[0.08] border-t pt-6 text-center text-[0.8125rem] text-white/35">
      {SITE.copyright}
    </p>
  </footer>
);

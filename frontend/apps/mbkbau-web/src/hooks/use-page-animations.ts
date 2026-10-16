import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap';

const REVEAL_TOGGLE = 'play none none reverse';

const heroIntro = () => {
  const active = '[data-hero-slide][data-active="true"]';
  const h1 = document.querySelector(`${active} h1`);
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  gsap.set('[data-hero-content]', { visibility: 'visible' });
  tl.from(`${active} [data-hero-eyebrow]`, { y: 20, autoAlpha: 0, duration: 0.8 }, 0.2);
  if (h1) {
    SplitText.create(h1, {
      type: 'lines,words',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.words, { yPercent: 110, duration: 1, stagger: 0.08, ease: 'power4.out', delay: 0.4 }),
    });
  }
  tl.from(
    [`${active} [data-hero-subtitle]`, `${active} [data-hero-ctas]`],
    { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.15 },
    1.0
  );
};

const headings = () => {
  for (const el of gsap.utils.toArray<HTMLElement>('[data-reveal-heading]')) {
    const parent = el.closest('[data-reveal-group]') ?? el.parentElement;
    const sib = parent ? parent.querySelectorAll('[data-reveal-sibling]') : [];
    const scrollTrigger = { trigger: el, start: 'top 80%', toggleActions: REVEAL_TOGGLE };
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, { yPercent: 110, duration: 1, stagger: 0.12, ease: 'power4.out', scrollTrigger }),
    });
    if (sib.length) {
      gsap.from(sib, {
        y: 20,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger,
      });
    }
  }
};

const photos = () => {
  for (const wrap of gsap.utils.toArray<HTMLElement>('[data-photo]')) {
    const main = wrap.querySelector('[data-photo-main]');
    const inset = wrap.querySelector('[data-photo-inset]');
    const rev = wrap.dataset.reversed === 'true';
    const t = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: { trigger: wrap, start: 'top 80%', toggleActions: REVEAL_TOGGLE },
    });
    t.fromTo(
      main,
      { clipPath: 'inset(100% 0 0 0)', scale: 1.1 },
      { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.2, ease: 'power4.out' }
    );
    if (inset) {
      t.from(inset, { x: rev ? -60 : 60, autoAlpha: 0, duration: 1 }, 0.35);
    }
  }
};

const lists = () => {
  const list = document.querySelector('[data-services-list]');
  if (list) {
    gsap.from('[data-services-list] > li', {
      x: -30,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: list, start: 'top 85%', toggleActions: REVEAL_TOGGLE },
    });
  }
};

const references = () => {
  if (!document.querySelector('[data-refs-grid]')) {
    return;
  }
  const trigger = (start: string) => ({ trigger: '[data-refs-grid]', start, toggleActions: REVEAL_TOGGLE });
  if (window.matchMedia('(min-width: 768px)').matches) {
    gsap.from('[data-ref-card]', {
      clipPath: 'inset(100% 0 0 0)',
      duration: 1.1,
      stagger: 0.12,
      ease: 'power4.out',
      scrollTrigger: trigger('top 80%'),
    });
    gsap.from('[data-ref-card] img', {
      scale: 1.15,
      duration: 1.4,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: trigger('top 80%'),
    });
  } else {
    gsap.from('[data-ref-card]', {
      y: 30,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: trigger('top 85%'),
    });
  }
  gsap.from('[data-ref-quote]', {
    y: 20,
    autoAlpha: 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: { trigger: '[data-ref-quote]', start: 'top 88%', toggleActions: REVEAL_TOGGLE },
  });
};

const cards = () => {
  for (const card of gsap.utils.toArray<HTMLElement>('[data-reveal-card]')) {
    gsap.from(card, {
      y: 40,
      autoAlpha: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: REVEAL_TOGGLE },
    });
  }
  if (document.querySelector('[data-contact-items]')) {
    gsap.from('[data-contact-item]', {
      y: 20,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '[data-contact-items]', start: 'top 85%', toggleActions: REVEAL_TOGGLE },
    });
  }
};

const parallax = () => {
  gsap.to('[data-hero-bg]', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true },
  });
  for (const wrap of gsap.utils.toArray<HTMLElement>('[data-photo]')) {
    const inset = wrap.querySelector('[data-photo-inset]');
    if (inset) {
      gsap.to(inset, {
        y: -40,
        ease: 'none',
        scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }
  }
};

/** GSAP animace celé stránky (intro hera, odhalování sekcí, parallax). */
export const usePageAnimations = () => {
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.remove('js');
      return;
    }

    let cancelled = false;
    let started = false;
    let mm: gsap.MatchMedia | undefined;
    let safety: ReturnType<typeof setTimeout> | undefined;
    const refresh = () => ScrollTrigger.refresh();

    const start = () => {
      if (started || cancelled) {
        return;
      }
      started = true;
      mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        heroIntro();
        headings();
        photos();
        lists();
        references();
        cards();
      });
      // parallax jen na desktopu
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', parallax);
      if (document.readyState === 'complete') {
        refresh();
      } else {
        window.addEventListener('load', refresh);
      }
    };

    const ready = document.fonts?.ready ?? Promise.resolve();
    ready.then(start);
    // pojistka: hero nikdy nezůstane skryté
    safety = setTimeout(start, 3000);

    return () => {
      cancelled = true;
      clearTimeout(safety);
      window.removeEventListener('load', refresh);
      mm?.revert();
    };
  }, []);
};

# MBK BAU – web

## Co repo obsahuje

- `frontend/` – **aktuální web** (Next.js, monorepo, aplikace `apps/mbkbau-web`).
- `legacy/` – původní statická verze (`index.html`, `images/`, `starting-sources/`), jen jako reference.

## Požadavky

- [bun](https://bun.sh) 1.2.x (viz `packageManager` ve `frontend/package.json`)
- internet při buildu (`next/font` stahuje písmo Montserrat)

## Spuštění (vývoj)

Příkazy se spouští ve `frontend/`, ne v kořeni repa.

```sh
cd frontend
bun install
bun run dev:mbkbau-web
```

Web běží na http://localhost:3000.

`bun install` zároveň nastaví git hooky (husky: commitlint, ultracite, check-types) přes `core.hooksPath`. Commity proto musí mít konvenční formát (např. `feat: …`, `chore: …`).

## Kontroly

```sh
bun run check-types
bun run check
```

## Nasazení

```sh
cd frontend
bun run export:mbkbau-web
```

Vznikne `dist/` v kořeni repa (v gitu ignorovaná) s `index.html`, `404.html`, `_next/`, `images/` a logy. Nahrajte **obsah** `dist/` do kořene webu. Stačí libovolný statický hosting, Node není potřeba.

- `trailingSlash` je zapnutý (adresy končí `/`).
- `404.html` nastavte jako chybovou stránku hostingu.
- Lokální náhled: `python3 -m http.server -d dist`

## Před spuštěním ostrého webu doplnit

- Skutečný telefon: `frontend/apps/mbkbau-web/src/data/site.ts` (nyní placeholder `+420 XXX XXX XXX`).
- URL tlačítek „Přejít na web →“ v `src/data/hero.ts` (TODO).
- Odkaz „Ochrana údajů“ (nyní `#`).
- Reálné reference a recenze: `src/data/references.ts` (označeno MOCK).
- Ověřit ceny v `src/data/pricing.ts` (komentáře „odhad – ověřit“).
- Zdroje fotek: `public/images/CREDITS.md`.

## Kde co upravovat

Vše v `frontend/apps/mbkbau-web/`:

- `src/data/*` – obsah a ceny
- `src/components/sections/*` – sekce stránky
- `src/lib/calculator.ts` – výpočty kalkulačky

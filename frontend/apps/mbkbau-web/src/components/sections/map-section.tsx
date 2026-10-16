'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { SITE } from '@/data/site';

const PIN_HTML =
  '<div style="position:relative;width:40px;height:52px;">' +
  '<div class="animate-leaflet-ping" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);' +
  'width:36px;height:36px;border-radius:50%;background:#F04F12;opacity:0.25;"></div>' +
  '<svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M20 0C8.954 0 0 8.954 0 20c0 14.667 20 32 20 32S40 34.667 40 20C40 8.954 31.046 0 20 0z" fill="#F04F12"/>' +
  '<circle cx="20" cy="20" r="7" fill="white"/>' +
  '</svg>' +
  '</div>';

const POPUP_HTML = `<strong>${SITE.name}</strong><br>${SITE.addressLines[0]}<br>${SITE.addressLines[1]}`;

export const MapSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import('leaflet').then((L) => {
      if (cancelled) {
        return;
      }
      const { lat, lon, zoom } = SITE.map;
      const map = L.map(el, { center: [lat, lon], zoom, scrollWheelZoom: false });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> přispěvatelé',
        maxZoom: 19,
      }).addTo(map);

      const pinIcon = L.divIcon({
        className: '',
        html: PIN_HTML,
        iconSize: [40, 52],
        iconAnchor: [20, 52],
        popupAnchor: [0, -54],
      });

      L.marker([lat, lon], { icon: pinIcon }).addTo(map).bindPopup(POPUP_HTML);
      cleanup = () => map.remove();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section aria-label="Mapa – Znojmo" className="h-[500px]">
      <div className="size-full" ref={ref} />
    </section>
  );
};

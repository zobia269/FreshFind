import React from 'react';
import { getPageBackdrop } from '../data/imageData';

/**
 * Fixed photographic backdrop for every route except home.
 *
 * The image is blurred and dimmed heavily on purpose: it should read as
 * atmosphere behind the page, never compete with the content sitting on top.
 * Rendered as a fixed layer behind the whole scroll area so it does not
 * repeat or resize while the page scrolls.
 */
export default function PageBackdrop({ section, intensity = 'default' }) {
  const image = getPageBackdrop(section);

  // Home already has the animated canvas, so this stays optional per page.
  const opacity = {
    soft: 'opacity-[0.18]',
    default: 'opacity-[0.26]',
    strong: 'opacity-[0.34]',
  }[intensity] ?? 'opacity-[0.26]';

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover scale-110 blur-[3px] ${opacity}`}
      />
      {/* Wash that keeps text contrast predictable over any photo */}
      <div className="absolute inset-0 bg-[#f8faf8]/78" />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/12 via-transparent to-emerald-950/12" />
    </div>
  );
}

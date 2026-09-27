import React, { useEffect, useRef, useState } from 'react';
import produceStallPoster from '../assets/photos/market-citrus-stall.jpg';

/**
 * Looping market footage behind the home page hero.
 *
 * Clips are royalty-free (Coverr) and live in public/media so they are served
 * straight from disk instead of going through the JS bundle. Each clip lists a
 * 360p source for narrow viewports and a 720p source for wide ones, so phones
 * on mobile data never pull the desktop file.
 *
 * Only the visible clip is kept playing (the others are paused) to keep decode
 * cost down, and the swap is a crossfade rather than a cut.
 */

/** Rotates between the clips; long enough for the footage to register, short enough to stay varied. */
const CLIP_DURATION_MS = 11000;
const FADE_MS = 1500;

const CLIPS = [
  {
    id: 'market-stall',
    label: 'Shopper selecting fresh produce at a market stall',
    sources: [
      { src: '/media/market-stall-360.mp4', media: '(max-width: 767px)' },
      { src: '/media/market-stall-720.mp4' },
    ],
  },
  {
    id: 'vegetable-field',
    label: 'Rows of mature vegetables growing on a smallholding',
    sources: [
      { src: '/media/vegetable-field-360.mp4', media: '(max-width: 767px)' },
      { src: '/media/vegetable-field-360.mp4' },
    ],
  },
];

export default function HeroVideoBackdrop() {
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [unavailable, setUnavailable] = useState([]);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const sync = () => setIsVisible(!document.hidden);
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  // Advance to the next clip. If that one failed to load we stay put rather than
  // fading to a black rectangle.
  useEffect(() => {
    if (reduceMotion || !isVisible) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => {
        const next = (prev + 1) % CLIPS.length;
        return unavailable[next] ? prev : next;
      });
    }, CLIP_DURATION_MS);
    return () => clearInterval(timer);
  }, [reduceMotion, isVisible, unavailable]);

  // Only the visible clip decodes; the rest sit paused on their last frame so
  // fading back in never jumps.
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (reduceMotion || !isVisible || index !== activeIndex) {
        video.pause();
        return;
      }
      const attempt = video.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
    });
  }, [activeIndex, reduceMotion, isVisible]);

  const handleError = (index) => {
    setUnavailable(prev => (prev.includes(index) ? prev : [...prev, index]));
  };

  const videoBroken = unavailable.length >= CLIPS.length;

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-emerald-950">
      {/* Photographic poster: the first paint, and the permanent fallback if a clip cannot load */}
      <img
        src={produceStallPoster}
        alt=""
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover scale-110 blur-[2px]"
      />

      {!videoBroken &&
        CLIPS.map((clip, index) => (
          <video
            key={clip.id}
            ref={element => {
              videoRefs.current[index] = element;
            }}
            muted
            loop
            playsInline
            autoPlay={!reduceMotion}
            preload={index === 0 ? 'metadata' : 'none'}
            disablePictureInPicture
            tabIndex={-1}
            onError={() => handleError(index)}
            style={{ transitionDuration: `${FADE_MS}ms` }}
            className={`absolute inset-0 w-full h-full object-cover ff-video-drift transition-opacity ease-in-out ${
              activeIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {clip.sources.map(source => (
              <source
                key={`${clip.id}-${source.media ?? 'default'}`}
                src={source.src}
                media={source.media}
                type="video/mp4"
              />
            ))}
          </video>
        ))}

      {/* Theme wash: pushes the footage toward the emerald grow-light palette
          and guarantees the hero copy keeps its contrast over any frame. */}
      <div className="absolute inset-0 bg-emerald-950/62" />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/88 via-emerald-950/72 to-slate-950/92" />
      <div className="absolute inset-0 bg-emerald-800/18 mix-blend-color" />
    </div>
  );
}

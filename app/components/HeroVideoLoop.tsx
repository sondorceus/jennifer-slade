"use client";

import { useEffect, useRef, useState } from "react";

// Seamless-loop video player. Renders two stacked <video> elements
// pointed at the same source. While element A is playing, element B
// sits hidden. About 0.9s before A reaches the end, B starts from
// frame 0, and a CSS opacity transition crossfades A → B over ~0.9s.
// By the time A would have visibly snapped back to frame 0, B is
// already on-screen playing forward. Then it does the same in reverse.
// The user never sees a stop-and-replay seam — the camera "keeps
// moving" continuously.
//
// Cost: two simultaneous video decodes during the ~0.9s crossfade
// window. Modern phones / laptops handle 1280x720 fine.

type Props = {
  src: string;
  className?: string;
  /** How early (in seconds) to start the next loop before the current
   *  one ends. Default 0.9 — matches the 900ms fade duration. */
  preloadLead?: number;
};

export default function HeroVideoLoop({ src, className = "", preloadLead = 0.9 }: Props) {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  // active === "a" -> A is fully visible. active === "b" -> B is fully visible.
  const [active, setActive] = useState<"a" | "b">("a");
  // Refs that don't trigger renders — gates so we only schedule one
  // crossfade per cycle.
  const armedRef = useRef<{ a: boolean; b: boolean }>({ a: false, b: false });

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    // Both videos start muted + paused; we manually play A.
    b.pause();
    b.currentTime = 0;
    a.currentTime = 0;
    a.play().catch(() => {});

    const onTime = (which: "a" | "b") => () => {
      const cur = which === "a" ? a : b;
      const other = which === "a" ? b : a;
      const armed = armedRef.current;
      if (!cur.duration || !isFinite(cur.duration)) return;
      const remaining = cur.duration - cur.currentTime;
      if (remaining <= preloadLead && !armed[which]) {
        armed[which] = true;
        // Start the OTHER video fresh and fade.
        other.currentTime = 0;
        other.play().catch(() => {});
        // Switch active so CSS opacity transitions kick in.
        setActive(which === "a" ? "b" : "a");
      }
    };

    const onEnded = (which: "a" | "b") => () => {
      const cur = which === "a" ? a : b;
      cur.pause();
      cur.currentTime = 0;
      armedRef.current[which] = false;
    };

    a.addEventListener("timeupdate", onTime("a"));
    b.addEventListener("timeupdate", onTime("b"));
    a.addEventListener("ended", onEnded("a"));
    b.addEventListener("ended", onEnded("b"));

    return () => {
      a.removeEventListener("timeupdate", onTime("a"));
      b.removeEventListener("timeupdate", onTime("b"));
      a.removeEventListener("ended", onEnded("a"));
      b.removeEventListener("ended", onEnded("b"));
    };
  }, [preloadLead]);

  return (
    <>
      <video
        ref={aRef}
        src={src}
        muted
        playsInline
        preload="auto"
        className={`${className} transition-opacity duration-[900ms] ease-linear`}
        style={{ opacity: active === "a" ? 1 : 0 }}
        aria-hidden="true"
      />
      <video
        ref={bRef}
        src={src}
        muted
        playsInline
        preload="auto"
        className={`${className} transition-opacity duration-[900ms] ease-linear`}
        style={{ opacity: active === "b" ? 1 : 0 }}
        aria-hidden="true"
      />
    </>
  );
}

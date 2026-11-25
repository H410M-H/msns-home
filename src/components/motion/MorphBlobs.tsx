import { cn } from "~/lib/utils";

type Tone = "emerald" | "dark" | "light";

const palettes: Record<Tone, [string, string, string]> = {
  emerald: ["bg-emerald-400/35", "bg-teal-300/30", "bg-amber-300/25"],
  dark: ["bg-emerald-500/20", "bg-sky-500/15", "bg-amber-400/10"],
  light: ["bg-emerald-200/50", "bg-teal-200/40", "bg-lime-200/35"],
};

/**
 * Slowly morphing gradient blobs for section backgrounds. Pure CSS (see the
 * `morph-blob` keyframes in globals.css), so it costs no JavaScript and stops
 * when the visitor prefers reduced motion.
 */
export function MorphBlobs({
  tone = "emerald",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  const [a, b, c] = palettes[tone];
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "morph-blob absolute -top-24 -left-20 h-[22rem] w-[22rem] blur-3xl md:h-[30rem] md:w-[30rem]",
          a,
        )}
      />
      <div
        className={cn(
          "morph-blob morph-blob--slow absolute top-1/3 -right-24 h-[20rem] w-[20rem] blur-3xl md:h-[26rem] md:w-[26rem]",
          b,
        )}
      />
      <div
        className={cn(
          "morph-blob morph-blob--reverse absolute -bottom-28 left-1/3 h-[18rem] w-[18rem] blur-3xl md:h-[24rem] md:w-[24rem]",
          c,
        )}
      />
    </div>
  );
}

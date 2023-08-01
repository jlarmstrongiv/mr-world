import type { AstroIntegration } from "astro";

export interface CleanUpFunction {
  (): Promise<void> | void;
}

export interface UseEffect {
  (): Promise<CleanUpFunction | void> | CleanUpFunction | void;
}

export interface MrWorldConfig {
  useEffect: UseEffect;
  id: string;
}

export function mrWorld({ useEffect, id }: MrWorldConfig): AstroIntegration {
  let cleanup: Awaited<ReturnType<UseEffect>>;
  return {
    name: id,
    hooks: {
      // astro:server dev server
      "astro:server:setup": async () => {
        cleanup = await useEffect();
      },
      "astro:server:done": async () => {
        if (cleanup) {
          await cleanup();
        }
      },
      //  astro:build ssr and ssg
      "astro:build:start": async () => {
        cleanup = await useEffect();
      },
      "astro:build:done": async () => {
        if (cleanup) {
          await cleanup();
        }
      },
    },
  };
}

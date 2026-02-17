import { ArrowDown, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.24),transparent_55%)]" />

      <div className="container max-w-4xl mx-auto text-center z-10 animate-fade-in">
        <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm text-primary mb-6">
          <Sparkles className="h-4 w-4" />
          Building modern digital experiences
        </p>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Hi, I'm <span className="text-primary text-glow">Prashant Biradar</span>
        </h1>

        <p className="text-lg md:text-xl max-w-3xl mx-auto text-foreground/80 leading-relaxed mb-10">
          Full-stack developer crafting fast, beautiful web products with a focus on
          clean UI, smooth animations, and great user experience across devices.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="#projects" className="inline-flex items-center justify-center cosmic-button">
            View My Work
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            href="https://drive.google.com/file/d/1BP-meZByTjP7YQZr7ai4R7cZMtLseVz5/view?usp=sharing"
            className="inline-flex items-center justify-center rounded-full border border-primary/40 px-6 py-2 font-medium transition-all duration-300 hover:scale-105 hover:bg-primary/10"
          >
            My Resume
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce text-foreground/70">
        <span className="text-sm uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};

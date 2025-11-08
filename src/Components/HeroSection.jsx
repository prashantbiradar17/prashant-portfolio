import { ArrowDown } from "lucide-react";
import { AArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="container max-w-4xl mx-auto text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="opacity-0 animate-fade-in">Hi, I'm </span>
          <span className="text-primary opacity-0 animate-fade-in-delay-1">Prashant</span>
          <span className="opacity-0 animate-fade-in-delay-2"> Biradar</span>
        </h1>


        
        <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-0 animate-fade-in-delay-3 text-foreground/80 leading-relaxed mb-8 capitalize">
          I develop modern, high-performance Applications that deliver seamless user experiences across all devices. Combining strong technical skills with a focus on clean design, I build solutions that are both efficient and visually appealing.
        </p>

        
        <a 
          href="#projects" 
        className="ml-4 opacity-0 animate-fade-in-delay-4 inline-flex items-center justify-center relative cosmic-button"
        >
          View My Work
        </a>
        
<a
  target="_blank"
  href="https://drive.google.com/file/d/1BP-meZByTjP7YQZr7ai4R7cZMtLseVz5/view?usp=sharing"
  className="ml-4 opacity-0 animate-fade-in-delay-4 inline-flex items-center justify-center relative cosmic-button"
>
  My Resume
</a>

      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
      <span>scroll</span>
<ArrowDown className="h-5 w-5  text-primary"/>

      </div>
    </section>
);
};
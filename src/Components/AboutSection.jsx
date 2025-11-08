import { Component } from "react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-prose mx-auto md:mx-0 text-lg leading-relaxed text-foreground/80">
          
          <p className="title-accent text-1xl sm:text-1xl md:text-4xl font-extrabold text-primary leading-tight text-center capitalize" >Passionate Web Devoloper Tech Creator</p>
            <p className="text-left text-primary-background capitalize">&#x2022;
              i have a 2 years of experiance in web devolopment, I specialize In
              Creating Responsive Accessible Performative Web Application Using
              Modern Technologies
            </p>

            <p className="text-left capitalize">&#x2022;
              I am Passionate About Creating Elegent Solution to Complex
              Problems,and I'm Constantly Learning new Technologies and techniques
              To Stay At The Fore Front of The Over Evolving Web landScape.
            </p>

          
          </div>

          <div className="flex justify-center md:justify-center">
            <div className="grid grid-cols-1" >
              <img
                src="./public/projects/aboutphoto3.png"
                className="w-80 h-80 md:w-80 md:h-80 rounded-full object-cover"
              />
              <p className="text-4xl md:text-5xl font-bold mb-12 text-center">Prashant Biradar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
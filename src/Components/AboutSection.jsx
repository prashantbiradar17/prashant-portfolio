export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-prose mx-auto md:mx-0 text-lg leading-relaxed text-foreground/80 text-left">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary leading-tight">
              Passionate Full-Stack Developer & Tech Creator
            </p>

            <p>
              I have 2+ years of hands-on experience building responsive,
              accessible, and performance-focused web applications using modern
              tools and frameworks.
            </p>

            <p>
              I love turning complex problems into elegant products. I keep
              learning new technologies and best practices to deliver clean,
              scalable, and user-friendly solutions.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-4">
              <img
                src="/projects/aboutphoto3.png"
                alt="Prashant Biradar"
                className="w-72 h-72 md:w-80 md:h-80 rounded-full object-cover border-4 border-primary/30 shadow-xl shadow-primary/20 animate-float"
              />
              <p className="text-3xl md:text-4xl font-bold text-center">Prashant Biradar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

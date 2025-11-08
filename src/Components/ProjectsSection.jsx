import React from "react";

const projects = [
  {
    id: "1",
    title: "House Price Prediction App",
    description:
      "An app that predicts the cost of a house based on location and geography.",
    image: "/projects/project_1.png",
    tags: ["Python", "NumPy", "Pandas", "Matplotlib", "scikit-learn"],
    demoUrl: "https://house-price-predicction.streamlit.app/",
    githubUrl:
      "https://github.com/prashantbiradar17/house-price-prediction/blob/main/app.py",
  },
  {
    id: "2",
    title: "University Website",
    description:
      "A platform that helps students learn about university rules and connect with peers.",
    image: "/projects/project_2.png",
    tags: ["React", "JavaScript", "CSS"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: "3",
    title: "Fullstack Chatting App",
    description: "A real-time end-to-end encrypted chatting application.",
    image: "/projects/project-3.png",
    tags: ["React", "NodeJS", "ExpressJS", "MongoDB"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative bg-background text-foreground">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects, carefully crafted with attention to detail and performance.
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-muted px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex justify-between items-center">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Live Demo →
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

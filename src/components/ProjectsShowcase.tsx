import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectsShowcase.css";

gsap.registerPlugin(ScrollTrigger);

// Sample project data - replace with your actual projects
const projects = [
  {
    id: 1,
    title: "Project Nova",
    category: "Web Development",
    description:
      "An innovative web application with cutting-edge features and seamless user experience.",
    image: "/api/placeholder/800/450",
    color: "#3498db",
  },
  {
    id: 2,
    title: "Blockchain Solutions",
    category: "Blockchain",
    description:
      "Enterprise-grade blockchain implementation for secure and transparent transactions.",
    image: "/api/placeholder/800/450",
    color: "#2ecc71",
  },
  {
    id: 3,
    title: "Immersive UX",
    category: "Design",
    description:
      "Award-winning design solutions that captivate users and elevate brand experiences.",
    image: "/api/placeholder/800/450",
    color: "#e74c3c",
  },
  {
    id: 4,
    title: "Marketing Campaign",
    category: "Marketing",
    description:
      "Strategic digital marketing campaigns that deliver measurable results and ROI.",
    image: "/api/placeholder/800/450",
    color: "#f39c12",
  },
  {
    id: 5,
    title: "Tech Integration",
    category: "Development",
    description:
      "Seamless integration of multiple technologies to create powerful, unified solutions.",
    image: "/api/placeholder/800/450",
    color: "#9b59b6",
  },
];

function ProjectsShowcase() {
  const projectsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Animate each project card as user scrolls
    projectsRef.current.forEach((project) => {
      gsap.set(project, {
        opacity: 0,
        y: "10vh",
      });

      gsap.to(project, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: project,
          start: "top 90%",
          end: "top 60%",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      className="projects-container"
      style={{
        marginTop: "350vh", // Pushes the section down so it appears after the logo zoom
      }}
    >
      <h2 className="projects-title">Our Projects</h2>

      {projects.map((project, index) => (
        <div
          className="project-card"
          key={project.id}
          ref={(el) => {
            if (el) {
              projectsRef.current[index] = el;
            }
          }}
          style={{
            backgroundColor: `${project.color}10`,
            borderLeft: `4px solid ${project.color}`,
          }}
        >
          <div className="project-content">
            <div className="project-text">
              <h3 className="project-title">{project.title}</h3>
              <span className="project-category">{project.category}</span>
              <p className="project-description">{project.description}</p>
            </div>
            <div className="project-image">
              <img src={project.image} alt={project.title} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectsShowcase;

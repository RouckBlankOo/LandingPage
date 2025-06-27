import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectsShowcase.css";

// Import project images
import kidsPilotImg from "../assets/KidoPilot.png";
import digiPlanterImg from "../assets/DigiPlanterWeb.png";
import coantraImg from "../assets/Cointra.png";
import sayAlloImg from "../assets/Immo.png";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  color: string; // Added color property for each project
}

const projects: Project[] = [
  {
    id: 1,
    title: "KidoPilot",
    description: "Smart Child Growth & Well-being App",
    image: kidsPilotImg,
    technologies: [
      "React Native",
      "AI Insights",
      "Growth Tracking",
      "Interactive Learning",
    ],
    color: "#4DC9F6", // Blue color theme
  },
  {
    id: 2,
    title: "DigiPlanter",
    description: "Smart Plant Care App | Minimalist IoT Planter",
    image: digiPlanterImg,
    technologies: ["IoT", "Plant Monitoring", "Mobile App", "Smart Sensors"],
    color: "#5CB270", // Green color theme
  },
  {
    id: 3,
    title: "Coantra",
    description: "Live Sport Coaching & Nutrition App | Real-time Guidance",
    image: coantraImg,
    technologies: [
      "Fitness Tracking",
      "Live Sessions",
      "Analytics",
      "Personalized Goals",
    ],
    color: "#C9C8E6FF", // Red color theme
  },
  {
    id: 4,
    title: "Say Allo Immo",
    description: "Real Estate Platform | Property Management Solution",
    image: sayAlloImg,
    technologies: [
      "Property Listings",
      "Real Estate",
      "Transaction Management",
      "Client Portal",
    ],
    color: "#D30B0BFF", // Orange color theme
  },
];

const ProjectsShowcase = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  // Create smooth scroll snapping and title animation
  useEffect(() => {
    // Smooth scroll setup
    gsap.to(window, {
      scrollTrigger: {
        start: 0,
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0.1,
      },
      ease: "power2.inOut",
    });

    // Animated title with text reveal effect
    if (titleRef.current) {
      // Split text for character animation
      const text = titleRef.current.textContent || "";
      titleRef.current.textContent = "";

      // Create wrapper for title
      const wrapper = document.createElement("span");
      wrapper.className = "title-wrapper";
      titleRef.current.appendChild(wrapper);

      // Create character spans
      [...text].forEach((char) => {
        const span = document.createElement("span");
        span.className = "title-char";
        span.textContent = char === " " ? "\u00A0" : char;
        wrapper.appendChild(span);
      });

      // Line after title
      const line = document.createElement("span");
      line.className = "title-line";
      titleRef.current.appendChild(line);

      // Animate each character and the line
      const chars = titleRef.current.querySelectorAll(".title-char");

      gsap.fromTo(
        chars,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        line,
        { width: 0, opacity: 0 },
        {
          width: "120px",
          opacity: 1,
          duration: 1,
          delay: 1.2,
          ease: "power2.out",
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!projectsRef.current) return;

    const projectWrappers =
      projectsRef.current.querySelectorAll(".project-wrapper");
    const projectCards = projectsRef.current.querySelectorAll(".project-card");

    // Create 3D tilt effect on cards
    projectCards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const e = event as MouseEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleX = (y - centerY) / 25;
        const angleY = (centerX - x) / 25;

        gsap.to(card, {
          rotationX: angleX,
          rotationY: angleY,
          duration: 0.5,
          ease: "power1.out",
          transformPerspective: 1000,
          transformOrigin: "center center",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
        });
      });
    });

    // Pin for each section
    projectWrappers.forEach((wrapper, index) => {
      const card = wrapper.querySelector(".project-card") as HTMLElement;

      // Create timeline for entering each project
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 70%",
          end: "center center",
          scrub: 0.5,
          toggleClass: { targets: card, className: "active" },
          onEnter: () => {
            setActiveIndex(index);
          },
          onLeaveBack: () => {
            setActiveIndex(Math.max(0, index - 1));
          },
        },
      });

      // Get all relevant elements
      const image = card.querySelector(".project-image");
      const title = card.querySelector("h3");
      const description = card.querySelector("p");
      const tags = card.querySelectorAll(".tech-tag");
      const iconElements = card.querySelectorAll(".project-icon");

      // Animation sequence
      tl.fromTo(
        card,
        { y: 100, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5 }
      )
        .fromTo(
          image,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3 },
          "-=0.2"
        )
        .fromTo(
          title,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3 },
          "-=0.1"
        )
        .fromTo(
          description,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3 },
          "-=0.1"
        )
        .fromTo(
          tags,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.2 },
          "-=0.1"
        )
        .fromTo(
          iconElements,
          { scale: 0, rotation: "-45deg" },
          {
            scale: 1,
            rotation: "0deg",
            stagger: 0.1,
            duration: 0.3,
            ease: "back.out(2)",
          },
          "-=0.2"
        );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="projects-showcase" ref={projectsRef}>
      <h2 className="projects-title" ref={titleRef}>
        Our Projects
      </h2>

      {/* Project cards */}
      <div className="projects-container">
        {projects.map((project, index) => (
          <div
            className="project-wrapper"
            key={project.id}
            data-index={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            <div
              className={`project-card ${
                index === activeIndex ? "active" : ""
              } ${hoveredIndex === index ? "hovered" : ""}`}
              style={
                {
                  "--project-color": project.color,
                } as React.CSSProperties
              }
            >
              <div className="card-shadow"></div>
              <div className="card-content">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />

                  {/* Project corner icons */}
                  <div className="project-icons">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <div
                        key={i}
                        className="project-icon"
                        style={{ transform: `rotate(${i * 45}deg)` }}
                      >
                        {tech.includes("AI") || tech.includes("Analytics")
                          ? "🧠"
                          : tech.includes("Mobile") ||
                            tech.includes("React Native")
                          ? "📱"
                          : tech.includes("IoT") || tech.includes("Sensor")
                          ? "🔌"
                          : tech.includes("Real Estate") ||
                            tech.includes("Property")
                          ? "🏠"
                          : "💻"}
                      </div>
                    ))}
                  </div>

                  {/* Interactive overlay */}
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <span className="view-project">View Project</span>
                    </div>
                  </div>
                </div>

                <div className="project-details">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive elements */}
              <div className="card-action">
                <button className="explore-btn">Explore</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsShowcase;

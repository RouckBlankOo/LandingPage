import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ServicesSection.css";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Mobile App Development",
    description:
      "Native and cross-platform apps with seamless user experience and cutting-edge functionality.",
    icon: "📱",
  },
  {
    id: 2,
    title: "Web Development",
    description:
      "Responsive websites and web applications built with modern frameworks and optimized performance.",
    icon: "💻",
  },
  {
    id: 3,
    title: "UI/UX Design",
    description:
      "User-centered design that combines aesthetics with functionality to create engaging experiences.",
    icon: "🎨",
  },
  {
    id: 4,
    title: "IoT Solutions",
    description:
      "Smart device integration and custom IoT platforms that connect the physical and digital worlds.",
    icon: "🔌",
  },
  {
    id: 5,
    title: "AI & ML Integration",
    description:
      "Advanced artificial intelligence and machine learning solutions to add intelligence to your applications.",
    icon: "🧠",
  },
  {
    id: 6,
    title: "DevOps & Cloud",
    description:
      "Streamlined development operations and robust cloud infrastructure for scalable solutions.",
    icon: "☁️",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !headingRef.current ||
      !containerRef.current ||
      !ctaRef.current
    )
      return;

    // Animate heading with 3D cascade effect
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 100, rotateX: 60, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.75)",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          end: "bottom 65%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Service items with cascading effect
    const serviceItems = containerRef.current.querySelectorAll(".service-item");

    gsap.set(serviceItems, {
      opacity: 0,
      y: (i) => 200 + i * 50,
      rotateY: (i) => (i % 2 === 0 ? 60 : -60),
      rotateX: 30,
      transformPerspective: 1200,
      transformOrigin: "center center",
      z: -500,
    });

    const serviceTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom 25%",
        scrub: 0.8,
      },
    });

    serviceTl.to(serviceItems, {
      opacity: 1,
      y: 0,
      z: 0,
      rotateY: 0,
      rotateX: 0,
      stagger: 0.25,
      duration: 1.5,
      ease: "power4.out",
      delay: () => Math.random() * 0.2,
    });

    // Multi-layered parallax for service items
    serviceItems.forEach((item, index) => {
      const icon = item.querySelector(".service-icon");
      const title = item.querySelector(".service-title-scroll");
      const description = item.querySelector(".service-description");

      gsap.to(icon, {
        y: () => -window.innerHeight * 0.3 * (index % 2 === 0 ? 1 : -1),
        z: 50,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(title, {
        y: () => -window.innerHeight * 0.2 * (index % 2 === 0 ? -1 : 1),
        z: 30,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(description, {
        y: () => -window.innerHeight * 0.1 * (index % 2 === 0 ? 1 : -1),
        z: 10,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Title scroll with 3D tilt
    const titles = document.querySelectorAll(".service-title-scroll");

    titles.forEach((title) => {
      const textWidth = (title as HTMLElement).scrollWidth;
      const containerWidth = (title.parentNode as HTMLElement).offsetWidth;

      if (textWidth > containerWidth) {
        gsap.to(title, {
          x: -(textWidth - containerWidth),
          rotateY: -20,
          rotateX: 10,
          transformPerspective: 1200,
          ease: "none",
          scrollTrigger: {
            trigger: title.parentNode as HTMLElement,
            start: "top 75%",
            end: "bottom 25%",
            scrub: true,
          },
        });
      }
    });

    // CTA animation (appears after services)
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 100, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
          end: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Slide ServicesSection out when TechnologiesSection appears
    const techSection = document.querySelector(".technologies-section");
    if (techSection) {
      gsap.fromTo(
        sectionRef.current,
        { x: 0 },
        {
          x: "-100%",
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: techSection,
            start: "top bottom",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="services-section" ref={sectionRef}>
      <h2 className="services-heading" ref={headingRef}>
        <span className="highlight">Our</span> Services
      </h2>

      <div className="services-container" ref={containerRef}>
        {services.map((service) => (
          <div className="service-item" key={service.id}>
            <div className="service-icon">{service.icon}</div>
            <div className="service-title">
              <div className="service-title-scroll">{service.title}</div>
            </div>
            <div className="service-description">{service.description}</div>
            <div className="texture-layer"></div>
          </div>
        ))}
      </div>

      <div className="services-cta" ref={ctaRef}>
        <p>Need a custom solution for your business?</p>
        <button className="cta-button">Get in Touch</button>
      </div>
    </div>
  );
};

export default ServicesSection;

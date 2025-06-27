"use client";

import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import {
  SiReact,
  SiFlutter,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiFramer,
  SiGreensock,
  SiThreedotjs,
} from "react-icons/si";
import "./TechnologiesSection.css";

interface Technology {
  id: number;
  name: string;
  description: string;
  icon: React.ComponentType<{ size: number; color: string }>;
}

const technologies: Technology[] = [
  {
    id: 1,
    name: "React",
    description:
      "Dynamic and scalable web applications with reusable components.",
    icon: SiReact,
  },
  {
    id: 2,
    name: "React Native",
    description: "Cross-platform mobile apps with native performance.",
    icon: SiReact,
  },
  {
    id: 3,
    name: "Flutter",
    description: "Fast, beautiful, and cross-platform mobile and web apps.",
    icon: SiFlutter,
  },
  {
    id: 4,
    name: "JavaScript",
    description: "Versatile programming for interactive web experiences.",
    icon: SiJavascript,
  },
  {
    id: 5,
    name: "TypeScript",
    description:
      "Enhanced JavaScript with static types for robust applications.",
    icon: SiTypescript,
  },
  {
    id: 6,
    name: "Node.js",
    description: "Scalable backend solutions for real-time applications.",
    icon: SiNodedotjs,
  },
  {
    id: 7,
    name: "Express",
    description: "Fast and minimalist web framework for Node.js APIs.",
    icon: SiExpress,
  },
  {
    id: 8,
    name: "MongoDB",
    description: "Flexible NoSQL database for modern, scalable applications.",
    icon: SiMongodb,
  },
  {
    id: 9,
    name: "SQL",
    description: "Structured data management for reliable database solutions.",
    icon: SiPostgresql,
  },
  {
    id: 10,
    name: "Framer Motion",
    description: "Smooth and powerful animations for React applications.",
    icon: SiFramer,
  },
  {
    id: 11,
    name: "GSAP",
    description: "High-performance animations for engaging web experiences.",
    icon: SiGreensock,
  },
  {
    id: 12,
    name: "Three.js",
    description: "3D graphics and immersive visualizations for the web.",
    icon: SiThreedotjs,
  },
];

interface TechnologyColumnProps {
  technologies: Technology[];
  className?: string;
  reverse?: boolean;
}

const TechnologyColumn = ({
  technologies,
  className,
  reverse,
}: TechnologyColumnProps) => {
  return (
    <motion.div
      initial={{ y: reverse ? "-50%" : 0 }}
      animate={{ y: reverse ? 0 : "-50%" }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      }}
      className={twMerge("flex flex-col gap-8 pb-8", className)} // Increased gap from 4 to 8
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <Fragment key={i}>
          {technologies.map((tech) => {
            const IconComponent = tech.icon;
            return (
              <div
                key={`${tech.id}-${i}`}
                className="tech-item bg-neutral-900 border border-white/10 rounded-3xl p-6"
              >
                <div className="tech-icon flex justify-center">
                  <IconComponent size={48} color="#ffffff" />
                </div>
                <h3 className="tech-name text-3xl text-center mt-6">
                  {tech.name}
                </h3>
                <p className="tech-description text-center text-white/50 mt-2">
                  {tech.description}
                </p>
              </div>
            );
          })}
        </Fragment>
      ))}
    </motion.div>
  );
};

const TechnologiesSection = () => {
  return (
    <div className="technologies-section">
      <h2 className="technologies-heading">
        <span className="highlight">Our</span> Technologies
      </h2>
      <div className="technologies-container">
        <TechnologyColumn technologies={technologies} />
        <TechnologyColumn
          technologies={technologies.slice().reverse()}
          className="hidden md:flex"
          reverse
        />
      </div>
    </div>
  );
};

export default TechnologiesSection;

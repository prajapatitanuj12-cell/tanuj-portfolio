import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail } from "lucide-react";
import { SiFigma } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

import profileImg from "@assets/pi/profile.png";
import logoImg from "@assets/pi/logo.png";
import projectTom from "@assets/pi/project-tom.png";
import projectFitsync from "@assets/pi/project-fitsync.png";
import projectBixjet from "@assets/pi/project-bixjet.png";
import projectWinbid from "@assets/pi/project-winbid.png";
import projectEstateflow from "@assets/pi/project-estateflow.png";
import projectZayra from "@assets/pi/project-zayra.png";
import contactEmail from "@assets/pi/contact-email.png";
import contactLinkedin from "@assets/pi/contact-linkedin.png";
import contactCall from "@assets/pi/contact-call.png";
import iconSmartphone from "@assets/pi/icon-smartphone.png";
import iconGps from "@assets/pi/icon-gps.png";
import iconUser from "@assets/pi/icon-user.png";
import featuredBixjet from "@assets/pi/featured-bixjet.png";
import featuredMach from "@assets/pi/featured-mach.png";

// ─── Data ────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: "TOM",
    category: "Mobile App Design",
    description:
      "A thoughtfully crafted mobile experience designed around user empathy. Clean flows, intuitive navigation, and a visual system built to scale.",
    image: projectTom,
    tags: ["UX Research", "UI Design", "Prototyping"],
    link: "https://www.figma.com/design/DIqrKoCFY3zgXuycaTIfdJ/TOM?node-id=0-1&t=ps1AeZjFcJqPhwqt-1",
  },
  {
    id: 2,
    title: "FitSync Health",
    category: "Health & Wellness App",
    description:
      "A health tracking platform that makes wellness data feel approachable. Visualising complex biometrics through clear, motivating interfaces.",
    image: projectFitsync,
    tags: ["Product Design", "Data Viz", "Interaction Design"],
    link: "https://www.figma.com/design/ilINF5yu0wzIN2XgjEV5sk/FItSync-Website-Deisgn?node-id=0-1&t=DMFjEGRbevVZaDB9-1",
  },
  {
    id: 3,
    title: "BixJet Website",
    category: "Web Platform Design",
    description:
      "A high-impact website for a modern brand. Bold typography, fluid layouts, and a design system built for consistency across every touchpoint.",
    image: projectBixjet,
    tags: ["Web Design", "Design Systems", "UI Design"],
    link: "https://bixjet.com/",
  },
  {
    id: 4,
    title: "WinBid",
    category: "Auction Platform",
    description:
      "A competitive bidding platform redesigned for speed and clarity. Real-time updates, smart notifications, and a frictionless auction experience.",
    image: projectWinbid,
    tags: ["UX Research", "Interaction Design", "Prototyping"],
    link: "https://www.figma.com/design/54y6l5M9IGgtG2ir4M4DD9/WinBid-App-Design?node-id=0-1&t=4NBulbmRqiHPm8OQ-1",
  },
  {
    id: 5,
    title: "EstateFlow",
    category: "Real Estate Platform",
    description:
      "Transforming how people discover and manage property. Seamless search, map integration, and listing management — all in one elegant flow.",
    image: projectEstateflow,
    tags: ["Product Design", "UI Design", "Wireframing"],
    link: "https://www.figma.com/design/sY1A7C61jO6k3V7N5xMEaw/Estate-Flow?node-id=0-1&t=oKC7JHrUHqKhRRPV-1",
  },
  {
    id: 6,
    title: "Zayra Pay",
    category: "FinTech App",
    description:
      "A next-generation payment app built on trust and clarity. Elegant transaction flows, security-forward design, and a dashboard that puts users in control.",
    image: projectZayra,
    tags: ["FinTech Design", "UI Design", "Motion Design"],
    link: "https://www.figma.com/design/kz6zAdeMeOfvMyD1BLDpQp/Zayra-Pay?node-id=0-1&t=xlReW6SmSKJCZ3Hm-1",
  },
];

const skills = [
  "User Interface Design",
  "User Experience Research",
  "Rapid Prototyping",
  "Design Systems",
  "Interaction Design",
  "Wireframing",
  "Typography",
  "Motion Design",
  "Information Architecture",
  "Usability Testing",
  "Figma Expert",
  "Frontend Collaboration",
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Empathy",
    description:
      "Understanding the problem space, user needs, and business goals through deep research and stakeholder interviews.",
  },
  {
    number: "02",
    title: "Strategy & Architecture",
    description:
      "Defining the product structure, user flows, and wireframes to ensure a logical and intuitive foundation.",
  },
  {
    number: "03",
    title: "Visual Exploration",
    description:
      "Crafting the visual language — exploring typography, colour, and layout to establish a compelling aesthetic direction.",
  },
  {
    number: "04",
    title: "Refinement & Prototyping",
    description:
      "Bringing the design to life with high-fidelity components, micro-interactions, and testable prototypes.",
  },
];

// ─── Animation helpers ────────────────────────────────────────────────────────

const EASE = [0.25, 0.1, 0.25, 1] as const;

const fireGradient = "linear-gradient(90deg,#FF6B35,#E63946,#FFD60A)";

const gradientText: React.CSSProperties = {
  background: fireGradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// ─── Sub-components (each can call hooks at top level) ────────────────────────

function GlowOrb({ className }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none ${className}`}
    />
  );
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#home">
          <img src={logoImg} alt="Tanuj" className="h-8 w-auto object-contain" />
        </a>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          {["Work", "Expertise", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-white transition-colors duration-200 relative
                after:absolute after:bottom-0 after:left-0 after:h-px after:w-0
                after:bg-[#FF6B35] hover:after:w-full after:transition-all after:duration-300"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Marquee() {
  // Triple the skills so the animation loop is seamless at any viewport width
  const items = [...skills, ...skills, ...skills];
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-12 pr-12"
        style={{ width: "max-content", willChange: "transform" }}
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
      >
        {items.map((skill, i) => (
          <div key={i} className="flex items-center gap-12 shrink-0">
            <span
              className="text-3xl md:text-5xl font-bold uppercase tracking-wider whitespace-nowrap
                opacity-40 hover:opacity-90 hover:text-white transition-all duration-300 cursor-default"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)", color: "transparent" }}
            >
              {skill}
            </span>
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: fireGradient }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Each project card is its own component so hooks are called at the top level
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.75, ease: EASE }}
      className={`flex flex-col ${
        index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
      } gap-12 lg:gap-16 items-center group`}
    >
      {/* Image */}
      <div className="w-full lg:w-3/5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-900 border border-white/5 group-hover:border-white/20 transition-all duration-500">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 mix-blend-overlay transition-opacity duration-500 z-10 pointer-events-none"
          style={{ background: fireGradient }}
        />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>

      {/* Text */}
      <div className="w-full lg:w-2/5 flex flex-col items-start">
        <p className="text-[#FF6B35] font-mono text-sm tracking-widest uppercase mb-4">
          {project.category}
        </p>
        <h3 className="text-3xl md:text-4xl font-bold mb-5 text-white">{project.title}</h3>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-3 mb-10">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white font-medium hover:text-[#FF6B35] transition-colors duration-300
            relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0
            after:bg-[#FF6B35] hover:after:w-full after:transition-all after:duration-300"
        >
          View Project <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

function ProcessCard({
  step,
  index,
}: {
  step: (typeof processSteps)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.1 }}
      className={`relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300 ${
        index % 2 === 0 ? "md:text-right md:mr-10" : "md:ml-10 md:mt-20"
      }`}
    >
      <div
        className={`hidden md:block absolute top-1/2 w-10 h-px bg-white/20 ${
          index % 2 === 0 ? "-right-10" : "-left-10"
        }`}
      />
      <div
        className={`hidden md:block absolute top-1/2 w-3 h-3 rounded-full -translate-y-1/2 z-10 ${
          index % 2 === 0 ? "-right-[46px]" : "-left-[46px]"
        }`}
        style={{ background: "#FF6B35", boxShadow: "0 0 12px rgba(255,107,53,0.8)" }}
      />
      <span className="text-6xl font-bold text-white/5 block mb-4">{step.number}</span>
      <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
      <p className="text-gray-400 leading-relaxed">{step.description}</p>
    </motion.div>
  );
}

function AboutSection() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-80px" });
  const rightInView = useInView(rightRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-32 px-6 bg-zinc-950">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile image */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -50 }}
            animate={leftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.75, ease: EASE }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative z-10 border border-white/10">
              <img src={profileImg} alt="Tanuj Prajapati" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -inset-4 border border-white/10 rounded-2xl z-0 -rotate-2" />
            <div
              className="absolute -inset-4 border rounded-2xl z-0 rotate-2"
              style={{ borderColor: "rgba(255,107,53,0.3)" }}
            />
          </motion.div>

          {/* Text */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 50 }}
            animate={rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Crafting <span style={gradientText}>Digital Matter</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed">
              <p>
                I believe that the best interfaces feel like they have always existed. They don't
                demand attention — they quietly facilitate human intention.
              </p>
              <p>
                My journey in design started with a fascination for architecture — how spaces dictate
                behaviour. Today, I build digital spaces that scale and experiences that resonate on
                an emotional level.
              </p>
              <p>
                When I'm not pushing pixels or debating typography, you'll find me analysing film
                cinematography, exploring brutalist architecture, or hunting for the perfect cup of
                dark roast coffee.
              </p>
            </div>
            <div className="mt-12 flex flex-wrap gap-6">
              {[
                { icon: <SiFigma className="w-5 h-5" />, label: "Figma", href: "#" },
                { icon: <FaLinkedin className="w-5 h-5" />, label: "LinkedIn", href: "https://www.linkedin.com/in/tanuj-prajapati-066218321/" },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300"
                >
                  {icon}
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-40 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0" />
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="p-12 md:p-20 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm relative overflow-hidden"
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-60"
            style={{ background: "linear-gradient(90deg,transparent,#FF6B35,transparent)" }}
          />
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            Let's build something <span style={gradientText}>extraordinary.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-14 max-w-2xl mx-auto">
            Currently open for new opportunities. Whether you have a project in mind or just want to
            chat about design, feel free to reach out.
          </p>

          {/* Contact cards */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            {[
              {
                img: contactEmail,
                label: "Send an Email",
                sub: "tanujprajapati004@gmail.com",
                href: "mailto:tanujprajapati004@gmail.com",
              },
              { img: contactLinkedin, label: "LinkedIn", sub: "Connect with me", href: "https://www.linkedin.com/in/tanuj-prajapati-066218321/" },
              { img: contactCall, label: "Schedule a Call", sub: "+91 7567113322", href: "tel:+917567113322" },
            ].map(({ img, label, sub, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.03]
                  hover:bg-white/[0.07] hover:border-[#FF6B35]/40 transition-all duration-300 group text-left"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 p-1.5">
                  <img src={img} alt={label} className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm group-hover:text-[#FF6B35] transition-colors duration-300">
                    {label}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">{sub}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center gap-8 border-t border-white/10 pt-10">
            <a
              href="https://www.linkedin.com/in/tanuj-prajapati-066218321/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors duration-300 flex items-center gap-2"
            >
              <FaLinkedin className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const card1Ref = useRef(null);
  const card1InView = useInView(card1Ref, { once: true, margin: "-8%" });

  const card2Ref = useRef(null);
  const card2InView = useInView(card2Ref, { once: true, margin: "-8%" });

  return (
    <section className="py-32 px-6 bg-black/30">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Featured <span style={gradientText}>Projects</span>
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-xl">
            Flagship projects that define my craft — where deep research meets bold visual execution.
          </p>
        </motion.div>

        {/* Card 1 — BixJet, full width */}
        <motion.div
          ref={card1Ref}
          initial={{ opacity: 0, y: 60 }}
          animate={card1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="group relative rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 mb-6"
        >
          <div className="w-full relative bg-zinc-900" style={{ minHeight: "520px" }}>
            <img
              src={featuredBixjet}
              alt="BixJet Website"
              className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              style={{ position: "absolute", inset: 0 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500"
              style={{ background: fireGradient }}
            />
          </div>

          {/* Info bar */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[#FF6B35] font-mono text-xs tracking-widest uppercase block mb-2">
                Web Platform Design
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white">BixJet Website</h3>
              <p className="text-gray-400 mt-2 max-w-xl text-sm md:text-base">
                Bold typography, fluid layouts, and a design system built for consistency — a high-impact web presence for a modern brand.
              </p>
            </div>
            <a
              href="https://bix-jet-ui-3.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-black flex-shrink-0 hover:scale-105 active:scale-95 transition-transform duration-300"
              style={{ background: fireGradient }}
            >
              View Product <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Top badge */}
          <div className="absolute top-6 left-6 flex gap-3">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
              ✦ Featured
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs">
              UI Design
            </span>
          </div>
        </motion.div>

        {/* Card 2 — Mach Mentality, full width */}
        <motion.div
          ref={card2Ref}
          initial={{ opacity: 0, y: 60 }}
          animate={card2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="group relative rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500"
        >
          <div className="w-full relative bg-zinc-900" style={{ minHeight: "520px" }}>
            <img
              src={featuredMach}
              alt="Mach Mentality"
              className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              style={{ position: "absolute", inset: 0 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500"
              style={{ background: fireGradient }}
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[#FFD60A] font-mono text-xs tracking-widest uppercase block mb-2">
                Brand Identity & Design
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white">Mach Mentality</h3>
              <p className="text-gray-400 mt-2 max-w-xl text-sm md:text-base">
                A performance-first brand identity that commands attention — kinetic energy translated into bold visual language.
              </p>
            </div>
            <a
              href="https://machmentality.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-black flex-shrink-0 hover:scale-105 active:scale-95 transition-transform duration-300"
              style={{ background: fireGradient }}
            >
              View Website <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="absolute top-6 left-6 flex gap-3">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
              ✦ Featured
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs">
              Branding
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeading({
  children,
  subtitle,
  center = false,
}: {
  children: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={center ? "text-center" : ""}
    >
      {children}
      {subtitle && (
        <p className={`text-gray-400 text-lg mt-4 ${center ? "max-w-2xl mx-auto" : "max-w-xl"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 0.25], [0, 120]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-[#FF6B35]/30">
      <NavBar />

      {/* Ambient glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <GlowOrb className="w-[700px] h-[700px] bg-[#FF6B35] top-[-250px] left-[-250px]" />
        <GlowOrb className="w-[900px] h-[900px] bg-[#E63946] bottom-[-450px] right-[-250px] opacity-10" />
        <GlowOrb className="w-[500px] h-[500px] bg-[#FFD60A] top-[45%] left-[55%] opacity-[0.06]" />
      </div>

      <div className="relative z-10">
        {/* ── HERO ──────────────────────────────────────────────── */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative">
          <motion.div
            style={{ y: yHero, opacity: opacityHero }}
            className="container mx-auto flex flex-col items-center text-center max-w-5xl"
          >
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="mb-10 relative"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 relative z-10">
                <img
                  src={profileImg}
                  alt="Tanuj Prajapati"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-50 z-0"
                style={{ background: fireGradient }}
              />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
            >
              Designing experiences
              <br />
              that feel{" "}
              <span className="italic pr-1" style={gradientText}>
                inevitable.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.38, ease: EASE }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 font-light leading-relaxed"
            >
              I am Tanuj Prajapati, a UX/UI Designer operating at the intersection of bold visual
              expression and intuitive interaction. Where intuition meets intention.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              className="flex flex-col sm:flex-row gap-5 items-center"
            >
              <a
                href="#work"
                className="group relative px-8 py-4 font-semibold rounded-full overflow-hidden
                  hover:scale-105 active:scale-95 transition-transform duration-300"
                style={{ background: fireGradient }}
              >
                <span className="relative z-10 flex items-center gap-2 text-black">
                  See My Projects
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
                </span>
              </a>
              <a
                href="https://drive.google.com/file/d/1lDNsO9z-euyG10sarBZEQzShMc4JiPSK/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 font-medium text-white border border-white/20 rounded-full
                  hover:bg-white/5 hover:border-white/40 transition-all duration-300"
              >
                View Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-gray-500" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── FEATURED PROJECTS ─────────────────────────────────── */}
        <FeaturedProjects />

        {/* ── WORK ──────────────────────────────────────────────── */}
        <section id="work" className="py-32 px-6">
          <div className="container mx-auto max-w-6xl">
            <SectionHeading
              subtitle="A curated collection of digital products, interfaces, and experiences designed with purpose."
              center={false}
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">
                Selected <span style={gradientText}>Work</span>
              </h2>
            </SectionHeading>

            <div className="flex flex-col gap-28 mt-20">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS MARQUEE ────────────────────────────────────── */}
        <section
          id="expertise"
          className="py-20 border-y border-white/5 bg-black/40 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-[hsl(0_0%_4%)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-[hsl(0_0%_4%)] to-transparent z-10 pointer-events-none" />
          <Marquee />
        </section>

        {/* ── PROCESS ───────────────────────────────────────────── */}
        <section className="py-32 px-6 relative">
          <div className="container mx-auto max-w-5xl">
            <SectionHeading
              subtitle="Design is not just what it looks like — it's how it works. A structured approach to solving complex problems."
              center
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">
                The <span style={gradientText}>Process</span>
              </h2>
            </SectionHeading>

            <div className="grid md:grid-cols-2 gap-8 md:gap-14 relative mt-24">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
              {processSteps.map((step, index) => (
                <ProcessCard key={index} step={step} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ─────────────────────────────────────────────── */}
        <AboutSection />

        {/* ── CONTACT ───────────────────────────────────────────── */}
        <ContactSection />

        {/* ── FOOTER ────────────────────────────────────────────── */}
        <footer className="py-8 px-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src={logoImg} alt="Tanuj" className="h-7 w-auto object-contain opacity-60" />
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Tanuj Prajapati. Designed with intention.
          </p>
          <div className="flex gap-5">
            <a
              href="https://www.linkedin.com/in/tanuj-prajapati-066218321/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-white transition-colors duration-300"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}

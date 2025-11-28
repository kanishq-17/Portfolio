// CenterPage.jsx
import React, { useEffect, useState } from "react";
import { MdWork } from "react-icons/md";
import { PiGearFine } from "react-icons/pi";
import { GoFileCode } from "react-icons/go";
import { FaPlay, FaPause } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { LiaHeadphonesAltSolid } from "react-icons/lia";
import { FaFilePen } from "react-icons/fa6";
import { FiTarget, FiCode, FiPenTool } from "react-icons/fi";
import { FaLaptopCode, FaUserAstronaut } from "react-icons/fa";

import {
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
} from "react-icons/si";

/**
 * Updated CenterPage:
 * - Overview: black & white baseline, color on hover
 * - Project images grayscale -> color on hover; skill tags color on hover
 * - Tech stack grayscale -> brand color on hover + scale animation
 * - People avatars grayscale -> color with downward colored shadow on hover
 * - How I Work interactive steps: click to change active step and navigate to /collaborate
 * - Small audio player using /assets/Pussypodium.mp3 (put file in public/assets)
 */

const skillColorMap = {
  React: "bg-[#61dafb]",
  "UI Design": "bg-[#FFB86C]",
  Frontend: "bg-[#ff7a3a]",
  GSAP: "bg-[#f7df1e]",
  Tailwindcss: "bg-cyan-700",
};

// const techColorMap = {
//   React: "bg-[#61dafb]",
//   GSAP: "bg-[#1d9bf0]",
//   Tailwindcss: "bg-[#38b2ac]",
//   JavaScript: "bg-[#f7df1e]",
//   Notion: "bg-[#000000]",
//   LinkedIn: "bg-[#0A66C2]",
//   Sheets: "bg-[#34A853]",
// };

const people = [
  {
    img: "/icons/icon1.png",
    name: "Mayank Pareek",
    title: "3D Artist",
    color: "#4f46e5",
    outline: "#1E90FF",
  },
  {
    img: "/icons/icon2.jpg",
    name: "Vinit Modi",
    title: "Business Analyst",
    color: "#7c3aed",
    outline: "#A52A2A",
  },
  {
    img: "/icons/icon3.jpg",
    name: "Rajat Sen",
    title: "Full Stack Dev",
    color: "#16a34a",
    outline: "lime",
  },
  {
    img: "/icons/icon4.jpg",
    name: "Anupam Mishra",
    title: "Data Engineer",
    color: "#f59e0b",
    outline: "lightyellow",
  },
  {
    img: "/icons/icon5.jpg",
    name: "Ritik Singh",
    title: "Front End Dev",
    color: "#fb7185",
    outline: "#FF8C00",
  },
];

const CenterPage = () => {
  const navigate = useNavigate();

  // audio player
  // const audioRef = useRef(null);
  // const [isPlaying, setIsPlaying] = useState(false);

  // How I work: active step
  const [activeStep, setActiveStep] = useState(1);

  // project hover state (for special per-card interactions)
  const [hoverProjectIndex, setHoverProjectIndex] = useState(null);

  const [isPlaying, setIsPlaying] = useState(() => {
    // initial UI state: check global flag or localStorage
    if (typeof window !== "undefined") {
      return (
        !!window.__GLOBAL_AUDIO_IS_PLAYING__ ||
        localStorage.getItem("global_audio_playing") === "true"
      );
    }
    return false;
  });

  // sample projects (two shown in original layout)
  const projects = [
    {
      id: 0,
      img: "/projectImg/projectImg8.png",
      title: "Tesla Landing Page",
      short:
        "Modern single-page marketing site for an EV brand — micro-animations, responsive layout and CMS-ready sections.",
      skills: ["React", "UI Design", "Frontend"],
    },
    {
      id: 1,
      img: "/projectImg/projectImg5.png",
      title: "DataSquare",
      short:
        "Interactive dataset visualization tool built with React + Tailwind and GSAP for smooth transitions and charts.",
      skills: ["React", "GSAP", "Tailwindcss"],
    },
  ];

  // techstack simplified list
  // const techStack = [
  //   "React",
  //   "GSAP",
  //   "Tailwindcss",
  //   "JavaScript",
  //   "Notion",
  //   "Sheets",
  // ];

  // Experience items
  const experience = [
    { year: "2023", company: "Guljag Info Tech", role: "Frontend Engineer" },
    {
      year: "2024",
      company: "Celebal Technologies",
      role: "Frontend Engineer",
    },
  ];

  // How I work content (replaceable)
  const steps = [
    {
      id: 1,
      heading: "Discovery Call",
      content:
        "30-minute call to understand your goals, constraints and success metrics. We set scope and a clear next step.",
      bg: "bg-gradient-to-r from-gray-900 to-gray-700",
    },
    {
      id: 2,
      heading: "Scope & Proposal",
      content:
        "I prepare a clear proposal with wireframes, timeline and costs. We align milestones and delivery dates.",
      bg: "bg-gradient-to-r from-indigo-900 to-indigo-700",
    },
    {
      id: 3,
      heading: "Design & Build",
      content:
        "Designs come to life with responsive, accessible code. I share previews and iterate until sign-off.",
      bg: "bg-gradient-to-r from-emerald-900 to-emerald-700",
    },
    {
      id: 4,
      heading: "Ship & Support",
      content:
        "I help with deployment, analytics hook-ups and a short support window for any post-launch tweaks.",
      bg: "bg-gradient-to-r from-rose-900 to-rose-700",
    },
  ];

  // ensure global audio exists (in case you forgot to init in index)
  useEffect(() => {
    if (typeof window !== "undefined" && !window.__GLOBAL_AUDIO__) {
      const audio = new Audio("/assets/Pussypodium.mp3");
      audio.loop = true;
      audio.preload = "metadata";
      audio.volume = 0.7;
      window.__GLOBAL_AUDIO__ = audio;
      window.__GLOBAL_AUDIO_IS_PLAYING__ = false;
    }

    // Sync local state with global when the page first mounts
    if (typeof window !== "undefined") {
      const g = window.__GLOBAL_AUDIO__;
      if (g) {
        // optional: if it's already playing in another tab/route, reflect that
        setIsPlaying(!!window.__GLOBAL_AUDIO_IS_PLAYING__);
      }
    }
  }, []);

  // toggle audio playback (called by your play/pause button)
  const toggleAudio = async () => {
    if (typeof window === "undefined") return;
    const g = window.__GLOBAL_AUDIO__;
    if (!g) return;

    if (window.__GLOBAL_AUDIO_IS_PLAYING__) {
      // pause
      g.pause();
      window.__GLOBAL_AUDIO_IS_PLAYING__ = false;
      setIsPlaying(false);
      localStorage.setItem("global_audio_playing", "false");
    } else {
      // play (user gesture required — this is a button click so it should be allowed)
      try {
        await g.play();
        window.__GLOBAL_AUDIO_IS_PLAYING__ = true;
        setIsPlaying(true);
        localStorage.setItem("global_audio_playing", "true");
      } catch (err) {
        console.warn("Audio play blocked:", err);
        // optionally show a toast "Playback blocked by browser"
      }
    }
  };

  // keep UI in sync if user controls audio externally (optional)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const g = window.__GLOBAL_AUDIO__;
    if (!g) return;
    const onPlay = () => {
      window.__GLOBAL_AUDIO_IS_PLAYING__ = true;
      setIsPlaying(true);
      localStorage.setItem("global_audio_playing", "true");
    };
    const onPause = () => {
      window.__GLOBAL_AUDIO_IS_PLAYING__ = false;
      setIsPlaying(false);
      localStorage.setItem("global_audio_playing", "false");
    };
    g.addEventListener("play", onPlay);
    g.addEventListener("pause", onPause);
    return () => {
      g.removeEventListener("play", onPlay);
      g.removeEventListener("pause", onPause);
    };
  }, []);

  const goCollaborate = () => {
    navigate("/collaborate");
  };

  return (
    <div className="w-full mb-10 cursor-default">
      {/* header area (kept same) */}
      <div className="pl-6 md:pl-14 pt-6 pr-6 select-none">
        {/* Subheading */}
        <h4 className="text-neutral-500 font-light tracking-wide text-sm md:text-base">
          The{" "}
          <span className="text-rose-500 font-medium">Frontend Engineer</span>{" "}
          you’ll want on your team.
        </h4>

        {/* Main Heading */}
        <h1
          className="
    font-extrabold
    text-4xl md:text-5xl lg:text-6xl
    mt-3 leading-tight text-slate-900
  "
        >
          Hey, I'm Kanishq
          <br />
          <span className="text-gray-800">
            I Design, Code & Build Products
          </span>
        </h1>

        {/* Roles + badges */}
        <div className="mt-6 flex items-center flex-wrap gap-4 text-neutral-600 text-sm md:text-base">
          {/* Role badges */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 shadow-sm">
              <FaLaptopCode className="text-slate-600" />
              Full Time
            </span>

            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 shadow-sm">
              <FaUserAstronaut className="text-slate-600" />
              Intern
            </span>
          </div>

          {/* Skill icons */}
          <div className="flex items-center gap-3 ml-1 md:ml-6">
            <span className="p-2 rounded-full bg-neutral-50 text-slate-600">
              <FiPenTool size={18} />
            </span>

            <span className="p-2 rounded-full bg-neutral-50 text-slate-600">
              <FiCode size={18} />
            </span>

            <span className="p-2 rounded-full bg-neutral-50 text-slate-600">
              <FiTarget size={18} />
            </span>
          </div>
        </div>
      </div>

      {/* OVERVIEW container (monochrome baseline) */}
      <div
        id="overview-container"
        className="w-[95%] mx-auto rounded-3xl bg-neutral-100/10 mt-10 p-6 md:p-10 backdrop-blur-sm"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT column */}
          <div className="flex flex-col gap-6 w-full lg:w-1/3">
            {/* EXPERIENCE - monochrome */}
            <div className="rounded-lg border border-neutral-700/40 bg-[#0b0b0b]/70 p-4 text-neutral-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="inline-flex items-center gap-2 bg-neutral-800/40 px-3 py-1 rounded-full text-[0.65rem]">
                  <MdWork />
                  <span>Experience</span>
                </div>
              </div>

              <div className="relative pl-6">
                <div className="absolute left-2 top-6 bottom-6 w-0.5 bg-neutral-700/60" />
                {experience.map((ex, idx) => (
                  <div key={idx} className="relative mb-6 pl-6">
                    <div
                      className="absolute left-[-.45rem] w-3 h-3 rounded-full"
                      style={{
                        background: "#fff",
                        boxShadow: "0 0 0 4px rgba(255,255,255,0.05)",
                      }}
                    />
                    <p className="text-sm text-neutral-200 font-medium">
                      {ex.company}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {ex.year} — {ex.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* PEOPLE words about me */}
            <div className="rounded-lg border border-neutral-700/40 bg-[#0b0b0b]/70 p-4 text-neutral-300">
              <div className="inline-flex items-center gap-2 bg-neutral-800/40 px-3 py-1 rounded-full text-[0.65rem] mb-4">
                <MdOutlinePeopleAlt />
                <span>People words about me</span>
              </div>

              <div className="flex items-center gap-3 my-4">
                {people.map((p, i) => (
                  <div key={i} className="group relative">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-12 h-12 rounded-full object-cover filter grayscale contrast-[0.85] transition-all duration-300 group-hover:grayscale-0"
                      style={{ outline: `3px solid ${p.outline}` }}
                    />
                    {/* colored downward shadow when hovered */}
                    <div
                      className="absolute left-0 right-0 -bottom-2 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: `0 18px 22px -14px ${p.color}`,
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                ))}
              </div>

              <h4 className="font-semibold text-lg text-neutral-100">
                Trusted by teams & makers
              </h4>
              <p className="text-xs text-neutral-500 mt-2">
                I help startups and teams ship modern interfaces — building
                accessible, responsive frontends that scale.
              </p>
            </div>

            {/* AUDIO / SONG */}
            <div className="rounded-lg border border-neutral-700/40 bg-[#0b0b0b]/70 p-4 text-neutral-300">
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-2 bg-neutral-800/40 px-3 py-1 rounded-full text-[0.65rem]">
                  <span>
                    <LiaHeadphonesAltSolid />
                  </span>{" "}
                  What's I'm Listening
                </div>
                <div className="text-xs text-neutral-500">Relax · loop</div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`w-20 h-20 rounded-md overflow-hidden border border-neutral-700 transition-all duration-300 ${
                    isPlaying
                      ? "filter-none scale-100"
                      : "filter grayscale contrast-[0.7] scale-100"
                  }`}
                >
                  <img
                    src="/avatar-song.png"
                    alt="song artwork"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleAudio}
                      className="cursor-pointer w-12 h-12 rounded-full bg-[#ff6a3d] flex items-center justify-center text-white"
                      aria-label="play"
                    >
                      {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <div>
                      <div className="font-medium text-neutral-100">
                        Rolling in the Deep
                      </div>
                      <div className="text-xs text-neutral-500">
                        beat · phonk
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT column */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {/* CURRENT PROJECTS */}
            <div className="rounded-lg border border-neutral-700/40 bg-[#0b0b0b]/70 p-4 text-neutral-300">
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-2 bg-neutral-800/40 px-3 py-1 rounded-full text-[0.65rem]">
                  <PiGearFine />
                  <span>Currently Building</span>
                </div>
                <div className="text-xs text-neutral-500">
                  Design • Frontend • Motion
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    onMouseEnter={() => setHoverProjectIndex(idx)}
                    onMouseLeave={() => setHoverProjectIndex(null)}
                    className="group rounded-md overflow-hidden border border-neutral-700/30 relative bg-neutral-900/30 transition-transform duration-300 hover:scale-[1.01]"
                  >
                    {/* image: grayscale baseline -> color on hover */}
                    <div className="relative">
                      <img
                        src={proj.img}
                        alt={proj.title}
                        className={`w-full h-44 object-cover transition-all duration-400 ${
                          hoverProjectIndex === idx
                            ? "filter-none brightness-100"
                            : "filter grayscale contrast-75"
                        }`}
                      />
                      <div className="absolute left-3 top-3 flex gap-2">
                        {proj.skills.map((s) => {
                          const base = skillColorMap[s] || "bg-neutral-700";
                          // on hover, make tag colored and add outline deeper variant
                          return (
                            <div
                              key={s}
                              className={`text-[.65rem] px-3 py-1 rounded-full text-black font-medium transition-all duration-300 ${
                                hoverProjectIndex === idx
                                  ? `${base} ring-2 ring-offset-1 ring-black/20`
                                  : "bg-white/10 text-neutral-300"
                              }`}
                            >
                              {s}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-3 bg-linear-to-b from-black/60 to-transparent">
                      <h4 className="text-lg font-semibold text-neutral-50">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-1">
                        {proj.short}
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <button
                          className="cursor-pointer text-sm px-3 py-2 rounded-md bg-white/10 border border-neutral-700/30 text-neutral-200"
                          onClick={() => navigate("/projects/")}
                        >
                          View details
                        </button>
                        <button
                          className="cursor-pointer text-sm px-3 py-2 rounded-md bg-[#ff6a3d] text-white"
                          onClick={() => navigate("/contact")}
                        >
                          Discuss
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TECH STACK */}
            {/* TECH STACK (updated with icons + brand hover) */}
            <div className="rounded-lg border border-neutral-700/40 bg-[#0b0b0b]/70 p-4 text-neutral-300">
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-2 bg-neutral-800/40 px-3 py-1 rounded-full text-[0.65rem]">
                  <GoFileCode />
                  <span>Technologies I use</span>
                </div>
                <div className="text-xs text-neutral-500">
                  Production-ready tools
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {/* React */}
                <div className="group">
                  <div className="flex items-center gap-3 p-3 rounded-md transition-transform duration-300 transform filter grayscale group-hover:filter-none hover:scale-105">
                    <div className="w-10 h-10 rounded-md flex items-center justify-center">
                      <SiReact className="text-[20px] text-sky-400 group-hover:text-[#61dafb]" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-neutral-100">
                        React
                      </div>
                      <div className="text-xs text-neutral-500">UI</div>
                    </div>
                  </div>
                </div>

                {/* JavaScript */}
                <div className="group">
                  <div className="flex items-center gap-3 p-3 rounded-md transition-transform duration-300 transform filter grayscale group-hover:filter-none hover:scale-105">
                    <div className="w-10 h-10 rounded-md flex items-center justify-center border border-neutral-700/30">
                      <SiJavascript className="text-[20px] group-hover:text-[#f7df1e]" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-neutral-100">
                        JavaScript
                      </div>
                      <div className="text-xs text-neutral-500">Language</div>
                    </div>
                  </div>
                </div>

                {/* TypeScript */}
                <div className="group">
                  <div className="flex items-center gap-3 p-3 rounded-md transition-transform duration-300 transform filter grayscale group-hover:filter-none hover:scale-105">
                    <div className="w-10 h-10 rounded-md flex items-center justify-center border border-neutral-700/30">
                      <SiTypescript className="text-[20px] group-hover:text-[#2b7cff]" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-neutral-100">
                        TypeScript
                      </div>
                      <div className="text-xs text-neutral-500">Types</div>
                    </div>
                  </div>
                </div>

                {/* Node */}
                <div className="group">
                  <div className="flex items-center gap-3 p-3 rounded-md transition-transform duration-300 transform filter grayscale group-hover:filter-none hover:scale-105">
                    <div className="w-10 h-10 rounded-md flex items-center justify-center border border-neutral-700/30">
                      <SiNodedotjs className="text-[20px] group-hover:text-[#8cc84b]" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-neutral-100">
                        Node
                      </div>
                      <div className="text-xs text-neutral-500">Server</div>
                    </div>
                  </div>
                </div>

                {/* Next */}
                <div className="group">
                  <div className="flex items-center gap-3 p-3 rounded-md transition-transform duration-300 transform filter grayscale group-hover:filter-none hover:scale-105">
                    <div className="w-10 h-10 rounded-md flex items-center justify-center border border-neutral-700/30">
                      <SiNextdotjs className="text-[20px] group-hover:text-black" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-neutral-100">
                        Next
                      </div>
                      <div className="text-xs text-neutral-500">Framework</div>
                    </div>
                  </div>
                </div>

                {/* Tailwind */}
                <div className="group">
                  <div className="flex items-center gap-3 p-3 rounded-md transition-transform duration-300 transform filter grayscale group-hover:filter-none hover:scale-105">
                    <div className="w-10 h-10 rounded-md flex items-center justify-center border border-neutral-700/30">
                      <SiTailwindcss className="text-[20px] group-hover:text-[#38b2ac]" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-neutral-100">
                        Tailwindcss
                      </div>
                      <div className="text-xs text-neutral-500">Styling</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* HOW I WORK */}
            <div
              className={`rounded-lg border border-neutral-700/40 overflow-hidden transition-all duration-400 ${
                steps.find((s) => s.id === activeStep)?.bg ?? "bg-neutral-800"
              }`}
            >
              <div className="p-4 text-neutral-100">
                <div className="inline-flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full text-[0.7rem] mb-3">
                  <FaFilePen />
                  <span>How I work</span>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-6 mt-4">
                  <div className="flex flex-col gap-3 w-full md:w-1/4">
                    {steps.map((step) => (
                      <button
                        key={step.id}
                        onClick={() => setActiveStep(step.id)}
                        className={`text-left px-3 py-2 rounded-md transition-all duration-300 cursor-pointer ${
                          activeStep === step.id
                            ? "bg-white/10 text-white scale-[1.01] shadow-inner"
                            : "bg-black/20 text-neutral-200 hover:bg-white/5"
                        }`}
                      >
                        <div className="font-semibold">
                          Step {String(step.id).padStart(2, "0")}
                        </div>
                        <div className="text-xs text-neutral-300">
                          {step.heading}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex-1 bg-black/30 rounded-md p-4">
                    <h3 className="font-bold text-2xl text-white">
                      {steps.find((s) => s.id === activeStep)?.heading}
                    </h3>
                    <p className="text-neutral-200 mt-2">
                      {steps.find((s) => s.id === activeStep)?.content}
                    </p>

                    <div className="mt-6">
                      <button
                        onClick={goCollaborate}
                        className="cursor-pointer px-4 py-2 rounded-md bg-[#ff6a3d] text-white font-medium"
                      >
                        Let's Collaborate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterPage;

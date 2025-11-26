import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectDetails from "./ProjectDetails";

const ProjectPage = () => {
  const [reactProjects] = useState([
    {
      id: 0,
      avatarUrl: "/avatarUrl/avatar1.png",
      img: "/projectImg/projectImg1.png",
      projectName: "EZPolls",
      shortLine: "Online Resume",
      projectSummary:
        "Lightweight, instant polling app for class and conference environments—create, vote, and see results in real-time.",
      role: "State Management",
      contact: "",
      github: "https://github.com/kanishq-17",
      preview: "",
      isLive: true,
      projectType: "Frontend Project",
      techStackSummary: "Created with React + Tailwind",
      timeTaken: "1 Week",
      files: "10 Components",
      features: "3 Features",
      techStack: ["React", "GSAP", "Tailwindcss", "JavaScript", "Frontend"],

      detail1: [
        {
          heading: "Dynamic Options Engine",
          content:
            "Users can add or remove poll options on the fly, real-time updates with votes reflected instantly.",
          percent: 50,
        },
        {
          heading: "Live Analytics Panel",
          content:
            "Visualizes results with charts that update as participants vote, supporting up to 500 concurrent users.",
          percent: 35,
        },
      ],
      detail2: {
        heading: "Simple Vote Authentication",
        content: "Prevents duplicate votes using session and device tokens.",
        percent: 30,
        steps: [
          "Device/session token setup",
          "Vote logging API integration",
          "Analytics charting with Chart.js",
          "Result refresh with state hooks",
        ],
      },
    },

    {
      id: 1,
      avatarUrl: "/avatarUrl/avatar2.png",
      img: "/projectImg/projectImg2.png",
      projectName: "DataSquare",
      shortLine: "A Community for Developers",
      projectSummary:
        "A collaborative community platform where developers share skills, knowledge, help each other solve coding challenges, suggest tools, request job/internship referrals, and receive guidance from seniors.",
      role: "Frontend Developer",
      contact: "",
      github: "https://github.com/kanishq-17",
      preview: "",
      isLive: true,
      projectType: "Frontend Project",
      techStackSummary: "Created with GSAP Animations",
      timeTaken: "2 Week",
      files: "15 Components",
      features: "6+ Features",
      techStack: ["React", "GSAP", "Tailwindcss", "JavaScript", "Frontend"],
      detail1: [
        {
          heading: "Real-time Discussion Board",
          content:
            "A feature-rich chat and post section where users can ask questions, provide answers, and upvote helpful responses.",
          percent: 35,
        },
        {
          heading: "Mentorship Matching",
          content:
            "Automated matching between senior and junior developers based on skills and needs to foster personalized guidance.",
          percent: 30,
        },
      ],
      detail2: {
        heading: "Community Engagement Engine",
        content:
          "Boosted platform engagement by implementing push notifications, real-time messaging, and profile progress rewards.",
        percent: 15,
        steps: [
          "Identified user activity drop-off points with analytics",
          "Designed notification and reward system for key actions",
          "Developed modular notification UI with GSAP for animations",
          "Integrated with React state for live updates",
          "Tested user reactions and improved UX accordingly",
        ],
      },
    },

    {
      id: 2,
      avatarUrl: "/avatarUrl/avatar3.png",
      img: "/projectImg/projectImg3.png",
      projectName: "HabitFlow",
      shortLine: "Build habits easily",
      projectSummary:
        "Track habits, set goals, and visualise progress with streaks and weekly analytics.",
      role: "UI + Logic",
      github: "https://github.com/kanishq-17",
      preview: "",
      isLive: false,
      projectType: "Frontend Project",
      techStackSummary: "Created with React + Tailwind",
      timeTaken: "1 Week",
      files: "14 Components",
      features: "6 Features",
      techStack: ["React", "Tailwindcss", "JavaScript", "Frontend"],

      detail1: [
        {
          heading: "Streak Engine",
          content: "Automatically calculates daily streaks and resets smartly.",
          percent: 45,
        },
        {
          heading: "Weekly Insights",
          content: "Bar visualization for weekly consistency tracking.",
          percent: 30,
        },
      ],

      detail2: {
        heading: "Motivation-Driven UI",
        content: "Clean and energetic design to help maintain daily habits.",
        percent: 25,
        steps: [
          "Streak logic",
          "Stats UI",
          "Task completion animations",
          "Local sync",
        ],
      },
    },
  ]);

  const [nodeProjects] = useState([
    {
      id: 0,
      avatarUrl: "/avatarUrl/avatar4.png",
      img: "/projectImg/projectImg4.png",
      projectName: "QuickAuth API",
      shortLine: "JWT Auth Kit",
      projectSummary:
        "A secure authentication API with JWT, refresh tokens, rate limits, and role-based access.",
      role: "Backend Developer",
      github: "https://github.com/kanishq-17",
      preview: "",
      isLive: true,
      projectType: "Backend API",
      techStackSummary: "Node.js + Express + MongoDB",
      timeTaken: "6 Days",
      files: "8 Routes",
      features: "5 Features",
      techStack: ["Node", "Express", "MongoDB", "JWT"],

      detail1: [
        {
          heading: "Token Security",
          content:
            "Includes short-lived JWT access tokens and long-lived refresh tokens.",
          percent: 55,
        },
        {
          heading: "Rate Limiter",
          content: "Prevents brute-force attempts using per-IP rate limits.",
          percent: 25,
        },
      ],
      detail2: {
        heading: "Developer-Friendly Structure",
        content:
          "Clean route modules and reusable middlewares for fast integration.",
        percent: 20,
        steps: [
          "JWT flow setup",
          "Refresh cycle",
          "Auth middleware",
          "Role guard",
        ],
      },
    },

    {
      id: 1,
      avatarUrl: "/avatarUrl/avatar5.png",
      img: "/projectImg/projectImg5.png",
      projectName: "TaskFlow API",
      shortLine: "Tasks + Teams",
      projectSummary:
        "A task management backend supporting teams, roles, activity logs, and due-date tracking.",
      role: "Backend Developer",
      github: "https://github.com/kanishq-17",
      isLive: true,
      projectType: "Backend API",
      techStackSummary: "Node.js + Express + MongoDB",
      timeTaken: "7 Days",
      files: "9 Routes",
      features: "6 Features",
      techStack: ["Node", "Express", "MongoDB"],

      detail1: [
        {
          heading: "Team Roles",
          content:
            "Assign roles like viewer, editor, admin with restricted access rules.",
          percent: 45,
        },
        {
          heading: "Activity Logger",
          content:
            "Tracks edits, completions, and status updates with timestamps.",
          percent: 30,
        },
      ],

      detail2: {
        heading: "Organised & Scalable",
        content:
          "API designed with clean separation of concerns and reusable controllers.",
        percent: 25,
        steps: [
          "Team model",
          "Role middleware",
          "Task routes",
          "Activity log utils",
        ],
      },
    },

    {
      id: 2,
      avatarUrl: "/avatarUrl/avatar6.png",
      img: "/projectImg/projectImg6.png",
      projectName: "ShopCart API",
      shortLine: "Cart Logic",
      projectSummary:
        "A full shopping-cart backend including product caching, wishlist, and cart computations.",
      role: "Backend Developer",
      github: "https://github.com/kanishq-17",
      isLive: false,
      projectType: "Backend API",
      techStackSummary: "Node.js + Express + MongoDB",
      timeTaken: "1 Week",
      files: "10 Routes",
      features: "7 Features",
      techStack: ["Node", "Express", "MongoDB"],

      detail1: [
        {
          heading: "Smart Cart Engine",
          content:
            "Handles discounts, coupons, quantities, and price validation.",
          percent: 60,
        },
        {
          heading: "Product Cache",
          content:
            "Uses in-memory caching to speed up repeated product requests.",
          percent: 20,
        },
      ],

      detail2: {
        heading: "Optimised for Performance",
        content:
          "Minimises database calls for faster page loads and checkout flows.",
        percent: 20,
        steps: [
          "Caching layer",
          "Cart math",
          "Wishlist merging",
          "Coupon logic",
        ],
      },
    },
  ]);

  const [nextProjects] = useState([
    {
      id: 0,
      avatarUrl: "/avatarUrl/avatar7.png",
      img: "/projectImg/projectImg7.png",
      projectName: "BlogVerse",
      shortLine: "MDX Blog System",
      projectSummary:
        "A fast, SEO-friendly MDX blogging system with dark mode, tags, and recommendation engine.",
      role: "Full Stack",
      github: "https://github.com/kanishq-17",
      isLive: false,
      projectType: "Next.js App",
      techStackSummary: "Next.js + MDX + Tailwind",
      timeTaken: "1 Week",
      files: "15 Components",
      features: "6 Features",
      techStack: ["Next.js", "Tailwindcss", "React"],

      detail1: [
        {
          heading: "MDX Engine",
          content:
            "Supports custom components inside blog posts with syntax highlighting.",
          percent: 45,
        },
        {
          heading: "SEO Ready",
          content:
            "Dynamic metadata and structured content for search engines.",
          percent: 30,
        },
      ],

      detail2: {
        heading: "Smooth & Modern UX",
        content: "Fast navigation, clean typography, and reading-light modes.",
        percent: 25,
        steps: ["MDX setup", "Tag filter", "SEO metadata", "Theme switcher"],
      },
    },

    {
      id: 1,
      avatarUrl: "/avatarUrl/avatar8.png",
      img: "/projectImg/projectImg8.png",
      projectName: "DevHub",
      shortLine: "Developer Dashboard",
      projectSummary:
        "A personalized dashboard to track GitHub stats, coding streaks, and pinned projects.",
      role: "Full Stack",
      github: "https://github.com/kanishq-17",
      isLive: false,
      projectType: "Next.js App",
      techStackSummary: "Next.js + Tailwind + GitHub API",
      timeTaken: "10 Days",
      files: "18 Components",
      features: "7 Features",
      techStack: ["Next.js", "React", "Tailwindcss"],

      detail1: [
        {
          heading: "GitHub Integration",
          content:
            "Fetches repositories, commits, and languages with caching to reduce API hits.",
          percent: 50,
        },
        {
          heading: "Pinned Project Cards",
          content:
            "Custom-designed cards to showcase highlighted repositories.",
          percent: 25,
        },
      ],

      detail2: {
        heading: "Developer Productivity Suite",
        content:
          "Includes streak counters, contribution map, and quick filters.",
        percent: 25,
        steps: [
          "GitHub API setup",
          "Caching layer",
          "Pinned UI",
          "Streak tracker",
        ],
      },
    },

    {
      id: 2,
      avatarUrl: "/avatarUrl/avatar9.png",
      img: "/projectImg/projectImg9.png",
      projectName: "CourseSphere",
      shortLine: "Learning Dashboard",
      projectSummary:
        "A course discovery and learning dashboard with categories, progress tracking, and playlists.",
      role: "Frontend + API",
      github: "https://github.com/kanishq-17",
      isLive: false,
      projectType: "Next.js App",
      techStackSummary: "Next.js + Tailwind + Prisma",
      timeTaken: "1 Week",
      files: "13 Components",
      features: "5 Features",
      techStack: ["Next.js", "Tailwindcss", "React"],

      detail1: [
        {
          heading: "Dynamic Course Lists",
          content: "Filter courses by tags, duration, or difficulty.",
          percent: 45,
        },
        {
          heading: "Progress Tracker",
          content: "Tracks lesson completion with synced local+server state.",
          percent: 30,
        },
      ],

      detail2: {
        heading: "Smooth Classroom UI",
        content: "Clean layout for browsing lessons and continuing learning.",
        percent: 25,
        steps: [
          "Filtering pipeline",
          "Progress sync",
          "Lesson preview",
          "Playlist builder",
        ],
      },
    },
  ]);

  const [projectTracker, setProjectTracker] = useState(1);

  function changeProjectIndex(value) {
    setProjectTracker(value);
  }

  const [selectedProject, setSelectedProject] = useState(null);

  const openProject = (projectObj) => {
    setSelectedProject({ ...projectObj, _uid: Date.now() });

    document
      .getElementById("project-details")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const closeProject = () => selectedProject(null);

  return (
    <div className="w-full bg-neutral-100/50 p-4">
      <h1 className="font-bold text-7xl">Meet some of my works</h1>

      {/* //? Project Filter */}
      <div className="project-filter flex w-full items-center justify-start gap-3 text-white font-medium text-sm mt-12">
        {/* //? React Btn */}
        <div className="cursor-pointer">
          <div className="absolute px-8 py-5 bg-linear-to-l from-[#f4313e] to-[#EFE6DE]  rounded-lg"></div>
          <button
            onClick={() => changeProjectIndex(1)}
            className="px-4 py-2 border border-white/50 rounded-lg backdrop-blur-xs  bg-transparent relative cursor-pointer"
          >
            React
          </button>
        </div>

        {/* //? Node Btn */}
        <div className="cursor-pointer">
          <div className="absolute px-8 py-5 bg-linear-to-l from-[#003c39] to-[#f0ede5]  rounded-lg"></div>
          <button
            onClick={() => changeProjectIndex(2)}
            className="px-4 py-2 border border-white/50 rounded-lg backdrop-blur-xs  bg-transparent relative cursor-pointer"
          >
            Node
          </button>
        </div>

        {/* //? Next Btn */}
        <div className="cursor-pointer">
          <div className="absolute px-7 py-5 bg-linear-to-l from-[#212482] to-[#EFE6DE]  rounded-lg"></div>
          <button
            onClick={() => changeProjectIndex(3)}
            className="px-4 py-2 border border-white/50 rounded-lg backdrop-blur-xs  bg-transparent relative cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
      {/* //! PROJECT SECTION */}
      <div className="project-section flex items-start gap-5 my-10">
        {/* //! PROJECT SELECTION */}
        <div className="project-selection w-[55%]">
          {/* //? Project Small Cards */}
          <div className="flex flex-wrap items-center justify-start">
            <ProjectCard
              reactProjects={reactProjects}
              nodeProjects={nodeProjects}
              nextProjects={nextProjects}
              projectTrackerIndex={projectTracker}
              onOpenProject={openProject}
            />
          </div>
        </div>

        {/* //! PROJECT INFORMATION */}
        <div className="project-information w-[45%]">
          <ProjectDetails
            project={selectedProject}
            onCloseProject={closeProject}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;

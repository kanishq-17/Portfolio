import { useState } from "react";
import SmallProjectCard from "./SmallProjectCard";

const ProjectPage = () => {
  const [reactProjects] = useState([
    {
      id: 0,
      img: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/512ea82b-24b9-4f95-b029-8e333f3b4728.png",
      projectName: "Portfolio",
      shortLine: "Online Resume",
      isLive: true,
      projectType: "Frontend Project",
      techStackSummary: "Created with React + Tailwind",
      timeTaken: "1 Week",
      files: "10 Components",
      features: "3 Features",
    },
    {
      id: 1,
      img: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/2f09cb0a-29c3-41ad-8320-348d865e8dee.png",
      projectName: "DataSquare",
      shortLine: "Data visualization tool",
      isLive: true,
      projectType: "Frontend Project",
      techStackSummary: "Created with GSAP Animations",
      timeTaken: "2 Week",
      files: "15 Components",
      features: "6+ Features",
    },
    {
      id: 2,
      img: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/db697b5a-46ea-4ad7-917d-8fbb68b8ad4b.png",
      projectName: "Cars",
      shortLine: "Gift for 30 year old man",
      isLive: false,
      projectType: "Full Stack",
      techStackSummary: "Build with React + Node",
      timeTaken: "3 Week",
      files: "20 Components",
      features: "15+ Features",
    },
  ]);

  const [nodeProjects] = useState([
    {
      id: 0,
      img: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/7d1ccda4-c69d-4003-80c4-73efa2b06534.png",
      projectName: "APIServer",
      shortLine: "RESTful API for products",
      isLive: false,
      projectType: "Backend Project",
      techStackSummary: "Built with Node.js + Express",
      timeTaken: "10 Days",
      files: "12 API Routes",
      features: "CRUD Operations",
    },
    {
      id: 1,
      img: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/3a9c1064-4aa7-4659-9646-9fe1656e9015.png",
      projectName: "TaskManager",
      shortLine: "Task management backend",
      isLive: false,
      projectType: "Backend Project",
      techStackSummary: "Node.js + MongoDB",
      timeTaken: "2 Weeks",
      files: "8 Modules",
      features: "User Auth, Task Scheduling",
    },
    {
      id: 2,
      img: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/f95dfd60-c65f-4684-bbe4-353d13675b37.png",
      projectName: "ChatAPI",
      shortLine: "Real-time chat backend",
      isLive: false,
      projectType: "Backend Project",
      techStackSummary: "Node.js + Socket.io",
      timeTaken: "1 Week",
      files: "6 Main Files",
      features: "WebSockets, Message Storage",
    },
  ]);

  const [nextProjects] = useState([
    {
      id: 0,
      img: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/68d2e426-1c67-4588-9539-358a36c60a09.png",
      projectName: "BlogNext",
      shortLine: "Personal blog platform",
      isLive: false,
      projectType: "Full Stack Project",
      techStackSummary: "Next.js + MongoDB",
      timeTaken: "2 Weeks",
      files: "18 Pages",
      features: "CRUD Posts, Auth, SSR",
    },
    {
      id: 1,
      img: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/134c7c0a-fc7d-43d5-8246-5e10b3c15769.png",
      projectName: "ShopNext",
      shortLine: "Ecommerce UI & backend",
      isLive: false,
      projectType: "Full Stack Project",
      techStackSummary: "Next.js + Stripe API",
      timeTaken: "3 Weeks",
      files: "24 Components",
      features: "Product Listing, Checkout",
    },
    {
      id: 2,
      img: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/bf23e5fc-7c2e-4867-962a-2d1b63a61ca4.png",
      projectName: "PortfolioNext",
      shortLine: "Personal site with animations",
      isLive: false,
      projectType: "Frontend Project",
      techStackSummary: "Next.js + Framer Motion",
      timeTaken: "1 Week",
      files: "10 Pages",
      features: "Animated Sections, Contact Form",
    },
  ]);

  const [projectTracker, setProjectTracker] = useState(1);

  function changeProjectIndex(value) {
    setProjectTracker(value);
  }

  console.log(projectTracker);

  return (
    <div className="w-full bg-neutral-100/50 p-4">
      <h1 className="font-bold text-7xl">Meet some of my works</h1>
      {/* //! PROJECT SECTION */}
      <div className="project-section flex items-start gap-5 my-5">
        {/* //! PROJECT SELECTION */}
        <div className="project-selection w-[55%]">
          {/* //? Project Filter */}
          <div className="project-filter flex w-full items-center justify-start gap-3 text-white font-medium text-sm mt-8">
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
          {/* //? Project Small Cards */}
          <div className="flex flex-wrap items-center justify-start">
            <SmallProjectCard
              reactProjects={reactProjects}
              nodeProjects={nodeProjects}
              nextProjects={nextProjects}
              projectTrackerIndex={projectTracker}
            />
          </div>
        </div>

        {/* //! PROJECT INFORMATION */}
        <div className="project-information w-[45%]"></div>
      </div>
    </div>
  );
};

export default ProjectPage;

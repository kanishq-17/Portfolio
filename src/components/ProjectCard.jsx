// import { useState } from "react";
import { FaCircle } from "react-icons/fa";

const ProjectCard = ({
  reactProjects,
  nodeProjects,
  nextProjects,
  projectTrackerIndex,
  onOpenProject,
}) => {
  const reactProject = reactProjects;
  const nodeProject = nodeProjects;
  const nextProject = nextProjects;

  return (
    <div className="project-small-cards flex flex-wrap items-start justify-start gap-x-5 gap-y-4">
      {/* REACT PROJECTS */}
      {projectTrackerIndex === 1 &&
        reactProject.map((react) => (
          <article
            key={react.id}
            className="project-card-1 rounded-xl p-2 w-sm border bg-white/6 backdrop-blur-md
                 border-white/10 shadow-md hover:shadow-lg transition-transform duration-300
                 hover:-translate-y-1 group overflow-hidden"
            aria-labelledby={`proj-${react.id}-title`}
            role="article"
          >
            <div className="project-img relative h-84 rounded-md overflow-hidden">
              {/* Live badge */}
              <div
                className="absolute z-10 right-3 top-2 opacity-95"
                aria-hidden
              >
                <div
                  className="flex items-center px-3 py-1 gap-2 text-[.65rem] rounded-full
                          bg-white/10 backdrop-blur-sm border border-white/6 text-white"
                >
                  <span
                    className={`${
                      react.isLive ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    <FaCircle />
                  </span>
                  <p className="font-light text-xs">
                    {react.isLive ? "LIVE" : "IN PROGRESS"}
                  </p>
                </div>
              </div>

              {/* Image: grayscale baseline -> color on hover */}
              <img
                src={react.img}
                alt={react.projectName}
                className="w-full h-full object-cover rounded-lg transition-all duration-500
                     filter grayscale contrast-90 group-hover:filter-none group-hover:scale-105"
                draggable={false}
              />

              {/* bottom overlay with title + CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/60 to-transparent">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4
                      id={`proj-${react.id}-title`}
                      className="text-sm text-white font-semibold"
                    >
                      {react.projectName}
                    </h4>
                    <p className="text-xs text-neutral-300 mt-1">
                      {react.shortLine}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenProject(react)}
                      className="cursor-pointer text-white text-xs rounded-md px-3 py-2 bg-white/10 backdrop-blur-sm
                           border border-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Project meta + small details */}
            <div className="project-details my-4 transition-all duration-300 relative">
              <div className="w-full">
                {/* projectType stays black (even on hover) */}
                <h5 className="text-[.9rem] font-medium text-black transition-colors duration-300">
                  {react.projectType} Project
                </h5>

                {/* tech summary stays black (even on hover) */}
                <p className="text-[.8rem] font-light text-black transition-colors duration-300 mt-1">
                  {react.techStackSummary}
                </p>

                <hr className="my-3 border-white/10 transition-colors duration-200" />

                <div className="flex items-center justify-between gap-2 mt-3 font-medium">
                  {/* timeTaken badge: baseline glass, on hover colored + stronger glass */}
                  <span
                    className="text-[.7rem] rounded-md px-2 py-2 bg-white/6 text-neutral-700
                         transition-all duration-300 ease-out
                         backdrop-blur-sm border border-white/6
                         group-hover:bg-purple-600/70 group-hover:text-white group-hover:backdrop-blur-md group-hover:border-white/20"
                  >
                    {react.timeTaken}
                  </span>

                  {/* files badge */}
                  <span
                    className="text-[.7rem] rounded-md px-2 py-2 bg-white/6 text-neutral-700
                         transition-all duration-300 ease-out
                         backdrop-blur-sm border border-white/6
                         group-hover:bg-blue-600/70 group-hover:text-white group-hover:backdrop-blur-md group-hover:border-white/20"
                  >
                    {react.files}
                  </span>

                  {/* features badge */}
                  <span
                    className="text-[.7rem] rounded-md px-2 py-2 bg-white/6 text-neutral-700
                         transition-all duration-300 ease-out
                         backdrop-blur-sm border border-white/6
                         group-hover:bg-emerald-600/70 group-hover:text-white group-hover:backdrop-blur-md group-hover:border-white/20"
                  >
                    {react.features}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}

      {/* NODE PROJECTS */}
      {projectTrackerIndex === 2 &&
        nodeProject.map((node) => (
          <article
            key={node.id}
            className="project-card-1 rounded-xl p-2 w-sm border bg-white/6 backdrop-blur-md
                 border-white/10 shadow-md hover:shadow-lg transition-transform duration-300
                 hover:-translate-y-1 group overflow-hidden"
            aria-labelledby={`proj-${node.id}-title`}
            role="article"
          >
            <div className="project-img relative h-84 rounded-md overflow-hidden">
              {/* Live badge */}
              <div
                className="absolute z-10 right-3 top-2 opacity-95"
                aria-hidden
              >
                <div
                  className="flex items-center px-3 py-1 gap-2 text-[.65rem] rounded-full
                          bg-white/10 backdrop-blur-sm border border-white/6 text-white"
                >
                  <span
                    className={`${
                      node.isLive ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    <FaCircle />
                  </span>
                  <p className="font-light text-xs">
                    {node.isLive ? "LIVE" : "IN PROGRESS"}
                  </p>
                </div>
              </div>

              {/* Image: grayscale baseline -> color on hover */}
              <img
                src={node.img}
                alt={node.projectName}
                className="w-full h-full object-cover rounded-lg transition-all duration-500
                     filter grayscale contrast-90 group-hover:filter-none group-hover:scale-105"
                draggable={false}
              />

              {/* bottom overlay with title + CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/60 to-transparent">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4
                      id={`proj-${node.id}-title`}
                      className="text-sm text-white font-semibold"
                    >
                      {node.projectName}
                    </h4>
                    <p className="text-xs text-neutral-300 mt-1">
                      {node.shortLine}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenProject(node)}
                      className="cursor-pointer text-white text-xs rounded-md px-3 py-2 bg-white/10 backdrop-blur-sm
                           border border-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Project meta + small details */}
            <div className="project-details my-4 transition-all duration-300 relative">
              <div className="w-full">
                {/* projectType stays black (even on hover) */}
                <h5 className="text-[.9rem] font-medium text-black transition-colors duration-300">
                  {node.projectType} Project
                </h5>

                {/* tech summary stays black (even on hover) */}
                <p className="text-[.8rem] font-light text-black transition-colors duration-300 mt-1">
                  {node.techStackSummary}
                </p>

                <hr className="my-3 border-white/10 transition-colors duration-200" />

                <div className="flex items-center justify-between gap-2 mt-3 font-medium">
                  {/* timeTaken badge: baseline glass, on hover colored + stronger glass */}
                  <span
                    className="text-[.7rem] rounded-md px-2 py-2 bg-white/6 text-neutral-700
                         transition-all duration-300 ease-out
                         backdrop-blur-sm border border-white/6
                         group-hover:bg-purple-600/70 group-hover:text-white group-hover:backdrop-blur-md group-hover:border-white/20"
                  >
                    {node.timeTaken}
                  </span>

                  {/* files badge */}
                  <span
                    className="text-[.7rem] rounded-md px-2 py-2 bg-white/6 text-neutral-700
                         transition-all duration-300 ease-out
                         backdrop-blur-sm border border-white/6
                         group-hover:bg-blue-600/70 group-hover:text-white group-hover:backdrop-blur-md group-hover:border-white/20"
                  >
                    {node.files}
                  </span>

                  {/* features badge */}
                  <span
                    className="text-[.7rem] rounded-md px-2 py-2 bg-white/6 text-neutral-700
                         transition-all duration-300 ease-out
                         backdrop-blur-sm border border-white/6
                         group-hover:bg-emerald-600/70 group-hover:text-white group-hover:backdrop-blur-md group-hover:border-white/20"
                  >
                    {node.features}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}

      {/* NEXT PROJECTS */}
      {projectTrackerIndex === 3 &&
        nextProject.map((next) => (
          <article
            key={next.id}
            className="project-card-1 rounded-xl p-2 w-sm border bg-white/6 backdrop-blur-md
                 border-white/10 shadow-md hover:shadow-lg transition-transform duration-300
                 hover:-translate-y-1 group overflow-hidden"
            aria-labelledby={`proj-${next.id}-title`}
            role="article"
          >
            <div className="project-img relative h-84 rounded-md overflow-hidden">
              {/* Live badge */}
              <div
                className="absolute z-10 right-3 top-2 opacity-95"
                aria-hidden
              >
                <div
                  className="flex items-center px-3 py-1 gap-2 text-[.65rem] rounded-full
                          bg-white/10 backdrop-blur-sm border border-white/6 text-white"
                >
                  <span
                    className={`${
                      next.isLive ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    <FaCircle />
                  </span>
                  <p className="font-light text-xs">
                    {next.isLive ? "LIVE" : "IN PROGRESS"}
                  </p>
                </div>
              </div>

              {/* Image: grayscale baseline -> color on hover */}
              <img
                src={next.img}
                alt={next.projectName}
                className="w-full h-full object-cover rounded-lg transition-all duration-500
                     filter grayscale contrast-90 group-hover:filter-none group-hover:scale-105"
                draggable={false}
              />

              {/* bottom overlay with title + CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/60 to-transparent">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4
                      id={`proj-${next.id}-title`}
                      className="text-sm text-white font-semibold"
                    >
                      {next.projectName}
                    </h4>
                    <p className="text-xs text-neutral-300 mt-1">
                      {next.shortLine}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenProject(next)}
                      className="cursor-pointer text-white text-xs rounded-md px-3 py-2 bg-white/10 backdrop-blur-sm
                           border border-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Project meta + small details */}
            <div className="project-details my-4 transition-all duration-300 relative">
              <div className="w-full">
                {/* projectType stays black (even on hover) */}
                <h5 className="text-[.9rem] font-medium text-black transition-colors duration-300">
                  {next.projectType} Project
                </h5>

                {/* tech summary stays black (even on hover) */}
                <p className="text-[.8rem] font-light text-black transition-colors duration-300 mt-1">
                  {next.techStackSummary}
                </p>

                <hr className="my-3 border-white/10 transition-colors duration-200" />

                <div className="flex items-center justify-between gap-2 mt-3 font-medium">
                  {/* timeTaken badge: baseline glass, on hover colored + stronger glass */}
                  <span
                    className="text-[.7rem] rounded-md px-2 py-2 bg-white/6 text-neutral-700
                         transition-all duration-300 ease-out
                         backdrop-blur-sm border border-white/6
                         group-hover:bg-purple-600/70 group-hover:text-white group-hover:backdrop-blur-md group-hover:border-white/20"
                  >
                    {next.timeTaken}
                  </span>

                  {/* files badge */}
                  <span
                    className="text-[.7rem] rounded-md px-2 py-2 bg-white/6 text-neutral-700
                         transition-all duration-300 ease-out
                         backdrop-blur-sm border border-white/6
                         group-hover:bg-blue-600/70 group-hover:text-white group-hover:backdrop-blur-md group-hover:border-white/20"
                  >
                    {next.files}
                  </span>

                  {/* features badge */}
                  <span
                    className="text-[.7rem] rounded-md px-2 py-2 bg-white/6 text-neutral-700
                         transition-all duration-300 ease-out
                         backdrop-blur-sm border border-white/6
                         group-hover:bg-emerald-600/70 group-hover:text-white group-hover:backdrop-blur-md group-hover:border-white/20"
                  >
                    {next.features}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
    </div>
  );
};

export default ProjectCard;

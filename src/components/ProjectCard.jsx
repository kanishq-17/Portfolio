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

  // const [reactProjectCardId, setReactProjectCardId] = useState(null)

  return (
    <div className="project-small-cards flex flex-wrap items-start justify-start gap-x-5 gap-y-4 ">
      {projectTrackerIndex === 1 &&
        reactProject.map((react) => (
          <div
            key={react.id}
            className="project-card-1 rounded-xl p-2 w-sm border border-white backdrop-blur-2xl bg-white/50"
          >
            <div className="project-img relative h-84">
              <div className="flex items-center px-2 py-1 gap-2 text-[.6rem] rounded-full backdrop-blur-2xl bg-white/30 absolute z-10 right-3 top-2 opacity-60">
                <span
                  className={`${
                    react.isLive ? "text-green-500" : "text-yellow-500"
                  }`}
                >
                  <FaCircle />
                </span>
                <p className=" font-light text-white">
                  {react.isLive ? "LIVE" : "IN PROGRESS"}
                </p>
              </div>
              <img
                src={react.img}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="flex items-center justify-between absolute bottom-2 w-full px-3">
                <div>
                  <h4 className="text-sm text-white font-medium">
                    {react.projectName}
                  </h4>
                  <p className="text-xs text-neutral-400">{react.shortLine}</p>
                </div>
                <button
                  onClick={() => onOpenProject(react)}
                  className="text-white text-xs rounded-md px-3 py-2 bg-transparent backdrop-blur-2xl cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
            <div className="project-details my-4">
              <div className="w-full">
                <h5 className="text-[.9rem] font-medium">
                  {react.projectType} Project
                </h5>
                <p className="text-[.8rem] font-light">
                  {react.techStackSummary}
                </p>
                <hr className="my-2" />
                <div className="flex items-center justify-between gap-2 mt-4 font-medium">
                  <h6 className="text-[.7rem] rounded-md px-2 py-2 bg-sky-200/50 text-cyan-500">
                    {react.timeTaken}
                  </h6>
                  <h6 className="text-[.7rem] rounded-md px-2 py-2 bg-fuchsia-200/50 text-fuchsia-500">
                    {react.files}
                  </h6>
                  <h6 className="text-[.7rem] rounded-md px-2 py-2 bg-rose-200/50 text-rose-500">
                    {react.features}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        ))}

      {projectTrackerIndex === 2 &&
        nodeProject.map((node) => (
          <div
            key={node.id}
            className="project-card-1 rounded-xl p-2 w-sm border border-white backdrop-blur-2xl bg-white/50"
          >
            <div className="project-img relative h-84">
              <div className="flex items-center px-2 py-1 gap-2 text-[.6rem] rounded-full backdrop-blur-2xl bg-white/30 absolute z-10 right-3 top-2">
                <span
                  className={`${
                    node.isLive ? "text-green-500" : "text-yellow-500"
                  }`}
                >
                  <FaCircle />
                </span>
                <p className="font-light text-white">
                  {" "}
                  {node.isLive ? "LIVE" : "IN PROGRESS"}
                </p>
              </div>
              <img
                src={node.img}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="flex items-center justify-between absolute bottom-2 w-full px-3">
                <div>
                  <h4 className="text-sm text-white font-medium">
                    {node.projectName}
                  </h4>
                  <p className="text-xs text-neutral-400">{node.shortLine}</p>
                </div>
                <button
                  onClick={() => onOpenProject(node)}
                  className="text-white text-xs rounded-md px-3 py-2 bg-transparent backdrop-blur-2xl cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
            <div className="project-details my-4">
              <div className="w-full">
                <h5 className="text-[.9rem] font-medium">{node.projectType}</h5>
                <p className="text-[.7rem] font-light">
                  {node.techStackSummary}
                </p>
                <hr className="my-2" />
                <div className="flex items-center justify-between gap-2 mt-4 font-medium">
                  <h6 className="text-[.7rem] rounded-md px-2 py-2 bg-sky-200/50 text-cyan-500">
                    {node.timeTaken}
                  </h6>
                  <h6 className="text-[.7rem] rounded-md px-2 py-2 bg-fuchsia-200/50 text-fuchsia-500">
                    {node.files}
                  </h6>
                  <h6 className="text-[.7rem] rounded-md px-2 py-2 bg-rose-200/50 text-rose-500">
                    {node.features}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        ))}

      {projectTrackerIndex === 3 &&
        nextProject.map((next) => (
          <div
            key={next.id}
            className="project-card-1 rounded-xl p-2 w-sm border border-white backdrop-blur-2xl bg-white/50"
          >
            <div className="project-img relative h-84">
              <div className="flex items-center px-2 py-1 gap-2 text-[.6rem] rounded-full backdrop-blur-2xl bg-white/30 absolute z-10 right-3 top-2">
                <span
                  className={`${
                    next.isLive ? "text-green-500" : "text-yellow-500"
                  }`}
                >
                  <FaCircle />
                </span>
                <p className="font-light text-white">
                  {next.isLive ? "LIVE" : "IN PROGRESS"}
                </p>
              </div>
              <img
                src={next.img}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="flex items-center justify-between absolute bottom-2 w-full px-3">
                <div>
                  <h4 className="text-sm text-white font-medium">
                    {next.projectName}
                  </h4>
                  <p className="text-xs text-neutral-400">{next.shortLine}</p>
                </div>
                <button
                  onClick={() => onOpenProject(next)}
                  className="text-white text-xs rounded-md px-3 py-2 bg-white/30 backdrop-blur-3xl cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
            <div className="project-details my-4">
              <div className="w-full">
                <h5 className="text-[.9rem] font-medium">{next.projectType}</h5>
                <p className="text-[.8rem] font-light">
                  {next.techStackSummary}
                </p>
                <hr className="my-2" />
                <div className="flex items-center justify-between gap-2 mt-4 font-medium">
                  <h6 className="text-[.7rem] rounded-md px-2 py-2 bg-sky-200/50 text-cyan-500">
                    {next.timeTaken}
                  </h6>
                  <h6 className="text-[.7rem] rounded-md px-2 py-2 bg-fuchsia-200/50 text-fuchsia-500">
                    {next.files}
                  </h6>
                  <h6 className="text-[.7rem] rounded-md px-2 py-2 bg-rose-200/50 text-rose-500">
                    {next.features}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProjectCard;

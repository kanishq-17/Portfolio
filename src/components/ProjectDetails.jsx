import { useEffect, useState, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RxChatBubble } from "react-icons/rx";
import { VscGithubAlt } from "react-icons/vsc";
import { HiOutlineEye } from "react-icons/hi";

export default function ProjectDetails({ project, onCloseProject }) {
  const [isVisible, setIsVisible] = useState(false); // for fade in
  const [isClosing, setIsClosing] = useState(false); // for fade out
  const closeTimeoutRef = useRef(null);

  // whenever a new project is set, show panel
  useEffect(() => {
    if (project) {
      // reset any previous closing state
      setIsClosing(false);
      // small delay for mount -> animate in
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
    return () => {
      // cleanup any timeout if component unmounts
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [project]);

  if (!project) {
    // nothing selected — return null or placeholder
    return null;
  }

  function handleClose() {
    // start closing animation
    setIsClosing(true);
    setIsVisible(false);

    // after animation duration, tell parent to clear project
    // match this time with the CSS transition duration below (300ms)
    closeTimeoutRef.current = setTimeout(() => {
      onCloseProject(null);
      // cleanup local state (optional)
      setIsClosing(false);
    }, 300);
  }

  return (
    // outer wrapper with fade/translate transition
    <div
      key={project?.id}
      id="project-details"
      className={`bg-white/50 rounded-xl p-8 relative transform transition-all duration-300 ease-out
        ${
          isVisible && !isClosing
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }
      `}
      aria-live="polite"
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 text-xl cursor-pointer"
        aria-label="Close project details"
      >
        <IoCloseOutline />
      </button>

      {/* header */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-md overflow-hidden">
          <img
            src={project?.avatarUrl}
            alt={`${project?.projectName} avatar`}
            className="w-full h-full rounded-md object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-start gap-3">
            {/* LIVE indicator with pulse */}
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-6 flex items-center">
                {/* ping / pulse circle */}
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-80 animate-ping" />
                {/* solid dot */}
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500 border border-white" />
              </div>
              <p className="text-[.6rem] rounded-full w-fit px-2 py-1 bg-neutral-300/30 cursor-default flex items-center justify-start gap-1 font-medium">
                {project?.isLive ? "LIVE" : "IN PROGRESS"}
              </p>
            </div>

            <p className="text-[.6rem] rounded-full px-3 py-1 bg-amber-100/50 backdrop-blur-lg cursor-default tracking-wide font-medium">
              {project?.role?.toUpperCase()}
            </p>
          </div>

          <h1 className="font-bold text-4xl mt-2">{project?.projectName}</h1>
        </div>
      </div>

      <h3 className="my-5 font-semibold text-xl">{project?.projectSummary}</h3>

      {/* action icons */}
      <div className="flex items-center justify-start gap-3 w-full text-sm my-6">
        {project?.contact ? (
          <Link to={project.contact}>
            <button className="cursor-pointer rounded-full text-slate-800 bg-white/50 backdrop-blur-2xl p-2 relative outline-3 outline-yellow-300/50">
              <RxChatBubble />
            </button>
          </Link>
        ) : (
          <button
            onClick={() => {}}
            className="cursor-default rounded-full text-slate-400 bg-white/30 p-2"
            title="Contact link not provided"
          >
            <RxChatBubble />
          </button>
        )}

        {project?.github ? (
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <button className="cursor-pointer rounded-full text-slate-800 bg-white/50 backdrop-blur-2xl p-2 relative outline-3 outline-red-300/50">
              <VscGithubAlt />
            </button>
          </a>
        ) : null}

        {project?.preview ? (
          <a href={project.preview} target="_blank" rel="noopener noreferrer">
            <button className="cursor-pointer rounded-full text-slate-800 bg-white/50 backdrop-blur-2xl p-2 relative outline-3 outline-purple-300/50">
              <HiOutlineEye />
            </button>
          </a>
        ) : null}
      </div>

      {/* tech stack */}
      <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-3 w-1/2 my-6">
        {project?.techStack?.map((t) => (
          <p
            key={t}
            className="rounded-md text-sm font-medium text-slate-800 px-4 py-2 bg-neutral-200/50 border border-slate-300/50"
          >
            {t}
          </p>
        ))}
      </div>

      {/* details grid */}
      <div className="flex items-start justify-start w-full gap-5">
        {/* detail1 expected to be an array */}
        <div className="flex-1 grid grid-cols-1 gap-4">
          {project?.detail1?.map((details, index) => (
            <div
              key={index}
              className="border border-neutral-400/50 bg-gray-100/60 p-3 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-sm">{details?.heading}</h4>
                <hr className="my-2" />
              </div>
              <p className="font-light text-xs text-neutral-500">
                {details?.content}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <h5 className="text-sm">12/32</h5>
                  <p className="text-[.55rem] text-neutral-600">On Shopping</p>
                </div>
                <p className="text-center w-8 h-8 flex items-center justify-center bg-white rounded-full font-semibold text-xs outline-3 outline-orange-200">
                  {details?.percent}%
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* detail2 block */}
        <div className="w-1/2 rounded-lg bg-gray-200 p-4">
          <h2 className="font-semibold text-2xl">
            {project?.detail2?.heading} —{" "}
            <span className="text-indigo-700 font-bold">
              {project?.detail2?.percent}%
            </span>
          </h2>
          <p className="mt-3 font-normal text-neutral-600 text-sm tracking-wide">
            {project?.detail2?.content}
          </p>

          {project?.detail2?.steps?.length ? (
            <>
              <h6 className="my-3 text-base font-medium">Highlights</h6>
              <ul className="list-disc ml-5 text-sm space-y-1">
                {project?.detail2?.steps?.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

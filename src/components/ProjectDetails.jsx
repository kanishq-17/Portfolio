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
      className={`max-w-5xl mx-auto bg-white/50 backdrop-blur-md border border-white/8 rounded-xl p-6 relative transform transition-all duration-300 ease-out
        ${
          isVisible && !isClosing
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }
      `}
      aria-live="polite"
      role="region"
      aria-label={`${project?.projectName} details`}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="cursor-pointer absolute top-4 right-4 text-xl p-2 rounded-md hover:bg-white/10 transition"
        aria-label="Close project details"
      >
        <IoCloseOutline />
      </button>

      {/* header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-white/8 bg-white/4">
          <img
            src={project?.avatarUrl}
            alt={`${project?.projectName} avatar`}
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            {/* LIVE indicator with pulse */}
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-6 flex items-center">
                {/* ping / pulse circle */}
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-80 animate-ping" />
                {/* solid dot */}
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500 border border-white" />
              </div>
              <p className="text-[.65rem] rounded-full w-fit px-2 py-1 bg-neutral-300/20 cursor-default flex items-center justify-start gap-1 font-medium text-slate-800">
                {project?.isLive ? "LIVE" : "IN PROGRESS"}
              </p>
            </div>

            <p className="text-[.65rem] rounded-full px-3 py-1 bg-amber-100/30 backdrop-blur-sm cursor-default tracking-wide font-medium text-slate-800">
              {project?.role?.toUpperCase()}
            </p>
          </div>

          <h1 className="font-extrabold text-2xl sm:text-3xl mt-3 truncate">
            {project?.projectName}
          </h1>

          <p className="text-sm text-neutral-500 mt-1 truncate">
            {project?.projectSummary}
          </p>
        </div>
      </div>

      {/* action buttons inline: Contact, GitHub, Preview */}
      <div className="flex items-center gap-3 mt-6">
        {/* Contact */}
        {project?.contact ? (
          <a href={project.contact} target="_blank" rel="noopener noreferrer">
            <button
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/80 text-slate-900 font-medium shadow-sm hover:shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
              title="Contact"
            >
              <RxChatBubble />
              <span className="text-sm">Contact</span>
            </button>
          </a>
        ) : (
          <button
            onClick={() => {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 text-slate-400 font-medium cursor-not-allowed transition"
            title="Contact link not provided"
            aria-disabled
            disabled
          >
            <RxChatBubble />
            <span className="text-sm">Contact</span>
          </button>
        )}

        {/* GitHub */}
        {project?.github ? (
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <button
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/80 text-slate-900 font-medium shadow-sm hover:shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
              title="View on GitHub"
            >
              <VscGithubAlt />
              <span className="text-sm">GitHub</span>
            </button>
          </a>
        ) : (
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 text-slate-400 font-medium cursor-not-allowed transition"
            title="GitHub link not provided"
            aria-disabled
            disabled
          >
            <VscGithubAlt />
            <span className="text-sm">GitHub</span>
          </button>
        )}

        {/* Preview (inline) - show disabled if preview is null */}
        {project?.preview ? (
          <a href={project.preview} target="_blank" rel="noopener noreferrer">
            <button
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
              title="Preview"
            >
              <HiOutlineEye />
              <span className="text-sm">Preview</span>
            </button>
          </a>
        ) : (
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-200/30 text-slate-400 font-medium cursor-not-allowed transition"
            title="Preview not available"
            aria-disabled
            disabled
          >
            <HiOutlineEye />
            <span className="text-sm">Preview</span>
          </button>
        )}

        {/* subtle spacer to keep consistent height on small screens */}
        <div className="flex-1" />
      </div>

      {/* tech stack */}
      <div className="flex flex-wrap items-center gap-3 mt-5">
        {project?.techStack?.map((t) => (
          <span
            key={t}
            className="rounded-full text-xs font-semibold px-3 py-1 bg-white/12 border border-white/6 text-slate-900"
          >
            {t}
          </span>
        ))}
      </div>

      {/* details grid */}
      <div className="flex flex-col lg:flex-row items-start justify-start w-full gap-6 mt-6">
        {/* detail1 expected to be an array */}
        <div className="flex-1 grid grid-cols-1 gap-4">
          {project?.detail1?.map((details, index) => (
            <div
              key={index}
              className="border border-white/8 bg-white/5 p-4 rounded-xl shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-slate-900">
                    {details?.heading}
                  </h4>
                  <hr className="my-2 border-white/6" />
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">
                    {details?.percent}%
                  </p>
                  <p className="text-[.65rem] text-neutral-500 mt-1">
                    Progress
                  </p>
                </div>
              </div>

              <p className="font-light text-sm text-neutral-600 mt-3">
                {details?.content}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h5 className="text-sm text-slate-900">12/32</h5>
                  <p className="text-[.65rem] text-neutral-500">On Shopping</p>
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full font-semibold text-sm outline-2 outline-offset-1 outline-orange-200">
                  {details?.percent}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* detail2 block */}
        <div className="w-full lg:w-1/3 rounded-xl bg-white/6 p-5 border border-white/8">
          <h2 className="font-semibold text-2xl text-slate-900">
            {project?.detail2?.heading} —{" "}
            <span className="text-indigo-600 font-bold">
              {project?.detail2?.percent}%
            </span>
          </h2>
          <p className="mt-3 text-sm text-neutral-600 tracking-wide">
            {project?.detail2?.content}
          </p>

          {project?.detail2?.steps?.length ? (
            <>
              <h6 className="my-3 text-base font-medium text-slate-900">
                Highlights
              </h6>
              <ul className="list-disc ml-5 text-sm space-y-1 text-neutral-600">
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

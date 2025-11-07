import { useState } from "react";
import { FcFlashOn } from "react-icons/fc";
import { RiMic2Line } from "react-icons/ri";
import { TbArrowNarrowUp } from "react-icons/tb";

import { IoEarthSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { FaChartBar } from "react-icons/fa";
import { IoColorPalette } from "react-icons/io5";

const CenterPage = () => {
  const [mic, setMic] = useState();

  return (
    <div className="main-page w-full h-screen">
      {/* //! input-box div */}
      <div className="mt-14">
        <h1 className="text-white font-bold text-center text-3xl">
          What would you like to build today?
        </h1>
        <div className="bg-rose-200 w-210 h-42 m-auto mt-8 rounded-lg outline-1">
          {/* //! input-box header */}
          <div className="flex gap-3 items-center border-b-2 px-3 py-2">
            <div className="flex items-center">
              <span className="text-2xl w-fit">
                <FcFlashOn />
              </span>
              <h4 className="font-bold">Copilot</h4>
            </div>
            <h4 className="text-neutral-500 outline-1 px-1 py-1 text-xs rounded-sm font-medium">
              AI Beta
            </h4>
          </div>

          {/* //! input-box message */}
          <div>
            <h4 className="px-5 text-neutral-400">
              Enter an idea or app name to get started
            </h4>
          </div>

          {/* //! input-box buttons */}
          <div className="flex items-center justify-end gap-3 w-full mt-16 rounded-b-lg h-8 pr-3 relative">
            <span
              onMouseEnter={() => {
                setMic(true);
              }}
              onMouseLeave={() => setMic(false)}
              className={` text-xl rounded-sm px-1 py-1 cursor-pointer ${
                mic ? "bg-blue-200" : ""
              }`}
            >
              <RiMic2Line />
            </span>
            <span
              className={`rounded-sm bg-white text-black px-1 py-1 absolute top-10 right-0 ${
                mic ? "none" : "hidden"
              }`}
            >
              Coming soon 🔉
            </span>
            <span className="bg-zinc-200 text-xl rounded-sm px-1 py-1">
              <TbArrowNarrowUp />{" "}
            </span>
          </div>
        </div>

        {/* //! input-box links */}
        <div className="mt-4 flex gap-3 items-center justify-center text-blue-400 font-medium">
          <div className="Website-Development hover:bg-neutral-200 px-2 py-2 rounded-sm flex items-center gap-3">
            <span className="text-xl">
              <IoEarthSharp />
            </span>
            <h5>Website Development</h5>
          </div>
          <div className="Dashboard-Interfaces hover:bg-neutral-200 px-2 py-2 rounded-sm flex items-center gap-3">
            <span className="text-xl">
              <FaChartBar />
            </span>
            <h5>Dashboard Interfaces</h5>
          </div>
          <div className="UI/UX Engineering hover:bg-neutral-200 px-2 py-2 rounded-sm flex items-center gap-3">
            <span className="text-xl">
              <IoColorPalette />
            </span>
            <h5>UI/UX Engineering</h5>
          </div>
          <div className="automation-workflows hover:bg-neutral-200 px-2 py-2 rounded-sm flex items-center gap-3">
            <span className="text-xl">
              <IoSettings />
            </span>
            <h5>Automation & AI Systems</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterPage;

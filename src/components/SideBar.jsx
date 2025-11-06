import { IoMdAdd } from "react-icons/io"; // experiment
import { RiHome2Fill } from "react-icons/ri"; // home-fill
import { RiHome2Line } from "react-icons/ri"; // home-line
import { BsPuzzleFill } from "react-icons/bs"; // builds-fill
import { BsPuzzle } from "react-icons/bs"; // build-line
import { FaBrain } from "react-icons/fa"; // problem solving fill
import { BiBrain } from "react-icons/bi"; // problem solving line
import { FaNewspaper } from "react-icons/fa6"; // stories-fill
import { FaRegNewspaper } from "react-icons/fa6"; //stories-line
import { IoDocuments } from "react-icons/io5"; // knowledge-base-fill
import { IoDocumentsOutline } from "react-icons/io5"; //knowledge-base-line
import { AiFillRobot } from "react-icons/ai"; // ai-lab-fill
import { AiOutlineRobot } from "react-icons/ai"; // ai-lab-line
// stories
// knowledge base
// ai lab

const SideBar = () => {
  return (
    <div className="sidebar bg-[#fdf1ef] min-w-16 absolute h-screen pt-4">
      {/* //! Primary links */}
      <div className="flex flex-col items-center justify-start gap-4">
        <div className="experiment w-8 h-8 bg-orange-600 rounded-lg font-bold px-1.5 text-lg flex items-center justify-center">
          <IoMdAdd />
        </div>
        <div className="home w-8 h-8 bg-orange-600/90 rounded-lg font-bold px-1.5 text-lg flex items-center justify-center">
          <RiHome2Line />
        </div>
        <div className="build-projects w-8 h-8 bg-orange-600/80 rounded-lg font-bold px-1.5 text-lg flex items-center justify-center">
          <BsPuzzle />
        </div>
        <div className="problem-solve-dsa w-8 h-8 bg-orange-600/70 rounded-lg font-bold px-1.5 text-lg flex items-center justify-center">
          <BiBrain />
        </div>
      </div>
      <hr className="w-12 m-auto h-2 my-4" />
      {/* //! Secondary links */}
      <div className="flex flex-col items-center justify-start gap-4">
        <div className="w-8 h-8 bg-orange-600 rounded-lg font-bold px-1.5 text-lg flex items-center justify-center">
          <FaRegNewspaper />
        </div>
        <div className="w-8 h-8 bg-orange-600/90 rounded-lg font-bold px-1.5 text-lg flex items-center justify-center">
          <IoDocumentsOutline />
        </div>
        <div className="w-8 h-8 bg-orange-600/80 rounded-lg font-bold px-1.5 text-lg flex items-center justify-center">
          <AiOutlineRobot />
        </div>
      </div>
      <hr className="w-12 m-auto h-2 my-4" />
      {/* //! sidebar footer links */}
      <hr className="w-12 m-auto h-2 mt-14 mb-4" />
      <div className="flex flex-col justify-start text-neutral-600 text-left text-sm px-3">
        {/* <p className="mb-10">
          Status: <span className="font-medium">Open for Freelance</span>
        </p>
        <p className="text-xs">Portfolio v2.3 | Updated Nov 2025</p> */}
      </div>
    </div>
  );
};

export default SideBar;

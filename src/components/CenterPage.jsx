import { useState } from "react";
import { FcFlashOn } from "react-icons/fc";
import { RiMic2Line } from "react-icons/ri";
import { TbArrowNarrowUp } from "react-icons/tb";

import { IoEarthSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { FaChartBar } from "react-icons/fa";
import { IoColorPalette } from "react-icons/io5";

import { MdClear } from "react-icons/md";
import { IoChevronForwardOutline } from "react-icons/io5";
import { IoChevronBackOutline } from "react-icons/io5";

import { FaRegCircleUser } from "react-icons/fa6";
import { GiJusticeStar } from "react-icons/gi";
import { ImCool } from "react-icons/im";

const CenterPage = () => {
  const [mic, setMic] = useState();
  const inputBoxLinks = [
    {
      id: 1,
      icons: <IoEarthSharp size={20} />,
      title: "Website Development",
    },
    { id: 2, icons: <FaChartBar size={20} />, title: "Dashboard Interfaces" },

    { id: 3, icons: <IoColorPalette size={20} />, title: "UI/UX Engineering" },
    {
      id: 4,
      icons: <IoSettings size={20} />,
      title: "Automation & AI Systems",
    },
  ];

  const [currentPost, setCurrentPost] = useState(0);
  const [catalogue] = useState([
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1760346738721-bc8e0678623f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDh8Q0R3dXdYSkFiRXd8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=600",
      time: "5 min",
      title: "6 Google Sheets automation ideas to organize your business",
      content:
        "Two things are guaranteed in the workplace: coffee, and a spreadsheet. Google Sheets is one of the most widely used spreadsheet apps, and if you haven't used i",
      cta: "Read the post",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1758883019110-04c79dc56a71?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
      time: "3 min",
      title: "6 Gmail automation ideas",
      content:
        "Discover how a few automated workflows can save you time and minimize repetitive tasks in your Gmail inbox.",
      cta: "Read the post",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1721414209360-7b8f669a1d8b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI3fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
      time: "",
      title: "Behind the scenes of AI transformation",
      content:
        "Real stories, real workflows, and real lessons from operators at Zapier, Webflow, and PandaDoc who are redefining how work gets done with AI",
      cta: "Subscribe now",
    },
    {
      id: 4,
      img: "https://plus.unsplash.com/premium_photo-1760327154365-25a2b68a013c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI2fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
      time: "1 min",
      title: "New: Connect Yelp to your CRM in minutes—try it free",
      content: "",
      cta: "Read the post",
    },
  ]);

  // const [forYouBtn, setForYouBtn] = useState(true);
  // const [aiWorkBtn, setAiWorkBtn] = useState(false);
  // const [mostPopBtn, setMostPopBtn] = useState(false);

  const [ctaBtnCounter, setCtaBtnCounter] = useState(1);

  return (
    <div className="main-page w-full pb-10 bg-[#f4f1f1] text-black">
      {/* //! input-box div */}
      <div className="mt-14">
        <h1 className="font-bold text-center text-3xl">
          What would you like to build today?
        </h1>
        <div className="bg-neutral-50 w-210 h-42 m-auto mt-8 rounded-lg outline-1 outline-gray-300">
          {/* //! input-box header */}
          <div className="flex gap-3 items-center border-b px-3 py-2 border-gray-300">
            <div className="flex items-center">
              <span className="text-2xl w-fit">
                <FcFlashOn />
              </span>
              <h4 className="font-bold">Copilot</h4>
            </div>
            <h4 className="text-neutral-500 outline-1 outline-gray-400 px-1 py-1 text-xs rounded-sm font-medium">
              AI Beta
            </h4>
          </div>

          {/* //! input-box message */}
          <div>
            <h4 className="px-5 text-neutral-600 mt-2">
              Enter an idea or app name to get started
            </h4>
          </div>

          {/* //! input-box buttons */}
          <div className="flex items-center justify-end gap-3 w-full mt-14 rounded-b-lg h-8 pr-3 relative">
            <span
              onMouseEnter={() => {
                setMic(true);
              }}
              onMouseLeave={() => setMic(false)}
              className={` text-xl rounded-sm px-1 py-1 cursor-pointer text-slate-500  ${
                mic ? "bg-blue-200/20" : ""
              }`}
            >
              <RiMic2Line />
            </span>
            <span
              className={`rounded-sm bg-black text-white px-1 py-1 absolute top-11 right-0 ${
                mic ? "none" : "hidden"
              }`}
            >
              Coming soon 🔉
            </span>
            <span className="bg-zinc-200 text-xl rounded-sm px-1 py-1 opacity-70">
              <TbArrowNarrowUp />{" "}
            </span>
          </div>
        </div>

        {/* //! input-box links */}
        <div className="mt-4 flex gap-3 items-center justify-center text-blue-800 font-medium">
          {inputBoxLinks.map((box) => (
            <div
              key={box.id}
              className="input-box-links hover:bg-blue-200/20 px-2 py-2 rounded-sm flex items-center gap-3 cursor-pointer"
            >
              <span>{box.icons}</span>
              <h5>{box.title}</h5>
            </div>
          ))}
        </div>
      </div>

      {/* //? Project-box div */}
      <h2 className="text-2xl font-bold mt-20 w-3/4 m-auto">
        Build from Scratch
      </h2>
      <div className="w-3/4 m-auto h-112 flex gap-5 items-center pt-8">
        {/* //? Catalogue box */}
        <div className="catalogue-box w-1/2 rounded-md bg-amber-600 h-full relative p-3 outline-1 outline-gray-300">
          <span className="absolute right-2 top-2 text-2xl cursor-pointer">
            <MdClear />
          </span>
          <img
            src={catalogue[currentPost].img}
            alt=""
            className="bg-rose-300 w-3/4 m-auto h-44 object-cover"
          />
          <div className="content-div mt-3">
            <p className="text-sm">
              Based on your apps<span>▪️{catalogue[currentPost].time}</span>
            </p>
            <h5 className="font-medium my-2 text-lg">
              {catalogue[currentPost].title}
            </h5>
            <p className="text-sm mt-1">{catalogue[currentPost].content}</p>
          </div>
          <div className="page-up-down flex items-center w-full justify-between mt-5 gap-4 absolute bottom-5">
            <button className="text-xs rounded-sm px-3 py-1 outline-1 cursor-pointer">
              {catalogue[currentPost].cta}
            </button>
            <div className="page-counter&page-up-down w-1/2 flex items-center justify-center gap-2">
              <p className="flex items-center gap-2 mb-0">
                <span>{catalogue[currentPost].id} of 4</span>
                <span
                  onClick={() => {
                    setCurrentPost((prev) => (prev > 0 ? prev - 1 : prev));
                  }}
                  disabled={currentPost === 0}
                  className="bg-zinc-500 rounded-sm px-1 py-1 text-md flex items-center cursor-pointer"
                >
                  <IoChevronBackOutline />
                </span>
                <span
                  onClick={() => {
                    setCurrentPost((prev) =>
                      prev < catalogue.length - 1 ? prev + 1 : prev
                    );
                  }}
                  disabled={currentPost === catalogue.length - 1}
                  className={`bg-zinc-500 rounded-sm px-1 py-1 text-md flex items-center cursor-pointer ${
                    currentPost === catalogue.length - 1 ? "cursor-none" : ""
                  }`}
                >
                  <IoChevronForwardOutline />
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* //? Project showing box */}
        <div className="recent-project-box w-full rounded-md h-full bg-black text-white outline-1 outline-gray-300">
          <div className="flex justify-between items-center p-4 border-gray-300  border-b">
            <h2>Popular Templates</h2>
            <h5 className="text-blue-500/80 cursor-pointer  hover:underline hover:text-blue-700">
              Browse all templates
            </h5>
          </div>
          {/* //? project-showing-cta-links */}
          <div className="project-showing-cta-links flex p-4 pt-8 items-center gap-3 font-medium text-sm">
            {/* //* BTN - 1 */}
            <button
              onClick={() => {
                setCtaBtnCounter(1);
              }}
              className={`cursor-pointer rounded-md px-3 py-0.5 outline-1 flex items-center gap-2 ${
                ctaBtnCounter === 1
                  ? "outline-blue-500/80 bg-blue-300/30 text-blue-500/80"
                  : "outline-gray-300"
              }  `}
            >
              <span>
                <FaRegCircleUser />
              </span>
              <p>For you</p>
            </button>
            {/* //* BTN - 2 */}
            <button
              onClick={() => {
                setCtaBtnCounter(2);
              }}
              className={`cursor-pointer rounded-md px-3 py-0.5 outline-1 flex items-center gap-2 ${
                ctaBtnCounter === 2
                  ? "outline-blue-500/80 bg-blue-300/30 text-blue-500/80"
                  : "outline-gray-300"
              }  `}
            >
              <span>
                <GiJusticeStar />
              </span>
              <p>AI Workflows</p>
            </button>
            {/* //* BTN - 3 */}
            <button
              onClick={() => {
                setCtaBtnCounter(3);
              }}
              className={`cursor-pointer rounded-md px-3 py-0.5 outline-1 flex items-center gap-2 ${
                ctaBtnCounter === 3
                  ? "outline-blue-500/80 bg-blue-300/30 text-blue-500/80"
                  : "outline-gray-300"
              }  `}
            >
              <span>
                <ImCool />
              </span>
              <p>Most popular</p>
            </button>
          </div>

          {/* //? Project-showing-card */}
          <div className="project-showing-card  w-full px-4 flex items-center gap-4 justify-start">
            {/* //* card - 1 */}
            <div className="card-1 w-1/3 bg-blue-700 p-4 outline-1 outline-gray-300 rounded-lg">
              <div className="tech-stack-img flex items-center w-[60%] outline-1 outline-gray-300 rounded-md">
                <img
                  src=""
                  alt=""
                  className="w-full h-10 bg-pink-400 object-cover"
                />
                <img
                  src=""
                  alt=""
                  className="w-full h-10 bg-pink-400 object-cover"
                />
                <img
                  src=""
                  alt=""
                  className="w-full h-10 bg-pink-400 object-cover"
                />
              </div>
              <p className="text-md pt-8 font-semibold w-full">
                Save new Gmail attachments to Google Drive with a filter
              </p>
              <p className="pt-10 text-sm font-medium">
                ⭐ Recommended for you
              </p>
            </div>
            {/* //* card - 2 */}
            <div className="card-2 w-1/3 bg-blue-700 p-4 outline-1 outline-gray-300 rounded-lg">
              <div className="tech-stack-img flex items-center w-[60%] outline-1 outline-gray-300 rounded-md">
                <img
                  src=""
                  alt=""
                  className="w-full h-10 bg-pink-400 object-cover"
                />
                <img
                  src=""
                  alt=""
                  className="w-full h-10 bg-pink-400 object-cover"
                />
                <img
                  src=""
                  alt=""
                  className="w-full h-10 bg-pink-400 object-cover"
                />
              </div>
              <p className="text-md pt-8 font-semibold w-full">
                Save new Gmail attachments to Google Drive with a filter
              </p>
              <p className="pt-10 text-sm font-medium">
                ⭐ Recommended for you
              </p>
            </div>
            {/* //* card - 3 */}
            <div className="card-3 w-1/3 bg-blue-700 p-4 outline-1 outline-gray-300 rounded-lg">
              <div className="tech-stack-img flex items-center w-[60%] outline-1 outline-gray-300 rounded-md">
                <img
                  src=""
                  alt=""
                  className="w-full h-10 bg-pink-400 object-cover"
                />
                <img
                  src=""
                  alt=""
                  className="w-full h-10 bg-pink-400 object-cover"
                />
                <img
                  src=""
                  alt=""
                  className="w-full h-10 bg-pink-400 object-cover"
                />
              </div>
              <p className="text-md pt-8 font-semibold w-full">
                Save new Gmail attachments to Google Drive with a filter
              </p>
              <p className="pt-10 text-sm font-medium">
                ⭐ Recommended for you
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterPage;

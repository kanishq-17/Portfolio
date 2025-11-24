import { useState } from "react";
import TextType from "./TextType";

import { FcFlashOn } from "react-icons/fc";
import { RiMic2Line } from "react-icons/ri";
import { TbArrowNarrowUp } from "react-icons/tb";

import { IoEarthSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { FaChartBar } from "react-icons/fa";
import { IoColorPalette } from "react-icons/io5";

import { IoChevronForwardOutline } from "react-icons/io5";
import { IoChevronBackOutline } from "react-icons/io5";

import { FaRegCircleUser } from "react-icons/fa6";
import { GiJusticeStar } from "react-icons/gi";
import { ImCool } from "react-icons/im";

import { TbPlaylistAdd } from "react-icons/tb";

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

  const [ctaBtnCounter, setCtaBtnCounter] = useState(1);

  const [forYouBtn] = useState([
    {
      img1: "/react.png",
      img2: "/tailwindcss.png",
      title:
        "Build and visualize datasets interactively using React + Tailwind — designed for fast insights and clean UI.",
      shortLine: "⭐ Recommended for you",
    },
    {
      img1: "/react.png",
      img2: "/javascript.png",
      title:
        "The system powering my entire developer portfolio — modular, responsive, and inspired by Zapier’s UX.",
      shortLine: "⭐ Recommended for you",
    },
    {
      img1: "/tailwindcss.png",
      img2: "/gsap.png",
      title:
        "Experimenting with GSAP and Tailwindcss to build interactive component animations and transitions.",
      shortLine: "⭐ Recommended for you",
    },
  ]);

  const [aiWorkBtn] = useState([
    {
      img1: "/gmail.png",
      img2: "/sheets.png",
      title:
        "Automatically log new client emails from Gmail into Google Sheets for organized project tracking.",
      shortLine: "AI-powered",
    },
    {
      img1: "/chatgpt.png",
      img2: "/gemini.png",
      title:
        "Generate stunning visuals using prompt-based AI workflows with OpenAI + custom parameters.",
      shortLine: "AI-powered",
    },
    {
      img1: "/notion.png",
      img2: "/drive.png",
      title:
        "Automate daily data refresh and notifications using n8n workflows between Notion and Google Drive.",
      shortLine: "AI-powered",
    },
  ]);

  const [mostPopBtn] = useState([
    {
      img1: "/linkedin.png",
      img2: "/twitter.png",
      title:
        "A post about how consistent documentation and sharing can 10x your learning and opportunities.",
      shortLine: "Used by 7k",
    },
    {
      img1: "/docs.png",
      img2: "/drive.png",
      title:
        "A deep-dive document covering Promises, async/await, and error handling with visuals.",
      shortLine: "Used by 4k",
    },
    {
      img1: "/react.png",
      img2: "/tailwindcss.png",
      title:
        "My flagship project featured in multiple discussions — a fast, clean, data-driven React app.",
      shortLine: "Used by 3k",
    },
  ]);

  const [prompts] = useState([
    [
      "Website development",
      {
        id: 1,
        prompt:
          "Design and develop responsive multi-page websites using React + Tailwind with SEO optimization.",
      },
      {
        id: 2,
        prompt:
          "Develop interactive landing pages with animations using Framer Motion.",
      },
      {
        id: 3,
        prompt:
          "Integrate Firebase or APIs to fetch live data and make dynamic pages.",
      },
      {
        id: 4,
        prompt:
          "Deploy websites instantly on Vercel or GitHub Pages with custom domains.",
      },
    ],
    [
      "Dashboard interface",
      {
        id: 1,
        prompt:
          "Build admin dashboards with real-time charts using Recharts or Chart.js.",
      },
      {
        id: 2,
        prompt: "Integrate APIs to display live shipment or user activity",
      },
      {
        id: 3,
        prompt:
          "Add role-based access controls and user management dashboards.",
      },
      {
        id: 4,
        prompt:
          "Implement modular card layouts with filters, pagination, and search functionality.",
      },
    ],
    [
      "UI/UX engineering",
      {
        id: 1,
        prompt:
          "Translate Figma designs into production-ready React components.",
      },
      {
        id: 2,
        prompt:
          "Build a reusable design system — buttons, modals, forms, and cards.",
      },
      {
        id: 3,
        prompt:
          "Craft clean, accessible interfaces with Tailwind and shadcn/ui.",
      },
      {
        id: 4,
        prompt: "Add fluid animations and transitions using Framer Motion.",
      },
    ],
    [
      "Automation & AI systems",
      {
        id: 1,
        prompt:
          "Integrate AI tools (OpenAI API, Gemini, or Llama) for intelligent responses.",
      },
      {
        id: 2,
        prompt:
          "Connect Gmail, Notion, and Google Sheets to auto-update workflows.",
      },
      {
        id: 3,
        prompt:
          "Automate repetitive tasks like data syncing using Zapier & webhooks.",
      },
      {
        id: 4,
        prompt:
          "Create smart notifications for task tracking and project automation.",
      },
    ],
  ]);

  const [autoPrompts] = useState([
    // Welcome
    "✨ Welcome! Let’s build something meaningful.",

    // Tech stack
    "⚛️ React-crafted interfaces that feel effortless.",
    "📜 JavaScript that actually behaves itself (mostly).",
    "🔷 TypeScript for projects that need discipline.",

    // Serious / result-focused
    "⚡ Fast, reliable, production-ready builds.",
    "🎯 Pixel-perfect execution with scalable architecture.",

    // Percentage-based
    "📈 A great UI can boost user trust by 70%.",
    "🎛️ Micro-interactions enhance experience by 40%.",

    // Serious / result-focused
    "🚀 Performance-first frontend engineering.",
    "🛡️ Robust systems designed to handle real users.",

    // Tech stack
    "🟢 Node.js APIs that respond instantly.",
    "🧩 Express servers built with precision.",
    "🍃 MongoDB that scales without complaining.",
  ]);

  const [closeBtn, setCloseBtn] = useState(false);

  const [activeGroupPromptIndex, setActiveGroupPromptIndex] = useState(null);

  return (
    <div className="main-page w-full pb-10 bg-[#f4f1f1] text-black">
      {/* //! input-box div */}
      <div className="mt-14">
        <h1 className="font-bold text-center text-3xl z-0 font-roboto">
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
            <h4 className="px-5 text-neutral-800 mt-2 text-xl">
              <TextType
                text={autoPrompts}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />
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
              className={`z-20 rounded-sm bg-black text-white px-1 py-1 absolute top-11 right-0 ${
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
        <div className="mt-4 flex gap-3 items-center justify-center text-blue-800 font-medium relative">
          {inputBoxLinks.map((box, index) => (
            <div
              key={box.id}
              onClick={() => {
                setActiveGroupPromptIndex(index);
                setCloseBtn(true);
              }}
              className="input-box-links hover:bg-blue-200/20 px-1 py-2 rounded-sm flex items-center gap-2 cursor-pointer text-sm"
            >
              <span>{box.icons}</span>
              <h5>{box.title}</h5>
            </div>
          ))}
        </div>

        {/* //! input-box prompts */}
        <div
          className={`w-210 rounded-lg outline-1 outline-gray-300 bg-white m-auto absolute z-10 top-110 left-84 shadow-md shadow-gray-800 ${
            closeBtn ? "none" : "hidden"
          }`}
        >
          {activeGroupPromptIndex !== null && (
            <>
              <div className="flex justify-between items-center p-2 py-3">
                <h4 className="font-medium text-neutral-500">
                  {prompts[activeGroupPromptIndex][0]}
                </h4>
                <button
                  onClick={() => setCloseBtn(false)}
                  className="z-10 text-blue-600 hover:bg-blue-300/10 px-1 text-sm cursor-pointer rounded-xs"
                >
                  Close X
                </button>
              </div>
              <div className="">
                {prompts[activeGroupPromptIndex].slice(1).map((item) => (
                  <>
                    <div className="flex items-center gap-4 p-2 hover:bg-purple-300/10 w-[97%] m-auto py-4">
                      <span className="text-blue-600 text-xl">
                        <TbPlaylistAdd />
                      </span>
                      <p className="text-slate-900">{item.prompt}</p>
                    </div>
                    <hr className="w-[97%] m-auto text-gray-300" />
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* //? Project-box div */}
      <h2 className="text-2xl font-bold mt-20 w-3/4 m-auto">
        Build from Scratch
      </h2>
      <div className="w-3/4 m-auto min-h-112 flex gap-5 items-center pt-8">
        {/* //? Catalogue box */}
        <div className="catalogue-box w-1/2 rounded-md bg-[#fec89a] h-113 relative p-3 outline-1 outline-gray-300">
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
        <div className="recent-project-box w-full rounded-xl bg-white/10 backdrop-blur-md text-black border border-gray-300/50 shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-gray-300/30 border-b">
            <h2 className="font-semibold text-3xl drop-shadow-sm">
              Popular Templates
            </h2>
            <h5 className="text-blue-400/80 cursor-pointer hover:underline hover:text-blue-300 transition">
              Browse all templates
            </h5>
          </div>

          {/* CTA Buttons */}
          <div className="project-showing-cta-links flex p-4 pt-10 items-center gap-3 font-medium text-sm">
            {/* BTN - 1 */}
            <button
              onClick={() => setCtaBtnCounter(1)}
              className={`cursor-pointer rounded-md px-3 py-1 flex items-center gap-2 backdrop-blur-md border transition-all duration-200 ${
                ctaBtnCounter === 1
                  ? "border-blue-400 bg-blue-300/20 text-blue-500 shadow-inner"
                  : "border-gray-400/40 bg-white/10 text-black hover:bg-white/20"
              }`}
            >
              <FaRegCircleUser />
              <p>For you</p>
            </button>

            {/* BTN - 2 */}
            <button
              onClick={() => setCtaBtnCounter(2)}
              className={`cursor-pointer rounded-md px-3 py-1 flex items-center gap-2 backdrop-blur-md border transition-all duration-200 ${
                ctaBtnCounter === 2
                  ? "border-blue-400 bg-blue-300/20 text-blue-500 shadow-inner"
                  : "border-gray-400/40 bg-white/10 text-black hover:bg-white/20"
              }`}
            >
              <GiJusticeStar />
              <p>AI Workflows</p>
            </button>

            {/* BTN - 3 */}
            <button
              onClick={() => setCtaBtnCounter(3)}
              className={`cursor-pointer rounded-md px-3 py-1 flex items-center gap-2 backdrop-blur-md border transition-all duration-200 ${
                ctaBtnCounter === 3
                  ? "border-blue-400 bg-blue-300/20 text-blue-500 shadow-inner"
                  : "border-gray-400/40 bg-white/10 text-black hover:bg-white/20"
              }`}
            >
              <ImCool />
              <p>Most popular</p>
            </button>
          </div>

          {/* Project Cards */}
          <div className="project-showing-card w-full px-4 pt-5 pb-10 flex items-stretch gap-5 justify-between">
            {/* For You Cards */}
            {ctaBtnCounter === 1 &&
              forYouBtn.map((firstBtn, index) => (
                <div
                  key={index}
                  className="card-1 flex-1 bg-[#fcd5ce] backdrop-blur-lg border border-gray-300/40 rounded-lg p-4 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-black h-64 flex flex-col justify-between"
                >
                  <div className="tech-stack-img flex items-center justify-center gap-3 py-2 w-1/2 mx-auto rounded-md bg-white/10 border border-gray-400/40">
                    <img
                      src={firstBtn.img1}
                      alt=""
                      className="w-8 h-8 object-contain"
                    />
                    <img
                      src={firstBtn.img2}
                      alt=""
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <p className="text-md pt-6 font-semibold text-left">
                    {firstBtn.title}
                  </p>
                  <p className="pt-4 text-sm font-medium text-center text-black">
                    {firstBtn.shortLine}
                  </p>
                </div>
              ))}

            {/* AI Workflows Cards */}
            {ctaBtnCounter === 2 &&
              aiWorkBtn.map((secondBtn, index) => (
                <div
                  key={index}
                  className="card-1 flex-1 bg-[#fcd5ce] backdrop-blur-lg border border-gray-300/40 rounded-lg p-4 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-black  h-64 flex flex-col justify-between"
                >
                  <div className="tech-stack-img flex items-center justify-center gap-3 py-2 w-1/2 mx-auto rounded-md bg-white/10 border border-gray-400/40">
                    <img
                      src={secondBtn.img1}
                      alt=""
                      className="w-8 h-8 object-contain"
                    />
                    <img
                      src={secondBtn.img2}
                      alt=""
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <p className="text-md pt-6 font-semibold text-left">
                    {secondBtn.title}
                  </p>
                  <p className="pt-4 text-sm font-medium text-center text-black">
                    {secondBtn.shortLine}
                  </p>
                </div>
              ))}

            {/* Most Popular Cards */}
            {ctaBtnCounter === 3 &&
              mostPopBtn.map((thirdBtn, index) => (
                <div
                  key={index}
                  className="card flex-1 bg-[#fcd5ce] backdrop-blur-lg border border-gray-300/40 rounded-lg p-4 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-black h-64 flex flex-col justify-between"
                >
                  <div className="tech-stack-img flex items-center justify-center gap-3 py-2 w-1/2 mx-auto rounded-md bg-white/10 border border-gray-400/40">
                    <img
                      src={thirdBtn.img1}
                      alt=""
                      className="w-8 h-8 object-contain"
                    />
                    <img
                      src={thirdBtn.img2}
                      alt=""
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <p className="text-md font-semibold text-left">
                    {thirdBtn.title}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* //? Recently uploaded work */}
      <div className="w-3/4 m-auto mt-10 border border-gray-300 rounded-md">
        <h2 className="p-4 font-semibold text-2xl border-b border-gray-300">
          Recently updated
        </h2>
        <div className="w-full pt-4 px-2 flex items-center justify-between pb-4">
          <h4 className="font-semibold">⚡ Portfolio v1.0 launched</h4>
          <div className="flex items-center justify-between w-1/7">
            <div className="flex items-center gap-2 p-1 justify-around border border-gray-300 rounded-sm">
              <img
                src="/react.png"
                alt=""
                className="w-7 h-7 object-cover rounded-sm"
              />
              <img
                src="/javascript.png"
                alt=""
                className="w-7 h-7 object-cover"
              />
              <img
                src="/tailwindcss.png"
                alt=""
                className="w-7 h-7 object-cover rounded-sm"
              />
            </div>
            <h4 className="rounded-sm  bg-green-300/80 p-1">ON</h4>
          </div>
          <p className="text-sm text-neutral-600">Published 1h ago</p>
        </div>
      </div>
    </div>
  );
};

export default CenterPage;

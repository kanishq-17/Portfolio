import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { FaLinkedinIn } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { IoReturnDownBack } from "react-icons/io5";
import { IoReturnDownForward } from "react-icons/io5";
import { CiSaveUp2 } from "react-icons/ci";

import { TbMinus } from "react-icons/tb";
import { TbMinusVertical } from "react-icons/tb";

const LetsCollaborate = () => {
  const [reviewUser] = useState([
    {
      img: "https://i.pinimg.com/736x/e2/92/d4/e292d40d8adedec48521b9602dc89734.jpg",
      name: "Mayank Pareek",
      title: "3D Artist",
      linkedIn: "",
      description:
        "Creative 3D artist skilled in Blender, modeling, rendering, and visual storytelling.",
      comments:
        "Kanishq built a complete full-stack car model website for my 3D assets. The UI was clean, the workflow smooth, and he understood every requirement perfectly. Working with him was effortless — truly reliable and fast.",
    },
    {
      img: "https://i.pinimg.com/736x/6c/96/ee/6c96ee377b4ae931333ea76b969891be.jpg",
      name: "Vinit Modi",
      title: "Business Analyst",
      linkedIn: "https://www.linkedin.com/in/vinit-modi-22a458222",
      description:
        "Business analyst with strong problem-solving skills and Red Hat certification expertise.",
      comments:
        "We collaborated on the MERN project ‘Rasoi Se’. Kanishq handled the frontend and interactions brilliantly. His attention to detail, pixel-perfect components, and debugging skills elevated the entire project.",
    },
    {
      img: "/rajat-sen.png",
      name: "Rajat Sen",
      title: "Full Stack Dev",
      linkedIn: "https://www.linkedin.com/in/rajatsen13",
      description:
        "Full-stack developer with high logical thinking and strong application-building skills.",
      comments:
        "We teamed up during a hackathon where Kanishq built an impressive UI flow and frontend architecture. His quick thinking, adaptability, and design sense helped us ship a solid product under pressure.",
    },
    {
      img: "/anupam-mishra.png",
      name: "Anupam Mishra",
      title: "Data Engineer",
      linkedIn: "https://www.linkedin.com/in/anupam--mishra",
      description:
        "Data engineer at PwC with expertise in analytics and scalable data solutions.",
      comments:
        "Kanishq created a polished frontend for my startup DataSquare. The animations, GSAP work, and modern UI elevated the brand identity. His communication and delivery speed were excellent throughout.",
    },
    {
      img: "/ritik-1.png",
      name: "Ritik Raj Singh",
      title: "Front End Dev",
      linkedIn: "https://www.linkedin.com/in/ritik-raj-singh-92b018301",
      description:
        "Frontend developer with strong React skills and exploring full-stack development.",
      comments:
        "We’ve worked together on a full-stack LMS frontend and continue to collaborate. Kanishq’s structure, component design, and UI logic are consistently high-quality. He’s someone you can rely on for clean and efficient code.",
    },
  ]);

  const [formHeading] = useState([
    {
      heading: "Basic Information",
      title: "Tell me who I’ll be collaborating with.",
    },
    {
      heading: "Project Overview",
      title: "Help me understand what you're building and why.",
    },
    {
      heading: "Project Details",
      title: "Select the options that best describe your project.",
    },
    {
      heading: "Requirements & Preferences",
      title:
        "Toggle options to share how you'd like this collaboration to work.",
    },
    {
      heading: "Final Notes",
      title: "Share anything else I should know before we begin.",
    },
  ]);

  const [qna, setQna] = useState([
    {
      id: 0,
      question: "What type of clients do you work with?",
      answer: `I work with startups, small-to-medium businesses, founders, product teams, and creators who need clear, modern web interfaces — everything from marketing sites and landing pages to dashboards and internal tools. I also collaborate with agencies and technical leads who need a reliable frontend partner.`,
      isOpen: true,
    },
    {
      id: 1,
      question: "How big does my project need to be?",
      answer: `There’s no minimum size — I take projects ranging from single-page landing pages to multi-screen dashboards and full product builds. If it’s well-defined (even small), I’ll give a realistic plan; if the scope is loose, we’ll scope it together in a short discovery call.`,
      isOpen: false,
    },
    {
      id: 2,
      question: "How much does a website cost?",
      answer: `Costs depend on scope and complexity. As a rough guideline (INR):

Small landing page: ₹8k–₹25k

Multi-page brochure site: ₹25k–₹75k

Complex Webflow site with CMS and interactions: ₹75k+
If you prefer React/Tailwind instead of Webflow, budgets shift depending on integrations and backend needs — I’ll give a tailored estimate after a quick brief.`,
      isOpen: false,
    },
    {
      id: 3,
      question: "How much time does it take to create a website?",
      answer: `Typical timelines:

Small landing page: 2–7 days

Multi-page site (5–10 pages): 1–3 weeks

Complex site with CMS & interactions: 3–6 weeks
Timelines depend on approvals, assets (copy/design), and integrations. I share a clear schedule during scoping and give milestone delivery dates so you know what to expect.`,
      isOpen: false,
    },
    {
      id: 4,
      question: "Can you work with my existing team?",
      answer: `Absolutely.
I can collaborate with designers, backend developers, product managers, or founders — in async or real-time communication.`,
      isOpen: false,
    },
    {
      id: 5,
      question: "Do you offer revisions?",
      answer: `Yes.
I include milestone review points and feedback rounds to ensure we align on design, functionality and overall experience.`,
      isOpen: false,
    },
  ]);

  const [formCounter, setFormCounter] = useState(0);
  const [reviewCounter, setReviewCounter] = useState(0);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      company: "",
      projectTitle: "",
      building: "",
      problemSolve: "",
      inspirationLink: "",
      projectType: "",
      budgetRange: "",
      timeline: "",
      isDesignReady: "",
      needBackendSupport: "",
      isProjectAtFinal: "",
      isDeadlineFixed: "",
      detailedMessage: "",
    },
  });
  const { errors, isSubmitting } = formState;

  const submitForm = async (data) => {
    console.log("Form Data:", data);
    reset();
  };

  console.log(formCounter);

  useEffect(() => {
    let interval = setInterval(() => {
      setReviewCounter((prev) => (prev + 1) % reviewUser.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const showQna = (id) => {
    setQna((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isOpen: !item.isOpen }
          : { ...item, isOpen: false }
      )
    );
  };

  return (
    <div className="w-full bg-linear-to-br from-[#fff8ef] to-[#f5eaff] p-10">
      <div className="pt-18">
        <h1 className="font-bold text-black text-8xl">
          <span className="">Have Design Project</span> <br />
          <span className="text-7xl">and need help?</span>
        </h1>
        <hr className="text-gray-300 mt-10" />
      </div>

      {/* //! review-qna and contact section */}
      <div className="flex justify-between gap-10 mt-10">
        {/* //! review-qna section */}
        <div className="w-[60%]">
          {/* //? review section */}
          <div className="review-section flex items-start gap-5 justify-start">
            {/* //* review-user-card */}
            <div className="review-user-card w-sm h-full rounded-3xl relative">
              <div className="h-full w-full z-10">
                <img
                  src={reviewUser[reviewCounter].img}
                  alt=""
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
              <div className="w-full z-20 absolute bottom-0 bg-white/20 backdrop-blur-sm  rounded-b-3xl p-2 shadow-[0px_-5px_5px_0px_rgba(255,255,255,0.20)]">
                <div className="flex justify-start items-center gap-3">
                  <h2 className="font-semibold text-xl">
                    {reviewUser[reviewCounter].name}
                  </h2>
                  <Link to={reviewUser[reviewCounter].linkedIn}>
                    <div className="text-white rounded-xs p-0.5 bg-blue-600 text-center cursor-pointer">
                      <FaLinkedinIn />
                    </div>
                  </Link>
                </div>

                <h4 className="font-medium text-sm mb-2">
                  {reviewUser[reviewCounter].title}
                </h4>
                <p className="font-normal text-xs mb-1">
                  {reviewUser[reviewCounter].description}
                </p>
              </div>
            </div>
            {/* //* reviews */}
            <div className="reviews w-full h-82 flex ">
              <p className="font-light text-xl pt-40 text-black">
                {reviewUser[reviewCounter].comments}
              </p>
            </div>
          </div>
          {/* //? qna section */}
          <div className="qna section w-full mt-14 text-black">
            {qna.map((qa) => (
              <div key={qa.id}>
                <div
                  onClick={() => showQna(qa.id)}
                  aria-expanded={qa.isOpen}
                  className="flex items-center justify-between cursor-pointer y"
                >
                  <h4 className="font-semibold text-xl">{qa.question}</h4>
                  <div className="text-4xl relative">
                    <span>
                      <TbMinus />
                    </span>
                    <span
                      className={`absolute top-0 transition-all duration-300 ${
                        qa.isOpen ? "-rotate-90" : "rotate-0"
                      }`}
                    >
                      <TbMinusVertical />
                    </span>
                  </div>
                </div>
                <div
                  className={`mt-4 text-lg font-light transition-all duration-300 ${
                    qa.isOpen
                      ? "opacity-100 max-h-96"
                      : "opacity-0 max-h-0 overflow-hidden"
                  }`}
                >
                  <p>{qa.answer}</p>
                </div>
                <hr className="my-4" />
              </div>
            ))}
          </div>
        </div>
        {/* //! contact section */}
        <div className="w-[40%] bg-pink-50/50 border border-white/50 backdrop-blur-lg shadow-lg rounded-md h-134 p-5 relative">
          <div className="w-full flex justify-center items-center gap-3 my-5 mb-12">
            <div
              className={`rounded-full w-6 h-1 ${
                formCounter === 0
                  ? "bg-white shadow shadow-gray-600/30"
                  : "bg-neutral-400/30"
              }`}
            ></div>
            <div
              className={`rounded-full w-6 h-1 ${
                formCounter === 1
                  ? "bg-white shadow shadow-gray-600/50"
                  : "bg-neutral-400/30"
              }`}
            ></div>
            <div
              className={`rounded-full w-6 h-1 ${
                formCounter === 2
                  ? "bg-white shadow shadow-gray-600/50"
                  : "bg-neutral-400/30"
              }`}
            ></div>
            <div
              className={`rounded-full w-6 h-1 ${
                formCounter === 3
                  ? "bg-white shadow shadow-gray-600/50"
                  : "bg-neutral-400/30"
              }`}
            ></div>
            <div
              className={`rounded-full w-6 h-1 ${
                formCounter === 4
                  ? "bg-white shadow shadow-gray-600/50"
                  : "bg-neutral-400/30"
              }`}
            ></div>
          </div>
          <div className="mb-4">
            <h1 className="font-bold text-2xl">
              {formHeading[formCounter].heading}
            </h1>
            <p className="text-md mt-2">{formHeading[formCounter].title}</p>
          </div>
          <div className="mt-10">
            {/* //! FORM - PART 1 - USER INFO*/}
            {formCounter === 0 && (
              <form noValidate onSubmit={handleSubmit(submitForm)}>
                <div className="flex w-full items-center justify-between gap-5">
                  <div id="row-fullname" className="w-1/2">
                    <label htmlFor="fullname" className="text-sm">
                      FULL NAME
                    </label>
                    <br />
                    <input
                      id="fullname"
                      type="text"
                      placeholder="Kanishq Sodhani"
                      {...register("fullname", {
                        required: "name is required",
                      })}
                      className="text-lg my-2 outline-none"
                    />
                    {errors.fullname && (
                      <p className="text-red-500">{errors.fullname.message}</p>
                    )}
                    <hr />
                  </div>

                  <div id="row-company/brand" className="w-1/2">
                    <label htmlFor="company" className="text-sm">
                      COMPANY
                    </label>
                    <br />
                    <input
                      id="company"
                      type="text"
                      placeholder="OpenAI"
                      {...register("company")}
                      className="text-lg my-2 outline-none"
                    />
                    <hr />
                  </div>
                </div>

                <div id="row-email" className="w-full my-4">
                  <label htmlFor="email" className="text-sm">
                    EMAIL ADDRESS
                  </label>
                  <br />
                  <input
                    id="email"
                    type="email"
                    placeholder="try.kanishq@gmail.com"
                    {...register("email", {
                      required: "email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email",
                      },
                    })}
                    className="text-lg my-2 outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                  <hr />
                </div>

                <div id="row-projectTitle" className="w-full">
                  <label htmlFor="projectTitle" className="text-sm">
                    PROJECT TITLE
                  </label>
                  <br />
                  <input
                    id="projectTitle"
                    type="text"
                    placeholder="Name your project"
                    {...register("projectTitle")}
                    className="text-lg my-2 outline-none"
                  />
                  <hr />
                </div>
              </form>
            )}

            {/* //! FORM - PART 2 - INFO ABOUT PROJECT*/}
            {formCounter === 1 && (
              <form noValidate>
                <div id="row-whatYouBuilding" className="w-full">
                  <label htmlFor="building" className="text-sm">
                    WHAT ARE YOU BUILDING
                  </label>
                  <br />
                  <input
                    id="building"
                    type="text"
                    placeholder="Landing page, Dashboard, Website redesign, App UI…"
                    {...register("building")}
                    className="text-lg my-2 outline-none w-full"
                  />
                  <hr />
                </div>

                <div id="row-whatProblemSolve" className="w-full my-4">
                  <label htmlFor="problemSolve" className="text-sm">
                    WHAT PROBLEM WILL IT SOLVE
                  </label>
                  <br />
                  <input
                    id="problemSolve"
                    type="text"
                    placeholder="Improve user flow, modernize UI"
                    {...register("problemSolve")}
                    className="text-lg my-2 outline-none w-full"
                  />
                  <hr />
                </div>

                <div id="row-inspirationLink" className="w-full">
                  <label htmlFor="inspirationLink" className="text-sm">
                    ANY REFERENCE OR INSPIRATION
                  </label>
                  <br />
                  <input
                    id="inspirationLink"
                    type="text"
                    placeholder="Figma, Website link, Inspiration link... "
                    {...register("inspirationLink")}
                    className="text-lg my-2 outline-none w-full"
                  />
                  <hr />
                </div>
              </form>
            )}

            {/* //! FORM - PART 3 - DROPDOWN MENUS */}
            {formCounter === 2 && (
              <form noValidate>
                <div id="row-projectType" className="w-full mb-4">
                  <label htmlFor="projectType" className="text-sm">
                    Project Type
                  </label>
                  <br />
                  <select
                    id="projectType"
                    {...register("projectType")}
                    className="text-lg my-2 outline-none w-full"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select project type
                    </option>
                    <option value="Website">Website</option>
                    <option value="Dashboard Interface">
                      Dashboard Interface
                    </option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Web App">Web App</option>
                    <option value="Automation / AI Tool">
                      Automation / AI Tool
                    </option>
                    <option value="Something Else">Something Else</option>
                  </select>
                  <hr />
                </div>

                <div id="row-budgetRange" className="w-full mb-4">
                  <label htmlFor="budgetRange" className="text-sm">
                    Budget Range
                  </label>
                  <br />
                  <select
                    id="budgetRange"
                    {...register("budgetRange")}
                    className="text-lg my-2 outline-none w-full"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select budget range
                    </option>
                    <option value="Under ₹10,000">Under ₹10,000</option>
                    <option value="₹10,000 – ₹25,000">₹10,000 – ₹25,000</option>
                    <option value="₹25,000 – ₹75,000">₹25,000 – ₹75,000</option>
                    <option value="₹75,000+">₹75,000+</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                  <hr />
                </div>

                <div id="row-timeline" className="w-full mb-4">
                  <label htmlFor="timeline" className="text-sm">
                    Timeline
                  </label>
                  <br />
                  <select
                    id="timeline"
                    {...register("timeline")}
                    className="text-lg my-2 outline-none w-full"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select timeline
                    </option>
                    <option value="1–2 Weeks">1–2 Weeks</option>
                    <option value="2–4 Weeks">2–4 Weeks</option>
                    <option value="1–2 Months">1–2 Months</option>
                    <option value="Flexible">Flexible</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                  <hr />
                </div>
              </form>
            )}

            {/* //! FORM - PART 4 - TOGGLE QUESTIONS */}
            {formCounter === 3 && (
              <form noValidate>
                <div
                  id="row-isDesignReady"
                  className="w-full mb-4 flex justify-between items-center"
                >
                  <label
                    htmlFor="isDesignReady"
                    className="font-medium text-xl"
                    style={{ marginRight: "1.5rem" }}
                  >
                    Do you already have a design ready
                  </label>
                  <div className="toggle-container">
                    <input
                      type="checkbox"
                      className="toggle-checkbox"
                      id="isDesignReady"
                      {...register("isDesignReady")}
                    />
                    <label className="toggle-switch" htmlFor="isDesignReady">
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div
                  id="row-needBackendSupport"
                  className="w-full mb-4 flex justify-between items-center"
                >
                  <label
                    htmlFor="needBackendSupport"
                    className="font-medium text-xl"
                    style={{ marginRight: "1.5rem" }}
                  >
                    Do you need backend support
                  </label>
                  <div className="toggle-container">
                    <input
                      type="checkbox"
                      className="toggle-checkbox"
                      id="needBackendSupport"
                      {...register("needBackendSupport")}
                    />
                    <label
                      className="toggle-switch"
                      htmlFor="needBackendSupport"
                    >
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div
                  id="row-isProjectAtFinal"
                  className="w-full mb-4 flex justify-between items-center"
                >
                  <label
                    htmlFor="isProjectAtFinal"
                    className="font-medium text-xl"
                    style={{ marginRight: "1.5rem" }}
                  >
                    Is the scope final or still evolving
                  </label>
                  <div className="toggle-container">
                    <input
                      type="checkbox"
                      className="toggle-checkbox"
                      id="isProjectAtFinal"
                      {...register("isProjectAtFinal")}
                    />
                    <label className="toggle-switch" htmlFor="isProjectAtFinal">
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div
                  id="row-isDeadlineFixed"
                  className="w-full mb-4 flex justify-between items-center"
                >
                  <label
                    htmlFor="isDeadlineFixed"
                    className="font-medium text-xl"
                    style={{ marginRight: "1.5rem" }}
                  >
                    Is your deadline fixed
                  </label>
                  <div className="toggle-container">
                    <input
                      type="checkbox"
                      className="toggle-checkbox"
                      id="isDeadlineFixed"
                      {...register("isDeadlineFixed")}
                    />
                    <label className="toggle-switch" htmlFor="isDeadlineFixed">
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </form>
            )}

            {/* //! FORM - PART 5 - DETAILED MESSAGE */}
            {formCounter === 4 && (
              <form noValidate>
                <div id="row-detailedMessage" className="w-full">
                  <label htmlFor="detailedMessage" className="text-sm">
                    Tell me more about your project
                  </label>
                  <br />
                  <textarea
                    id="detailedMessage"
                    type="text"
                    placeholder="Explain your idea, required features, your goals, or anything specific you want."
                    {...register("detailedMessage")}
                    className="text-lg my-2 outline-none w-full min-h-16  max-h-[180px]"
                  />
                  <hr />
                </div>
              </form>
            )}
          </div>
          <div className="form-controller-btn w-lg flex justify-between items-center mt-5 absolute bottom-8">
            <button
              onClick={() =>
                setFormCounter((prev) => (prev > 0 ? prev - 1 : prev))
              }
              className="previous font-medium flex items-center justify-around gap-2 outline-1 bg-white/30  outline-neutral-200 backdrop-blur-md px-2 py-2 rounded-lg cursor-pointer shadow-lg"
            >
              <span className="bg-black text-white rounded-md p-0.5">
                <IoReturnDownBack />
              </span>
              <p>Back</p>
            </button>
            <button
              disabled={isSubmitting}
              onClick={() =>
                setFormCounter((prev) => (prev < 4 ? prev + 1 : prev))
              }
              className={`next font-medium flex items-center justify-around gap-2 outline-1  backdrop-blur-md px-2 py-2 rounded-lg cursor-pointer shadow-lg ${
                formCounter === 4
                  ? "bg-blue-800/50 outline-indigo-300 text-white"
                  : "bg-white/30 outline-neutral-200"
              }`}
            >
              <span
                className={` rounded-md p-0.5 ${
                  formCounter === 4
                    ? "bg-blue-600 text-white"
                    : "bg-black text-white"
                }`}
              >
                {formCounter === 4 ? <CiSaveUp2 /> : <IoReturnDownForward />}
              </span>
              <p>{formCounter === 4 ? "Submit" : "Next"}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetsCollaborate;

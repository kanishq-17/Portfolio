// LetsCollaborate.jsx
import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";

import { FaLinkedinIn } from "react-icons/fa";
import { IoReturnDownBack, IoReturnDownForward } from "react-icons/io5";
import { CiSaveUp2 } from "react-icons/ci";
import { IoLogoGithub } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import emailjs from "@emailjs/browser";

// small helper for classes (no extra dependency)
const cx = (...args) => args.filter(Boolean).join(" ");

const LetsCollaborate = () => {
  // sample reviewers (kept same)
  const [reviewUser] = useState([
    {
      img: "/people/mayank-pareek.png",
      name: "Mayank Pareek",
      title: "3D Artist",
      linkedIn: "",
      comments:
        "Kanishq built a complete full-stack car model website for my 3D assets. The UI was clean, the workflow smooth, and he understood every requirement perfectly. Working with him was effortless — truly reliable and fast.",
    },
    {
      img: "https://i.pinimg.com/736x/6c/96/ee/6c96ee377b4ae931333ea76b969891be.jpg",
      name: "Vinit Modi",
      title: "Business Analyst",
      linkedIn: "https://www.linkedin.com/in/vinit-modi-22a458222",
      comments:
        "We collaborated on the MERN project ‘Rasoi Se’. Kanishq handled the frontend and interactions brilliantly. His attention to detail, pixel-perfect components, and debugging skills elevated the entire project.",
    },
    {
      img: "/people/rajat-sen.png",
      name: "Rajat Sen",
      title: "Full Stack Dev",
      linkedIn: "https://www.linkedin.com/in/rajatsen13",
      comments:
        "We teamed up during a hackathon where Kanishq built an impressive UI flow and frontend architecture. His quick thinking, adaptability, and design sense helped us ship a solid product under pressure.",
    },
    {
      img: "/people/anupam-mishra.png",
      name: "Anupam Mishra",
      title: "Data Engineer",
      linkedIn: "https://www.linkedin.com/in/anupam--mishra",
      comments:
        "Kanishq created a polished frontend for my startup DataSquare. The animations, GSAP work, and modern UI elevated the brand identity. His communication and delivery speed were excellent throughout.",
    },
    {
      img: "/people/ritik.png",
      name: "Ritik Raj Singh",
      title: "Front End Dev",
      linkedIn: "https://www.linkedin.com/in/ritik-raj-singh-92b018301",
      comments:
        "We’ve worked together on a full-stack LMS frontend and continue to collaborate. Kanishq’s structure, component design, and UI logic are consistently high-quality. He’s someone you can rely on for clean and efficient code.",
    },
  ]);

  // Form headings - 6 steps (0-5)
  const [formHeading] = useState([
    {
      heading: "Basic Information",
      title: "Tell me who I'll be collaborating with.",
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
    {
      heading: "Review & Send",
      title: "Review your details and send your collaboration request.",
    },
  ]);

  const [qna, setQna] = useState([
    {
      id: 0,
      question: "What type of clients do you work with?",
      answer: `I work with startups, small-to-medium businesses, founders, product teams, and creators who need clear, modern web interfaces — everything from marketing sites and landing pages to dashboards and internal tools.`,
      isOpen: true,
    },
    {
      id: 1,
      question: "How big does my project need to be?",
      answer: `There’s no minimum size — I take projects ranging from single-page landing pages to multi-screen dashboards and full product builds.`,
      isOpen: false,
    },
    {
      id: 2,
      question: "How much does a website cost?",
      answer: `Costs depend on scope and complexity. Small landing page: ₹8k–₹25k, Multi-page: ₹25k–₹75k, Complex: ₹75k+`,
      isOpen: false,
    },
    {
      id: 3,
      question: "How much time does it take to create a website?",
      answer: `Typical timelines: Small: 2–7 days, Multi-page: 1–3 weeks, Complex: 3–6 weeks`,
      isOpen: false,
    },
    {
      id: 4,
      question: "Can you work with my existing team?",
      answer: `Absolutely. I can collaborate with designers, backend developers, product managers, or founders — async or real-time.`,
      isOpen: false,
    },
    {
      id: 5,
      question: "Do you offer revisions?",
      answer: `Yes. I include milestone review points and feedback rounds to ensure alignment.`,
      isOpen: false,
    },
  ]);

  const [formCounter, setFormCounter] = useState(0);
  const [reviewCounter, setReviewCounter] = useState(0);

  // react-hook-form with validation onChange (so isValid works live)
  const {
    register,
    handleSubmit,
    reset,
    control,
    trigger,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm({
    mode: "onChange", // live validation so isValid updates
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
      isDesignReady: false,
      needBackendSupport: false,
      isProjectAtFinal: false,
      isDeadlineFixed: false,
      detailedMessage: "",
    },
  });

  // cycle reviews
  useEffect(() => {
    const interval = setInterval(
      () => setReviewCounter((prev) => (prev + 1) % reviewUser.length),
      5000
    );
    return () => clearInterval(interval);
  }, [reviewUser.length]);

  const showQna = (id) => {
    setQna((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isOpen: !item.isOpen }
          : { ...item, isOpen: false }
      )
    );
  };

  // toast
  const [toast, setToast] = useState(null);
  const toastRef = useRef(null);
  function showToast(type, text) {
    setToast({ type, text });
    if (toastRef.current) clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3000);
  }

  // EmailJS config
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const RECEIVE_EMAIL = "try.kanishq@gmail.com";

  // Update submitForm logic - format as key-value pairs
  const submitForm = async (data) => {
    // ALL form values to be sent
    if (!SERVICE_ID || !CONTACT_TEMPLATE_ID || !PUBLIC_KEY) {
      showToast(
        "error",
        "EmailJS keys missing — open mail client manually or contact directly."
      );
      return;
    }

    // Format all fields as key-value pairs for email
    const messageBody = `
New Collaboration Request Received

BASIC INFORMATION:
Full Name: ${data.fullname || "Not provided"}
Email: ${data.email || "Not provided"}
Company/Brand: ${data.company || "Not provided"}
Project Title: ${data.projectTitle || "Not provided"}

PROJECT OVERVIEW:
What are you building?: ${data.building || "Not provided"}
What problem will it solve?: ${data.problemSolve || "Not provided"}
Reference/Inspiration Link: ${data.inspirationLink || "Not provided"}

PROJECT DETAILS:
Project Type: ${data.projectType || "Not provided"}
Budget Range: ${data.budgetRange || "Not provided"}
Timeline: ${data.timeline || "Not provided"}

REQUIREMENTS & PREFERENCES:
Do you already have a design ready?: ${data.isDesignReady ? "Yes" : "No"}
Do you need backend support?: ${data.needBackendSupport ? "Yes" : "No"}
Is the scope final or still evolving?: ${data.isProjectAtFinal ? "Yes" : "No"}
Is your deadline fixed?: ${data.isDeadlineFixed ? "Yes" : "No"}

FINAL NOTES:
${data.detailedMessage || "Not provided"}

---
Sent at: ${new Date().toLocaleString()}
Source: ${window.location.href}
    `.trim();

    const params = {
      from_name: data.fullname || data.email,
      from_email: data.email, // User's email
      to_email: RECEIVE_EMAIL, // Your email
      message: messageBody,
      subject: `New Collaboration Request: ${
        data.projectTitle || "Untitled Project"
      }`,
      sent_at: new Date().toLocaleString(),
      source_page: window.location.href,
    };

    try {
      await emailjs.send(SERVICE_ID, CONTACT_TEMPLATE_ID, params, PUBLIC_KEY);
      showToast("success", "✅ Request sent! I'll reply soon.");
      reset();
      setFormCounter(0);
    } catch (err) {
      console.error("EmailJS send error:", err);
      showToast(
        "error",
        "⚠️ Sending failed — please try again or use the direct email."
      );
    }
  };

  // Progress bar: 6 steps (0-5), display StepX/6
  const progressItems = [0, 1, 2, 3, 4, 5];

  const handleBack = () => {
    setFormCounter((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = async () => {
    const stepRequiredFields = {
      0: ["fullname", "email", "projectTitle"],
      1: ["building"],
      2: ["projectType", "budgetRange", "timeline"],
      3: [], // Toggles are optional
      4: [], // Final notes optional
      5: [], // Review step - no validation needed
    };
    const fieldsToCheck = stepRequiredFields[formCounter] || [];
    if (fieldsToCheck.length > 0) {
      const valid = await trigger(fieldsToCheck);
      if (!valid) {
        showToast("error", "Please fill required fields in this step.");
        return;
      }
    }
    setFormCounter((prev) => Math.min(prev + 1, 5));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // KEYDOWN handler: prevent Enter from submitting the form unless on final step
  const onFormKeyDown = (e) => {
    if (e.key === "Enter") {
      // allow Enter to submit only when on final step (formCounter === 5)
      if (formCounter < 5) {
        e.preventDefault();
        // optionally move focus to next field instead
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-[#fff8ef] to-[#f5eaff] p-1.5 xs:p-2 sm:p-4 md:p-6 lg:p-10 xl:p-14">
      {/* Toast */}
      {toast && (
        <div
          className={cx(
            "fixed right-1 top-2 xs:right-2 xs:top-4 sm:right-6 sm:top-6 z-50 px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2 rounded-md shadow-lg text-xs xs:text-sm max-w-[calc(100vw-0.5rem)] xs:max-w-[calc(100vw-1rem)]",
            toast.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-rose-500 text-white"
          )}
        >
          {toast.text}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 xs:mb-6 sm:mb-8">
          <h1 className="font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-slate-900 px-1 xs:px-0">
            Have a design project <br className="hidden xs:block" /> and need
            help?
          </h1>
          <p className="mt-2 xs:mt-3 sm:mt-4 text-xs xs:text-sm sm:text-base text-slate-700 max-w-2xl px-1 xs:px-0">
            Fill a quick brief — I'll review and respond with a plan & estimate.
            You can also email directly at{" "}
            <strong className="break-all">try.kanishq@gmail.com</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 xs:gap-6 sm:gap-8 xl:gap-12 lg:grid-cols-12">
          {/* Left: Reviews + QnA (col-span 7/12) */}
          <div className="lg:col-span-7 space-y-4 xs:space-y-6 sm:space-y-8 min-w-0">
            {/* Review card */}
            <div className="flex flex-col md:flex-row gap-3 xs:gap-4 md:gap-6 bg-white rounded-xl xs:rounded-2xl shadow-md p-2.5 xs:p-3 sm:p-4 md:p-5 border border-slate-100">
              <div className="w-full md:w-56 h-32 xs:h-36 sm:h-40 md:h-44 rounded-xl xs:rounded-2xl overflow-hidden bg-slate-100 shrink-0 flex justify-center items-center">
                <img
                  src={reviewUser[reviewCounter].img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base xs:text-lg sm:text-xl font-semibold wrap-break-word">
                      {reviewUser[reviewCounter].name}
                    </h3>
                    <p className="text-xs xs:text-sm text-slate-600">
                      {reviewUser[reviewCounter].title}
                    </p>
                  </div>
                  <div className="shrink-0">
                    {reviewUser[reviewCounter].linkedIn && (
                      <Link
                        to={reviewUser[reviewCounter].linkedIn}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-700 hover:text-indigo-600"
                      >
                        <FaLinkedinIn className="text-sm xs:text-base" />
                      </Link>
                    )}
                  </div>
                </div>

                <p className="mt-2 xs:mt-3 sm:mt-4 text-xs xs:text-sm sm:text-base text-slate-700 leading-relaxed">
                  {reviewUser[reviewCounter].comments}
                </p>
              </div>
            </div>

            {/* QnA */}
            <div className="bg-white p-2.5 xs:p-3 sm:p-4 md:p-6 rounded-xl xs:rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-base xs:text-lg font-semibold mb-3 xs:mb-4">
                Common questions
              </h4>
              <div className="space-y-3 xs:space-y-4">
                {qna.map((qa) => (
                  <div key={qa.id}>
                    <button
                      onClick={() => showQna(qa.id)}
                      className="w-full text-left flex items-center justify-between py-2 xs:py-3 gap-2"
                      aria-expanded={qa.isOpen}
                    >
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-xs xs:text-sm sm:text-base leading-snug">
                          {qa.question}
                        </h5>
                      </div>
                      <div className="text-xl xs:text-2xl min-w-6 xs:min-w-8 flex items-center justify-center shrink-0">
                        <span
                          className={`${
                            qa.isOpen ? "-rotate-90" : "rotate-0"
                          } transition-transform`}
                        >
                          ⮟
                        </span>
                      </div>
                    </button>

                    <div
                      className={cx(
                        "overflow-hidden transition-all duration-300",
                        qa.isOpen
                          ? "max-h-96 opacity-100 py-2"
                          : "max-h-0 opacity-0"
                      )}
                    >
                      <p className="text-xs xs:text-sm sm:text-base text-slate-700 leading-relaxed">
                        {qa.answer}
                      </p>
                    </div>

                    <hr className="my-3 xs:my-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Multi-step form (col-span 5/12) */}
          <div className="lg:col-span-5 min-w-0">
            <div className="sticky top-1 xs:top-2 sm:top-4 md:top-6 space-y-4 xs:space-y-5 sm:space-y-6">
              <div className="bg-white rounded-xl xs:rounded-2xl p-2.5 xs:p-3 sm:p-4 md:p-6 border border-slate-100 shadow-md">
                {/* Step progress */}
                <div className="flex flex-wrap items-center justify-between mb-3 xs:mb-4 gap-2">
                  <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
                    {progressItems.map((p) => (
                      <div
                        key={p}
                        className="flex items-center gap-0.5 xs:gap-1"
                      >
                        <div
                          className={cx(
                            "w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs xs:text-xs sm:text-sm font-medium",
                            formCounter === p
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-200 text-slate-700"
                          )}
                        >
                          {p + 1}
                        </div>
                        {/* small connecting line except last */}
                        {p < progressItems.length - 1 && (
                          <div
                            className={cx(
                              "w-3 xs:w-4 sm:w-6 h-0.5",
                              formCounter > p ? "bg-indigo-600" : "bg-slate-200"
                            )}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="text-xs xs:text-sm text-slate-500 whitespace-nowrap">
                    Step {formCounter + 1} / 6
                  </div>
                </div>

                <div>
                  <h2 className="text-base xs:text-lg sm:text-xl font-semibold">
                    {formHeading[formCounter].heading}
                  </h2>
                  <p className="text-xs xs:text-sm text-slate-600 mt-1 leading-relaxed">
                    {formHeading[formCounter].title}
                  </p>
                </div>

                <div className="mt-2 xs:mt-3 sm:mt-5">
                  {/* FORM - single react-hook-form instance */}
                  {/* Add onKeyDown to prevent Enter submitting early */}
                  <form
                    onSubmit={handleSubmit(submitForm)}
                    onKeyDown={onFormKeyDown}
                    noValidate
                  >
                    {/* Step 0: Basic Info */}
                    {formCounter === 0 && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-medium">
                            Full name *
                          </label>
                          <input
                            {...register("fullname", {
                              required: "Full name is required",
                            })}
                            className="w-full mt-1.5 xs:mt-2 p-2 xs:p-2.5 sm:p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-xs xs:text-sm sm:text-base"
                            placeholder="Kanishq Sodhani"
                            type="text"
                          />
                          {errors.fullname && (
                            <p className="text-rose-500 text-xs xs:text-sm mt-1">
                              {errors.fullname.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-medium">
                            Company / Brand
                          </label>
                          <input
                            {...register("company")}
                            className="w-full mt-1.5 xs:mt-2 p-2 xs:p-2.5 sm:p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-xs xs:text-sm sm:text-base"
                            placeholder="OpenAI"
                            type="text"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-medium">
                            Email address *
                          </label>
                          <input
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email",
                              },
                            })}
                            className="w-full mt-1.5 xs:mt-2 p-2 xs:p-2.5 sm:p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-xs xs:text-sm sm:text-base"
                            placeholder="you@company.com"
                            type="email"
                          />
                          {errors.email && (
                            <p className="text-rose-500 text-xs xs:text-sm mt-1">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-medium">
                            Project title *
                          </label>
                          <input
                            {...register("projectTitle", {
                              required: "Project title is required",
                            })}
                            className="w-full mt-1.5 xs:mt-2 p-2 xs:p-2.5 sm:p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-xs xs:text-sm sm:text-base"
                            placeholder="Name your project"
                            type="text"
                          />
                          {errors.projectTitle && (
                            <p className="text-rose-500 text-xs xs:text-sm mt-1">
                              {errors.projectTitle.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 1: Project Overview */}
                    {formCounter === 1 && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-medium">
                            What are you building? *
                          </label>
                          <input
                            {...register("building", {
                              required: "This is required",
                            })}
                            className="w-full mt-1.5 xs:mt-2 p-2 xs:p-2.5 sm:p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-xs xs:text-sm sm:text-base"
                            placeholder="Landing page, Dashboard, App UI..."
                            type="text"
                          />
                          {errors.building && (
                            <p className="text-rose-500 text-xs xs:text-sm mt-1">
                              {errors.building.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-medium">
                            What problem will it solve?
                          </label>
                          <input
                            {...register("problemSolve")}
                            className="w-full mt-1.5 xs:mt-2 p-2 xs:p-2.5 sm:p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-xs xs:text-sm sm:text-base"
                            placeholder="Improve UX, increase conversions..."
                            type="text"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-medium">
                            Reference / Inspiration (link)
                          </label>
                          <input
                            {...register("inspirationLink")}
                            className="w-full mt-1.5 xs:mt-2 p-2 xs:p-2.5 sm:p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-xs xs:text-sm sm:text-base"
                            placeholder="Figma / Website link"
                            type="text"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 2: Dropdowns - Project Type / Budget / Timeline */}
                    {formCounter === 2 && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-medium">
                            Project type *
                          </label>
                          <select
                            {...register("projectType", {
                              required: "Select project type",
                            })}
                            className="w-full mt-1.5 xs:mt-2 p-2 xs:p-2.5 sm:p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-xs xs:text-sm sm:text-base"
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
                            <option value="Something Else">
                              Something Else
                            </option>
                          </select>
                          {errors.projectType && (
                            <p className="text-rose-500 text-xs xs:text-sm mt-1">
                              {errors.projectType.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-medium">
                            Budget range *
                          </label>
                          <select
                            {...register("budgetRange", {
                              required: "Select budget range",
                            })}
                            className="w-full mt-1.5 xs:mt-2 p-2 xs:p-2.5 sm:p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-xs xs:text-sm sm:text-base"
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Select budget range
                            </option>
                            <option value="Under ₹10,000">Under ₹10,000</option>
                            <option value="₹10,000 – ₹25,000">
                              ₹10,000 – ₹25,000
                            </option>
                            <option value="₹25,000 – ₹75,000">
                              ₹25,000 – ₹75,000
                            </option>
                            <option value="₹75,000+">₹75,000+</option>
                            <option value="Not sure yet">Not sure yet</option>
                          </select>
                          {errors.budgetRange && (
                            <p className="text-rose-500 text-xs xs:text-sm mt-1">
                              {errors.budgetRange.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-medium">
                            Timeline *
                          </label>
                          <select
                            {...register("timeline", {
                              required: "Select timeline",
                            })}
                            className="w-full mt-1.5 xs:mt-2 p-2 xs:p-2.5 sm:p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-xs xs:text-sm sm:text-base"
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
                          {errors.timeline && (
                            <p className="text-rose-500 text-xs xs:text-sm mt-1">
                              {errors.timeline.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 3: Toggle questions (boolean true/false) */}
                    {formCounter === 3 && (
                      <div className="space-y-3 xs:space-y-4">
                        <Controller
                          control={control}
                          name="isDesignReady"
                          render={({ field: { value, onChange } }) => (
                            <div className="flex items-center justify-between gap-2 xs:gap-3">
                              <div className="flex-1 min-w-0">
                                <label className="font-medium text-xs xs:text-sm sm:text-base">
                                  Do you already have a design ready?
                                </label>
                                <p className="text-xs xs:text-sm text-slate-500 mt-0.5">
                                  If yes, I can implement directly.
                                </p>
                              </div>

                              <div className="flex items-center gap-2 xs:gap-3 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => onChange(!value)}
                                  className={cx(
                                    "w-12 h-7 xs:w-14 xs:h-8 rounded-full p-0.5 xs:p-1 transition",
                                    value ? "bg-rose-500" : "bg-slate-200"
                                  )}
                                  aria-pressed={value}
                                >
                                  <span
                                    className={cx(
                                      "block w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-white transition-transform",
                                      value
                                        ? "translate-x-5 xs:translate-x-6"
                                        : "translate-x-0"
                                    )}
                                  />
                                </button>
                                <span className="text-xs xs:text-sm text-slate-600 whitespace-nowrap">
                                  {value ? "Yes" : "No"}
                                </span>
                              </div>
                            </div>
                          )}
                        />

                        <Controller
                          control={control}
                          name="needBackendSupport"
                          render={({ field: { value, onChange } }) => (
                            <div className="flex items-center justify-between gap-2 xs:gap-3">
                              <div className="flex-1 min-w-0">
                                <label className="font-medium text-xs xs:text-sm sm:text-base">
                                  Do you need backend support?
                                </label>
                                <p className="text-xs xs:text-sm text-slate-500 mt-0.5">
                                  APIs, database, auth — I can help or integrate
                                  with your backend.
                                </p>
                              </div>

                              <div className="flex items-center gap-2 xs:gap-3 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => onChange(!value)}
                                  className={cx(
                                    "w-12 h-7 xs:w-14 xs:h-8 rounded-full p-0.5 xs:p-1 transition",
                                    value ? "bg-rose-500" : "bg-slate-200"
                                  )}
                                  aria-pressed={value}
                                >
                                  <span
                                    className={cx(
                                      "block w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-white transition-transform",
                                      value
                                        ? "translate-x-5 xs:translate-x-6"
                                        : "translate-x-0"
                                    )}
                                  />
                                </button>
                                <span className="text-xs xs:text-sm text-slate-600 whitespace-nowrap">
                                  {value ? "Yes" : "No"}
                                </span>
                              </div>
                            </div>
                          )}
                        />

                        <Controller
                          control={control}
                          name="isProjectAtFinal"
                          render={({ field: { value, onChange } }) => (
                            <div className="flex items-center justify-between gap-2 xs:gap-3">
                              <div className="flex-1 min-w-0">
                                <label className="font-medium text-xs xs:text-sm sm:text-base">
                                  Is the scope final or still evolving?
                                </label>
                                <p className="text-xs xs:text-sm text-slate-500 mt-0.5">
                                  Final scopes help with precise estimates.
                                </p>
                              </div>

                              <div className="flex items-center gap-2 xs:gap-3 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => onChange(!value)}
                                  className={cx(
                                    "w-12 h-7 xs:w-14 xs:h-8 rounded-full p-0.5 xs:p-1 transition",
                                    value ? "bg-rose-500" : "bg-slate-200"
                                  )}
                                  aria-pressed={value}
                                >
                                  <span
                                    className={cx(
                                      "block w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-white transition-transform",
                                      value
                                        ? "translate-x-5 xs:translate-x-6"
                                        : "translate-x-0"
                                    )}
                                  />
                                </button>
                                <span className="text-xs xs:text-sm text-slate-600 whitespace-nowrap">
                                  {value ? "Yes" : "No"}
                                </span>
                              </div>
                            </div>
                          )}
                        />

                        <Controller
                          control={control}
                          name="isDeadlineFixed"
                          render={({ field: { value, onChange } }) => (
                            <div className="flex items-center justify-between gap-2 xs:gap-3">
                              <div className="flex-1 min-w-0">
                                <label className="font-medium text-xs xs:text-sm sm:text-base">
                                  Is your deadline fixed?
                                </label>
                                <p className="text-xs xs:text-sm text-slate-500 mt-0.5">
                                  Fixed deadlines may need priority planning.
                                </p>
                              </div>

                              <div className="flex items-center gap-2 xs:gap-3 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => onChange(!value)}
                                  className={cx(
                                    "w-12 h-7 xs:w-14 xs:h-8 rounded-full p-0.5 xs:p-1 transition",
                                    value ? "bg-rose-500" : "bg-slate-200"
                                  )}
                                  aria-pressed={value}
                                >
                                  <span
                                    className={cx(
                                      "block w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-white transition-transform",
                                      value
                                        ? "translate-x-5 xs:translate-x-6"
                                        : "translate-x-0"
                                    )}
                                  />
                                </button>
                                <span className="text-xs xs:text-sm text-slate-600 whitespace-nowrap">
                                  {value ? "Yes" : "No"}
                                </span>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    )}

                    {/* Step 4: Final Notes - textarea for detailed message */}
                    {formCounter === 4 && (
                      <div className="space-y-3 xs:space-y-4">
                        <div>
                          <label className="text-xs font-medium">
                            Tell me more about your project
                          </label>
                          <textarea
                            {...register("detailedMessage")}
                            className="w-full mt-1.5 xs:mt-2 p-2 xs:p-2.5 sm:p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 min-h-[90px] xs:min-h-[100px] sm:min-h-[120px] text-xs xs:text-sm sm:text-base"
                            placeholder="Explain your idea, required features, your goals..."
                          />
                        </div>

                        <div className="text-xs xs:text-sm text-slate-500">
                          You can also attach links to Figma, Drive, or examples
                          in the message above.
                        </div>
                      </div>
                    )}

                    {/* Step 5: Review & Send (read only review + Send button) */}
                    {formCounter === 5 && (
                      <div className="space-y-2 xs:space-y-3 text-xs xs:text-sm">
                        <div className="font-semibold text-base xs:text-lg mb-1.5 xs:mb-2">
                          Review Your Details:
                        </div>
                        <div className="wrap-break-word">
                          <span className="font-medium">Full Name:</span>{" "}
                          {watch("fullname")}
                        </div>
                        <div className="wrap-break-word">
                          <span className="font-medium">Email:</span>{" "}
                          {watch("email")}
                        </div>
                        {watch("company") && (
                          <div className="wrap-break-word">
                            <span className="font-medium">Company:</span>{" "}
                            {watch("company")}
                          </div>
                        )}
                        <div className="wrap-break-word">
                          <span className="font-medium">Project Title:</span>{" "}
                          {watch("projectTitle")}
                        </div>
                        <div className="wrap-break-word">
                          <span className="font-medium">
                            What are you building?
                          </span>{" "}
                          {watch("building")}
                        </div>
                        {watch("problemSolve") && (
                          <div className="wrap-break-word">
                            <span className="font-medium">Problem Solved:</span>{" "}
                            {watch("problemSolve")}
                          </div>
                        )}
                        {watch("inspirationLink") && (
                          <div className="break-all">
                            <span className="font-medium">
                              Reference / Inspiration:
                            </span>{" "}
                            {watch("inspirationLink")}
                          </div>
                        )}
                        <div className="wrap-break-word">
                          <span className="font-medium">Project Type:</span>{" "}
                          {watch("projectType")}
                        </div>
                        <div className="wrap-break-word">
                          <span className="font-medium">Budget Range:</span>{" "}
                          {watch("budgetRange")}
                        </div>
                        <div className="wrap-break-word">
                          <span className="font-medium">Timeline:</span>{" "}
                          {watch("timeline")}
                        </div>
                        <div>
                          <span className="font-medium">Design Ready?</span>{" "}
                          {watch("isDesignReady") ? "Yes" : "No"}
                        </div>
                        <div>
                          <span className="font-medium">
                            Need Backend Support?
                          </span>{" "}
                          {watch("needBackendSupport") ? "Yes" : "No"}
                        </div>
                        <div>
                          <span className="font-medium">Is Scope Final?</span>{" "}
                          {watch("isProjectAtFinal") ? "Yes" : "No"}
                        </div>
                        <div>
                          <span className="font-medium">Fixed Deadline?</span>{" "}
                          {watch("isDeadlineFixed") ? "Yes" : "No"}
                        </div>
                        {watch("detailedMessage") && (
                          <div className="mt-2 wrap-break-word">
                            <span className="font-medium">Details:</span>{" "}
                            {watch("detailedMessage")}
                          </div>
                        )}
                        <div className="mt-2 xs:mt-3 text-slate-600 text-xs">
                          If something is wrong, use Back to fix it!
                        </div>
                      </div>
                    )}

                    {/* Controls (Back / Next / Submit) */}
                    <div className="mt-3 xs:mt-4 sm:mt-6 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2 xs:gap-3">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center justify-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1.5 xs:py-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:shadow-sm text-xs xs:text-sm sm:text-base"
                        disabled={formCounter === 0}
                      >
                        <IoReturnDownBack className="text-sm xs:text-base" />{" "}
                        <span>Back</span>
                      </button>
                      {formCounter < 5 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="inline-flex items-center justify-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-xs xs:text-sm sm:text-base"
                        >
                          <span>Next</span>{" "}
                          <IoReturnDownForward className="text-sm xs:text-base" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={!isValid || isSubmitting}
                          className={cx(
                            "inline-flex items-center justify-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg font-medium text-xs xs:text-sm sm:text-base",
                            !isValid || isSubmitting
                              ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                              : "bg-rose-600 text-white hover:bg-rose-700"
                          )}
                        >
                          <span>{isSubmitting ? "Sending..." : "Send"}</span>
                          <CiSaveUp2 className="text-sm xs:text-base" />
                        </button>
                      )}
                    </div>
                    {/* Only show warning on send (step 5) */}
                    {!isValid && formCounter === 5 && (
                      <p className="text-rose-500 text-xs xs:text-sm mt-2 xs:mt-3">
                        Please fill required fields marked with * before
                        sending.
                      </p>
                    )}
                  </form>
                </div>
              </div>

              {/* small contact helper */}
              <div className="bg-white rounded-xl xs:rounded-2xl p-2.5 xs:p-3 sm:p-4 border border-slate-100 text-xs xs:text-sm text-slate-700 shadow-sm">
                <div className="flex items-start gap-2 xs:gap-3">
                  <div className="shrink-0 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                    <BiLogoGmail className="text-lg xs:text-xl sm:text-2xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs xs:text-sm">
                      Prefer a quick chat?
                    </div>
                    <div className="text-slate-500 text-xs xs:text-sm mt-0.5">
                      Email me directly at{" "}
                      <a
                        href="https://mail.google.com/mail/?view=cm&to=try.kanishq@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-rose-600 underline underline-offset-2 break-all hover:text-rose-700 transition-all"
                      >
                        try.kanishq@gmail.com
                      </a>
                    </div>
                    <div className="mt-2 xs:mt-3 flex gap-2 xs:gap-3">
                      <a
                        href="https://www.linkedin.com/in/kanishqsodhani"
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-rose-400 transition"
                      >
                        <FaLinkedinIn className="text-slate-700 text-xs xs:text-sm" />
                      </a>
                      <a
                        href="https://github.com/kanishq-17"
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-rose-400 transition"
                      >
                        <IoLogoGithub className="text-slate-700 text-xs xs:text-sm" />
                      </a>
                      <a
                        href="https://twitter.com/yourhandle"
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-rose-400 transition"
                      >
                        <FaXTwitter className="text-slate-700 text-xs xs:text-sm" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetsCollaborate;

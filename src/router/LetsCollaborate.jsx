// LetsCollaborate.jsx
import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";

import { FaLinkedinIn } from "react-icons/fa";
import { IoReturnDownBack, IoReturnDownForward } from "react-icons/io5";
import { CiSaveUp2 } from "react-icons/ci";
import { IoLogoGithub } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";

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
      title: "Toggle options to share how you'd like this collaboration to work.",
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
        item.id === id ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }
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

  // handle final submit (replace with EmailJS or API later)
  const submitForm = async (data) => {
    try {
      // final validation before submit to be safe
      const ok = await trigger([
        "fullname",
        "email",
        "projectTitle",
        "building",
        "projectType",
        "budgetRange",
        "timeline",
      ]);
      if (!ok) {
        showToast("error", "Please fill required fields before submitting.");
        return;
      }

      // OPTIONAL: send to server / EmailJS here
      // console.log("Form submitted:", data);
      showToast("success", "✅ Request submitted. I will reply soon.");
      reset();
      setFormCounter(0);
    } catch (err) {
      console.error(err);
      showToast("error", "⚠️ Submission failed. Try again.");
    }
  };

  // mapping of step -> required fields to validate when clicking Next
  const stepRequiredFields = {
    0: ["fullname", "email", "projectTitle"], // Step 1
    1: ["building"], // Step 2
    2: ["projectType", "budgetRange", "timeline"], // Step 3
    3: [], // Step 4 toggles optional
    4: [], // Step 5 final message
  };

  // Next handler that validates current step required fields before allowing next
  const handleNext = async () => {
    const fieldsToCheck = stepRequiredFields[formCounter] || [];
    if (fieldsToCheck.length > 0) {
      const valid = await trigger(fieldsToCheck);
      if (!valid) {
        // validation failed — do not advance; errors will show inline
        showToast("error", "Please fill required fields in this step.");
        return;
      }
    }
    // all good -> advance
    setFormCounter((prev) => Math.min(prev + 1, 4));
    // scroll to top of form area for better UX on mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Back handler
  const handleBack = () => {
    setFormCounter((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progressItems = [0, 1, 2, 3, 4];

  // KEYDOWN handler: prevent Enter from submitting the form unless on final step
  const onFormKeyDown = (e) => {
    if (e.key === "Enter") {
      // allow Enter to submit only when on final step (formCounter === 4)
      if (formCounter < 4) {
        e.preventDefault();
        // optionally move focus to next field instead
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-[#fff8ef] to-[#f5eaff] p-6 md:p-10 lg:p-14">
      {/* Toast */}
      {toast && (
        <div
          className={cx(
            "fixed right-6 top-6 z-50 px-4 py-2 rounded-md shadow-lg",
            toast.type === "success" ? "bg-emerald-600 text-white" : "bg-rose-500 text-white"
          )}
        >
          {toast.text}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight text-slate-900">
            Have a design project <br /> and need help?
          </h1>
          <p className="mt-4 text-slate-700 max-w-2xl">
            Fill a quick brief — I’ll review and respond with a plan & estimate. You can
            also email directly at <strong>try.kanishq@gmail.com</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Reviews + QnA (col-span 7/12) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Review card */}
            <div className="flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow-md p-5 border border-slate-100">
              <div className="w-full md:w-56 h-44 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <img src={reviewUser[reviewCounter].img} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{reviewUser[reviewCounter].name}</h3>
                    <p className="text-sm text-slate-600">{reviewUser[reviewCounter].title}</p>
                  </div>
                  <div>
                    {reviewUser[reviewCounter].linkedIn && (
                      <Link to={reviewUser[reviewCounter].linkedIn} target="_blank" rel="noreferrer" className="text-slate-700 hover:text-indigo-600">
                        <FaLinkedinIn />
                      </Link>
                    )}
                  </div>
                </div>

                <p className="mt-4 text-slate-700">{reviewUser[reviewCounter].comments}</p>
              </div>
            </div>

            {/* QnA */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-lg font-semibold mb-4">Common questions</h4>
              <div className="space-y-4">
                {qna.map((qa) => (
                  <div key={qa.id}>
                    <button
                      onClick={() => showQna(qa.id)}
                      className="w-full text-left flex items-center justify-between py-3"
                      aria-expanded={qa.isOpen}
                    >
                      <div>
                        <h5 className="font-medium text-base">{qa.question}</h5>
                      </div>
                      <div className="text-2xl">
                        <span className={`${qa.isOpen ? "-rotate-90" : "rotate-0"} transition-transform`}>⮟</span>
                      </div>
                    </button>

                    <div
                      className={cx(
                        "overflow-hidden transition-all duration-300",
                        qa.isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <p className="text-slate-700">{qa.answer}</p>
                    </div>

                    <hr className="my-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Multi-step form (col-span 5/12) */}
          <div className="lg:col-span-5">
            <div className="sticky top-6 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md">
                {/* Step progress */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {progressItems.map((p) => (
                      <div key={p} className="flex items-center gap-2">
                        <div
                          className={cx(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                            formCounter === p ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-700"
                          )}
                        >
                          {p + 1}
                        </div>
                        {/* small connecting line except last */}
                        {p < progressItems.length - 1 && (
                          <div className={cx("w-6 h-0.5", formCounter > p ? "bg-indigo-600" : "bg-slate-200")} />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-slate-500">
                    Step {formCounter + 1} / 5
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold">{formHeading[formCounter].heading}</h2>
                  <p className="text-sm text-slate-600 mt-1">{formHeading[formCounter].title}</p>
                </div>

                <div className="mt-5">
                  {/* FORM - single react-hook-form instance */}
                  {/* Add onKeyDown to prevent Enter submitting early */}
                  <form onSubmit={handleSubmit(submitForm)} onKeyDown={onFormKeyDown} noValidate>
                    {/* Step 0: Basic Info */}
                    {formCounter === 0 && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-medium">Full name *</label>
                          <input
                            {...register("fullname", { required: "Full name is required" })}
                            className="w-full mt-2 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                            placeholder="Kanishq Sodhani"
                            type="text"
                          />
                          {errors.fullname && <p className="text-rose-500 text-sm mt-1">{errors.fullname.message}</p>}
                        </div>

                        <div>
                          <label className="text-xs font-medium">Company / Brand</label>
                          <input
                            {...register("company")}
                            className="w-full mt-2 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                            placeholder="OpenAI"
                            type="text"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-medium">Email address *</label>
                          <input
                            {...register("email", {
                              required: "Email is required",
                              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                            })}
                            className="w-full mt-2 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                            placeholder="you@company.com"
                            type="email"
                          />
                          {errors.email && <p className="text-rose-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                          <label className="text-xs font-medium">Project title *</label>
                          <input
                            {...register("projectTitle", { required: "Project title is required" })}
                            className="w-full mt-2 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                            placeholder="Name your project"
                            type="text"
                          />
                          {errors.projectTitle && <p className="text-rose-500 text-sm mt-1">{errors.projectTitle.message}</p>}
                        </div>
                      </div>
                    )}

                    {/* Step 1: Project Overview */}
                    {formCounter === 1 && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-medium">What are you building? *</label>
                          <input
                            {...register("building", { required: "This is required" })}
                            className="w-full mt-2 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                            placeholder="Landing page, Dashboard, App UI..."
                            type="text"
                          />
                          {errors.building && <p className="text-rose-500 text-sm mt-1">{errors.building.message}</p>}
                        </div>

                        <div>
                          <label className="text-xs font-medium">What problem will it solve?</label>
                          <input
                            {...register("problemSolve")}
                            className="w-full mt-2 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                            placeholder="Improve UX, increase conversions..."
                            type="text"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-medium">Reference / Inspiration (link)</label>
                          <input
                            {...register("inspirationLink")}
                            className="w-full mt-2 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
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
                          <label className="text-xs font-medium">Project type *</label>
                          <select
                            {...register("projectType", { required: "Select project type" })}
                            className="w-full mt-2 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Select project type
                            </option>
                            <option value="Website">Website</option>
                            <option value="Dashboard Interface">Dashboard Interface</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Web App">Web App</option>
                            <option value="Automation / AI Tool">Automation / AI Tool</option>
                            <option value="Something Else">Something Else</option>
                          </select>
                          {errors.projectType && <p className="text-rose-500 text-sm mt-1">{errors.projectType.message}</p>}
                        </div>

                        <div>
                          <label className="text-xs font-medium">Budget range *</label>
                          <select
                            {...register("budgetRange", { required: "Select budget range" })}
                            className="w-full mt-2 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
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
                          {errors.budgetRange && <p className="text-rose-500 text-sm mt-1">{errors.budgetRange.message}</p>}
                        </div>

                        <div>
                          <label className="text-xs font-medium">Timeline *</label>
                          <select
                            {...register("timeline", { required: "Select timeline" })}
                            className="w-full mt-2 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
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
                          {errors.timeline && <p className="text-rose-500 text-sm mt-1">{errors.timeline.message}</p>}
                        </div>
                      </div>
                    )}

                    {/* Step 3: Toggle questions (boolean true/false) */}
                    {formCounter === 3 && (
                      <div className="space-y-4">
                        <Controller
                          control={control}
                          name="isDesignReady"
                          render={({ field: { value, onChange } }) => (
                            <div className="flex items-center justify-between">
                              <div>
                                <label className="font-medium">Do you already have a design ready?</label>
                                <p className="text-sm text-slate-500">If yes, I can implement directly.</p>
                              </div>

                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => onChange(!value)}
                                  className={cx(
                                    "w-14 h-8 rounded-full p-1 transition",
                                    value ? "bg-rose-500" : "bg-slate-200"
                                  )}
                                  aria-pressed={value}
                                >
                                  <span className={cx("block w-6 h-6 rounded-full bg-white transition-transform", value ? "translate-x-6" : "translate-x-0")} />
                                </button>
                                <span className="text-sm text-slate-600">{value ? "Yes" : "No"}</span>
                              </div>
                            </div>
                          )}
                        />

                        <Controller
                          control={control}
                          name="needBackendSupport"
                          render={({ field: { value, onChange } }) => (
                            <div className="flex items-center justify-between">
                              <div>
                                <label className="font-medium">Do you need backend support?</label>
                                <p className="text-sm text-slate-500">APIs, database, auth — I can help or integrate with your backend.</p>
                              </div>

                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => onChange(!value)}
                                  className={cx(
                                    "w-14 h-8 rounded-full p-1 transition",
                                    value ? "bg-rose-500" : "bg-slate-200"
                                  )}
                                  aria-pressed={value}
                                >
                                  <span className={cx("block w-6 h-6 rounded-full bg-white transition-transform", value ? "translate-x-6" : "translate-x-0")} />
                                </button>
                                <span className="text-sm text-slate-600">{value ? "Yes" : "No"}</span>
                              </div>
                            </div>
                          )}
                        />

                        <Controller
                          control={control}
                          name="isProjectAtFinal"
                          render={({ field: { value, onChange } }) => (
                            <div className="flex items-center justify-between">
                              <div>
                                <label className="font-medium">Is the scope final or still evolving?</label>
                                <p className="text-sm text-slate-500">Final scopes help with precise estimates.</p>
                              </div>

                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => onChange(!value)}
                                  className={cx(
                                    "w-14 h-8 rounded-full p-1 transition",
                                    value ? "bg-rose-500" : "bg-slate-200"
                                  )}
                                  aria-pressed={value}
                                >
                                  <span className={cx("block w-6 h-6 rounded-full bg-white transition-transform", value ? "translate-x-6" : "translate-x-0")} />
                                </button>
                                <span className="text-sm text-slate-600">{value ? "Yes" : "No"}</span>
                              </div>
                            </div>
                          )}
                        />

                        <Controller
                          control={control}
                          name="isDeadlineFixed"
                          render={({ field: { value, onChange } }) => (
                            <div className="flex items-center justify-between">
                              <div>
                                <label className="font-medium">Is your deadline fixed?</label>
                                <p className="text-sm text-slate-500">Fixed deadlines may need priority planning.</p>
                              </div>

                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => onChange(!value)}
                                  className={cx(
                                    "w-14 h-8 rounded-full p-1 transition",
                                    value ? "bg-rose-500" : "bg-slate-200"
                                  )}
                                  aria-pressed={value}
                                >
                                  <span className={cx("block w-6 h-6 rounded-full bg-white transition-transform", value ? "translate-x-6" : "translate-x-0")} />
                                </button>
                                <span className="text-sm text-slate-600">{value ? "Yes" : "No"}</span>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    )}

                    {/* Step 4: final message */}
                    {formCounter === 4 && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-medium">Tell me more about your project</label>
                          <textarea
                            {...register("detailedMessage")}
                            className="w-full mt-2 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 min-h-[120px]"
                            placeholder="Explain your idea, required features, your goals..."
                          />
                        </div>

                        <div className="text-sm text-slate-500">
                          You can also attach links to Figma, Drive, or examples in the message above.
                        </div>
                      </div>
                    )}

                    {/* Controls (Back / Next / Submit) */}
                    <div className="mt-6 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:shadow-sm"
                      >
                        <IoReturnDownBack /> Back
                      </button>

                      {/* If last step -> show submit else next */}
                      {formCounter < 4 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                        >
                          Next <IoReturnDownForward />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={!isValid || isSubmitting}
                          className={cx(
                            "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium",
                            !isValid || isSubmitting
                              ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                              : "bg-rose-600 text-white hover:bg-rose-700"
                          )}
                        >
                          {isSubmitting ? "Submitting..." : "Submit request"}
                          <CiSaveUp2 />
                        </button>
                      )}
                    </div>

                    {/* small validation hint */}
                    {!isValid && formCounter === 4 && (
                      <p className="text-rose-500 text-sm mt-3">Please fill required fields marked with * before submitting.</p>
                    )}
                  </form>
                </div>
              </div>

              {/* small contact helper */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 text-sm text-slate-700 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <FaLinkedinIn />
                  </div>
                  <div>
                    <div className="font-semibold">Prefer a quick chat?</div>
                    <div className="text-slate-500">Email me directly at <a href="mailto:try.kanishq@gmail.com" className="text-indigo-600">try.kanishq@gmail.com</a></div>
                    <div className="mt-3 flex gap-3">
                      <a href="https://www.linkedin.com/in/kanishqsodhani" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-rose-400 transition">
                        <FaLinkedinIn className="text-slate-700" />
                      </a>
                      <a href="https://github.com/kanishq-17" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-rose-400 transition">
                        <IoLogoGithub className="text-slate-700" />
                      </a>
                      <a href="https://twitter.com/yourhandle" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-rose-400 transition">
                        <FaXTwitter className="text-slate-700" />
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

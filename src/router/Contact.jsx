// Contact.jsx
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaReact } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";

const RECEIVE_EMAIL = "try.kanishq@gmail.com";

export default function Contact() {
  // -----------------------
  // Env / EmailJS config
  // -----------------------
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // -----------------------
  // Form state (react-hook-form)
  // -----------------------
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      message: "",
    },
  });

  // -----------------------
  // Toast
  // -----------------------
  const [toast, setToast] = useState(null); // { type: 'success'|'error', text }
  const toastTimerRef = useRef(null);

  function showToast(type, text) {
    setToast({ type, text });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 3500);
  }

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  // -----------------------
  // MagneticSpan (small micro-interaction) - optional
  // -----------------------

  function MagneticSpan({ children }) {
    const wrapperRef = useRef(null);
    const innerRef = useRef(null);
    const rafRef = useRef(null);

    const stateRef = useRef({
      // current positions
      cx: 0, // outer current x
      cy: 0, // outer current y
      ix: 0, // inner current x
      iy: 0, // inner current y
      // target positions
      tx: 0,
      ty: 0,
      tix: 0,
      tiy: 0,
      running: false,
    });

    const lerp = (a, b, n) => a + (b - a) * n;

    function onMouseMove(e) {
      const wrap = wrapperRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      // relative to center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // set targets: outer moves subtle, inner moves more
      stateRef.current.tx = x * 0.18; // outer strength
      stateRef.current.ty = y * 0.18;
      stateRef.current.tix = x * 0.34; // inner (icon) strength
      stateRef.current.tiy = y * 0.34;

      if (!stateRef.current.running) {
        stateRef.current.running = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    function onMouseLeave() {
      // reset targets to zero
      stateRef.current.tx = 0;
      stateRef.current.ty = 0;
      stateRef.current.tix = 0;
      stateRef.current.tiy = 0;

      if (!stateRef.current.running) {
        stateRef.current.running = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    function animate() {
      const s = stateRef.current;
      const ease = 0.18;

      // outer easing
      s.cx = lerp(s.cx, s.tx, ease);
      s.cy = lerp(s.cy, s.ty, ease);

      // inner easing
      s.ix = lerp(s.ix, s.tix, ease);
      s.iy = lerp(s.iy, s.tiy, ease);

      // apply transforms (use translate3d for better GPU performance)
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate3d(${s.cx}px, ${s.cy}px, 0)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${s.ix}px, ${s.iy}px, 0)`;
      }

      // stop when values are close to targets
      const close =
        Math.abs(s.cx - s.tx) < 0.25 &&
        Math.abs(s.cy - s.ty) < 0.25 &&
        Math.abs(s.ix - s.tix) < 0.25 &&
        Math.abs(s.iy - s.tiy) < 0.25;

      if (!close) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        s.running = false;
        cancelAnimationFrame(rafRef.current);
      }
    }

    useEffect(() => {
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, []);

    return (
      <span
        ref={wrapperRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="outline-1 rounded-full p-[18px] text-lg text-center cursor-pointer hover:outline-rose-400 hover:text-rose-600"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span ref={innerRef} style={{ display: "inline-block" }}>
          {children}
        </span>
      </span>
    );
  }

  // -----------------------
  // send email via EmailJS
  // -----------------------
  async function sendContactEmail(formData) {
    // formData: { fullName, email, company, message }
    // validate env
    if (!SERVICE_ID || !CONTACT_TEMPLATE_ID || !PUBLIC_KEY) {
      // fallback: open Gmail
      showToast("error", "EmailJS keys missing — opening Gmail as fallback.");
      const subject = encodeURIComponent(
        `Contact from ${formData.fullName || formData.email}`
      );
      const body = encodeURIComponent(
        `Full Name: ${formData.fullName}\nEmail: ${formData.email}\nCompany: ${
          formData.company || "-"
        }\n\nMessage:\n${formData.message}`
      );
      const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${RECEIVE_EMAIL}&su=${subject}&body=${body}`;
      window.open(gmailUrl, "_blank");
      return;
    }

    // Get website name from origin
    const websiteName = window.location.origin || "kanishq-sodhani-portfolio";
    const source = `${websiteName}/contact`;

    // Format message body as key-value pairs using exact form labels
    const formattedMessage = `Full name: ${formData.fullName}
Company: ${formData.company || "-"}
Email: ${formData.email}
Message: ${formData.message}
From: ${formData.email}
To: ${RECEIVE_EMAIL}
Source: ${source}`;

    // Format as key-value pairs for EmailJS template
    // The 'message' field now contains formatted key-value pairs
    // Use {{message}} in your EmailJS template to display the formatted email
    const params = {
      full_name: formData.fullName,
      company: formData.company || "-",
      email: formData.email,
      // Main message field contains formatted key-value pairs
      message: formattedMessage,
      from: formData.email,
      to: RECEIVE_EMAIL,
      source: source,
      sent_at: new Date().toLocaleString(),
      // Also provide individual fields for flexibility
      user_message: formData.message, // Original user message if needed
      message_body: formattedMessage, // Alternative field name
    };

    try {
      await emailjs.send(SERVICE_ID, CONTACT_TEMPLATE_ID, params, PUBLIC_KEY);
      showToast("success", "✅ Message sent — I'll reply soon.");
      reset();
      // OPTIONAL: if you later create auto-reply template, you can call it here
      // try { await emailjs.send(SERVICE_ID, AUTO_REPLY_TEMPLATE_ID, { to_email: formData.email, ... }, PUBLIC_KEY); } catch(e){}
    } catch (err) {
      console.error("EmailJS send error:", err);
      showToast(
        "error",
        "⚠️ Sending failed — try mail client or check console."
      );
    }
  }

  // -----------------------
  // Form submit wrapper
  // -----------------------
  const onSubmit = (data) => {
    sendContactEmail(data);
  };

  // -----------------------
  // UI
  // -----------------------
  return (
    <div className="w-full bg-[#f8f9fb] min-h-screen py-8 px-2 sm:py-10 sm:px-4 md:py-12 md:px-6 lg:px-8 xl:px-12">
      {/* toast */}
      {toast && (
        <div
          className={`fixed right-3 left-3 top-6 z-50 sm:right-6 sm:left-auto px-2 sm:px-4 py-2 rounded-md shadow-lg ${
            toast.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-rose-500 text-white"
          } animate-fadeIn`}
          role="status"
          aria-live="polite"
          style={{ maxWidth: "96vw", width: "fit-content" }}
        >
          {toast.text}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-8 md:flex-row md:gap-8 lg:gap-12">
          {/* Left profile (UPDATED) */}
          <div className="w-full lg:w-1/2 bg-white rounded-2xl p-4 pt-6 sm:p-6 border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                {/* replace src as needed */}
                <img
                  src="/people/kanishq-sodhani.png"
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Kanishq Sodhani
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Frontend Engineer — polished UI & delightful UX
                </p>

                {/* Tech pills */}
                <div className="mt-2 sm:mt-4 flex flex-wrap gap-2">
                  {["React", "Node", "Tailwind", "JavaScript"].map((t) => (
                    <span
                      key={t}
                      className="text-xs font-medium px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-slate-100 text-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* FULL INTRODUCTION (ultra responsive) */}
                <div className="mt-2 sm:mt-4 text-xs xs:text-xs sm:text-sm md:text-base text-slate-700 space-y-2 leading-normal xs:max-w-[90vw] sm:max-w-[85vw] md:max-w-md lg:max-w-none whitespace-normal break-all">
                  <h2 className="">
                    <span className="font-semibold text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl">
                      Hi,
                    </span>{" "}
                    I’m{" "}
                    <span className="bg-white/50 backdrop-blur-3xl shadow-[inset_0px_0px_20px_-14px_rgba(0,0,0,0.75)] italic p-1 rounded-sm responsive-break-kanishq">
                      {/* this class will force break before this on mobile in css below */}{" "}
                      Kanishq — a Frontend Engineer
                    </span>{" "}
                    who loves turning ideas into smooth, beautiful, and
                    functional digital experiences. I specialize in building
                    modern interfaces, thoughtful user flows, and clean design
                    systems that feel as good as they look.
                  </h2>
                  <h2 className="mt-1 sm:mt-2">
                    I’m always learning, improving, and finding better ways to
                    solve problems. My goal isn’t just to write code — it’s to
                    collaborate, understand people, and build things that
                    genuinely help users.
                  </h2>
                </div>

                {/* Social icons: larger, outlined, hover -> rose */}
                <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/kanishqsodhani"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="group inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-slate-200 bg-white/60 hover:border-rose-400 transition"
                  >
                    <MagneticSpan>
                      <FaLinkedinIn className="w-4 h-4 text-slate-800 transition-colors duration-200 group-hover:text-rose-500" />
                    </MagneticSpan>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/kanishq-17"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="group inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-slate-200 bg-white/60 hover:border-rose-400 transition"
                  >
                    <MagneticSpan>
                      <IoLogoGithub className="w-4 h-4 text-slate-800 transition-colors duration-200 group-hover:text-rose-500" />
                    </MagneticSpan>
                  </a>

                  {/* Twitter / X */}
                  <a
                    href="https://twitter.com/yourhandle"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Twitter"
                    className="group inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-slate-200 bg-white/60 hover:border-rose-400 transition"
                  >
                    <MagneticSpan>
                      <FaXTwitter className="w-4 h-4 text-slate-800 transition-colors duration-200 group-hover:text-rose-500" />
                    </MagneticSpan>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right form (unchanged, except spacings) */}
          <div className="w-full lg:w-1/2 bg-white rounded-2xl p-4 pt-6 sm:p-6 border border-slate-100 shadow-sm flex flex-col">
            <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
              Let’s build something together
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-6">
              Drop a message — I'll reply in 1-2 business days.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {/* Name */}
                <div>
                  <label className="text-xs text-slate-500">Full name</label>
                  <input
                    {...register("fullName", { required: "Name is required" })}
                    className="w-full mt-2 p-2 sm:p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="Your name"
                  />
                  {errors.fullName && (
                    <p className="text-rose-500 text-xs sm:text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                {/* Company */}
                <div>
                  <label className="text-xs text-slate-500">Company</label>
                  <input
                    {...register("company")}
                    className="w-full mt-2 p-2 sm:p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="Company (optional)"
                  />
                </div>
                {/* Email */}
                <div className="md:col-span-2">
                  <label className="text-xs text-slate-500">Email</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    className="w-full mt-2 p-2 sm:p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <p className="text-rose-500 text-xs sm:text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                {/* Message */}
                <div className="md:col-span-2">
                  <label className="text-xs text-slate-500">Message</label>
                  <textarea
                    {...register("message", {
                      required: "Message is required",
                    })}
                    className="w-full mt-2 p-2 sm:p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 min-h-[120px] sm:min-h-[140px]"
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p className="text-rose-500 text-xs sm:text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 sm:px-5 sm:py-3 rounded-lg font-medium transition cursor-pointer ${
                    isSubmitting
                      ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {/* Open Gmail compose */}
                <button
                  type="button"
                  onClick={() => {
                    const name =
                      document.querySelector('input[name="fullName"]')?.value ||
                      "";
                    const email =
                      document.querySelector('input[name="email"]')?.value ||
                      "";
                    const company =
                      document.querySelector('input[name="company"]')?.value ||
                      "";
                    const message =
                      document.querySelector('textarea[name="message"]')
                        ?.value || "";
                    const subject = encodeURIComponent(
                      `Contact from ${name || email}`
                    );
                    const body = encodeURIComponent(
                      `Full Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`
                    );
                    // Always open Gmail compose
                    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${RECEIVE_EMAIL}&su=${subject}&body=${body}`;
                    window.open(gmailUrl, "_blank");
                  }}
                  className="px-4 py-2 sm:px-4 sm:py-3 rounded-lg bg-slate-100 text-slate-800 cursor-pointer"
                >
                  Open Mail Client
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* small footer note */}
        <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-slate-500">
          <p>
            By sending this message you agree to be contacted. No spam. For
            urgent matters email directly at{" "}
            <a
              className="text-indigo-600 cursor-pointer hover:underline"
              href={`https://mail.google.com/mail/?view=cm&to=${RECEIVE_EMAIL}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Open Gmail compose"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  `https://mail.google.com/mail/?view=cm&to=${RECEIVE_EMAIL}`,
                  "_blank"
                );
              }}
            >
              {RECEIVE_EMAIL}
            </a>
            .
          </p>
        </div>
      </div>

      {/* CSS for simple animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn .35s ease-out; }
        @media (max-width: 500px) {
          .responsive-break-kanishq {
            display: inline-block;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

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
      // fallback: open mail client
      showToast(
        "error",
        "EmailJS keys missing — opening mail client as fallback."
      );
      const subject = encodeURIComponent(
        `Contact from ${formData.fullName || formData.email}`
      );
      const body = encodeURIComponent(
        `Name: ${formData.fullName}\nEmail: ${formData.email}\nCompany: ${
          formData.company || "-"
        }\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${RECEIVE_EMAIL}?subject=${subject}&body=${body}`;
      return;
    }

    const params = {
      from_name: formData.fullName || formData.email,
      from_email: formData.email,
      company: formData.company || "-",
      message: formData.message,
      sent_at: new Date().toLocaleString(),
      source_page: window.location.href,
      // optional: to_email if template uses it
      to_email: RECEIVE_EMAIL,
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
    <div className="w-full bg-[#f8f9fb] min-h-screen py-12 px-6">
      {/* toast */}
      {toast && (
        <div
          className={`fixed right-6 top-6 z-50 px-4 py-2 rounded-md shadow-lg ${
            toast.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-rose-500 text-white"
          }`}
          role="status"
          aria-live="polite"
        >
          {toast.text}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left profile (UPDATED) */}
          <div className="w-full lg:w-1/2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-28 h-28 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                {/* replace src as needed */}
                <img
                  src="/people/kanishq-sodhani.png"
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900">
                  Kanishq Sodhani
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Frontend Engineer — polished UI & delightful UX
                </p>

                {/* Tech pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {["React", "Node", "Tailwind", "JavaScript"].map((t) => (
                    <span
                      key={t}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* FULL INTRODUCTION (added back) */}
                <div className="mt-4 text-sm text-slate-700 space-y-2 leading-relaxed">
                  <h2 className="">
                    <span className="font-semibold text-3xl"> Hi,</span> I’m{" "}
                    <span className="bg-white/50 backdrop-blur-3xl shadow-[inset_0px_0px_20px_-14px_rgba(0,0,0,0.75)] italic p-1 rounded-sm">
                      {" "}
                      Kanishq — a Frontend Engineer
                    </span>{" "}
                    who loves turning ideas into smooth, beautiful, and
                    functional digital experiences. I specialize in building
                    modern interfaces, thoughtful user flows, and clean design
                    systems that feel as good as they look.
                  </h2>
                  <h2 className="mt-2">
                    I’m always learning, improving, and finding better ways to
                    solve problems. My goal isn’t just to write code — it’s to
                    collaborate, understand people, and build things that
                    genuinely help users.
                  </h2>
                </div>

                {/* Social icons: larger, outlined, hover -> rose */}
                <div className="mt-6 flex items-center gap-3">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/kanishqsodhani"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="group inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-slate-200 bg-white/60 hover:border-rose-400 transition"
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
                    className="group inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-slate-200 bg-white/60 hover:border-rose-400 transition"
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
                    className="group inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-slate-200 bg-white/60 hover:border-rose-400 transition"
                  >
                    <MagneticSpan>
                      <FaXTwitter className="w-4 h-4 text-slate-800 transition-colors duration-200 group-hover:text-rose-500" />
                    </MagneticSpan>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right form (unchanged) */}
          <div className="w-full lg:w-1/2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-2">
              Let’s build something together
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              Drop a message — I'll reply in 1-2 business days.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500">Full name</label>
                  <input
                    {...register("fullName", { required: "Name is required" })}
                    className="w-full mt-2 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="Your name"
                  />
                  {errors.fullName && (
                    <p className="text-rose-500 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-slate-500">Company</label>
                  <input
                    {...register("company")}
                    className="w-full mt-2 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="Company (optional)"
                  />
                </div>

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
                    className="w-full mt-2 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <p className="text-rose-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-slate-500">Message</label>
                  <textarea
                    {...register("message", {
                      required: "Message is required",
                    })}
                    className="w-full mt-2 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 min-h-[140px]"
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p className="text-rose-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-5 py-3 rounded-lg font-medium transition cursor-pointer ${
                    isSubmitting
                      ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {/* fallback: open mail client */}
                <button
                  type="button"
                  onClick={() => {
                    // grab form fields (not ideal but fallback)
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
                      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`
                    );
                    window.location.href = `mailto:${RECEIVE_EMAIL}?subject=${subject}&body=${body}`;
                  }}
                  className="px-4 py-3 rounded-lg bg-slate-100 text-slate-800 cursor-pointer"
                >
                  Open Mail Client
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* small footer note */}
        <div className="mt-8 text-sm text-slate-500">
          <p>
            By sending this message you agree to be contacted. No spam. For
            urgent matters email directly at{" "}
            <a className="text-indigo-600" href={`mailto:${RECEIVE_EMAIL}`}>
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
      `}</style>
    </div>
  );
}

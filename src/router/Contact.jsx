import { useForm } from "react-hook-form";

import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [techStack] = useState([
    "Node",
    "React",
    "Express",
    "MongoDB",
    "JavaScript",
    "TypeScript",
  ]);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const { errors, isSubmitting } = formState;

  const onFormSubmit = async (data) => {
    console.log("Contact form data:", data);

    reset();
  };

  function MagneticSpan({ children }) {
    const wrapperRef = useRef(null); // outer span
    const innerRef = useRef(null); // inner icon span
    const rafRef = useRef(null);

    // animation state stored in a ref for minimal re-renders
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
      const ease = 0.18; // responsiveness - adjust slightly if you want snappier or smoother

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

  return (
    <div className="w-full bg-[#f8edeb] p-10">
      <div className="pt-18">
        <h1 className="font-bold text-8xl" id="contact-heading">
          It's Time To Work Together
        </h1>
        <p className="font-medium mt-5 text-3xl">
          Let’s Create Something That Matters..{" "}
        </p>
        <hr className="mt-8 text-gray-600" />
      </div>
      {/* //? contact-review section */}
      <div className="flex items-start w-full gap-10 justify-between mt-10">
        {/* //? my section */}
        <div className="my-section w-1/2 h-full">
          <div className="flex items-start justify-between gap-3 box-border">
            <div className="my-card w-64 h-90">
              <img
                src="/image-2.png"
                alt="kanishq-sodhani-profile-image"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="my-info-tech-stack w-2/3 h-full">
              <div className="tech-stack flex items-center justify-start flex-wrap gap-3 mb-8">
                {techStack.map((stack) => (
                  <h4 className="text-sm font-light text-gray-600 px-3 py-2 rounded-xl bg-white/50 backdrop-blur-2xl cursor-default outline-1 outline-neutral-50/50  shadow-[inset_0px_0px_20px_-14px_rgba(0,0,0,0.75)] hover:shadow-[inset_0px_0px_20px_-14px_rgba(42,42,42,0.75)]">
                    {stack}
                  </h4>
                ))}
              </div>
              <div className="my-info w-fit text-left tracking-wide">
                <h2 className="">
                  <span className="font-semibold text-3xl"> Hi,</span> I’m{" "}
                  <span className="bg-white/50 backdrop-blur-3xl shadow-[inset_0px_0px_20px_-14px_rgba(0,0,0,0.75)] italic p-1 rounded-sm">
                    {" "}
                    Kanishq — a Frontend Engineer
                  </span>{" "}
                  who loves turning ideas into smooth, beautiful, and functional
                  digital experiences. I specialize in building modern
                  interfaces, thoughtful user flows, and clean design systems
                  that feel as good as they look.
                </h2>
                <h2 className="mt-2">
                  I’m always learning, improving, and finding better ways to
                  solve problems. My goal isn’t just to write code — it’s to
                  collaborate, understand people, and build things that
                  genuinely help users.
                </h2>
              </div>
            </div>
          </div>
          <div className="social-accounts mt-10 flex justify-start items-center gap-5">
            {/* LinkedIn with magnetic effect */}
            <Link to="https://www.linkedin.com/in/kanishqsodhani">
              <MagneticSpan className="bg-transparent ">
                <FaLinkedinIn />
              </MagneticSpan>
            </Link>

            {/* GitHub with magnetic effect */}
            <Link to="https://github.com/kanishq-17">
              <MagneticSpan className="bg-transparent">
                <IoLogoGithub />
              </MagneticSpan>
            </Link>

            {/* X / Twitter with magnetic effect */}
            <Link to="">
              <MagneticSpan className="bg-transparent">
                <FaXTwitter />
              </MagneticSpan>
            </Link>
          </div>
        </div>
        {/* //? contact section */}
        <div className="contact-section w-1/2 h-full">
          <form noValidate>
            <div className="flex justify-between items-center gap-5">
              <div className="w-1/2">
                <label htmlFor="fullName" className="text-xs text-gray-500">
                  FULL NAME
                </label>
                <br />
                <input
                  type="text"
                  placeholder="Kanishq Sodhani"
                  id="fullName"
                  {...register("fullName", { required: "Name is required" })}
                  className="w-full my-3 outline-none text-lg text-gray-800"
                />
                {errors.fullName && (
                  <p className="text-red-500">{errors.fullName.message}</p>
                )}
                <hr className="" />
              </div>
              <div className="w-1/2">
                <label htmlFor="company" className="text-xs text-gray-500">
                  COMPANY
                </label>
                <br />
                <input
                  type="text"
                  placeholder="Rocketship"
                  id="company"
                  {...register("company")}
                  className="w-full my-3 outline-none text-lg text-gray-800"
                />
                <hr />
              </div>
            </div>
            <div className="my-5">
              <label htmlFor="email" className="text-xs text-gray-500">
                EMAIL
              </label>
              <br />
              <input
                type="text"
                placeholder="try.kanishq@gmail.com"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="w-full my-3 outline-none text-lg text-gray-800"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <hr />
            </div>
            <div>
              <label htmlFor="message" className="text-xs text-gray-500">
                MESSAGE
              </label>
              <br />
              <textarea
                type="text"
                placeholder="Tell me about project"
                id="message"
                {...register("message", { required: "Message is required" })}
                className="w-full my-3 outline-none text-lg text-gray-800 min-h-8 max-h-32"
              />
              <hr />
            </div>
            <button
              onClick={handleSubmit(onFormSubmit)}
              disabled={isSubmitting}
              type="submit"
              className="mt-10 mb-5 text-lg font-light cursor-pointer"
            >
              Send Message
            </button>
            <hr className="w-1/3" />
          </form>
        </div>
      </div>
    </div>
  );
}

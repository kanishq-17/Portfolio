import { useState } from "react";

import { IoIosInformationCircle } from "react-icons/io";
import { BsList } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = () => {
  const [myLogo, setMyLogo] = useState();
  const [mySmallInfo, setMySmallInfo] = useState();

  return (
    <nav className="w-full h-34 flex flex-col box-border border-b-neutral-300 border-b-2">
      {/* //* Small Info */}
      <div className="small-info h-[40%] bg-[#fef5ed] px-8 flex gap-3 items-center box-border text-black">
        <div className="text-2xl text-blue-600">
          <IoIosInformationCircle />
        </div>
        <h5 className="font-semibold">
          Welcome to my creative dashboard — where design meets automation
        </h5>
      </div>
      {/* //* Header */}
      <div className="header h-[60%] bg-[#fcd5ce] px-5 flex justify-between items-center box-border text-black">
        {/* //* My-name & Title */}
        <div className="short-title flex gap-5 items-center">
          <div className="text-3xl mt-9 text-gray-600">
            <BsList />
          </div>
          <div className="me">
            <h1 className="my-name font-bold text-3xl">Kanishq</h1>
            <h4 className="my-title font-extralight text-md">
              Frontend Developer | UI/UX Engineer
            </h4>
          </div>
        </div>
        {/* //* CTA Buttons */}
        <div className="call-to-actions flex gap-5 items-end relative">
          <Link to="/contact">
            <div
              className="
    px-4 py-[1.3rem] absolute rounded-md z-10 font-medium left-1 top-[.29rem] border-t border-b border-white 
    bg-transparent w-24 h-9 
    
    shadow-[inset_0px_0px_30px_-10px_rgba(255,255,255,0.35)]
    hover:shadow-[inset_0px_2px_0px_-2px_rgba(42,42,42,1)] 
    
  "
            ></div>

            <button
              className="
    cursor-pointer contact-me-btn px-5 py-2.5 outline-1 rounded-md font-medium outline-neutral-100/50 
    backdrop-blur-2xl bg-pink-100/50 
    relative z-0
    shadow-[inset_0px_0px_30px_-14px_rgba(42,42,42,0.75)] 
  "
            >
              Contact
            </button>
          </Link>
          <Link to="/lets-collaborate">
            <button className="cursor-pointer bg-red-950 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-4 py-2  rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
              <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              Let's Collaborate
            </button>
          </Link>
          <h5 className="w-10 h-10 rounded-full object-cover mt-2 font-bold text-xl flex items-center justify-center">
            <img
              onMouseEnter={() => setMyLogo(true)}
              onMouseLeave={() => {
                setMyLogo(false);
              }}
              onClick={() => {
                setMyLogo(false);
                setMySmallInfo((prev) => !prev);
              }}
              src="/image-2.png"
              alt=""
              className="w-full h-full object-cover rounded-full cursor-pointer"
            />
          </h5>
          <p
            className={`bg-black text-white rounded-md px-3 py-1 font-medium absolute right-12 top-3 ${
              myLogo ? "none" : "hidden"
            }`}
          >
            Kanishq
          </p>
        </div>
        <div
          className={`z-10 rounded-sm outline-1 outline-gray-300 px-3 py-2 bg-white w-1/5 absolute top-32 right-5 ${
            mySmallInfo ? "none" : "hidden"
          }`}
        >
          <p className="text-gray-600 text-sm mb-2 text-center">
            try.kanishq@gmail.com
          </p>
          <div className="flex items-center justify-between bg-blue-300/30 px-2 py-2 rounded-sm">
            <div className="flex items-center gap-3">
              <h4 className="rounded-full w-10 h-10 outline-1 outline-gray-300 text-center pt-2 font-semibold bg-blue-400/50">
                K
              </h4>
              <div className="text-blue-800">
                <h5 className="text-md font-medium">Kanishq</h5>
                <p className="text-sm">Individual Developer</p>
              </div>
            </div>
            <span className="text-blue-800 text-2xl">
              <IoMdCheckmark />
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

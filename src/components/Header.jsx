import { IoIosInformationCircle } from "react-icons/io";
import { BsList } from "react-icons/bs";

const Header = () => {
  return (
    <nav className="w-full h-34 flex flex-col box-border border-b-neutral-300 border-b-2">
      {/* //* Small Info */}
      <div className="small-info h-[40%] bg-[#fdf1ef] px-8 flex gap-3 items-center box-border">
        <div className="text-2xl text-blue-600">
          <IoIosInformationCircle />
        </div>
        <h5 className="font-semibold">
          Welcome to my creative dashboard — where design meets automation
        </h5>
      </div>
      {/* //* Header */}
      <div className="header h-[60%] bg-[#f9dcc4] px-5 flex justify-between items-center box-border">
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
        <div className="call-to-actions flex gap-5 items-end">
          <button className="contact-me-btn px-5 py-2 outline-1 rounded-md font-medium ">
            Contact
          </button>
          <button className="freelance-btn px-5 py-2 outline-1 rounded-md font-medium ">
            Let's Collaborate
          </button>
          <h5 className="w-10 h-10 rounded-full object-cover outline-1 mt-2 font-bold text-xl flex items-center justify-center">
            K
          </h5>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import { Route, Routes } from "react-router-dom";
import CenterPage from "./components/CenterPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Contact from "./router/Contact";
import LetsCollaborate from "./router/LetsCollaborate";
import RHF from "./router/RHF";

const App = () => {
  return (
    <div className="bg-[#f4f1f1]">
      <Header />
      {/* <SideBar /> */}
      <Routes>
        <Route path="/" element={<CenterPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/lets-collaborate" element={<LetsCollaborate />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

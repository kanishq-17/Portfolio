import { Route, Routes } from "react-router-dom";
import CenterPage from "./components/CenterPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Contact from "./router/Contact";
import LetsCollaborate from "./router/LetsCollaborate";
import ProjectPage from "./components/ProjectPage";
import AiLab from "./components/AiLab";

const App = () => {
  return (
    <div className="bg-[#f4f1f1]">
      <Header />
      {/* <SideBar /> */}
      <Routes>
        <Route path="/home" element={<CenterPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collaborate" element={<LetsCollaborate />} />
        <Route path="/builds" element={<ProjectPage />} />
        <Route path="/ailab" element={<AiLab />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

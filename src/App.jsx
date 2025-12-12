import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import CenterPage from "./components/CenterPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Contact from "./router/Contact";
import LetsCollaborate from "./router/LetsCollaborate";
import ProjectPage from "./components/ProjectPage";
import MobileWarning from "./components/MobileWarning";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <MobileWarning />;
  }

  return (
    <div className="bg-[#f4f1f1]">
      <Header />
      <Routes>
        <Route path="/" element={<CenterPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collaborate" element={<LetsCollaborate />} />
        <Route path="/projects" element={<ProjectPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

import CenterPage from "./components/CenterPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

const App = () => {
  return (
    <div className="bg-[#f4f1f1] relative">
      <Header />
      <CenterPage />
      <Footer />
    </div>
  );
};

export default App;

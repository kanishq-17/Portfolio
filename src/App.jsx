import CenterPage from "./components/CenterPage";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

const App = () => {
  return (
    <div className="bg-[#f4f1f1] relative">
      <Header />
      <SideBar />
      <CenterPage />
    </div>
  );
};

export default App;

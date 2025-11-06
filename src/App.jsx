import CenterPage from "./components/CenterPage";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

const App = () => {
  return (
    <div className="bg-black relative">
      <Header />
      <SideBar />
      <CenterPage />
    </div>
  );
};

export default App;

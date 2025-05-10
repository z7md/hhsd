import Footer from "../components/Footer";
// import Test from "../components/Footer/Test";
import Navbar from "../components/Header/Navbar";
import Services from "../components/Services";
import Steps from "../components/Steps";
import Types from "../components/Types";
//@ts-expect-error dsff
import Hero from "../components/Header/Hero";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const savedPath = localStorage.getItem("redirect_path");

    if (savedPath) {
      localStorage.removeItem("redirect_path");

      if (savedPath.startsWith("#")) {
        // It's a hash link to a section — don't navigate
        return;
      }

      navigate(savedPath);
    }
  }, [navigate]);

  return (
    <div className="w-full flex flex-col almarai-extrabold max-w-screen">
      <Navbar />
      <Hero />
      <Types />
      <Steps />
      {/* <Test /> */}
      <Services />

      <Footer />
    </div>
  );
};

export default App;

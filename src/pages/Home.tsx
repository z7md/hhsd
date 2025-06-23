import Footer from "../components/Footer";
import Test from "../components/Footer/Test";
import Navbar from "../components/Header/Navbar";

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
    <div className="flex flex-col almarai-extrabold w-full bg-background">
      <Navbar />
      <Hero />
      <Types />
      {/* <Steps /> */}
      <Test />
      {/* <Services /> */}

      <Footer />
    </div>
  );
};

export default App;

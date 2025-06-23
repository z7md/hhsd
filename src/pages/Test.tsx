import { useEffect } from "react";
import Footer from "../components/Footer";
import Test from "../components/Footer/Test";
import Navbar2 from "../components/Header/Navbar2";


const Test1 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full flex flex-col almarai-extrabold bg-background">
      <Navbar2 />

      <Test />


      <Footer />
    </div>
  );
};

export default Test1;

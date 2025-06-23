import { FC } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { IoCallOutline } from "react-icons/io5";
import Image from "../../assets/images/hsd.png";
//@ts-expect-error dsff
import { fadeIn } from "../../utils/motion";

const Footer: FC = () => {
  return (
    <motion.footer
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      className="bg-[#15130F] py-12"
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <motion.div
          variants={fadeIn("up", 0.3)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12"
        >
          {/* Brand/Logo + Description + Icons */}
          <motion.div className="lg:col-span-4 flex flex-col">
            <img
              src={Image}
              alt="logo"
              className="w-[200px] h-auto object-contain mb-4"
            />
            <motion.p
              variants={fadeIn("up", 0.5)}
              className="text-text text-sm leading-relaxed mb-6"
            >
              نهدف في مثري للخدمات البيئية إلى تقديم حلول عملية ومتكاملة لإدارة
              المخلفات، بخدمة سريعة، موثوقة، وملتزمة بأعلى المعايير البيئية. رضا
              العميل وجودة الخدمة هما أولويتنا.
            </motion.p>
            <motion.div variants={fadeIn("up", 0.6)} className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="tel:+966505977705"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-colors"
                aria-label="Call Us" // Added aria-label
              >
                <IoCallOutline className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://wa.me/966505977705"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors"
                aria-label="Chat with us on WhatsApp" // Added aria-label
              >
                <FaWhatsapp className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://maps.app.goo.gl/wAiS7hjF43SUVmVF8?g_st=ic"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-colors"
                aria-label="View location on Google Maps" // Added aria-label
              >
                <SiGooglemaps className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Links + Certificates */}
          <motion.div
            variants={fadeIn("left", 0.5)}
            className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Links Section */}
            <div>
              <h2 className="text-lg font-bold text-text mb-4">
                روابط مهمة
              </h2>
              <ul className="space-y-3 text-[16px] text-subtext font-medium">
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="/#services"
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    خدماتنا
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="/#about"
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    من نحن
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="/#contact"
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    تواصل معنا
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="/#testimonials"
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    آراء العملاء
                  </a>
                </motion.li>
              </ul>
            </div>

            {/* Certifications Section */}
            <div>
              <h3 className="text-lg font-bold text-text mb-4">
                الشهادات والرخص
              </h3>
              <ul className="space-y-3 text-[16px] text-subtext font-medium">
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    المركز الوطني لإدارة النفايات (MWAN)
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    المركز الوطني للرقابة على الالتزام البيئي
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    شهادة سلامة بيئية معتمدة
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeIn("up", 0.8)}
          className="border-t border-gray-200 mt-12 pt-6"
        >
          <motion.div
            variants={fadeIn("up", 0.9)}
            className="flex flex-col md:flex-row justify-between items-center text-center gap-4 text-sm text-primary"
          >
            <span>
              © {new Date().getFullYear()}   حشد لتأجير السيارات – جميع الحقوق
              محفوظة
            </span>
            <span>
              Developed by{" "}
              <a
                href="https://www.linkedin.com/in/hamad-almohaimeed/"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hamad Almohaimeed
              </a>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

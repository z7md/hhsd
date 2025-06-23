import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
//@ts-expect-error dsff
import { fadeIn } from "../../utils/motion";
import { links } from "../../data";
import Image from "../../assets/images/hsd.png";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("");

  return (
    <motion.nav
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="fixed top-0 left-0 right-0 bg-[#1E1B16] backdrop-blur-sm border-b z-[100]  shadow-sm"
    >
      <div className="w-full flex justify-between items-center container mx-auto px-4 sm:px-6 lg:px-8 md:h-20 h-16">
        {/* Logo */}
        <motion.div
          variants={fadeIn("right", 0.3)}
          className="flex items-center gap-1 cursor-pointer"
        >
          <img
            src={Image}
            alt="Logo"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </motion.div>

        <motion.button
          variants={fadeIn("left", 0.3)}
          className="md:hidden p-2 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"} // Added aria-label for accessibility
        >
          {isMenuOpen ? (
            <HiX className="h-6 w-6 text-text" />
          ) : (
            <HiMenu className="h-6 w-6 text-text" />
          )}
        </motion.button>

        {/* Desktop Navigation */}
        <motion.div
          variants={fadeIn("down", 0.3)}
          className="hidden md:flex items-center gap-10"
        >
          {links.map((link, index) => (
            <motion.a
              key={index}
              variants={fadeIn("down", 0.1 * (index + 1))}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all
                ${
                  activeLink === link.href
                    ? "text-[#AB7C22] after:w-full"
                    : "text-[#FAF6EF] hover:text-[#AB7C22]"
                }`}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          variants={fadeIn("left", 0.3)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block bg-primary text-white px-6 py-2.5 rounded-lg hover:shadow-primary text-sm font-medium transition-all hover:shadow-lg cursor-pointer"
        >
          <a href="tel:+966553116613">اتصل بنا الآن</a>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          animate="show"
          className="md:hidden bg-white border-t border-gray-100 py-4"
        >
          <motion.div
            variants={fadeIn("down", 0.3)}
            className="container mx-auto px-4 space-y-4"
          >
            {links.map((link, index) => (
              <motion.a
                key={index}
                variants={fadeIn("right", 0.1 * (index + 1))}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.href);
                  setIsMenuOpen(false);
                }}
                className={`block text-sm font-medium py-2
                  ${
                    activeLink === link.href
                      ? "bg-primary text-white p-2"
                      : "text-gray-600 hover:text-gray-900 p-2"
                  }`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              variants={fadeIn("up", 0.4)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="tel:+966553116613"
              className="w-full bg-primary text-white px-6 py-2.5 rounded-lg hover:opacity-60 text-sm font-medium transition-all hover:shadow-lg hover:shadow-primary text-center block"
            >
              اتصل بنا الآن
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

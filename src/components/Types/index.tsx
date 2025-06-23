import { FC, useState } from "react";
import { types } from "../../data";
import { motion } from "framer-motion";
//@ts-expect-error
import { fadeIn, textVariant } from "../../utils/motion";
import { useNavigate } from "react-router-dom";

const Types: FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>("الكل");

  const uniqueTypes = ["الكل", ...new Set(types.map((item) => item.type))];

  const filteredTypes =
    selectedType === "الكل"
      ? types
      : types.filter((item) => item.type === selectedType);

  return (
    <section id="booking" className="bg-background py-16">
      <div className="w-full lg:px-[310px] px-5 flex flex-col gap-8 items-center justify-center">

        {/* العنوان */}
        <motion.span
          variants={textVariant(0.2)}
          initial="hidden"
          whileInView="show"
          className="text-primary lg:text-[48px] text-[35px] font-bold uppercase"
        >
          أختر سيارتك
        </motion.span>

        {/* أزرار الفلترة */}
        <div className="flex gap-4 flex-wrap justify-center">
          {uniqueTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`py-2 px-4 rounded-full border-2 font-semibold transition-all text-xl ${
                selectedType === type
                  ? "bg-primary text-white border-primary"
                  : "bg-section text-primary border-primary"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* البطاقات */}
        <div className="w-full flex flex-col gap-6">
          {filteredTypes.map((item, index: number) => (
            <motion.div
              key={index}
              variants={fadeIn("up", 0.2 * index)}
              initial="hidden"
              whileInView="show"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/item1", { state: item })}
              viewport={{ once: true }}
              className="w-full bg-section rounded-xl shadow-md p-4 flex flex-col md:flex-row justify-between items-center gap-4 border border-[#BDAE8D]/20"
            >
              {/* الصورة */}
              <img
                src={item.image}
                alt={item.title}
                className="w-[160px] h-[100px] object-contain cursor-pointer"
               
              />

              {/* التفاصيل */}
              <div className="flex-1 w-full text-right text-text">
                <h3 className="text-xl font-bold text-primary">
                  {item.title} - {item.year}
                </h3>
<div className="text-lg text-subtext flex flex-wrap gap-6 mt-2 leading-relaxed">
  <div className="flex flex-col items-center">
    <i className="fas fa-users text-2xl"></i>
    <span>{item.passengers}</span>
  </div>
  <div className="flex flex-col items-center">
    <i className="fas fa-suitcase text-2xl"></i>
    <span>{item.bags}</span>
  </div>
  <div className="flex flex-col items-center">
    <i className="fas fa-door-open text-2xl"></i>
    <span>{item.doors}</span>
  </div>
  <div className="flex flex-col items-center">
    <i className="fas fa-cogs text-2xl"></i>
    <span>{item.transmission === "A" ? "أوتوماتيك" : "عادي"}</span>
  </div>
  <div className="flex flex-col items-center">
    <i className={`fas fa-${item.ac ? "snowflake" : "fan"} text-2xl`}></i>
    <span>{item.ac ? "نعم" : "لا"}</span>
  </div>
  <div className="flex flex-col items-center">
    <i className="fas fa-road text-2xl"></i>
    <span>{item.freeKm} كم</span>
  </div>
</div>


                {/* السعر */}
                <div className="mt-3 text-right">
                  <div className="text-base text-subtext line-through">
                    SAR {item.priceBefore}
                  </div>
                  <div className="text-2xl font-extrabold text-primary leading-snug">
                    SAR {item.priceAfter}
                  </div>
                  {/* <div className="text-sm text-subtext mt-1">
                    ادفع الآن لتحصل على خصم الدفع الإلكتروني
                  </div> */}
                </div>
              </div>

              {/* زر الطلب */}
              <div>
                <button
                  onClick={() => navigate("/item1", { state: item })}
                  className="bg-primary text-white font-bold py-2 px-6 rounded-lg transition hover:scale-105 hover:bg-[#8e6417] text-xl"
                >
                  احجز الآن
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Types;

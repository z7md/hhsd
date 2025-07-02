import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
//@ts-expect-error  dasdasd
import { fadeIn, textVariant } from "../../utils/motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase"; // تأكد من المسار حسب مشروعك

interface CarType {
  id: number;
  الاسم: string;
  image_url: string;
  الموديل: number;
  النوع: string;
  الركاب: number;
  الشنط: number;
  الابواب: number;
  القير: string;
  مكيف: boolean;
  كيلومترات: number;
  "السعر_قبل": number;
  "السعر_بعد": number;
  متاحة: boolean;
  "تاريخ_الاتاحة": string;
}

const Types: FC = () => {
  const navigate = useNavigate();
  const [typesData, setTypesData] = useState<CarType[]>([]);
  const [selectedType, setSelectedType] = useState<string>("الكل");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("car").select("*");

      if (error) {
        console.error("🚨 خطأ في Supabase:", error);
      } else {
        console.log("✅ بيانات السيارات:", data);
        setTypesData(data || []);
      }
    };

    fetchData();
  }, []);

  const uniqueTypes = ["الكل", ...new Set(typesData.map((item) => item.النوع))];

  const filteredTypes =
    selectedType === "الكل"
      ? typesData
      : typesData.filter((item) => item.النوع === selectedType);

  return (
    <section id="booking" className="bg-background py-16">
      <div className="w-full lg:px-[310px] px-5 flex flex-col gap-8 items-center justify-center mt-[140px]">
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
              key={item.id}
              variants={fadeIn("up", 0.2 * index)}
              initial="hidden"
              whileInView="show"
              whileHover={item.متاحة ? { scale: 1.05 } : {}}
              onClick={() => {
                if (item.متاحة) {
                  navigate("/item1", { state: item });
                }
              }}
              viewport={{ once: true }}
              className="relative w-full bg-section rounded-xl shadow-md p-4 flex flex-col md:flex-row justify-between items-center gap-4 border border-[#BDAE8D]/20 cursor-pointer"
            >
              {/* Overlay إذا غير متوفرة */}
              {!item.متاحة && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex flex-col justify-center items-center text-white text-center p-4 z-10">
                  <p className="text-2xl font-bold mb-2">غير متوفرة حالياً</p>
                  <p>تاريخ التوافر المتوقع:</p>
                  <p className="font-semibold">
                    {new Date(item["تاريخ_الاتاحة"]).toLocaleDateString("ar-EG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}

              {/* الصورة */}
              <img
                src={item.image_url}
                alt={item.الاسم}
                className={`w-[160px] h-[100px] object-contain ${
                  item.متاحة ? "cursor-pointer" : "cursor-not-allowed opacity-70"
                }`}
              />

              {/* التفاصيل */}
              <div className="flex-1 w-full text-right text-text">
                <h3 className="text-xl font-bold text-primary">
                  {item.الاسم} - {item.الموديل}
                </h3>

                <div className="text-lg text-subtext flex flex-wrap gap-6 mt-2 leading-relaxed">
                  <div className="flex flex-col items-center">
                    <i className="fas fa-users text-2xl"></i>
                    <span>{item.الركاب}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <i className="fas fa-suitcase text-2xl"></i>
                    <span>{item.الشنط}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <i className="fas fa-door-open text-2xl"></i>
                    <span>{item.الابواب}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <i className="fas fa-cogs text-2xl"></i>
                    <span>{item.القير}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <i
                      className={`fas fa-${item.مكيف ? "snowflake" : "fan"} text-2xl`}
                    ></i>
                    <span>{item.مكيف ? "نعم" : "لا"}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <i className="fas fa-road text-2xl"></i>
                    <span>{item.كيلومترات} كم</span>
                  </div>
                </div>

                {/* السعر */}
                <div className="mt-3 text-right">
                  <div className="text-base text-subtext line-through">
                    SAR {item["السعر_قبل"]}
                  </div>
                  <div className="text-2xl font-extrabold text-primary leading-snug">
                    SAR {item["السعر_بعد"]}
                  </div>
                </div>
              </div>

              {/* زر الطلب */}
              <div>
                <button
                  onClick={() => {
                    if (item.متاحة) navigate("/hhsd/item1", { state: item });
                  }}
                  disabled={!item.متاحة}
                  className={`font-bold py-2 px-6 rounded-lg transition text-xl ${
                    item.متاحة
                      ? "bg-primary text-white hover:scale-105 hover:bg-[#8e6417] cursor-pointer"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
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

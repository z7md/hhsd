import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
// @ts-expect-error ثبيسش
import { fadeIn, textVariant } from "../../utils/motion";

type Testimonial = {
  id: number;
  name: string;
  text: string;
  image?: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Abdullmajeed Alonezy",
    text: `اول مره اتعامل معهم وان شاء الله على اللي شفته من حسن اخلاق وتعامل ماتكون الاخيره تنوع كبير في السيارات الفارهه واللوحات المميزه واخص بالشكر الاخ احمد والاخ ناصر على تعاملهم الراقي كل التوفيق لكم♥️`,
  },
  {
    id: 2,
    name: "3adiL AlSweeD",
    text: `ما شاء الله من أفضل محلات التأجير ببريدة
تجربتي معهم مرتين كلها ممتازه
الاستقبال و التعامل رائع و سرعة في الاستلام و التسليم
السيارات جديدة، الاسعار ممتازه مقارنة بغيرهم، تنوع في  توفر السيارات ، للتحسين ارجو غسل السيارة قبل تسليمها للزبون.
شكرا للأخ أحمد القسومي و الأخ ناصر العضيبي قمة في الأخلاق.`
  },
    {
    id: 3,
    name: "سليمان العبود",
    text: `أجمل تعامل
سيارات نظيفة وجديدة
سيارات فارهة وكذلك اقتصادية
أسعار منافسة
شكرا لفريق العمل
وخصوصا أخوي أحمد`
  },
    {
    id: 4,
    name: "HaYat Thunayan",
    text: `دايم استاجر من محلات سيارات لكن زي حـشد ماشفت ولا راح تكون اخر مره بتكون " وجهتي الدائمـة باذن الله " 👌🏻
تعامل مرن وسريع من الموظفين الخلوقين
خصوصاً أحمد وناصر
بالتوفيق ومن افضل لافضل 👍🏼.`
  },
  // {
  //   id: 3,
  //   name: "فهد الضبيعي",
  //   text: "بكل صراحه انا متعامل مع شركات تنظيف كثير...",
  // },
  // {
  //   id: 4,
  //   name: "naif almrwni",
  //   text: `الصراحة من ابدع ما يكون\n1- اخلاق العمال جدا رائعة\n2- السرعة\n3- النظافة\nانصح بها وبقوة\nالله يوفقهم`,
  // },
  // {
  //   id: 5,
  //   name: "Ahmad Mohmad",
  //   image: "https://randomuser.me/api/portraits/men/32.jpg",
  //   text: `بيض الله وجهكم الصراحة شغلكم يوسع الصدر...`,
  // },
  // {
  //   id: 6,
  //   name: "Afrah Ebrahim",
  //   image: "https://randomuser.me/api/portraits/women/28.jpg",
  //   text: `بدون مبالغة أفضل شركة تنظيف بالقصيم...`,
  // },
];

const TestimonialsSection: FC = () => {
  return (
<section
  id="testimonials"
  className="py-12 px-4 w-full max-w-screen-xl mx-auto mt-[140px] bg-background text-text"
>
  <motion.div
    variants={fadeIn("up", 0.3)}
    initial="hidden"
    whileInView="show"
    className="text-center"
  >
    <motion.span
      variants={textVariant(0.2)}
      initial="hidden"
      whileInView="show"
      className="text-primary lg:text-[48px] text-[35px] font-bold uppercase"
    >
      آراء العملاء
    </motion.span>
  </motion.div>

  <motion.div
    variants={fadeIn("up", 0.5)}
    initial="hidden"
    whileInView="show"
    className="relative mt-12"
  >
    <Swiper
      modules={[Navigation]}
      spaceBetween={30}
      navigation={{
        nextEl: ".swiper-button-next-custom",
        prevEl: ".swiper-button-prev-custom",
      }}
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1440: { slidesPerView: 4 },
      }}
      style={{ width: "100%", height: "100%" }}
      className="testimonials-swiper"
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id} className="!h-auto">
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView="show"
            className="text-center bg-surface p-6 rounded-xl border border-border h-full flex flex-col shadow-md"
          >
            <div className="w-20 h-20 mx-auto mb-4">
              {testimonial.image ? (
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaRegUserCircle className="w-full h-full text-primary" />
              )}
            </div>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-primary text-xl">★</span>
              ))}
            </div>
            <h3 className="font-semibold text-xl mb-3 text-primary">
              {testimonial.name}
            </h3>
            <p className="text-subtext text-sm leading-relaxed whitespace-pre-line">
              {testimonial.text}
            </p>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* أزرار التنقل */}
    <div className="flex justify-center gap-4 mt-8">
      <button className="swiper-button-prev-custom w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition">
        <BsChevronRight className="w-6 h-6" />
      </button>
      <button className="swiper-button-next-custom w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition">
        <BsChevronLeft className="w-6 h-6" />
      </button>
    </div>
  </motion.div>
</section>
  );
};

export default TestimonialsSection;

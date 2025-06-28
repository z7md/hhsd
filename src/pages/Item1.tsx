import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar2 from "../components/Header/Navbar2";
import MapSelector from "../components/MapSelector";
import { useRental } from "../context/RentalContext";
// @ts-expect-error
import { fadeIn } from "../utils/motion";

const Item = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state;

  useEffect(() => {
    if (!car) navigate("/");
    window.scrollTo(0, 0);
  }, [car, navigate]);

  const today = new Date().toISOString().split("T")[0];
  const [showMapTooltip, setShowMapTooltip] = useState(false);

  const {
    rentalDate,
    returnDate,
    location: rentalLocation,
    setRentalDate,
    setReturnDate,
    setLocation,
    setCustomLocation,
    customLocation,
  } = useRental();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setCustomLocation({ lat, lng });
              },
              (error) => {
                alert("لم نتمكن من تحديد موقعك. " + error.message);
              }
            );
          }
        });
    } else {
      alert("الخرائط غير مدعومة في متصفحك");
    }
  };

  useEffect(() => {
    if (rentalLocation === "حدد على الخريطة") {
      setShowMapTooltip(true);
      getCurrentLocation();
    } else {
      setShowMapTooltip(false);
    }
  }, [rentalLocation]);

  const handleTooltipClose = () => {
    setShowMapTooltip(false);
  };

  if (!car) return null;

  // متى يسمح بتفعيل تاريخ الإرجاع؟
  const isReturnDateEnabled = rentalDate !== "" && rentalDate !== null;

  // حساب الحد الأدنى لتاريخ الإرجاع (اليوم التالي لتاريخ الإيجار)
  const minReturnDate = isReturnDateEnabled
    ? new Date(new Date(rentalDate).getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    : today;

  return (
    <div className="w-full flex flex-col almarai-extrabold justify-center items-center bg-background text-text">
      <Navbar2 />

      <motion.div
        className="w-full flex flex-col gap-5 px-5 py-10 justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-[34px] lg:text-[63px] font-bold text-center text-primary mt-[81px]">
          أحجز سيارتك الآن
        </h1>

        {/* عرض السيارة (تصميم محسّن) */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full max-w-xl rounded-2xl overflow-hidden border border-border bg-surface shadow-lg transition-all duration-300 hover:shadow-2xl"
        >
          {/* صورة السيارة */}
          <div className="relative h-[230px] flex items-center justify-center bg-section">
            <img
              src={car.image_url}
              alt={car.الاسم}
              className="h-full object-contain transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => navigate("/item", { state: car })}
            />
            <div className="absolute top-4 left-4 bg-primary text-text text-sm font-bold px-4 py-1 rounded-lg shadow-md">
              {car["السعر بعد"]} ريال / يوم
            </div>
          </div>

          {/* تفاصيل السيارة */}
          <div className="p-5 text-right space-y-3">
            <h2 className="text-2xl font-bold text-text">
              {car.الاسم} - {car.الموديل}
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm leading-relaxed text-subtext">
              <div>👥 الركاب: {car.الركاب}</div>
              <div>🧳 الشنط: {car.الشنط}</div>
              <div>🚪 الأبواب: {car.الابواب}</div>
              <div>⚙️ الجير: {car.القير}</div>
              <div>❄️ مكيف: {car.مكيف ? "نعم" : "لا"}</div>
              <div>📏 المسافة المجانية: {car.كيلومترات} كم</div>
            </div>
          </div>
        </motion.div>

        {/* الحقول */}
        <div className="flex flex-col gap-5 w-full lg:w-[70%]">
          {/* تاريخ الإيجار */}
          <div className="flex flex-col gap-2">
            <label className="text-primary font-medium">تاريخ الإيجار</label>
            <input
              type="date"
              min={today}
              value={rentalDate}
              onChange={(e) => setRentalDate(e.target.value)}
              className="w-full h-[60px] rounded px-3 outline-none text-right bg-surface border border-primary text-text"
              placeholder="اختر تاريخ الإيجار"
            />
          </div>

          {/* رسالة تطلب اختيار تاريخ الإيجار */}
          {!isReturnDateEnabled && (
            <p className="text-red-500 font-semibold text-right">
              يرجى اختيار تاريخ الإيجار أولاً لتمكين اختيار تاريخ الإرجاع
            </p>
          )}

          {/* تاريخ الإرجاع */}
          <div className="flex flex-col gap-2">
            <label className="text-primary font-medium">تاريخ الإرجاع</label>
            <input
              type="date"
              min={minReturnDate}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              disabled={!isReturnDateEnabled}
              className={`w-full h-[60px] rounded px-3 outline-none text-right bg-surface border ${
                isReturnDateEnabled
                  ? "border-primary text-text"
                  : "border-gray-400 text-gray-400 cursor-not-allowed"
              }`}
              placeholder={
                isReturnDateEnabled
                  ? "اختر تاريخ الإرجاع"
                  : "اختر تاريخ الإيجار أولاً"
              }
            />
          </div>

          {/* الموقع */}
          <div className="flex flex-col gap-2">
            <label className="text-primary font-medium">الموقع</label>
            <select
              value={rentalLocation}
              onChange={(e) => {
                const selected = e.target.value;
                setLocation(selected);
                setCustomLocation(null);

                if (selected === "حدد على الخريطة") {
                  getCurrentLocation();
                  setShowMapTooltip(true);
                } else {
                  setShowMapTooltip(false);
                }
              }}
              className="w-full h-[60px] rounded px-3 outline-none text-right bg-surface border border-primary text-text cursor-pointer appearance-none"
            >
              <option value="اختر الموقع" disabled>
                اختر الموقع
              </option>
              <option value="الاستلام من الفرع">الاستلام من الفرع</option>
              <option value="حدد على الخريطة">خدمة التوصيل</option>
            </select>
          </div>

          {/* عرض موقع المستخدم على الخريطة */}
          {rentalLocation === "حدد على الخريطة" && (
            <div className="w-full h-[300px] rounded overflow-hidden mt-3 relative">
              {showMapTooltip && (
                <div
                  className="fixed top-0 left-0 w-full bg-alert text-text p-2 flex z-[100] cursor-pointer"
                  onClick={handleTooltipClose}
                >
                  <span className="mr-6">
                    إذا قمت بالنقر مرتين على الخريطة، سيتم تحديد الموقع الحالي.
                  </span>
                  <button
                    className="fixed top-0 right-0 text-text font-bold text-3xl mr-2"
                    onClick={handleTooltipClose}
                  >
                    ×
                  </button>
                </div>
              )}
              <h2 className="text-2xl font-bold text-primary mb-4 text-center">
                حدد موقع التوصيل
              </h2>

              <div className="w-full h-[300px]">
                <MapSelector
                  onSelect={(lat, lng) => setCustomLocation({ lat, lng })}
                />
              </div>
            </div>
          )}

          {/* عرض موقع الفرع الثابت */}
          {rentalLocation === "الاستلام من الفرع" && (
            <div className="w-full mt-3 flex flex-col gap-3 text-right">
              {/* خريطة الفرع الثابتة */}
              <div className="h-[300px] rounded overflow-hidden border border-border">
                <MapSelector fixedLocation={{ lat: 24.7136, lng: 46.6753 }} />
              </div>

              {/* رابط خرائط Google */}
              <div className="text-primary text-lg mt-2">
                <p className="font-semibold">📍 موقع الفرع:</p>
                <p>الفرع الرئيسي - طريق الملك فهد، الرياض</p>
                <a
                  href="https://www.google.com/maps?q=24.7136,46.6753"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline inline-block mt-1"
                >
                  فتح الموقع في خرائط Google
                </a>
              </div>
            </div>
          )}

          {/* زر واتساب */}
<span
  className="mt-1 w-full h-[60px] px-3 font-bold text-center flex justify-center items-center text-text bg-primary rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:brightness-90 hover:shadow-lg"
  onClick={() => {
    const phone = "966505977705";
    const mapLink = customLocation
      ? `https://www.google.com/maps?q=${customLocation.lat},${customLocation.lng}`
      : "لا يوجد موقع محدد";

    const locationText =
      rentalLocation === "الاستلام من الفرع"
        ? "الاستلام من الفرع - طريق الملك فهد، الرياض\nhttps://www.google.com/maps?q=24.7136,46.6753"
        : `خدمة التوصيل: ${mapLink}`;

    const endDateText = returnDate ? returnDate : "تاريخ النهاية لم يحدد";

    const message = `**طلب حجز سيارة**

*النوع:* ${car.الاسم} - ${car.الموديل}
*السعر:* ${car["السعر بعد"]} ريال
*تاريخ الإيجار:* ${rentalDate}
*تاريخ الإرجاع:* ${endDateText}
*الموقع:* ${locationText}

تم الإرسال من الموقع.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  }}
>
  أطلب الآن
</span>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Item;

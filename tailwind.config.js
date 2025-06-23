/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
      colors: {
        primary: "#AB7C22",       // الذهبي الملكي
        background: "#0D0C0A",    // خلفية داكنة جداً (أسود فخم)
        surface: "#1A1A17",       // أقسام داخلية - رمادي فحمي
        section: "#11110F",       // تدرج مختلف للتمييز
        text: "#E6E1D5",          // بيج فاتح فخم (نص)
        subtext: "#A89F91",       // نص ثانوي ناعم
        border: "#3A3A35",        // حدود خفيفة
        accent: "#5D9CEC",        // لون مساعد (أزرق ملكي)
        alert: "#D9534F",         // تنبيه
        success: "#4BB543",       // نجاح
        overlay: "rgba(0,0,0,0.6)", // شفافية للأوفرلي
      },
		},
	},
	plugins: [],
};

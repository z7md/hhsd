import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";

interface Car {
  id?: number;
  الاسم: string;
  السعر_قبل: number;
  السعر_بعد: number;
  الابواب: number;
  الركاب: number;
  الشنط: number;
  القير: string;
  الموديل: number;
  النوع: string;
  تاريخ_الاتاحة: string;
  كيلومترات: number;
  مكيف: boolean;
  متاحة: boolean;
  image_url: string;
}

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [car, setCar] = useState<Car>({
    الاسم: "",
    السعر_قبل: 0,
    السعر_بعد: 0,
    الابواب: 4,
    الركاب: 4,
    الشنط: 2,
    القير: "",
    الموديل: 2024,
    النوع: "",
    تاريخ_الاتاحة: "",
    كيلومترات: 0,
    مكيف: false,
    متاحة: true,
    image_url: "",
  });
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
      else navigate("/login");
    };
    checkUser();
  }, [navigate]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const { data, error } = await supabase
      .from("car")
      .select("*")
      .order("id", { ascending: false });
    if (data) setCars(data);
    else console.error("Error fetching cars:", error);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("هل أنت متأكد أنك تريد حذف السيارة؟");
    if (!confirmDelete) return;

    const { error } = await supabase.from("car").delete().eq("id", id);
    if (error) {
      alert("فشل الحذف");
      console.error(error);
    } else {
      alert("تم الحذف بنجاح");
      setCars((prev) => prev.filter((car) => car.id !== id));
      // إذا كان المستخدم يعدل السيارة المحذوفة، نرجع النموذج للوضع الإفتراضي
      if (editingId === id) {
        resetForm();
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setCar((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setCar((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // رفع الصورة إلى Storage
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      alert("يرجى اختيار ملف");
      return;
    }
    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = `images/${fileName}`;

    try {
      setUploading(true);
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) {
        alert("فشل رفع الصورة");
        console.error(uploadError);
        setUploading(false);
        return;
      }

      const { data } = supabase.storage.from("images").getPublicUrl(filePath);

      setCar((prev) => ({
        ...prev,
        image_url: data.publicUrl,
      }));
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setCar({
      الاسم: "",
      السعر_قبل: 0,
      السعر_بعد: 0,
      الابواب: 4,
      الركاب: 4,
      الشنط: 2,
      القير: "",
      الموديل: 2024,
      النوع: "",
      تاريخ_الاتاحة: "",
      كيلومترات: 0,
      مكيف: false,
      متاحة: true,
      image_url: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!car.image_url) {
      alert("يرجى رفع صورة للسيارة");
      return;
    }

    const payload = {
      ...car,
      السعر_قبل: Number(car.السعر_قبل),
      السعر_بعد: Number(car.السعر_بعد),
      الابواب: Number(car.الابواب),
      الركاب: Number(car.الركاب),
      الشنط: Number(car.الشنط),
      الموديل: Number(car.الموديل),
      كيلومترات: Number(car.كيلومترات),
    };

    if (editingId) {
      // تحديث السيارة
      const { error } = await supabase
        .from("car")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        alert("حدث خطأ أثناء التحديث");
        console.error(error);
      } else {
        alert("تم التحديث بنجاح");
        // تحديث القائمة محليًا
        setCars((prev) =>
          prev.map((c) => (c.id === editingId ? { ...c, ...payload } : c))
        );
        resetForm();
      }
    } else {
      // إضافة سيارة جديدة
      const { error, data } = await supabase.from("car").insert([payload]);

      if (error) {
        alert("حدث خطأ أثناء الإضافة");
        console.error(error);
      } else {
        alert("تمت الإضافة بنجاح");
        setCar({
          الاسم: "",
          السعر_قبل: 0,
          السعر_بعد: 0,
          الابواب: 4,
          الركاب: 4,
          الشنط: 2,
          القير: "",
          الموديل: 2024,
          النوع: "",
          تاريخ_الاتاحة: "",
          كيلومترات: 0,
          مكيف: false,
          متاحة: true,
          image_url: "",
        });
        setCars((prev) => [data![0], ...prev]);
      }
    }
  };

  const handleEdit = (carToEdit: Car) => {
    setCar(carToEdit);
    setEditingId(carToEdit.id || null);
    window.scrollTo({ top: 0, behavior: "smooth" }); // للتركيز على النموذج
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded shadow-md grid gap-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          لوحة التحكم - {editingId ? "تعديل سيارة" : "إضافة سيارة"}
        </h2>

        {/* إضافة الليبلات */}
        <label>
          اسم السيارة
          <input
            name="الاسم"
            placeholder="اسم السيارة"
            value={car.الاسم}
            onChange={handleChange}
            className="p-3 border rounded w-full"
            required
          />
        </label>

        <label>
          رفع صورة السيارة
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
            "
          />
        </label>

        {car.image_url && (
          <img
            src={car.image_url}
            alt="معاينة الصورة"
            className="w-40 h-24 object-cover rounded mx-auto"
          />
        )}

        <label>
          السعر قبل
          <input
            type="number"
            name="السعر_قبل"
            placeholder="السعر قبل"
            value={car.السعر_قبل}
            onChange={handleChange}
            className="p-3 border rounded w-full"
            required
          />
        </label>

        <label>
          السعر بعد
          <input
            type="number"
            name="السعر_بعد"
            placeholder="السعر بعد"
            value={car.السعر_بعد}
            onChange={handleChange}
            className="p-3 border rounded w-full"
            required
          />
        </label>

        <label>
          عدد الأبواب
          <input
            type="number"
            name="الابواب"
            placeholder="عدد الأبواب"
            value={car.الابواب}
            onChange={handleChange}
            className="p-3 border rounded w-full"
          />
        </label>

        <label>
          عدد الركاب
          <input
            type="number"
            name="الركاب"
            placeholder="عدد الركاب"
            value={car.الركاب}
            onChange={handleChange}
            className="p-3 border rounded w-full"
          />
        </label>

        <label>
          عدد الشنط
          <input
            type="number"
            name="الشنط"
            placeholder="عدد الشنط"
            value={car.الشنط}
            onChange={handleChange}
            className="p-3 border rounded w-full"
          />
        </label>

        <label>
          نوع القير
          <input
            name="القير"
            placeholder="نوع القير"
            value={car.القير}
            onChange={handleChange}
            className="p-3 border rounded w-full"
          />
        </label>

        <label>
          الموديل
          <input
            type="number"
            name="الموديل"
            placeholder="الموديل"
            value={car.الموديل}
            onChange={handleChange}
            className="p-3 border rounded w-full"
          />
        </label>

        <label>
          نوع السيارة
          <input
            name="النوع"
            placeholder="نوع السيارة"
            value={car.النوع}
            onChange={handleChange}
            className="p-3 border rounded w-full"
          />
        </label>

        <label>
          <span className="text-gray-700">تاريخ الإتاحة</span>
          <input
            type="date"
            name="تاريخ_الاتاحة"
            value={car.تاريخ_الاتاحة}
            onChange={handleChange}
            className="p-3 border rounded w-full"
          />
        </label>

        <label>
          عدد الكيلومترات
          <input
            type="number"
            name="كيلومترات"
            placeholder="عدد الكيلومترات"
            value={car.كيلومترات}
            onChange={handleChange}
            className="p-3 border rounded w-full"
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="مكيف"
            checked={car.مكيف}
            onChange={handleChange}
          />
          <span>مكيف</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="متاحة"
            checked={car.متاحة}
            onChange={handleChange}
          />
          <span>متاحة</span>
        </label>

        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-2 rounded hover:bg-blue-700"
        >
          {uploading
            ? editingId
              ? "جارٍ تحديث السيارة..."
              : "جارٍ رفع الصورة..."
            : editingId
            ? "تحديث السيارة"
            : "إضافة السيارة"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-400 text-white font-semibold py-2 rounded hover:bg-gray-500 mt-2"
          >
            إلغاء التعديل
          </button>
        )}
      </form>

      <div className="mt-10 w-full max-w-5xl">
        <h2 className="text-xl font-bold mb-4">قائمة السيارات</h2>
        <div className="overflow-auto">
          <table className="w-full table-auto border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">الاسم</th>
                <th className="p-2 border">الصورة</th>
                <th className="p-2 border">الموديل</th>
                <th className="p-2 border">السعر بعد</th>
                <th className="p-2 border">خيارات</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((carItem, index) => (
                <tr key={carItem.id} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{carItem.الاسم}</td>
                  <td className="border p-2">
                    <img
                      src={carItem.image_url}
                      alt={carItem.الاسم}
                      className="w-20 h-12 object-cover mx-auto"
                    />
                  </td>
                  <td className="border p-2">{carItem.الموديل}</td>
                  <td className="border p-2">{carItem.السعر_بعد}</td>
                  <td className="border p-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(carItem)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(carItem.id!)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InputTiket() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    nama: "",
    email: "",
    role: "",
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "open",
  });

  const [message, setMessage] = useState("");

  // =====================================
  // MENGAMBIL COOKIE
  // =====================================

  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");

    const cookie = cookies.find((row) => row.startsWith(`${name}=`));

    if (!cookie) {
      return null;
    }

    return decodeURIComponent(cookie.substring(name.length + 1));
  };

  // =====================================
  // LOGOUT
  // =====================================

  const handleLogout = () => {
    // Hapus cookie
    document.cookie = "nama=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Hapus localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    // Kembali ke login
    navigate("/login");
  };

  // =====================================
  // CEK LOGIN & ROLE
  // =====================================

  useEffect(() => {
    const nama = getCookie("nama");
    const email = getCookie("email");
    const role = getCookie("role");

    // Tidak login
    if (!nama || !email || !role) {
      navigate("/login");

      return;
    }

    // =====================================
    // HANYA ROLE 2 YANG BOLEH MASUK
    // =====================================

    if (Number(role) !== 2) {
      // Role 1 = Admin
      // Untuk sementara arahkan ke admin

      navigate("/admin");

      return;
    }

    // User valid
    setUser({
      nama,
      email,
      role,
    });
  }, [navigate]);

  // =====================================
  // HANDLE INPUT
  // =====================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // =====================================
  // SUBMIT TIKET
  // =====================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/tiket",
        form,
      );

      console.log("Tiket berhasil:", response.data);

      setMessage("Tiket berhasil dibuat!");

      // Reset form
      setForm({
        title: "",
        description: "",
        priority: "medium",
        status: "open",
      });
    } catch (error) {
      console.error("Error:", error);

      console.error("Response:", error.response?.data);

      setMessage(error.response?.data?.detail || "Gagal membuat tiket");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* LOGO / TITLE */}

            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                Ticket System
              </h1>

              <p className="text-xs sm:text-sm text-gray-500">
                Management Platform
              </p>
            </div>

            {/* USER + LOGOUT */}

            <div className="flex items-center gap-3 sm:gap-5">
              {/* USER INFO */}

              <div className="text-right hidden sm:block">
                <p className="font-semibold text-gray-800">{user.nama}</p>

                <p className="text-sm text-gray-500">{user.email}</p>

                <p className="text-xs text-indigo-600 font-semibold">User</p>
              </div>

              {/* USER AVATAR */}

              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-bold">
                  {user.nama ? user.nama.charAt(0).toUpperCase() : "U"}
                </span>
              </div>

              {/* LOGOUT */}

              <button
                type="button"
                onClick={handleLogout}
                className="px-3 sm:px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* USER INFO MOBILE */}

          <div className="sm:hidden mt-3 pt-3 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-800">{user.nama}</p>

            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      </header>

      {/* ================================= */}
      {/* CONTENT */}
      {/* ================================= */}

      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-10">
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8">
          {/* HEADER FORM */}

          <div className="mb-8">
            <p className="text-sm font-semibold text-indigo-600">TICKET</p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">
              Buat Tiket
            </h2>

            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Sampaikan masalah atau kendala yang ingin Anda laporkan.
            </p>
          </div>

          {/* ================================= */}
          {/* FORM */}
          {/* ================================= */}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TITLE */}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Masukkan judul tiket"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Masukkan deskripsi masalah"
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none resize-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
              />
            </div>

            {/* PRIORITY + STATUS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* PRIORITY */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priority
                </label>

                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                >
                  <option value="low">Low</option>

                  <option value="medium">Medium</option>

                  <option value="high">High</option>
                </select>
              </div>

              {/* STATUS */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                >
                  <option value="open">Open</option>

                  <option value="in_progress">In Progress</option>

                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition"
            >
              Buat Tiket
            </button>
          </form>

          {/* ================================= */}
          {/* MESSAGE */}
          {/* ================================= */}

          {message && (
            <div className="mt-5 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl text-center text-sm">
              {message}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default InputTiket;

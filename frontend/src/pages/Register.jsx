import { useState } from "react";
import { register } from "../services/authService";
import { Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  // Menangani perubahan input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // Menangani submit register
  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const data = await register(form);

      console.log("Register berhasil:", data);

      setMessage("Registrasi berhasil!");

      // Mengosongkan form
      setForm({
        nama: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Register error:", error);

      const errorMessage = error.response?.data?.detail || "Registrasi gagal";

      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Buat Akun Baru</h1>
          <p className="text-sm text-gray-500 mt-2">
            Lengkapi data diri Anda untuk mendaftar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAMA */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="nama@email.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimal 6 karakter"
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <input
              type="text"
              value="User"
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed outline-none"
            />
            <small className="text-xs text-gray-400 mt-1 block">
              *Role otomatis terdaftar sebagai User
            </small>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium rounded-lg shadow-md transition duration-200 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Mendaftarkan..." : "Register"}
          </button>
        </form>

        {/* MESSAGE */}
        {message && (
          <div className="p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;

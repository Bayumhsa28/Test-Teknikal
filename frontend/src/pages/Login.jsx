import { useState } from "react";
import { login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await login(form);

      console.log(data);

      // Simpan access token
      localStorage.setItem("access_token", data.access_token);

      // Simpan data user ke localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // ==========================
      // SIMPAN DATA KE COOKIE
      // ==========================

      document.cookie = `nama=${encodeURIComponent(data.user.nama)}; path=/`;

      document.cookie = `email=${encodeURIComponent(data.user.email)}; path=/`;

      document.cookie = `role=${data.user.role}; path=/`;

      setMessage("Login berhasil!");

      // Pindah ke halaman Input Tiket
      navigate("/input-tiket");
    } catch (error) {
      console.error(error);

      setMessage(error.response?.data?.detail || "Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Selamat Datang</h1>

          <p className="text-sm text-gray-500 mt-2">
            Silakan masuk ke akun Anda
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="nama@email.com"
              value={form.email}
              onChange={handleChange}
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
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          {/* REGISTER */}

          <div className="text-right">
            <p className="text-sm text-gray-600">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Register
              </Link>
            </p>
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-200"
          >
            Login
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

export default Login;

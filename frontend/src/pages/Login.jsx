import { useState } from "react";
import { login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // =====================================
  // HANDLE INPUT
  // =====================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================
  // LOGIN
  // =====================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const data = await login(form);

      console.log("Login berhasil:", data);

      // =====================================
      // SIMPAN ACCESS TOKEN
      // =====================================

      localStorage.setItem("access_token", data.access_token);

      // =====================================
      // SIMPAN DATA USER
      // =====================================

      localStorage.setItem("user", JSON.stringify(data.user));

      // =====================================
      // SIMPAN COOKIE
      // =====================================

      document.cookie = `nama=${encodeURIComponent(data.user.nama)}; path=/`;

      document.cookie = `email=${encodeURIComponent(data.user.email)}; path=/`;

      document.cookie = `role=${data.user.role}; path=/`;

      // =====================================
      // CEK ROLE
      // =====================================

      const role = Number(data.user.role);

      // Role 1 = Admin
      if (role === 1) {
        navigate("/edit-admin");
        return;
      }

      // Role 2 = User
      if (role === 2) {
        navigate("/input-tiket");
        return;
      }

      // Role tidak dikenal
      setMessage("Role user tidak dikenali.");
    } catch (error) {
      console.error("Login error:", error);

      setMessage(error.response?.data?.detail || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Selamat Datang</h1>

          <p className="text-sm text-gray-500 mt-2">
            Silakan masuk ke akun Anda
          </p>
        </div>

        {/* ================================= */}
        {/* FORM */}
        {/* ================================= */}

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
              className="
                w-full
                px-4
                py-2
                border
                border-gray-300
                rounded-lg
                focus:ring-2
                focus:ring-indigo-500
                focus:border-indigo-500
                outline-none
                transition
              "
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
              className="
                w-full
                px-4
                py-2
                border
                border-gray-300
                rounded-lg
                focus:ring-2
                focus:ring-indigo-500
                focus:border-indigo-500
                outline-none
                transition
              "
            />
          </div>

          {/* REGISTER */}

          <div className="text-right">
            <p className="text-sm text-gray-600">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="
                  font-semibold
                  text-indigo-600
                  hover:text-indigo-500
                "
              >
                Register
              </Link>
            </p>
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3
              px-4
              bg-indigo-600
              hover:bg-indigo-700
              disabled:bg-indigo-400
              disabled:cursor-not-allowed
              text-white
              font-medium
              rounded-lg
              shadow-md
              transition
            "
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>

        {/* ================================= */}
        {/* MESSAGE */}
        {/* ================================= */}

        {message && (
          <div
            className="
              p-3
              bg-blue-50
              border
              border-blue-200
              text-blue-700
              rounded-lg
              text-sm
              text-center
            "
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;

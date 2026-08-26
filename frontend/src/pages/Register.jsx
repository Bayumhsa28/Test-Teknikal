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
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        {/* NAMA */}
        <div>
          <label>Nama</label>

          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Masukkan nama"
            required
          />
        </div>

        <br />

        {/* EMAIL */}
        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            required
          />
        </div>

        <br />

        {/* PASSWORD */}
        <div>
          <label>Password</label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            required
            minLength={6}
          />
        </div>

        <br />

        {/* ROLE */}
        <div>
          <label>Role</label>

          <input type="text" value="User" disabled />

          <small>Role otomatis menjadi User</small>
        </div>

        <br />

        <p>
          Sudah punya akun? <Link to="/login">Login</Link>
        </p>

        {/* BUTTON */}
        <button type="submit" disabled={loading}>
          {loading ? "Mendaftarkan..." : "Register"}
        </button>
      </form>

      {/* MESSAGE */}

      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;

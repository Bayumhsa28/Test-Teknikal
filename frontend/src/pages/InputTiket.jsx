import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "open",
  });

  const [message, setMessage] = useState("");

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
      const response = await axios.post(
        "http://localhost:8000/api/tiket",
        form,
      );

      console.log(response.data);

      setMessage("Tiket berhasil dibuat!");

      setForm({
        title: "",
        description: "",
        priority: "medium",
        status: "open",
      });
    } catch (error) {
      console.error(error);

      setMessage(error.response?.data?.detail || "Gagal membuat tiket");
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h1>Buat Tiket</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Masukkan judul tiket"
            required
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Masukkan deskripsi masalah"
            required
          />
        </div>

        <br />

        <div>
          <label>Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <br />

        <div>
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <br />

        <button type="submit">Buat Tiket</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;

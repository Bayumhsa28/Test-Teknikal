import { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";

function InputTiket() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "open",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
  // SUBMIT TIKET
  // =====================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================================= */}
      {/* NAVBAR */}
      {/* ================================= */}

      <Navbar />

      {/* ================================= */}
      {/* CONTENT */}
      {/* ================================= */}

      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-10">
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8">
          {/* ================================= */}
          {/* HEADER FORM */}
          {/* ================================= */}

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
            {/* ================================= */}
            {/* TITLE */}
            {/* ================================= */}

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Title
              </label>

              <input
                id="title"
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Masukkan judul tiket"
                required
                className="
                  w-full
                  px-4
                  py-3
                  border
                  border-gray-300
                  rounded-xl
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-500/10
                "
              />
            </div>

            {/* ================================= */}
            {/* DESCRIPTION */}
            {/* ================================= */}

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Masukkan deskripsi masalah"
                required
                rows={5}
                className="
                  w-full
                  px-4
                  py-3
                  border
                  border-gray-300
                  rounded-xl
                  outline-none
                  resize-none
                  transition
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-500/10
                "
              />
            </div>

            {/* ================================= */}
            {/* PRIORITY + STATUS */}
            {/* ================================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* PRIORITY */}

              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Priority
                </label>

                <select
                  id="priority"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="
                    w-full
                    px-4
                    py-3
                    border
                    border-gray-300
                    rounded-xl
                    outline-none
                    bg-white
                    transition
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-500/10
                  "
                >
                  <option value="low">Low</option>

                  <option value="medium">Medium</option>

                  <option value="high">High</option>
                </select>
              </div>

              {/* STATUS */}

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="
                    w-full
                    px-4
                    py-3
                    border
                    border-gray-300
                    rounded-xl
                    outline-none
                    bg-white
                    transition
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-500/10
                  "
                >
                  <option value="open">Open</option>

                  <option value="in_progress">In Progress</option>

                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            {/* ================================= */}
            {/* BUTTON */}
            {/* ================================= */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                py-3.5
                bg-indigo-600
                hover:bg-indigo-700
                disabled:bg-indigo-400
                disabled:cursor-not-allowed
                text-white
                font-semibold
                rounded-xl
                shadow-md
                transition
              "
            >
              {loading ? "Menyimpan..." : "Buat Tiket"}
            </button>
          </form>

          {/* ================================= */}
          {/* MESSAGE */}
          {/* ================================= */}

          {message && (
            <div
              className="
                mt-5
                p-4
                bg-blue-50
                border
                border-blue-200
                text-blue-700
                rounded-xl
                text-center
                text-sm
              "
            >
              {message}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default InputTiket;

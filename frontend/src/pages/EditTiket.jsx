import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/navbar";

function EditTiket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "open",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // =====================================
  // GET TIKET
  // =====================================

  useEffect(() => {
    const getTiket = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/tiket/${id}`,
        );

        setForm({
          title: response.data.title,
          description: response.data.description,
          priority: response.data.priority,
          status: response.data.status,
        });
      } catch (error) {
        console.error(error);

        setErrorMessage(
          error.response?.data?.detail || "Gagal mengambil data tiket",
        );
      } finally {
        setLoading(false);
      }
    };

    getTiket();
  }, [id]);

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================
  // UPDATE TIKET
  // =====================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Bersihkan message sebelumnya
    setMessage("");
    setErrorMessage("");

    try {
      const response = await axios.put(
        `http://localhost:8000/api/tiket/${id}`,
        form,
      );

      console.log("Tiket berhasil diperbarui:", response.data);

      // Tetap di halaman ini
      setMessage("Tiket berhasil diperbarui!");

      // Tidak ada navigate di sini
      // Tidak ada setTimeout
    } catch (error) {
      console.error("Error:", error);
      console.error("Response:", error.response?.data);

      setErrorMessage(
        error.response?.data?.detail || "Gagal memperbarui tiket",
      );
    }
  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500">Memuat data tiket...</p>
        </div>
      </div>
    );
  }

  // =====================================
  // PAGE
  // =====================================

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {/* HEADER */}

          <div className="mb-8">
            <p className="text-sm font-semibold text-indigo-600">TICKET</p>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Edit Tiket #{id}
            </h1>

            <p className="text-gray-500 mt-2">Perbarui informasi tiket.</p>
          </div>

          {/* FORM */}

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
                required
                className="
                  w-full
                  px-4
                  py-3
                  border
                  border-gray-300
                  rounded-xl
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-500/10
                  transition
                "
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
                required
                rows="5"
                className="
                  w-full
                  px-4
                  py-3
                  border
                  border-gray-300
                  rounded-xl
                  outline-none
                  resize-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-500/10
                  transition
                "
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
                  className="
                    w-full
                    px-4
                    py-3
                    border
                    border-gray-300
                    rounded-xl
                    bg-white
                    outline-none
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>

                <select
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
                    bg-white
                    outline-none
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

            {/* BUTTON */}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => navigate("/page2")}
                className="
                  flex-1
                  py-3
                  bg-gray-200
                  hover:bg-gray-300
                  text-gray-700
                  font-semibold
                  rounded-xl
                  transition
                "
              >
                Batal
              </button>

              <button
                type="submit"
                className="
                  flex-1
                  py-3
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  font-semibold
                  rounded-xl
                  transition
                "
              >
                Simpan Perubahan
              </button>
            </div>
          </form>

          {/* SUCCESS MESSAGE */}

          {message && (
            <div
              className="
                mt-5
                p-4
                bg-green-50
                border
                border-green-200
                text-green-700
                rounded-xl
                text-center
                text-sm
                font-medium
              "
            >
              ✓ {message}
            </div>
          )}

          {/* ERROR MESSAGE */}

          {errorMessage && (
            <div
              className="
                mt-5
                p-4
                bg-red-50
                border
                border-red-200
                text-red-700
                rounded-xl
                text-center
                text-sm
                font-medium
              "
            >
              {errorMessage}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default EditTiket;

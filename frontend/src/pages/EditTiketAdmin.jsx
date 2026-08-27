import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/navbarAdmin";

function EditTiketAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "open",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // =====================================
  // GET DATA TIKET
  // =====================================

  useEffect(() => {
    const getTiket = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        // GET digunakan untuk mengambil data sebelumnya
        const response = await axios.get(
          `http://localhost:8000/api/tiket/${id}`,
        );

        console.log("Data tiket:", response.data);

        // Masukkan data database ke dalam form
        setForm({
          title: response.data.title ?? "",
          description: response.data.description ?? "",
          priority: response.data.priority ?? "medium",
          status: response.data.status ?? "open",
        });
      } catch (error) {
        console.error("GET ERROR:", error);
        console.error("RESPONSE:", error.response?.data);

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

    // Hilangkan pesan ketika user mulai mengedit
    setMessage("");
    setErrorMessage("");
  };

  // =====================================
  // UPDATE TIKET
  // =====================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (saving) {
      return;
    }

    setSaving(true);
    setMessage("");
    setErrorMessage("");

    try {
      console.log("Data yang dikirim:", form);

      // PUT digunakan untuk UPDATE database
      const response = await axios.put(
        `http://localhost:8000/api/tiket/admin/${id}`,
        {
          title: form.title,
          description: form.description,
          priority: form.priority,
          status: form.status,
        },
      );

      console.log("Response backend:", response.data);

      // Isi kembali form menggunakan data terbaru dari database
      setForm({
        title: response.data.title ?? "",
        description: response.data.description ?? "",
        priority: response.data.priority ?? "medium",
        status: response.data.status ?? "open",
      });

      setMessage("Tiket berhasil diperbarui!");
    } catch (error) {
      console.error("UPDATE ERROR:", error);
      console.error("RESPONSE:", error.response?.data);

      setErrorMessage(
        error.response?.data?.detail || "Gagal memperbarui tiket",
      );
    } finally {
      setSaving(false);
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

          {/* ERROR */}

          {errorMessage && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center text-sm font-medium">
              {errorMessage}
            </div>
          )}

          {/* FORM */}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TITLE */}

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
                required
                disabled={saving}
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
                  disabled:bg-gray-100
                "
              />
            </div>

            {/* DESCRIPTION */}

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
                required
                rows={5}
                disabled={saving}
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
                  disabled:bg-gray-100
                "
              />
            </div>

            {/* PRIORITY + STATUS */}

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
                  disabled={saving}
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
                    transition
                    disabled:bg-gray-100
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
                  disabled={saving}
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
                    transition
                    disabled:bg-gray-100
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
              {/* BATAL */}

              <button
                type="button"
                onClick={() => navigate("/edit")}
                disabled={saving}
                className="
                  flex-1
                  py-3
                  bg-gray-200
                  hover:bg-gray-300
                  disabled:bg-gray-100
                  disabled:cursor-not-allowed
                  text-gray-700
                  font-semibold
                  rounded-xl
                  transition
                "
              >
                Batal
              </button>

              {/* SIMPAN */}

              <button
                type="submit"
                disabled={saving}
                className="
                  flex-1
                  py-3
                  bg-indigo-600
                  hover:bg-indigo-700
                  disabled:bg-indigo-400
                  disabled:cursor-not-allowed
                  text-white
                  font-semibold
                  rounded-xl
                  transition
                "
              >
                {saving ? "Menyimpan..." : "Simpan Perubahan"}
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
        </div>
      </main>
    </div>
  );
}

export default EditTiketAdmin;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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

        setMessage(
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

    setForm({
      ...form,
      [name]: value,
    });
  };

  // =====================================
  // UPDATE
  // =====================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    try {
      await axios.put(`http://localhost:8000/api/tiket/${id}`, form);

      setMessage("Tiket berhasil diperbarui!");

      setTimeout(() => {
        navigate("/page2");
      }, 1000);
    } catch (error) {
      console.error(error);

      setMessage(error.response?.data?.detail || "Gagal memperbarui tiket");
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
                "
              />
            </div>

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
                "
              >
                <option value="open">Open</option>

                <option value="in_progress">In Progress</option>

                <option value="closed">Closed</option>
              </select>
            </div>

            {/* BUTTON */}

            <div className="flex gap-3">
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

          {/* MESSAGE */}

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

export default EditTiket;

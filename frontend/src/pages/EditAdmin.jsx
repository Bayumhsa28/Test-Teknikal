import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/navbarAdmin";

function EditAdmin() {
  const navigate = useNavigate();

  const [tiket, setTiket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // =====================================
  // GET COOKIE
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
  // CEK LOGIN + ROLE
  // =====================================

  useEffect(() => {
    const nama = getCookie("nama");
    const email = getCookie("email");
    const role = getCookie("role");

    // Belum login
    if (!nama || !email || !role) {
      navigate("/login", { replace: true });
      return;
    }

    // Hanya role 1 yang boleh masuk
    if (Number(role) !== 1) {
      navigate("/input-tiket", { replace: true });
      return;
    }

    // Jika valid, ambil data tiket
    getTiket();
  }, [navigate]);

  // =====================================
  // GET TIKET
  // =====================================

  const getTiket = async () => {
    try {
      setLoading(true);

      const response = await axios.get("http://localhost:8000/api/tiket");

      setTiket(response.data);
    } catch (error) {
      console.error(error);

      setMessage(error.response?.data?.detail || "Gagal mengambil data tiket");

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // FORMAT TANGGAL
  // =====================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("id-ID");
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (id) => {
    navigate(`/edit-tiket-admin/${id}`);
  };

  // =====================================
  // DELETE
  // =====================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `Apakah kamu yakin ingin menghapus tiket #${id}?`,
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);
      setMessage("");

      await axios.delete(`http://localhost:8000/api/tiket/${id}`);

      // Hapus tiket dari tampilan tanpa reload
      setTiket((prevTiket) => prevTiket.filter((item) => item.id !== id));

      setMessage("Tiket berhasil dihapus!");
      setMessageType("success");
    } catch (error) {
      console.error(error);

      setMessage(error.response?.data?.detail || "Gagal menghapus tiket");

      setMessageType("error");
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================
  // RENDER
  // =====================================

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* ================================= */}
          {/* HEADER */}
          {/* ================================= */}

          <div className="p-6 border-b border-gray-100">
            <p className="text-sm font-semibold text-indigo-600">TICKET</p>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">
              Daftar Tiket
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Daftar tiket yang tersimpan di database.
            </p>
          </div>

          {/* ================================= */}
          {/* MESSAGE */}
          {/* ================================= */}

          {message && (
            <div
              className={`
                mx-6
                mt-5
                p-4
                rounded-xl
                text-sm
                border
                ${
                  messageType === "success"
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-red-50 border-red-200 text-red-600"
                }
              `}
            >
              {message}
            </div>
          )}

          {/* ================================= */}
          {/* LOADING */}
          {/* ================================= */}

          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Memuat data tiket...
            </div>
          ) : tiket.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              Belum ada tiket.
            </div>
          ) : (
            /* ================================= */
            /* TABLE */
            /* ================================= */

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                {/* TABLE HEADER */}

                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-gray-700">
                      ID
                    </th>

                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Title
                    </th>

                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Description
                    </th>

                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Priority
                    </th>

                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Status
                    </th>

                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Created At
                    </th>

                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Updated At
                    </th>

                    <th className="px-6 py-4 font-semibold text-gray-700 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                {/* TABLE BODY */}

                <tbody className="divide-y divide-gray-100">
                  {tiket.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      {/* ID */}

                      <td className="px-6 py-4 font-semibold text-gray-700">
                        #{item.id}
                      </td>

                      {/* TITLE */}

                      <td className="px-6 py-4 font-medium text-gray-800">
                        {item.title}
                      </td>

                      {/* DESCRIPTION */}

                      <td className="px-6 py-4 text-gray-600 max-w-xs">
                        <p className="truncate">{item.description}</p>
                      </td>

                      {/* PRIORITY */}

                      <td className="px-6 py-4">
                        <span
                          className={`
                            inline-flex
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold
                            ${
                              item.priority === "high"
                                ? "bg-red-100 text-red-700"
                                : item.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                            }
                          `}
                        >
                          {item.priority}
                        </span>
                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-4">
                        <span
                          className={`
                            inline-flex
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold
                            ${
                              item.status === "closed"
                                ? "bg-gray-100 text-gray-700"
                                : item.status === "in_progress"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-green-100 text-green-700"
                            }
                          `}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* CREATED */}

                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {formatDate(item.created_at)}
                      </td>

                      {/* UPDATED */}

                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {formatDate(item.update_at)}
                      </td>

                      {/* ACTION */}

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() => handleEdit(item.id)}
                            disabled={deletingId === item.id}
                            className="
                              px-4
                              py-2
                              bg-indigo-600
                              hover:bg-indigo-700
                              disabled:bg-indigo-300
                              text-white
                              text-sm
                              font-semibold
                              rounded-lg
                              transition
                            "
                          >
                            Edit
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            disabled={deletingId === item.id}
                            className="
                              px-4
                              py-2
                              bg-red-600
                              hover:bg-red-700
                              disabled:bg-red-300
                              text-white
                              text-sm
                              font-semibold
                              rounded-lg
                              transition
                            "
                          >
                            {deletingId === item.id ? "Menghapus..." : "Hapus"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default EditAdmin;

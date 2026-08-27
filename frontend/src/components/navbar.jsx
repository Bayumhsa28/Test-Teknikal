import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    nama: "",
    email: "",
    role: "",
  });

  // State untuk dropdown user
  const [showMenu, setShowMenu] = useState(false);

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
  // CEK USER
  // =====================================

  useEffect(() => {
    const nama = getCookie("nama");
    const email = getCookie("email");
    const role = getCookie("role");

    if (!nama || !email || !role) {
      navigate("/login");
      return;
    }

    setUser({
      nama,
      email,
      role,
    });
  }, [navigate]);

  // =====================================
  // LOGOUT
  // =====================================

  const handleLogout = () => {
    document.cookie = "nama=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =====================================
  // NAVLINK STYLE
  // =====================================

  const navLinkClass = ({ isActive }) =>
    `
      px-4 py-2
      rounded-lg
      text-sm
      font-semibold
      transition
      whitespace-nowrap
      ${
        isActive
          ? "bg-indigo-100 text-indigo-700"
          : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
      }
    `;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="min-h-[72px] flex items-center justify-between gap-4">
          {/* ================================= */}
          {/* LOGO */}
          {/* ================================= */}

          <div className="flex-shrink-0">
            <p className="text-lg sm:text-xl font-bold text-gray-800">
              Ticket System
            </p>

            <p className="text-xs text-gray-500">Management Platform</p>
          </div>

          {/* ================================= */}
          {/* DESKTOP NAVIGATION */}
          {/* ================================= */}

          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/input-tiket" className={navLinkClass}>
              Buat Tiket
            </NavLink>

            <NavLink to="/edit" className={navLinkClass}>
              Edit Tiket
            </NavLink>
          </nav>

          {/* ================================= */}
          {/* USER */}
          {/* ================================= */}

          <div className="relative">
            {/* USER BUTTON */}

            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="
                flex
                items-center
                gap-3
                px-2
                py-2
                rounded-xl
                hover:bg-gray-100
                transition
              "
            >
              {/* USER INFO */}

              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-800">
                  {user.nama}
                </p>

                <p className="text-xs text-gray-500">{user.email}</p>

                <p className="text-xs text-indigo-600 font-semibold">
                  {Number(user.role) === 1 ? "Admin" : "User"}
                </p>
              </div>

              {/* AVATAR */}

              <div
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-indigo-100
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <span className="text-indigo-600 font-bold">
                  {user.nama ? user.nama.charAt(0).toUpperCase() : "U"}
                </span>
              </div>

              {/* ARROW */}

              <span
                className={`
                  hidden sm:block
                  text-gray-400
                  transition-transform
                  ${showMenu ? "rotate-180" : ""}
                `}
              >
                ▼
              </span>
            </button>

            {/* ================================= */}
            {/* DROPDOWN */}
            {/* ================================= */}

            {showMenu && (
              <div
                className="
                  absolute
                  right-0
                  top-full
                  mt-2
                  w-52
                  bg-white
                  border
                  border-gray-200
                  rounded-xl
                  shadow-lg
                  p-2
                  z-50
                "
              >
                {/* USER INFO MOBILE */}

                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.nama}
                  </p>

                  <p className="text-xs text-gray-500 break-all">
                    {user.email}
                  </p>

                  <p className="text-xs text-indigo-600 font-semibold mt-1">
                    {Number(user.role) === 1 ? "Admin" : "User"}
                  </p>
                </div>

                {/* LOGOUT */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    w-full
                    mt-1
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    font-semibold
                    text-red-600
                    rounded-lg
                    hover:bg-red-50
                    transition
                  "
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================================= */}
        {/* MOBILE NAVIGATION */}
        {/* ================================= */}

        <nav
          className="
            md:hidden
            flex
            items-center
            gap-2
            pb-3
            overflow-x-auto
          "
        >
          <NavLink to="/input-tiket" className={navLinkClass}>
            📝 Buat Tiket
          </NavLink>

          <NavLink to="/edit" className={navLinkClass}>
            📋 Page 2
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

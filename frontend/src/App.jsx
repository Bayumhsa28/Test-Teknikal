import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import InputTiket from "./pages/inputTiket";
import Edit from "./pages/edit";
import EditTiket from "./pages/EditTiket";
import EditAdmin from "./pages/EditAdmin";
import EditTiketAdmin from "./pages/InputTiketAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* REGISTER */}
        <Route path="/register" element={<Register />} />

        {/* USER */}
        <Route path="/input-tiket" element={<InputTiket />} />

        {/* PAGE */}
        <Route path="/edit" element={<Edit />} />

        {/* EDIT TIKET USER */}
        <Route path="/edit-tiket/:id" element={<EditTiket />} />

        {/* ADMIN */}
        <Route path="/edit-admin" element={<EditAdmin />} />

        {/* EDIT TIKET USER */}
        <Route path="/edit-tiket-admin/:id" element={<EditTiketAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

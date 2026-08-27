import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import InputTiket from "./pages/inputTiket";
import Edit from "./pages/edit";
import EditTiket from "./pages/EditTiket";
import editTiketAdmin from "./pages/EditAdmin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        {/* REGISTER */}

        <Route path="/register" element={<Register />} />

        {/* INPUT TIKET */}

        <Route path="/input-tiket" element={<InputTiket />} />

        <Route path="/edit" element={<Edit />} />

        <Route path="/edit-tiket/:id" element={<EditTiket />} />

        <Route path="/edit-tiket-admin" element={<EditTiketAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

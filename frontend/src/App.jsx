import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import InputTiket from "./pages/inputTiket";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

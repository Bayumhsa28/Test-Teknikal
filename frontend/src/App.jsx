import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import InputTiket from "./pages/inputTiket";
import Page2 from "./pages/page2";

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

        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

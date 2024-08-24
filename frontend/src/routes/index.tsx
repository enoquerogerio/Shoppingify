import { Routes, Route, useLocation } from "react-router-dom";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

import History from "../pages/History";
import Items from "../pages/Items";
import Sidebar from "../components/Sidebar";

export default function Index() {
  const location = useLocation();
  // Verificar se a rota atual não corresponde a nenhuma rota definida
  const isNotFound = !["/", "/items", "/account", "/statistics"].includes(
    location.pathname
  );

  return (
    <>
      {!isNotFound && <Sidebar />}
      <Routes>
        <Route path="/" element={<History />} />
        <Route path="/items" element={<Items />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/statistics" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

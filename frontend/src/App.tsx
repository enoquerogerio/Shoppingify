import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Index from "./routes";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <ToastContainer autoClose={3000} className="toast-container" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/*"
            element={
              <main className="flex">
                <Index />
              </main>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

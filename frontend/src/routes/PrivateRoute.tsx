import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

const PrivateRoute = () => {
  const userString = localStorage.getItem("user");
  const userStored = userString ? JSON.parse(userString) : null;

  if (!userStored) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(userStored.token);
    const expirationTime = decoded.exp! * 1000;
    const currentTime = Date.now();

    if (expirationTime > currentTime) {
      return <Outlet />;
    } else {
      // Token expirado, redireciona para login
      localStorage.removeItem("user");
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;

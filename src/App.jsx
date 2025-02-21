import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./supabase/client";
import { useEffect } from "react";
import Home from './pages/HomePage'
import Login from './pages/LoginPage'
import NotFound from './pages/NotFound'
import { TaskContextProvider } from "./context/TaskContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  /*const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });


  }, [navigate]);*/
  const useAuthRedirect = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const checkSession = async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error obteniendo la sesión:", error);
          return;
        }
  
        if (data.session) {
          navigate("/"); // Redirige al Home si hay una sesión activa
        }
      };
  
      checkSession();
    }, [navigate]);
  };
  useAuthRedirect();
  

  return (
    <AuthProvider>
      <TaskContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TaskContextProvider>
    </AuthProvider>
  )
}

export default App
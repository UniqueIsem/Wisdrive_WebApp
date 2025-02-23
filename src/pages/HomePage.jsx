import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { supabase } from "../supabase/client";
import Navbar from "../components/Navbar";

function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error obteniendo sesión:", error);
        setIsLoading(false);
      }
      !data.session ? navigate("/login") : setIsLoading(false);
    };

    checkUser();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="bg-transparent m-20">
          <p className="gradient-bg p-16 rounded-2xl text-3xl font-bold">
            Cargando...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-auto">
      <Navbar />
      <div className="w-4/5 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default HomePage;
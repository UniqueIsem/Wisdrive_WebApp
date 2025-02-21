import { useEffect } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import Signin from "../components/Signin";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) alert("Error obteniendo sesión:", error);

      if (data.session) {
        navigate("/");
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <div className="flex h-screen w-screen">
      {/*SECCION IZQUIERDA*/}
      <div className="gradient-bg w-1/2 flex items-center justify-center">
        <div className="text-white text-center place-items-center p-10">
          <img className="mb-4" src="src\assets\logo\full-logo.png" alt="wisdrive-letter-logo" width={200} />
          <h1 className="text-4xl font-bold mb-4">Bienvenido al admin panel</h1>
          <p className="text-lg mb-10">Crea conocimiento para los usuarios</p>
        </div>
      </div>

      {/*SECCION DERECHA*/}
      <div className="w-1/2 bg-gray-900 flex items-center justify-center">
        <Signin/>
      </div>
    </div>
  );
}

export default Login;

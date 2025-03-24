import { supabase } from "../supabase/client";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();


  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error.message);
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="gradient-bg w-1/5 text-white ">
      <div className="h-full flex flex-col mx-auto justify-between items-center py-5 p-0">
        {/* Logo */}
        <div className="w-full mb-8 p-3">
          <Link to="/">
            <img
              src="src\assets\logo\word-logo.png"
              alt="wisdrive-word-logo"
            />
          </Link>
        </div>

        {/* Menú de navegación */}
        <div className="w-full h-screen">
          <nav className="p-4">
            <ul className="flex flex-col items-center space-y-4 text-white text-lg font-bold">
              <li>
                <Link
                  to="/quiz-generator"
                  className="transition delay-150 duration-300 ease-in-out transform hover:text-xl"
                >
                  Generador Quizzes
                </Link>
              </li>
              <li>
                <Link
                  to="/create_quizz"
                  className="transition delay-150 duration-300 ease-in-out transform hover:text-xl"
                >
                  Crear quizz
                </Link>
              </li>
              <li>
                <Link
                  to="/tables"
                  className="transition delay-150 duration-300 ease-in-out transform hover:text-xl"
                >
                  Contenido
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <button
          className="bg-transparet hover:bg-purple-700 hover:cursor-pointer text-white py-1 px-4 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
          onClick={() => handleLogout()}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

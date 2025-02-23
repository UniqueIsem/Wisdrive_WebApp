import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import { supabase } from "../supabase/client";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { logout } = useTas
  ks();
  const { user } = useAuth();
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
        {/* ImageButton */}
        <div className="w-full mb-8 p-3">
          <Link to="/">
            <img
              src="src\assets\logo\word-logo.png"
              alt="wisdrive-word-logo"
            />
          </Link>
        </div>

        {/* Menú de navegación */}
        <div className="md:flex space-x-4">
          <nav className="p-4">
            <ul className="flex flex-col justify-around text-white">
              <li>
                <Link to="/quiz-generator" className="">Quiz Generator</Link>
              </li>
              <li>
                <Link to="/restfull" className="hover:underline">Restfull</Link>
              </li>
              <li>
                <Link to="/tables" className="hover:underline">Tables</Link>
              </li>
            </ul>
          </nav>
        </div>

        <button
          className="bg-transparet hover:bg-red-700 hover:cursor-pointer text-white py-1 px-4 rounded"
          onClick={() => handleLogout()}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

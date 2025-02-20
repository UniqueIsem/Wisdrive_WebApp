import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import { supabase } from "../supabase/client";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { logout } = useTasks();
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

          <button
            className="bg-transparet hover:bg-red-700 hover:cursor-pointer text-white py-1 px-4 rounded"
            onClick={() => handleLogout()}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

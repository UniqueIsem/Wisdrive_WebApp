import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import TaskForm from "../components/TaskForm";
//import TasksList from "../components/TasksList";
import { supabase } from "../supabase/client";

function Home() {
  const navigate = useNavigate();
  const [showTasksDone, setShowTasksDone] = useState(false);


  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error obteniendo sesión:", error);
      }
      if (!data.session) {
        navigate("/login");
      }
    };

    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error.message);
    } else {
      navigate("/login");
    }
  };


  return (
    <div className="row pt-4">
      <div className="col-md-4 offset-md-4">

        <header className="d-flex justify-content-between my-3">
          <span className="h5">{showTasksDone ? `Done Tasks` : "Tasks"}</span>
          <button
            onClick={() => setShowTasksDone(!showTasksDone)}
            className="btn btn-dark btn-sm"
          >
            {showTasksDone ? "Show tasks to do" : "Show tasks done"}
          </button>
          <button
            onClick={() => handleLogout()}
            className="btn btn-danger btn-sm"
          >
            Cerrar sesión
          </button>
        </header>


      </div>
    </div>
  );
}

export default Home;
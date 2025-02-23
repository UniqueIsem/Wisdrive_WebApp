import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import Navbar from "../components/Navbar";
import { QuizGenerator } from "../components/screens/QuizGenerator";
import { Restfull } from "../components/screens/Restfull";
import { Tables } from "../components/screens/Tables";

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

  const handleNavbarSelection = (component) => {
    setSelectedComponent(component);
  };

  let ComponentToRender;
  // Dependiendo del estado, cargamos el componente adecuado
  if (selectedComponent === 'quiz-generator') {
    ComponentToRender = <QuizGenerator />;
  } else if (selectedComponent === 'restfull') {
    ComponentToRender = <Restfull />;
  } else if (selectedComponent === 'tables') {
    ComponentToRender = <Tables />;
  } else {
    ComponentToRender = (
      <div>
        <h2>Bienvenido a la página principal</h2>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen">
      <Navbar onSelect={handleNavbarSelection} />
      <div className="row h-screen w-screen justify-items-center">
        <div className="col-md-4 offset-md-4 mt-16">

          <header className="d-flex justify-content-between my-3">
            <span className="h5">{showTasksDone ? `Done Tasks` : "Tasks"}</span>
            <button
              onClick={() => setShowTasksDone(!showTasksDone)}
              className="btn btn-dark btn-sm hover:cursor-pointer bg-green-600 rounded-2xl p-2 m-2"
            >
              {showTasksDone ? "Show tasks to do" : "Show tasks done"}
            </button>

          </header>
          {ComponentToRender}
        </div>
      </div>
    </div>
  );
}

export default Home;
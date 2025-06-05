import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/client";
import { useNavigate } from 'react-router-dom';

export function Tables_Modules () {
  /*const categories = [
    { title: "Introducción", image: "src/assets/reglamento.jpg" },
    { title: "Intermedio", image: "src/assets/mecanica.jpg" },
    { title: "Avanzado", image: "src/assets/cultura.jpeg" }
  ];*/
  const { id } = useParams(); //Obtiene el ID de la URL
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    const { data, error } = await supabase
      .from("modules")
      .select("*")
      .eq("category_id", id)

    if (error) {
      console.error("Error fetching category:", error);
    } else {
      setModules(data);
    }
  };

  return (
    <div className="flex flex-col h-full bg-purple-100 p-8 ">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Navega por el contenido de la app
      </h1>
      <p className="text-gray-800 mb-8">
        Categoría actual:
      </p>
      <p className="text-gray-800 mb-8">
        Selecciona un módulo:
      </p>
      <div className="max-w-full w-full h-full">
        {modules.map((module) => (
          <div 
            key={module.module_id} 
            className="bg-white w-full p-4 mb-4 rounded-lg shadow"
            onClick={() => navigate(`/modules_quizzes/${module.id}`)}
          >
            <p className="text-gray-700 mt-10 text-center">{module.module_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

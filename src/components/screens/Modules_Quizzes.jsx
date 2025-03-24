import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/client";
import { useNavigate } from 'react-router-dom';

export function Modules_Quizzes () {
    const { id } = useParams(); //Obtiene el ID de la URL
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuizzes();
      }, []);
    
    const fetchQuizzes = async () => {
        const { data, error } = await supabase
          .from("quizzes")
          .select("*")
          .eq("module_id", id)
    
        if (error) {
          console.error("Error fetching quizzes:", error);
        } else {
          setQuizzes(data);
        }
    };

    return (
        <div className="bg-purple-100 p-6 rounded-lg max-w-full mx-auto">
        <h2 className="text-lg font-semibold text-gray-800">
            Navega por el contenido de la app
        </h2>
        {/*<p className="text-gray-600">Categoría: Reglamentos de tránsito</p>*/}
        <p className="text-gray-600 mb-4">Módulo: 1</p>
        <div className="border border-purple-300 rounded-lg overflow-hidden">
            <div className="gradient-bg text-gray-800 font-semibold p-3">
            Todas las preguntas
            </div>
            {quizzes.map((quiz) => (
            <div
                key={quiz.quiz_id}
                className="p-3 border-b border-purple-200 bg-purple-400 hover:bg-gray-600 cursor-pointer"
                onClick={() => navigate(`/quizzes_questions/${quiz.quiz_id}`)}
            >
                {quiz.quiz_name}
            </div>
            ))}
        </div>
        </div>
    )
};
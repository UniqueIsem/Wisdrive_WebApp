import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/client";
import { useNavigate } from 'react-router-dom';

export function Quizzes_Questions () {
    const { id } = useParams(); //Obtiene el ID de la URL
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    /*const quizzes = [
        "¿Sabes cambiar una llanta?",
        "Peatones y ciclistas: Seguridad primero",
        "Riesgos en la carretera: ¿Qué harías en estos casos?",
        "Señales de tránsito: ¿Las reconoces todas?",
        "¿Cuánto sabes sobre tu vehículo?",
        "Diagnóstico rápido: ¿Puedes identificar estos problemas?",
        "Primeros auxilios en accidentes viales",
        "Evita multas y accidentes",
    ];*/

    useEffect(() => {
        fetchQuestions();
      }, []);
    
    const fetchQuestions = async () => {
        const { data, error } = await supabase
          .from("questions")
          .select("*")
          .eq("quiz_id", id)
    
        if (error) {
          console.error("Error fetching questions:", error);
        } else {
          setQuestions(data);
        }
    };

    return (
        <div className="bg-purple-100 p-6 rounded-lg h-full w-full mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Navega por el contenido de la app
        </h2>
        {/*<p className="text-gray-600">Categoría: Reglamentos de tránsito</p>
        <p className="text-gray-600 mb-4">Módulo: 1</p>*/}
        <div className="border border-purple-300 rounded-lg overflow-hidden">
            <div className="gradient-bg text-gray-800 font-semibold p-3">
            Todas las preguntas
            </div>
            {questions.map((question) => (
            <div
                key={question.id}
                className="p-3 border-b border-purple-200 bg-purple-400 hover:bg-gray-600 cursor-pointer"
                onClick={() => navigate(`/questions_answers/${question.id}`)}
            >
                {question.question_content}
            </div>
            ))}
        </div>
        </div>
    )
};
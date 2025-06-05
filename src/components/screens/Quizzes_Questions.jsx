import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/client";
import { useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';

export function Quizzes_Questions () {
    const { id } = useParams(); //Obtiene el ID de la URL
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

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
        <div className="border border-purple-300 rounded-lg overflow-hidden mt-5">
            <div className="gradient-bg text-gray-800 font-semibold p-3">
            Todas las preguntas
            </div>
            {questions.map((question) => (
            <div
                key={question.id}
                className="flex p-3 border-b border-purple-200 bg-purple-400 hover:bg-gray-600 justify-between items-center"
            >
              {question.question_content}
              <div className="flex gap-2">
                <button className="cursor-pointer" onClick={() => navigate(`/edit_question/${question.id}`)}> <Pencil /> </button> 
              </div>
            </div>
            ))}
        </div>
        </div>
    )
};
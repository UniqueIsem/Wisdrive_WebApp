import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/client";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { ArrowBigRight } from "lucide-react";

export function Modules_Quizzes() {
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
      .eq("module_id", id);

    if (error) {
      console.error("Error fetching quizzes:", error);
    } else {
      setQuizzes(data);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este quiz? Esta acción no se puede deshacer."
    );

    if (!confirmDelete) return; //usuario cancela

    try {
      //obtener todas las preguntas del quiz
      const { data: questions, error: questionsError } = await supabase
        .from("questions")
        .select("id")
        .eq("quiz_id", quizId);

      if (questionsError)
        throw new Error("Error al obtener preguntas del quiz.");

      const questionIds = questions.map((q) => q.id);

      if (questionIds.length > 0) {
        //borrar respuestas relacionadas a las preguntas
        const { error: deleteAnswersError } = await supabase
          .from("answers")
          .delete()
          .in("question_id", questionIds);

        if (deleteAnswersError)
          throw new Error("Error al eliminar respuestas.");

        //borrar preguntas
        const { error: deleteQuestionsError } = await supabase
          .from("questions")
          .delete()
          .in("id", questionIds);

        if (deleteQuestionsError)
          throw new Error("Error al eliminar preguntas.");
      }

      //borrar el quiz
      const { error: deleteQuizError } = await supabase
        .from("quizzes")
        .delete()
        .eq("id", quizId);

      if (deleteQuizError) throw new Error("Error al eliminar quiz.");

      alert("¡Quiz eliminado exitosamente!");
      fetchQuizzes();
    } catch (error) {
      console.error(error);
      alert(`Error al eliminar quiz: ${error.message}`);
    }
  };

  return (
    <div className="bg-purple-100 p-6 rounded-lg h-full w-full mx-auto">
      <h2 className="text-lg font-semibold text-gray-800">
        Navega por el contenido de la app
      </h2>
      <div className="border border-purple-300 rounded-lg overflow-hidden mt-5">
        <div className="gradient-bg text-gray-800 font-semibold p-3">
          Todos los quizzes
        </div>
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="flex p-3 border-b border-purple-200 bg-purple-400 hover:bg-gray-600 justify-between items-center"
          >
            {quiz.name}
            <div className="flex gap-2">
              <button
                className="cursor-pointer"
                onClick={() => handleDeleteQuiz(quiz.id)}
              >
                {" "}
                <Trash2 />{" "}
              </button>
              <button
                className="cursor-pointer"
                onClick={() => navigate(`/quizzes_questions/${quiz.id}`)}
              >
                {" "}
                <ArrowBigRight />{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

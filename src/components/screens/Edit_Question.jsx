import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/client";

export function Edit_Question() {
  const { questionId } = useParams(); // Obtiene el ID de la URL
  
  const [questionContent, setQuestionContent] = useState("");
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchQuestion = async () => {
    const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("id", questionId)
    .single()
    
    console.log(data);
    if (error) {
      console.error("Error fetching question:", error);
    } else {
      setQuestionContent(data.question_content);
    }
  };
  
  const fetchAnswers = async () => {
    const { data, error } = await supabase
          .from("answers")
          .select("*")
          .eq("question_id", questionId)
          
          console.log(data);
          if (error) {
            console.error("Error fetching answers:", error);
        } else {
          setAnswers(data);
        }
    };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAnswers();
      await fetchQuestion();
      setLoading(false); 
    };
    
    fetchData();
  }, []);

  // 2. Handlers para cambios
  const handleAnswerChange = (index, field, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index][field] = value;
    setAnswers(updatedAnswers);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      // Update pregunta
      const { error: questionError } = await supabase
        .from("questions")
        .update({
          question_content: questionContent,
        })
        .eq("id", questionId);

      if (questionError) throw questionError;

      // Update cada respuesta
      for (const ans of answers) {
        const { error: answerError } = await supabase
          .from("answers")
          .update({
            content: ans.content,
            is_correct: ans.is_correct,
          })
          .eq("id", ans.id);

        if (answerError) throw answerError;
      }

      alert("¡Pregunta y respuestas actualizadas exitosamente!");
      // Opcionalmente podrías redirigir
      // navigate('/admin/questions');
    } catch (error) {
      console.error(error);
      alert("Error actualizando datos.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="flex flex-col gap-4 p-4 bg-purple-100 rounded-lg h-full w-full text-gray-800">
      <h2 className="text-xl font-bold">Editar Pregunta</h2>

      <div className="flex flex-col">
        <h3 className="text-lg font-semibold mt-4">Pregunta</h3>
        <input
          value={questionContent}
          onChange={(e) => setQuestionContent(e.target.value)}
          className="rounded-md p-2 bg-white text-gray-800"
        />
      </div>

      <h3 className="text-lg font-semibold mt-4">Respuestas</h3>
      {answers.map((ans, index) => (
        <div key={ans.id} className="flex items-center gap-2">
          <input
            value={ans.content}
            onChange={(e) => handleAnswerChange(index, "content", e.target.value)}
            className="rounded-md p-2 bg-white text-gray-800 w-full"
            placeholder={`Respuesta ${index + 1}`}
          />
          <label className="flex items-center gap-1 text-sm">
            Correcta
            <input
              type="checkbox"
              checked={ans.is_correct}
              onChange={(e) => handleAnswerChange(index, "is_correct", e.target.checked)}
            />
          </label>
        </div>
      ))}

    
      <button
        onClick={handleUpdate}
        className="bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 mt-4"
      >
        Actualizar
      </button>
    </div>
  );
}

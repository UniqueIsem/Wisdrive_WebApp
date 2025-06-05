import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../../supabase/client";
import { EditableInput } from "../ui/EditableInput";

export function CreateOrUploadQuizz() {
  const location = useLocation();
  const quizDataFromState = location.state?.quizData || null;

  const [formData, setFormData] = useState({
    category: "",
    module: "",
    name: "",
    questions: [],
  });

  const [categories, setCategories] = useState([]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    if (quizDataFromState) {
      setFormData(quizDataFromState);
    }

    const fetchInitialData = async () => {
      const { data: catData } = await supabase
        .from("categories")
        .select("id, name");
      const { data: modData } = await supabase
        .from("modules")
        .select("id, module_name, category_id");
      setCategories(catData || []);
      setModules(modData || []);
    };

    fetchInitialData();
  }, [quizDataFromState]);

  const handleSubmit = async () => {
    try {
      const { category, module, name, questions } = formData;

      if (!category || !module || !name) {
        alert(
          "Por favor llena todos los campos de categoría, módulo y nombre del quiz."
        );
        return;
      }

      for (const [qIndex, question] of questions.entries()) {
        if (!question.question.trim()) {
          alert(`La pregunta ${qIndex + 1} está vacía.`);
          return;
        }
        const hasCorrectAnswer = question.answers.some((ans) => ans.is_correct);
        if (!hasCorrectAnswer) {
          alert(
            `La pregunta ${qIndex + 1} no tiene ninguna respuesta correcta.`
          );
          return;
        }
        for (const [aIndex, answer] of question.answers.entries()) {
          if (!answer.text.trim()) {
            alert(
              `La respuesta ${aIndex + 1} de la pregunta ${
                qIndex + 1
              } está vacía.`
            );
            return;
          }
        }
      }

      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("id")
        .eq("id", category)
        .single();
      if (categoryError || !categoryData)
        throw new Error("Categoría no encontrada.");

      const { data: moduleData, error: moduleError } = await supabase
        .from("modules")
        .select("id")
        .eq("id", module)
        .eq("category_id", categoryData.id)
        .single();
      if (moduleError || !moduleData) throw new Error("Módulo no encontrado.");

      const { data: newQuiz, error: quizError } = await supabase
        .from("quizzes")
        .insert([{ name: name, module_id: moduleData.id }])
        .select("id")
        .single();
      if (quizError || !newQuiz) throw new Error("Error al crear el quiz.");

      for (const q of questions) {
        const { data: questionData, error: questionError } = await supabase
          .from("questions")
          .insert({ question_content: q.question, quiz_id: newQuiz.id })
          .select("id")
          .single();
        if (questionError || !questionData)
          throw new Error("Error al crear una pregunta.");

        const answersToInsert = q.answers.map((ans) => ({
          content: ans.text,
          is_correct: ans.is_correct,
          question_id: questionData.id,
        }));

        const { error: answersError } = await supabase
          .from("answers")
          .insert(answersToInsert);
        if (answersError) throw new Error("Error al guardar respuestas.");
      }

      alert("Quiz guardado exitosamente.");
    } catch (error) {
      console.error(error);
      alert(`Ocurrió un error: ${error.message}`);
    }
  };

  return (
    <div className="bg-purple-100 p-6 h-full h-max-full w-full mx-auto space-x-4">
      <h2 className="text-lg font-bold text-purple-800">Crear o Subir Quiz</h2>

      <div className="bg-white p-4 rounded shadow text-gray-700">
        <p>
          <strong>Categoría:</strong> {formData.category}
        </p>
        <p>
          <strong>Módulo:</strong> {formData.module}
        </p>
        <p>
          <strong>Nombre del Quiz:</strong> {formData.name}
        </p>

        {formData.questions.map((q, index) => (
          <div
            key={index}
            className="border-dashed border-2 border-gray-200 p-4 my-2 rounded-md"
          >
            <p className="font-semibold mb-1">Pregunta {index + 1}:</p>
            <EditableInput
              initialText={q.question}
              name={`question-${index}`}
            />
            <p className="mt-2">Respuestas:</p>
            {q.answers.map((ans, i) => (
              <EditableInput
                key={i}
                initialText={ans.text}
                name={`answer-${index}-${i}`}
                className={ans.is_correct ? "bg-green-50" : ""}
              />
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Guardar Quiz
      </button>
    </div>
  );
}

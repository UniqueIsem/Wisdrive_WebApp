import { useState } from "react";
import { supabase } from "../../supabase/client";
import { useEffect } from "react";

export function Create_Quizz() {
  const [formData, setFormData] = useState({
    category: "",
    module: "",
    name: "",
    questions: Array(5)
      .fill()
      .map(() => ({
        answers: [
          { text: "", is_correct: false },
          { text: "", is_correct: false },
          { text: "", is_correct: false },
          { text: "", is_correct: false },
        ],
      })),
  });

  const [categories, setCategories] = useState([]);
  const [modules, setModules] = useState([]);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");

    console.log(data);
    if (error) {
      console.log("Error fetching categories: ", error);
    } else {
      setCategories(data);
    }
  };
  const fetchModules = async () => {
    const { data, error } = await supabase.from("modules").select("*");

    if (error) {
      console.error("Error fetching category:", error);
    } else {
      setModules(data);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchModules();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][field] = value;
    setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleAnswerChange = (qIndex, aIndex, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].answers[aIndex][field] = value;
    setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleSubmit = async () => {
    try {
      const { category, module, name, questions } = formData;

      // ✅ Validaciones antes de enviar
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
            `La pregunta ${
              qIndex + 1
            } no tiene ninguna respuesta marcada como correcta.`
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

      console.log("Categoria: " + category);
      console.log("Modulo: " + module);
      console.log("Nombre quiz: " + name);

      // 1. Obtener category_id
      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("id")
        .eq("id", category)
        .single();

      if (categoryError || !categoryData)
        throw new Error("Categoría no encontrada.");

      // 2. Obtener module_id
      const { data: moduleData, error: moduleError } = await supabase
        .from("modules")
        .select("id")
        .eq("id", module)
        .eq("category_id", categoryData.id)
        .single();

      if (moduleError || !moduleData) throw new Error("Módulo no encontrado.");

      // 3. Insertar quiz
      const { data: quizData, error: quizError } = await supabase
        .from("quizzes")
        .insert([{ name: name, module_id: moduleData.id }])
        .select("id")
        .single();

      if (quizError || !quizData) throw new Error("Error al crear el quiz.");

      if (quizError || !quizData) throw new Error("Quiz no encontrado.");

      // 4. Insertar cada pregunta con sus respuestas
      for (const q of questions) {
        const { data: questionData, error: questionError } = await supabase
          .from("questions")
          .insert({
            question_content: q.question,
            quiz_id: quizData.id,
          })
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
        if (answersError)
          throw new Error("Error al guardar respuestas de una pregunta.");
      }

      alert("Quiz completo guardado exitosamente.");
      // Limpiar formulario
      setFormData({
        category: "",
        module: "",
        name: "",
        questions: Array(5)
          .fill()
          .map(() => ({
            question: "",
            questionType: "",
            answers: [
              { text: "", is_correct: false },
              { text: "", is_correct: false },
              { text: "", is_correct: false },
              { text: "", is_correct: false },
            ],
          })),
      });
    } catch (error) {
      console.error(error);
      alert(`Ocurrió un error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col h-max-full bg-purple-100 p-8 text-gray-600">
      <div className="flex flex-col gap-10 max-w-full w-full h-full">
        <h2 className="text-xl font-semibold text-gray-600">Crear Quizz</h2>
        <div className="flex justify-between">
          <p>Categoría</p>
          <select name="category" onChange={handleChange}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between">
          <p>Módulo</p>
          <select name="module" onChange={handleChange}>
            {modules.map((module) => (
              <option key={module.id} value={module.id}>
                {module.module_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between">
          <p>Nombre:</p>
          <input
            name="name"
            type="text"
            placeholder="Nombre del quiz"
            className="rounded-md p-1 w-2/3 text-gray-900 placeholder:text-gray-400 bg-white"
            onChange={handleChange}
          />
        </div>

        <h3 className="mt-4 font-semibold">Respuestas</h3>
        {formData.questions.map((q, qIndex) => (
          <div key={qIndex}>
            <p className="font-semibold">Pregunta {qIndex + 1}</p>
            <input
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(qIndex, "question", e.target.value)
              }
              placeholder={`Escribe la pregunta ${qIndex + 1}`}
              className="rounded-md p-1 w-full text-gray-900 placeholder:text-gray-400 bg-white mb-4"
            />
            {q.answers.map((answer, aIndex) => (
              <div
                key={aIndex}
                className="flex justify-between items-center gap-2 mt-2"
              >
                <input
                  value={answer.text}
                  onChange={(e) =>
                    handleAnswerChange(qIndex, aIndex, "text", e.target.value)
                  }
                  placeholder={`Respuesta ${aIndex + 1}`}
                  className="rounded-md p-1 w-full text-gray-900 placeholder:text-gray-400 bg-white"
                />
                <input
                  type="checkbox"
                  checked={answer.is_correct}
                  onChange={(e) =>
                    handleAnswerChange(
                      qIndex,
                      aIndex,
                      "is_correct",
                      e.target.checked
                    )
                  }
                />
              </div>
            ))}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-purple-600 text-white rounded-md py-2 hover:bg-purple-700"
        >
          Guardar Quiz
        </button>
      </div>
    </div>
  );
}

//hacer que se puedan agregar preguntas

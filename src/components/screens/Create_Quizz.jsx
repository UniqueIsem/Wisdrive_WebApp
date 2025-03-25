import { useState } from "react";
import { supabase } from "../../supabase/client";

export function Create_Quizz() {
  const [formData, setFormData] = useState({
    category: "",
    module: "",
    name: "",
    question: "",
    questionType: "",
    answers: [
      { text: "", is_correct: false },
      { text: "", is_correct: false },
      { text: "", is_correct: false },
      { text: "", is_correct: false },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnswerChange = (index, field, value) => {
    const newAnswers = [...formData.answers];
    newAnswers[index][field] = value;
    setFormData((prev) => ({ ...prev, answers: newAnswers }));
  };

  const handleSubmit = async () => {
    try {
      const { category, module, name, question, questionType, answers } = formData;
      console.log("Categoria: " + category);
      console.log("Modulo: " + module);
      console.log("Nombre quiz: " + name);
      console.log("Pregunta: " + question);
      console.log("Tipo: " + questionType);
      console.log("Respuestas: " + answers);
      
  
      // 1. Obtener category_id
      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("id")
        .eq("id", category)
        .single();
  
      if (categoryError || !categoryData) throw new Error("Categoría no encontrada.");
  
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
        .insert({ name, module_id: moduleData.id })
        .select("id")
        .single();
  
      if (quizError || !quizData) throw new Error("Error al crear el quiz.");
  
      // 4. Insertar pregunta
      const { data: questionData, error: questionError } = await supabase
        .from("questions")
        .insert({
          question_content: question,
          question_type: questionType,
          quiz_id: quizData.id,
        })
        .select("id")
        .single();
  
      if (questionError || !questionData) throw new Error("Error al crear la pregunta.");
  
      // 5. Insertar respuestas
      const answersToInsert = answers.map((ans) => ({
        content: ans.text,
        is_correct: ans.is_correct,
        question_id: questionData.id,
      }));
  
      const { error: answersError } = await supabase
        .from("answers")
        .insert(answersToInsert);
  
      if (answersError) throw new Error("Error al guardar las respuestas.");
  
      alert("Quiz guardado exitosamente.");
      // Puedes limpiar el formulario aquí si deseas
  
    } catch (error) {
      console.error(error);
      alert(`Ocurrió un error: ${error.message}`);
    }
  };
  

  return (
    <div className="flex flex-col h-max-full bg-purple-100 p-8 text-gray-600">
      <div className="flex flex-col gap-10 max-w-full w-full h-full">
        <h2 className="text-xl font-semibold text-gray-600">Crear Pregunta</h2>
        <div className="flex justify-between">
            <p>Categoría</p>
            <select name="category" onChange={handleChange}>
            <option value="1">Mecánica Básica</option>
            <option value="2">Reglamentos de tránsito</option>
            <option value="3">Cultura Vial</option>
            </select>
        </div>
        
        <div className="flex justify-between">
        <p>Módulo</p>
            <select name="module" onChange={handleChange}>
            <option value="1">Introduccion</option>
            <option value="4">Intermedio</option>
            <option value="5">Avanzado</option>
            </select>
        </div>

        <div className="flex justify-between">
            <p>Nombre:</p>
            <input 
              name="name"
              type="text" 
              placeholder="Nombre del quiz" 
              className="rounded-md p-1 w-2/3 text-gray-900 placeholder:text-gray-400 bg-white" 
              onChange={handleChange} />
        </div>
        
        <div className="flex justify-between">
            <p>Pregunta</p>
            <input 
              type="text" 
              name="question" 
              placeholder="Escriba la pregunta" 
              className="rounded-md p-1 w-2/3 text-gray-900 placeholder:text-gray-400 bg-white" 
              onChange={handleChange} />
        </div>
        

        <div className="flex justify-between">
        <p>Tipo de Pregunta</p>
        <select name="questionType" onChange={handleChange}>
          <option value="options">Opción múltiple</option>
          <option value="true_false">Verdadero/Falso</option>
        </select>
        </div>
        
       

        <h3 className="mt-4 font-semibold">Respuestas</h3>
        {formData.answers.map((answer, index) => (
          <div key={index} className="flex justify-between items-center gap-2 mt-2 ">
            <input
              value={answer.text}
              onChange={(e) => handleAnswerChange(index, "text", e.target.value)}
              placeholder={`Respuesta ${index + 1}`}
              className="rounded-md p-1 w-full text-gray-900 placeholder:text-gray-400 bg-white"
            />
            <input type="checkbox"
              checked={answer.is_correct}
              onChange={(e) => handleAnswerChange(index, "is_correct", e.target.checked)}
            />
          </div>
        ))}

        <button 
          onClick={handleSubmit} 
          className="mt-4 w-full bg-purple-600 text-white rounded-md py-2 hover:bg-purple-700">
          Guardar Pregunta
        </button>
      </div>
    </div>
  );
}

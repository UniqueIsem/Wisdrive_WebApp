import { useState } from "react";


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

  return (
    <div className="flex flex-col h-full bg-purple-800 p-8">
      <div className="flex flex-col gap-10 max-w-full w-full h-full">
        <h2 className="text-xl font-semibold mb-4">Crear Pregunta</h2>
        <div className="flex justify-between">
            <p>Categoría</p>
            <select name="category" onChange={handleChange}>
            <option value="mecanica">Mecánica Básica</option>
            <option value="reglamentos">Reglamentos de tránsito</option>
            <option value="cultura">Cultura Vial</option>
            </select>
        </div>
        
        <div className="flex justify-between">
        <p>Módulo</p>
            <select name="module" onChange={handleChange}>
            <option value="introduction">Introduccion</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
            </select>
        </div>

        <div className="flex justify-between">
            <p>Nombre</p>
            <input type="text" onChange={handleChange} />
        </div>
        
        <div className="flex justify-between">
            <p>Pregunta</p>
            <input type="text" name="question" onChange={handleChange} />
        </div>
        

        <div className="flex justify-between">
        <p>Tipo de Pregunta</p>
        <select name="questionType" onChange={handleChange}>
          <option value="multiple">Opción múltiple</option>
          <option value="true_false">Abierta</option>
        </select>
        </div>
        
       

        <h3 className="mt-4 font-semibold">Respuestas</h3>
        {formData.answers.map((answer, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <input
              value={answer.text}
              onChange={(e) => handleAnswerChange(index, "text", e.target.value)}
              placeholder={`Respuesta ${index + 1}`}
            />
            <input type="checkbox"
              checked={answer.is_correct}
              onCheckedChange={(value) => handleAnswerChange(index, "is_correct", value)}
            />
          </div>
        ))}

        <button className="mt-4 w-full">Guardar Pregunta</button>
      </div>
    </div>
  );
}

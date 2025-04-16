import { useLocation } from "react-router-dom";
import { EditableInput } from "../ui/EditableInput";

export function Upload_Generated() {
  const location = useLocation();
  const quizData = location.state?.quizData || null;

  return (
    <div className="bg-purple-100 p-6 text-gray-700">
    <div className="bg-white rounded-lg p-6">
      <h1 className="text-xl font-semibold text-purple-700 ">Vista Previa del Quiz</h1>
      {quizData ? (
        <div>
          <h2 className="text-lg font-semibold">Categoría: {quizData.category}</h2>
          {quizData.quiz.map((q, index) => (
            <div key={index} className="border-dashed border-2 border-gray-200 p-4 my-2 rounded-md">
              <p>Pregunta:</p>
              <EditableInput 
                initialText={q.question}
                name="question" 
                />
              <p>Respuestas: </p>
              <EditableInput 
                initialText={q.correct_answer}
                name="answer1"
                classname="bg-green-50"
                />
              {q.incorrect_answers.map((ans, i) => (
                <EditableInput 
                initialText={ans}
                name="answer2" 
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No se recibió ningún quiz.</p>
      )}
    </div>
    </div>
  );
};
import { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function GeneratorTest() {
  const [question, setQuestion] = useState('¿Puedes hacer 10 preguntas que sean importantes para los usuarios conductores sobre este PDF? Dame, la respuesta correcta y dos respuestas incorrectas para crear un quiz. Luego, revisa si el archivo trata sobre "Mecánica Básica", "Cultura Vial" o "Reglamentos de tránsito", que sera su categoria. Damelo todo en formato json con la siguiente estructura (sin texto adicional, solo el json).{    "category":"",    "quiz": [        {            "question": "",            "correct_answer": "",            "incorrect_answers":[                "",                ""            ]        },        {            "question": "",            "correct_answer": "",            "incorrect_answers":[                "",                ""            ]        },        {            "question": "",            "correct_answer": "",            "incorrect_answers":[                "",                ""            ]        }    ]}');
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonQuiz, setJson] = useState ("");
  const navigate = useNavigate();
  //
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);


  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    console.log(event.target.files[0]);
    console.log(uploadedFile.name);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Selecciona un archivo PDF.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file); // Agregar archivo al FormData

    try {
      const response = await axios.post(
        "https://api.chatpdf.com/sources/add-file",
        formData,
        {
          headers: {
            "x-api-key": "sec_SYWXGflHXkbdC7ymzwwJfv0QND2kLWXd", 
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSourceId(response.data.sourceId);
    } catch (error) {
      console.error("Error al subir el PDF:", error);
      setError("Hubo un problema al subir el PDF.");
    } finally {
      setLoading(false);
    }
  };


  // Cargar JSON desde /public/quizData.json para las pruebas
  const loadJsonFromFile = async () => {
    try {
      const response = await fetch("/quizData.json"); // Carga el archivo JSON
      const data = await response.json();
      setJson(data);
      navigate("/generator-test/quiz-preview", { state: { quizData: data } }); // Navega con los datos
    } catch (error) {
      console.error("Error cargando el archivo JSON:", error);
    }
  };
  //
  const handleAsk = async () => {
    setLoading(true);
    setAnswer("");

    try {
      const response = await axios.post(
        "https://api.chatpdf.com/v1/chats/message",
        {
          sourceId: "cha_KsqWbGGaPwa7kGgJHnY9C", 
          messages: [
            {
              role: "user",
              content: question,
            },
          ],
        },
        {
          headers: {
            "x-api-key": "sec_SYWXGflHXkbdC7ymzwwJfv0QND2kLWXd", 
            "Content-Type": "application/json",
          },
        }
      );

      const message = response.data.content;
      //
      // Extraer JSON
      setJson(message.split("```json")[1].split("```")[0].trim());
      console.log(jsonQuiz);
      
      //

      setAnswer(message);
    } catch (error) {
      console.error("Error al hacer la pregunta:", error);
      setAnswer("Error al obtener la respuesta.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="flex bg-purple-100 p-6 h-full h-max-full w-full mx-auto space-x-4">
    {/*Subir archivo*/}
    <div className="bg-white p-4 rounded-lg shadow w-1/3">
      <h1 className="text-xl font-semibold text-purple-700">Sube un archivo PDF</h1>
      <div className="border-dashed border-2 border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center text-gray-600 mt-4 mb-4">
        <div size={15} />
          <input type="file" className="mt-2" onChange={handleFileUpload} />
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-semibold">Archivo a analizar:</p>
        {file ? (
            <p className="bg-gray-200 p-2 rounded-lg mt-2">{file.name}</p>
          ) : (
            <p className="text-gray-500">No hay archivos cargados.</p>
          )}
      </div>
      <Button onClick={handleUpload}>Subir</Button>
    </div>

    {/*Generar quiz*/}
    <div className="w-2/3 mx-auto mt- p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-purple-700">Generar quiz con PDF</h2>
      <Button onClick={handleAsk} className="bg-purple-700 text-white hover:bg-purple-800">
        {loading ? "Generando..." : "Generar"}
      </Button>
      {answer && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap text-gray-800">
          {answer}
        </div>
      )}
      {/*onClick={() => navigate("/generator-test/quiz-preview", { state: { quizData: jsonQuiz } })}*/}
       
      <button onClick={loadJsonFromFile}
        className="bg-blue-500 text-white p-2 rounded-md"
        >
        Revisar
      </button>
    </div>
   </div>
  );
}

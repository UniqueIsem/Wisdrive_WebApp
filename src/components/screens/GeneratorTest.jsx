import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../../supabase/client";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EditableInput } from "../ui/EditableInput";

export function GeneratorTest() {
  const [question, setQuestion] = useState(
    '¿Puedes hacer 5 preguntas que sean importantes para los usuarios conductores sobre este PDF? Dame 1 respuesta correcta y 3 incorrectas para cada pregunta, en formato de quiz. Luego, revisa si el contenido del archivo trata sobre "Mecánica Básica", "Cultura Vial" o "Reglamentos de tránsito", y asígnale el nombre adecuado a la categoría. Agrega también un nombre representativo al quiz según su contenido. Devuélvelo todo en formato JSON (sin ningún texto adicional) con esta estructura: {  "category": "",  "module": "",  "name": "",  "questions": [    {      "question": "",      "answers": [        { "text": "", "is_correct": true },        { "text": "", "is_correct": false },        { "text": "", "is_correct": false },        { "text": "", "is_correct": false }      ]    }  ]} '
  );
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonQuiz, setJsonQuiz] = useState({});
  const navigate = useNavigate();
  //
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [sourceId, setSourceId] = useState(null);
  const [consultSourceId, setConsultSourceId] = useState(null);
  const [files, setFiles] = useState([]);
  //
  const [pdfUrl, setPdfUrl] = useState(null);
  const [extraPrompt, setExtraPrompt] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const { data, error } = await supabase.from("files").select("*");

    if (error) {
      console.error("Error fetching files:", error);
    } else {
      setFiles(data);
    }
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    console.log(event.target.files[0]);
    console.log(uploadedFile.name);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Selecciona un archivo primero.");
      return;
    }

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;
    try {
      const { data, error } = await supabase.storage
        .from("pdfs")
        .upload(filePath, file, {
          contentType: "application/pdf",
          upsert: false,
        });

      if (error) {
        setMessage(`Error al subir: ${error.message}`);
        setUploading(false);
        return;
      }

      // Obtener la URL pública
      const { data: publicUrlData } = supabase.storage
        .from("pdfs")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData?.publicUrl;
      setMessage(`Archivo subido correctamente: ${publicUrl}`);

      // Enviar a ChatPDF con Axios
      const chatpdfResponse = await axios.post(
        "https://api.chatpdf.com/v1/sources/add-url",
        { url: publicUrl },
        {
          headers: {
            "x-api-key": "sec_SYWXGflHXkbdC7ymzwwJfv0QND2kLWXd",
            "Content-Type": "application/json",
          },
        }
      );

      const sourceIdFromAPI = chatpdfResponse.data.sourceId;
      setSourceId(sourceIdFromAPI);
      console.log(sourceId);

      // 3. Insertar file en db
      const { data: fileData, error: fileError } = await supabase
        .from("files")
        .insert([
          {
            file_name: fileName,
            file_route: publicUrl,
            category_id: 2,
            sourceId: sourceId,
          },
        ])
        .select();

      if (fileError || !fileData)
        throw new Error("Error al registrar el file en la base de datos.");

      alert("Archivo agregado exitosamente");
      useEffect();
      setMessage(`Archivo procesado por ChatPDF. Source ID: ${sourceId}`);
    } catch (error) {
      console.error("Error:", error);
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }

    setUploading(false);
  };

  // Cargar JSON desde /public/quizData.json para las pruebas
  const loadJsonFromFile = async () => {
    try {
      // const response = await fetch("/quizData.json"); // Carga el archivo JSON
      //const data = await response.json();
      //setJsonQuiz(data);
      navigate("/generator-test/quiz-preview", {
        state: { quizData: jsonQuiz },
      }); // Navega con los datos
    } catch (error) {
      console.error("Error cargando el archivo JSON:", error);
    }
  };
  //
  const handleAsk = async () => {
    if (!consultSourceId) {
      setAnswer("Primero selecciona un archivo con sourceId.");
      return;
    }

    setLoading(true);
    setAnswer("");

    const promptToSend = `${question}\n${extraPrompt}`;

    try {
      const response = await axios.post(
        "https://api.chatpdf.com/v1/chats/message",
        {
          sourceId: consultSourceId,
          messages: [
            {
              role: "user",
              content: promptToSend,
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
      const parsed = JSON.parse(
        message.split("```json")[1].split("```")[0].trim()
      );
      setJsonQuiz(parsed);
      console.log(typeof parsed);
      console.log(parsed);
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
    <div className="flex bg-purple-100 p-6 w-full mx-auto space-x-4 min-h-screen">
      {/*Subir archivo*/}
      <div className="bg-white p-4 rounded-lg shadow w-1/3">
        <h1 className="text-xl font-semibold text-purple-700 mb-3">
          Elige un archivo existente
        </h1>
        <div className="mb-10">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-white w-full p-4 mb-4 rounded-lg shadow cursor-pointer hover:bg-purple-100"
              onClick={() => {
                setConsultSourceId(file.sourceId);
                setPdfUrl(file.file_route);
              }}
            >
              <p className="text-gray-700">{file.file_name}</p>
              {file.source_id && (
                <p className="text-sm text-purple-600">
                  Source ID: {file.source_id}
                </p>
              )}
            </div>
          ))}
        </div>

        <h1 className="text-xl font-semibold text-purple-700">
          Sube un archivo PDF
        </h1>
        <div className="border-dashed border-2 border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center text-gray-600 mt-4 mb-4">
          <div size={15} />
          <input type="file" className="mt-2" onChange={handleFileUpload} />
        </div>
        <div className="mt-4 mb-4">
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
      <div className="w-2/3 min-h-screen p-6 bg-white rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-purple-700">
          Generar quiz con PDF
        </h2>
        <iframe
          allowFullScreen
          src={pdfUrl}
          height="75%"
          width="100%"
          title="Iframe Example"
          className="mb-7"
        ></iframe>
        <div className="border-dashed border-2 border-gray-200 p-4 my-2 rounded-md">
          <p className="text-gray-500">
            Se generará un quizz de 5 preguntas de opción múltiple.
          </p>
          <input
            className="text-gray-500 w-100 rounded-md bg-purple-100 m-2"
            type="text"
            placeholder="Agrega instrucciones adicionales"
            value={extraPrompt}
            onChange={(e) => setExtraPrompt(e.target.value)}
          ></input>
          <Button
            onClick={handleAsk}
            className="bg-purple-700 text-white hover:bg-purple-800"
          >
            {loading ? "Generando..." : "Generar"}
          </Button>
        </div>

        {answer && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap text-gray-800">
            {answer}
          </div>
        )}
        {/*onClick={() => navigate("/generator-test/quiz-preview", { state: { quizData: jsonQuiz } })}*/}

        {jsonQuiz?.questions?.length > 0 && (
          <button
            onClick={loadJsonFromFile}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Revisar
          </button>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Card } from "../ui/card";
import { CardContent } from "../ui/cardContent";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Upload, Send } from "lucide-react";

export function QuizGenerator() {
  const [files, setFiles] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    "Aquí te presento algunas sugerencias para las preguntas...",
    "1. ¿Qué tienen prohibido todos los sujetos de la movilidad según el Artículo 39?\n a) Usar casco al conducir motocicletas.\n b) Utilizar dispositivos que causen distracción.\n c) Circular en carriles exclusivos para transporte público.\n d) Estacionarse en bahías.",
  ]);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-purple-100 min-h-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Generar quiz con Chat PDF
      </h1>
      <div className="flex gap-10 w-full max-w-full ">
        {/* Panel de archivos */}
        <Card className="flex-1 p-4 bg-white shadow-lg rounded-2xl justify-center">
          <div className="border-dashed border-2 border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center text-gray-600 mb-4">
            <Upload size={32} />
            <p className="mt-2">Arrastra aquí tus archivos</p>
            <Input type="file" multiple className="mt-2" onChange={handleFileUpload} />
          </div>
          <Button className="w-full bg-purple-700 text-white hover:bg-purple-800">
            Buscar
          </Button>
          <div className="mt-4">
            <p className="text-gray-700 font-semibold">Archivos a analizar:</p>
            {files.length > 0 ? (
              files.map((file, index) => (
                <p key={index} className="bg-gray-200 p-2 rounded-lg mt-2">
                  {file.name}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No hay archivos cargados.</p>
            )}
          </div>
        </Card>

        {/* Panel de Chat */}
        <Card className="flex-1 p-4 bg-white shadow-lg rounded-2xl flex flex-col">
          <CardContent className="flex-1 overflow-y-auto max-h-80 p-2 space-y-4">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className=" bg-gray-200 p-3 mb-2 rounded-lg text-gray-800"
              >
                {message}
              </div>
            ))}
          </CardContent>
          <div className="mt-4 flex items-center gap-2 p-4">
            <Input classname="flex-1" placeholder="Escribe un mensaje..." />
            <Button className="bg-purple-700 text-white hover:bg-purple-800">
              <Send size={20} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

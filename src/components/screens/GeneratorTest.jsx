import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";

export function GeneratorTest() {
  const [question, setQuestion] = useState("¿Puedes hacer 10 preguntas que sean importantes para los usuarios conductores sobre este PDF?");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

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
      setAnswer(message);
    } catch (error) {
      console.error("Error al hacer la pregunta:", error);
      setAnswer("Error al obtener la respuesta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-purple-100 p-6 rounded-lg h-full h-max-full w-full mx-auto">
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-purple-700">Preguntar a un PDF en ChatPDF</h2>
      <Input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Escribe tu pregunta..."
      />
      <Button onClick={handleAsk} className="bg-purple-700 text-white hover:bg-purple-800">
        {loading ? "Preguntando..." : "Enviar pregunta"}
      </Button>
      {answer && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap text-gray-800">
          {answer}
        </div>
      )}
    </div>
    </div>
  );
}

import { useState } from "react";
import { supabase } from "../../supabase/client";

export function New_Link() {
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("mechanical_resources")
      .insert([{ name: linkName, url_path: linkUrl }]);

    if (error) {
      setMessage({ type: "error", text: "Error al insertar link." });
      console.error(error);
    } else {
      setMessage({ type: "success", text: "Recurso agregado con éxito." });
      setLinkName("");
      setLinkUrl("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-purple-100 rounded-lg h-full w-full text-gray-800"
    >
      <h2 className="text-xl font-bold">Agrega un nuevo recurso:</h2>

      <div className="flex flex-col">
        <h3 className="text-lg font-semibold mt-4">Nombre:</h3>
        <input
          value={linkName}
          onChange={(e) => setLinkName(e.target.value)}
          className="rounded-md p-2 bg-white text-gray-800"
          required
        />
      </div>

      <div className="flex flex-col">
        <h3 className="text-lg font-semibold mt-4">Link:</h3>
        <input
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          className="rounded-md p-2 bg-white text-gray-800"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 mt-4"
      >
        Agregar
      </button>

      {message && (
        <p
          className={`mt-2 text-sm ${
            message.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
}

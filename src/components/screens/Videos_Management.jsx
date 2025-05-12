import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export function Videos_Management() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("mechanical_resources")
      .select("*");

    if (error) {
      console.error("Error fetching videos:", error);
    } else {
      setVideos(data);
    }
  };

  const handleDeleteLink = async (linkId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este link? Esta acción no se puede deshacer."
    );

    if (!confirmDelete) return; //usuario cancela

    try {
      //borrar el link
      const { error: deleteLinkError } = await supabase
        .from("mechanical_resources")
        .delete()
        .eq("id", linkId);

      if (deleteLinkError) throw new Error("Error al eliminar link.");

      alert("Link eliminado exitosamente!");
      fetchVideos();
    } catch (error) {
      console.error(error);
      alert(`Error al eliminar link: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-purple-100 p-8 ">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Recursos del módulo Mecánica
      </h1>
      <div className="max-w-full w-full h-full justify-between items-center">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white w-full p-4 mb-4 rounded-lg shadow flex gap-2"
          >
            <p className="text-gray-700">{video.name}</p>
            <a
              href={video.url_path}
              className="text-gray-700 mt-10 text-center"
            >
              {video.url_path}
            </a>
            <button
              className="cursor-pointer"
              onClick={() => handleDeleteLink(video.id)}
            >
              <Trash2 color="#5e0080" />
            </button>
          </div>
        ))}
      </div>
      <Button onClick={() => navigate("/new_link")}>Nuevo</Button>
    </div>
  );
}

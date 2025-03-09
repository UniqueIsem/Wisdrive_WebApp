import React from 'react';

export function Tables () {
  const categories = [
    { title: "Introducción", image: "src/assets/reglamento.jpg" },
    { title: "Intermedio", image: "src/assets/mecanica.jpg" },
    { title: "Avanzado", image: "src/assets/cultura.jpeg" }
  ];

  return (
    <div className="flex flex-col h-full bg-purple-100 p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Navega por el contenido de la app
      </h1>
      <p className="text-gray-800 mb-8">
        Categoría actual:
      </p>
      <p className="text-gray-800 mb-8">
        Selecciona un módulo:
      </p>
      <div className="max-w-full w-full h-full">
        {categories.map((category, index) => (
          <div key={index} className="bg-white w-full p-4 mb-4 rounded-lg shadow">
            <p className="text-gray-700 mt-10 text-center">{category.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

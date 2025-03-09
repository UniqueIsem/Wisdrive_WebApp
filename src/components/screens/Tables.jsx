import React from 'react';

export function Tables() {
  const categories = [
    { title: "Reglamento de tránsito", image: "src/assets/reglamento.jpg" },
    { title: "Mecánica Básica", image: "src/assets/mecanica.jpg" },
    { title: "Cultura Vial", image: "src/assets/cultura.jpeg" }
  ];

  return (
    <div className="flex flex-col h-full bg-purple-100 p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Navega por el contenido de la app
      </h1>
      <p className="text-gray-800 mb-8">
        Selecciona una categoría:
      </p>
      <div className="flex gap-10 max-w-full w-full h-full">
        {categories.map((category, index) => (
          <div key={index} className="bg-white w-1/3 p-4 rounded-lg shadow justify-items-center content-center">
            <img src={category.image} alt={category.title} className="w-full h-auto" />
            <p className="text-gray-400 mt-10 text-center">{category.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

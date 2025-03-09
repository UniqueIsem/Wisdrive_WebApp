import React from 'react';

export const Restfull = () => {
  const quizzes = [
    "¿Sabes cambiar una llanta?",
    "Peatones y ciclistas: Seguridad primero",
    "Riesgos en la carretera: ¿Qué harías en estos casos?",
    "Señales de tránsito: ¿Las reconoces todas?",
    "¿Cuánto sabes sobre tu vehículo?",
    "Diagnóstico rápido: ¿Puedes identificar estos problemas?",
    "Primeros auxilios en accidentes viales",
    "Evita multas y accidentes",
  ];

  return (
    <div className="bg-purple-100 p-6 rounded-lg max-w-full mx-auto">
      <h2 className="text-lg font-semibold text-gray-800">
        Navega por el contenido de la app
      </h2>
      <p className="text-gray-600">Categoría: Reglamentos de tránsito</p>
      <p className="text-gray-600 mb-4">Módulo: 2</p>
      <div className="border border-purple-300 rounded-lg overflow-hidden">
        <div className="gradient-bg text-gray-800 font-semibold p-3">
          Todos los quizzes
        </div>
        {quizzes.map((quiz, index) => (
          <div
            key={index}
            className="p-3 border-b border-purple-200 bg-purple-400 hover:bg-gray-600 cursor-pointer"
          >
            {quiz}
          </div>
        ))}
      </div>
    </div>
  )
};
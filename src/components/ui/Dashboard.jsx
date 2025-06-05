import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Ene", value: 30, extra: 20 },
  { name: "Feb", value: 45, extra: 35 },
  { name: "Mar", value: 60, extra: 50 },
  { name: "Abr", value: 20, extra: 40 },
  { name: "May", value: 75, extra: 60 },
];

const pieData = [
  { name: "Reglamento", value: 40 },
  { name: "Cultura Vial", value: 25 },
  { name: "Mecánica", value: 35 },
];

const COLORS = ["#5e0080", "#00bcd4", "#ff9800"];

export default function Dashboard() {
  return (
    <div className="h-max-full bg-purple-100 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Gráfica de líneas */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Progreso Mensual
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#5e0080"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfica de barras */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Módulos Completados
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="extra" fill="#00bcd4" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfica de pastel */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Distribución por Categoría
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfica de área */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Actividad por Mes
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#ff9800"
              fill="#ffe0b2"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import TrackBadge from "../ui/TrackBadge";
import { TRACK_COLORS, TRACK_ICONS } from "../../constants/tracks";
import type { Track } from "../../services/api";

const TracksDemo = () => {
  const tracks: Track[] = [
    {
      _id: "1",
      name: "Ciberseguridad",
      description: "Especialización en seguridad informática",
      color: TRACK_COLORS.Ciberseguridad,
      icon: TRACK_ICONS.Ciberseguridad,
      isActive: true,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
      _id: "2",
      name: "Fullstack",
      description: "Desarrollo completo de aplicaciones web",
      color: TRACK_COLORS.Fullstack,
      icon: TRACK_ICONS.Fullstack,
      isActive: true,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
      _id: "3",
      name: "Robótica Lego",
      description: "Programación y construcción con LEGO Mindstorms",
      color: TRACK_COLORS["Robótica Lego"],
      icon: TRACK_ICONS["Robótica Lego"],
      isActive: true,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
      _id: "4",
      name: "IoT",
      description: "Internet de las Cosas y dispositivos conectados",
      color: TRACK_COLORS.IoT,
      icon: TRACK_ICONS.IoT,
      isActive: true,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
      _id: "5",
      name: "Cloud Computing",
      description: "Computación en la nube y servicios web",
      color: TRACK_COLORS["Cloud Computing"],
      icon: TRACK_ICONS["Cloud Computing"],
      isActive: true,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
      _id: "6",
      name: "Robótica Kondo",
      description: "Programación de robots Kondo",
      color: TRACK_COLORS["Robótica Kondo"],
      icon: TRACK_ICONS["Robótica Kondo"],
      isActive: true,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
      _id: "7",
      name: "Inteligencia Artificial Aplicada",
      description: "Machine Learning y algoritmos inteligentes",
      color: TRACK_COLORS["Inteligencia Artificial Aplicada"],
      icon: TRACK_ICONS["Inteligencia Artificial Aplicada"],
      isActive: true,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
      _id: "8",
      name: "Metaverso y Realidad Aumentada",
      description: "Desarrollo de experiencias inmersivas",
      color: TRACK_COLORS["Metaverso y Realidad Aumentada"],
      icon: TRACK_ICONS["Metaverso y Realidad Aumentada"],
      isActive: true,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Sistema de Tracks - CITT Learn
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Tracks Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map((track) => (
              <div
                key={track.name}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                <span className="text-2xl">{track.icon}</span>
                <div>
                  <p className="font-medium text-gray-900">{track.name}</p>
                  <TrackBadge track={track} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Ejemplo de Usuario</h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div>
              <p className="font-medium text-gray-900">Juan Pérez</p>
              <p className="text-gray-600">juan.perez@duocuc.cl</p>
              <div className="mt-2">
                <TrackBadge track={tracks[1]} size="md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TracksDemo;

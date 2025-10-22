import { useNavigate } from "react-router-dom";
import calendarIcon from "../../assets/icons/calendar.svg";
import { useAuth } from "../../hooks/useAuth";
import TrackBadge from "../ui/TrackBadge";

const UserInfo = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <section className="md:max-w-7xl md:mx-auto pt-15 pl-10 md:pl-30">
      <div className="">
        <p className="text-2xl font-bold">{user?.name}</p>
        <p className="text-lg text-gray-600">{user?.email}</p>

        {user?.track && (
          <div className="mt-3">
            <TrackBadge track={user.track} size="md" />
          </div>
        )}

        <div className="pt-1.5 mt-3">
          <p className="flex items-center gap-1.5 text-gray-500">
            <img className="w-5 h-5" src={calendarIcon} alt="Calendar" />
            Usuario desde {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
          </p>
        </div>
      </div>

      <button
        className="bg-primary text-white px-4 py-2 rounded-md mt-3 cursor-pointer hover:bg-blue-700 transition-colors"
        onClick={() => navigate("/profile")}
      >
        Editar Perfil
      </button>
    </section>
  );
};

export default UserInfo;

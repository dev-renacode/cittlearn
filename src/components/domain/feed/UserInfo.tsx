import { useNavigate } from "react-router-dom";
import calendarIcon from "../../../assets/icons/ui/calendar.svg";
import { useAuth } from "../../../hooks/useAuth";
import { TrackBadge } from "../../common/ui";

// Ícono de corona para admin
const CrownIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 24 24"
    className="mr-1"
  >
    <path d="M20.33 3.06a1 1 0 0 0-1.11.32L16 7.4l-3.22-4.02c-.38-.47-1.18-.47-1.56 0L8 7.4 4.78 3.38c-.27-.33-.71-.46-1.11-.32S3 3.58 3 4v15c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-.42-.27-.8-.67-.94M7.22 9.63c.38.47 1.18.47 1.56 0L12 5.61l3.22 4.02c.38.47 1.18.47 1.56 0L19 6.86v8.15H5V6.85l2.22 2.77ZM5 19.01v-2h14v2z"></path>
  </svg>
);

// Ícono de estrella para capitán
const CaptainIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 24 24"
    className="mr-1"
  >
    <path d="m4.83 12.49 2.04 1.83-.83 2.9-1 3.5c-.12.4.03.84.37 1.08.34.25.8.26 1.14.02l3-2L12 18.19l2.45 1.63 3 2a.988.988 0 0 0 1.14-.02c.34-.25.49-.68.37-1.08l-1-3.5-.83-2.9 2.04-1.83 2.5-2.25c.3-.27.41-.69.28-1.06-.13-.38-.47-.64-.87-.68l-3.15-.25-2.56-.2-2.47-5.46a.998.998 0 0 0-1.82 0L8.61 8.05l-2.56.2-3.15.25c-.4.03-.74.3-.87.68s-.02.8.28 1.06l2.5 2.25Zm1.39-2.25 2.52-.2.62-.05.59-.05.84-1.86 1.2-2.66 1.2 2.66.84 1.86.59.05.62.05 2.52.2.83.07-.77.69-2.5 2.25-.46.42.17.6 1.25 4.38-3.74-2.49-.55-.37-.55.37-3.74 2.49 1.25-4.38.17-.6-.46-.42L6.16 11l-.77-.69z"></path>
  </svg>
);

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

  // Generar badges de roles
  const getRoleBadges = () => {
    const badges = [];

    // Admin badge
    if (user?.role === "admin") {
      badges.push({
        text: "Admin",
        icon: <CrownIcon size={14} />,
        className: "bg-red-100 text-red-800 border-red-300",
      });
    }

    // Captain badge
    const hasCaptainOf =
      user?.captainOf &&
      ((typeof user.captainOf === "string" && user.captainOf.trim() !== "") ||
        (Array.isArray(user.captainOf) && user.captainOf.length > 0));

    if (user?.role === "captain" || hasCaptainOf) {
      badges.push({
        text: "Capitán",
        icon: <CaptainIcon size={14} />,
        className: "bg-blue-100 text-blue-800 border-blue-300",
      });
    }

    return badges;
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

        {/* Badges de Roles */}
        {getRoleBadges().length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              {getRoleBadges().map((badge, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badge.className}`}
                >
                  <span className="mr-1">
                    {typeof badge.icon === "string" ? badge.icon : badge.icon}
                  </span>
                  {badge.text}
                </span>
              ))}
            </div>
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

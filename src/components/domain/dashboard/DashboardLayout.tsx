import { useState } from "react";
import { Link, useLocation, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Avatar } from "../../common/ui";

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

// Íconos del sidebar
const HomeIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="white"
    viewBox="0 0 24 24"
  >
    <path d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.4 0 .77-.24.92-.62.15-.37.07-.8-.22-1.09l-8.99-9a.996.996 0 0 0-1.41 0l-9.01 9c-.29.29-.37.72-.22 1.09s.52.62.92.62Zm9-8.59 6 6V20H6v-9.59z"></path>
  </svg>
);

const UsersIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="white"
    viewBox="0 0 24 24"
  >
    <path d="m10,13h-2c-2.76,0-5,2.24-5,5v1c0,.55.45,1,1,1h10c.55,0,1-.45,1-1v-1c0-2.76-2.24-5-5-5Zm-5,5c0-1.65,1.35-3,3-3h2c1.65,0,3,1.35,3,3H5Z"></path>
    <path d="m12.73,6.51c-.08-.22-.19-.42-.3-.62,0,0,0,0,0-.01-.69-1.14-1.93-1.89-3.42-1.89-2.28,0-4,1.72-4,4s1.72,4,4,4c1.49,0,2.73-.74,3.42-1.89,0,0,0,0,0-.01.12-.2.22-.4.3-.62.02-.06.03-.12.05-.18.06-.17.11-.34.15-.52.05-.25.07-.51.07-.78s-.03-.53-.07-.78c-.03-.18-.09-.35-.15-.52-.02-.06-.03-.12-.05-.18Zm-3.73,3.49c-1.18,0-2-.82-2-2s.82-2,2-2,2,.82,2,2-.82,2-2,2Z"></path>
    <path d="m15,10c-.11,0-.22-.01-.33-.03-.22.66-.56,1.27-.98,1.81.41.13.84.22,1.31.22,2.28,0,4-1.72,4-4s-1.72-4-4-4c-.47,0-.9.09-1.31.22.43.53.76,1.14.98,1.81.11-.01.21-.03.33-.03,1.18,0,2,.82,2,2s-.82,2-2,2Z"></path>
    <path d="m16,13h-1.11c.6.58,1.08,1.27,1.44,2.03,1.5.17,2.67,1.43,2.67,2.97h-2v1c0,.35-.07.69-.18,1h3.18c.55,0,1-.45,1-1v-1c0-2.76-2.24-5-5-5Z"></path>
  </svg>
);

const PostsIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="white"
    viewBox="0 0 24 24"
  >
    <path d="M5 7h5v6H5zM5 15h10v2H5zM12 11h3v2h-3zM12 7h3v2h-3z"></path>
    <path d="M21 18c0 .55-.45 1-1 1s-1-.45-1-1V5c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v13c0 1.65 1.35 3 3 3h16c1.65 0 3-1.35 3-3V6h-2zM4 19c-.55 0-1-.45-1-1V5h14v13c0 .35.07.69.18 1z"></path>
  </svg>
);

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Chequear permisos de acceso
  const hasCaptainOf =
    user?.captainOf &&
    ((typeof user.captainOf === "string" && user.captainOf.trim() !== "") ||
      (Array.isArray(user.captainOf) && user.captainOf.length > 0));

  const hasAccess =
    user?.role === "admin" || user?.role === "captain" || hasCaptainOf;

  if (!hasAccess) {
    return <Navigate to="/feed" replace />;
  }

  const isAdmin = user?.role === "admin";
  const isCapitan = user?.role === "captain" || hasCaptainOf;

  const navigationItems = [
    {
      name: "Inicio",
      path: "/dashboard",
      icon: <HomeIcon size={20} />,
      exact: true,
    },
    {
      name: "Usuarios",
      path: "/dashboard/usuarios",
      icon: <UsersIcon size={20} />,
    },
    {
      name: "Posts",
      path: "/dashboard/posts",
      icon: <PostsIcon size={20} />,
    },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-gray-100 transition-all duration-300 flex flex-col fixed h-full z-30`}
      >
        {/* Logo y Toggle */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {isSidebarOpen && (
            <Link to="/" className="text-xl font-bold text-white">
              CITT Learn
            </Link>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isSidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path, item.exact)
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isSidebarOpen && (
                <span className="font-medium">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Info Footer */}
        <div className="p-4 border-t border-gray-800">
          <Link
            to="/feed"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Avatar
              src={user?.avatar}
              fallback={user?.name || ""}
              size="md"
              alt={user?.name || "Usuario"}
            />
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">
                  {user?.name}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  @{user?.email?.split("@")[0]}
                </p>
                <div className="mt-1">
                  {isAdmin && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-300">
                      <CrownIcon size={12} />
                      Admin
                    </span>
                  )}
                  {isCapitan && !isAdmin && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">
                      <CaptainIcon size={12} />
                      Capitán
                    </span>
                  )}
                </div>
              </div>
            )}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } transition-all duration-300`}
      >
        {/* Navbar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isAdmin
                  ? "Dashboard de Administración"
                  : "Dashboard de Capitán"}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {isAdmin
                  ? "Gestiona usuarios y contenido del sistema"
                  : "Gestiona los usuarios de tu track"}
              </p>
            </div>

            {/* User Dropdown */}
            <div className="flex items-center space-x-4">
              {/* Notifications (placeholder) */}
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <Avatar
                  src={user?.avatar}
                  fallback={user?.name || ""}
                  size="sm"
                  alt={user?.name || "Usuario"}
                />
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {isAdmin ? "Administrador" : "Capitán"}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Cerrar sesión"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

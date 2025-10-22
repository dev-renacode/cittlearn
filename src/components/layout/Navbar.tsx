import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAvatarUpdate } from "../../hooks/useAvatarUpdate";
import Avatar from "../ui/Avatar";
import barsIcon from "../../assets/icons/barsIcon.svg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [avatarRefreshKey, setAvatarRefreshKey] = useState(0);
  const { isAuthenticated, user, logout } = useAuth();
  const { avatarKey } = useAvatarUpdate();
  const location = useLocation();

  // Detectar si estamos en la página de perfil o feed
  const isProfilePage = location.pathname === "/profile";
  const isFeedPage = location.pathname.startsWith("/feed");

  useEffect(() => {
    // Solo aplicar efecto de scroll si NO estamos en la página de perfil
    if (isProfilePage || isFeedPage) {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isProfilePage, isFeedPage]);

  // Escuchar cambios en el avatar del usuario
  useEffect(() => {
    setAvatarRefreshKey((prev) => prev + 1);
  }, [user?.avatar]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeMenu();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <header
        className={`flex fixed w-full justify-between items-center p-4 md:px-0 z-20 transition-all duration-100 ${
          isProfilePage || isFeedPage
            ? "bg-tertiary"
            : isScrolled
            ? "bg-tertiary"
            : "bg-transparent"
        }`}
      >
        <div className="flex justify-between w-full md:max-w-7xl md:mx-auto">
          <section className="flex items-center gap-13">
            <div>
              <Link to="/" className="text-white text-2xl font-bold">
                CITT Learn
              </Link>
            </div>

            <nav className="hidden md:flex items-center pt-1.5">
              <ul className="flex gap-7 text-white">
                <li>
                  <Link to="/">Inicio</Link>
                </li>
                <li>
                  <a href="#proyectos">Proyectos</a>
                </li>
                <li>
                  <a href="#tracks">Tracks</a>
                </li>
              </ul>
            </nav>
          </section>
          <section className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/feed"
                  className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors"
                >
                  <Avatar
                    key={`navbar-avatar-${avatarKey}-${avatarRefreshKey}`}
                    src={user?.avatar}
                    fallback={user?.name || ""}
                    size="sm"
                    alt={user?.name || "Usuario"}
                    forceRefresh={true}
                  />
                  <span className="text-base">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="border-2 border-white px-4 py-2 rounded-xl text-md font-semibold text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-primary px-4 py-2 rounded-xl text-md font-semibold text-white hover:bg-primary/80 transition-colors cursor-pointer"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="border-2 border-white px-4 py-2 rounded-xl text-md font-semibold text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  Registrarse
                </Link>
              </>
            )}
          </section>
        </div>

        <section className="flex items-center md:hidden">
          <button onClick={toggleMenu}>
            <img className="w-12 h-12" src={barsIcon} alt="Menu" />
          </button>
        </section>
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-30"
          onClick={closeMenu}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Navegación</h2>
            <button
              onClick={closeMenu}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <nav className="flex-1 p-6">
            <ul className="space-y-6">
              <li>
                <Link
                  to="/"
                  className="text-gray-800 hover:text-blue-600 text-lg font-medium block py-2 transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <a
                  href="#proyectos"
                  className="text-gray-800 hover:text-blue-600 text-lg font-medium block py-2 transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Proyectos
                </a>
              </li>
              <li>
                <a
                  href="#tracks"
                  className="text-gray-800 hover:text-blue-600 text-lg font-medium block py-2 transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Tracks
                </a>
              </li>
            </ul>
          </nav>

          <div className="p-6 border-t border-gray-200 space-y-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar
                    key={`mobile-avatar-${avatarKey}-${avatarRefreshKey}`}
                    src={user?.avatar}
                    fallback={user?.name || ""}
                    size="md"
                    alt={user?.name || "Usuario"}
                    forceRefresh={true}
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 block text-center"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors duration-200 block text-center"
                  onClick={closeMenu}
                >
                  Mi Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full border-2 border-red-600 text-red-600 py-3 px-6 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-colors duration-200"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 block text-center"
                  onClick={closeMenu}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors duration-200 block text-center"
                  onClick={closeMenu}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

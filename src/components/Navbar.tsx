import { useState, useEffect } from "react";
import barsIcon from "../assets/icons/barsIcon.svg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`flex fixed w-full justify-between items-center p-4 z-20 transition-all duration-100 ${
          isScrolled ? "bg-black" : "bg-transparent"
        }`}
      >
        <section className="flex items-center gap-7">
          <div>
            <a href="#" className="text-white text-2xl font-bold">CITT Learn</a>
          </div>

          <nav>
            <ul className="hidden">
              <li>
                <a href="#">Inicio</a>
              </li>
              <li>
                <a href="#nosotros">Nosotros</a>
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

        <section className="hidden">
          <button>Iniciar Sesión</button>
        </section>

        <section className="flex items-center">
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
                <a
                  href="#"
                  className="text-gray-800 hover:text-blue-600 text-lg font-medium block py-2 transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#nosotros"
                  className="text-gray-800 hover:text-blue-600 text-lg font-medium block py-2 transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Nosotros
                </a>
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

          <div className="p-6 border-t border-gray-200">
            <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

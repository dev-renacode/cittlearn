const Navbar = () => {
  return (
    <header>
      <div className="flex justify-between max-w-7xl m-auto py-3 items-center">
        <div>
          <p className="font-bold text-blue-500 text-2xl">CittLearn</p>
        </div>

        <nav className="flex flex-wrap basis-0">
          <ul className="flex gap-5">
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Tracks</a>
            </li>
            <li>
              <a href="#">Soporte</a>
            </li>
            <li>
              <a href="#">Nosotros</a>
            </li>
          </ul>
        </nav>

        <div className="flex flex-wrap">
          <button className="bg-blue-500 text-white px-3 py-2 rounded-lg">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

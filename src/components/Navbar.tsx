import barsIcon from "../assets/icons/barsIcon.svg";

const Navbar = () => {
  return (
    <header className="flex fixed w-full justify-between items-center p-4 z-10">
      <section className="flex items-center gap-7">
        <div>
          <p className="text-white text-2xl font-bold">CITT Learn</p>
        </div>

        <nav>
          <ul className="hidden">
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Tracks</a>
            </li>
            <li>
              <a href="#">Conoce Más</a>
            </li>
            <li>
              <a href="#">Soporte</a>
            </li>
          </ul>
        </nav>
      </section>

      <section className="hidden">
        <button>Iniciar Sesión</button>
      </section>

      <section>
        <img className="w-12 h-12" src={barsIcon} />
      </section>
    </header>
  );
};

export default Navbar;

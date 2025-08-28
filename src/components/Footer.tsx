const Footer = () => {
  return (
    <footer className="bg-black space-y-3 mt-20">
      <nav className="px-5 pt-2">
        <ul className="text-white text-lg">
          <li>
            <a href="">Nosotros</a>
          </li>
          <li>
            <a href="">Soporte</a>
          </li>
          <li>
            <a href="">CITT</a>
          </li>
          <li>
            <a href="">DuocUC</a>
          </li>
        </ul>
      </nav>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 mx-5" />
      <div className="text-white w-full flex flex-col items-center pb-5">
        <h4 className="text-5xl font-extrabold pb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-600 from-pink-400">
            2025
          </span>
        </h4>
        <p className="text-lg text-gray-200">
          &copy; CITT Learn todos los derechos reservados
        </p>
        <p className="">Desarrollado por el track de Fullstack</p>
      </div>
    </footer>
  );
};

export default Footer;

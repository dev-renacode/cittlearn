import heroImg from "../assets/images/hero.webp";
import logoDuoc from "../assets/images/logoduoc.svg";

const Hero = () => {
  return (
    <section
      className="relative flex flex-col justify-center bg-cover bg-center bg-no-repeat min-h-[80vh] rounded-b-[50px] overflow-hidden"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40 z-0 rounded-b-[55px] grayscale-100" />
      <div className="relative z-10 text-white px-4 text-pretty">
        <h1 className="text-5xl font-bold">Bienvenido a CITT Learn</h1>
        <h2 className="text-2xl font-semibold pt-1">
          ¡Aprende nuevas experiencias junto a profesionales!
        </h2>
        <p className="text-lg pt-4">
          Fundado en <strong>2010</strong> por la{" "}
          <strong>Escuela de Informática y Telecomunicaciones de DuocUC</strong>
          , el <strong>CITT</strong> promueve la <strong>innovación</strong>, la{" "}
          <strong>colaboración con la industria</strong> y espacios abiertos
          para el <strong>desarrollo tecnológico</strong> y el{" "}
          <strong>aprendizaje conjunto</strong>.
        </p>

        <div className="pt-4 space-x-3">
          <button>
            <a
              href="#tracks"
              className="bg-purple-500 px-5 py-2 rounded-xl text-lg font-semibold text-white hover:bg-purple-600 transition-colors"
            >
              Explorar Tracks
            </a>
          </button>
          <button>
            <a
              href="#nosotros"
              className="border-3 border-purple-500 px-5 py-2 rounded-xl text-lg font-medium"
            >
              Conoce Más
            </a>
          </button>
        </div>
      </div>
      <div className="absolute bottom-16 left-6 z-10 items-end flex">
        <img className="w-40" src={logoDuoc} alt="" />
      </div>
    </section>
  );
};

export default Hero;

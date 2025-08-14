const Hero = () => {
  return (
    <section>
      <div className="flex flex-col items-center pt-20 space-y-3">
        <h1 className="text-5xl font-bold">Unete al CITT 2025</h1>
        <h2 className="text-3xl font-medium text-blue">
          ¡Aprende nuevas experiencias junto a profesionales!
        </h2>
        <p className="max-w-5xl text-pretty text-center">
          Creado en 2010 por la Escuela de Informática y Telecomunicaciones de
          <strong> DuocUC</strong>, el CITT impulsa la innovación y la
          colaboración con la industria y la sociedad,{" "}
          <strong>
            fomentando espacios abiertos para el desarrollo tecnológico y el
            aprendizaje conjunto
          </strong>
          .
        </p>
        <button className="bg-indigo-500 text-white px-5 py-2 text-xl rounded-lg">
          Aprende
        </button>
      </div>
    </section>
  );
};

export default Hero;

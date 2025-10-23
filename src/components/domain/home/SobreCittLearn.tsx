import sobreCittLearn from "../../../assets/images/sobreCittLearn.webp";

const SobreCittLearn = () => {
  return (
    <section id="nosotros" className="mt-20 px-5 scroll-mt-20 md:py-30">
      <div className="md:max-w-7xl md:mx-auto">
        <article className="space-y-2 text-pretty md:flex md:items-center">
          <div className="mr-20">
            <h2 className="font-bold text-4xl pb-2">Sobre CITT Learn</h2>
            <p className="pb-5">
              Aquí te contaremos como surgió nuestro proyecto.
            </p>
            <p>
              En CITT identificamos que muchos estudiantes tienen interés en
              participar, pero la falta de una guía clara y apoyo genera
              desmotivación, ya que nuestra metodología autodidacta es distinta
              a la que están acostumbrados.
            </p>
            <p>
              Para solucionar esto, creamos CITT Learn, una plataforma web donde
              los integrantes pueden registrarse, acceder a proyectos, proponer
              nuevas ideas y consultar materiales. Además, cuenta con un foro
              para resolver dudas, compartir información y facilitar la
              comunicación entre los usuarios.
            </p>
            <p className="italic">
              CITT Learn es la herramienta que impulsa el aprendizaje y la
              colaboración dentro del Centro.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              className="hidden md:block rounded-lg"
              src={sobreCittLearn}
              alt="CITT Learn"
            />
          </div>
        </article>
      </div>
    </section>
  );
};

export default SobreCittLearn;

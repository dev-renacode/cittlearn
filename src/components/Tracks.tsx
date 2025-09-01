import TrackItem from "./TrackItem"
import ciberseguridad from "../assets/icons/ciberseguridad.png";
import fullstack from "../assets/icons/full-stack.png";
import roboticalego from "../assets/icons/robotica-lego.png";
import iot from "../assets/icons/iot.png";
import cloudcomputing from "../assets/icons/cloud-computing.png";
import roboticakondo from "../assets/icons/robotica-kondo.png";
import inteligenciaartificial from "../assets/icons/inteligencia-artificial.png";
import metaversorealidadaumentada from "../assets/icons/metaverso.png";


const Tracks = () => {
  return (
    <section id="tracks" className="flex flex-col px-4 mt-20 text-center scroll-mt-20">
      <h2 className="text-4xl font-bold pb-2">Tracks</h2>
      <p className="pb-5">
        Estos son los tracks que se han creado en el CITT
      </p>
      <article className="space-y-5">
        <TrackItem title="Ciberseguridad" description="La ciberseguridad es el conjunto de medidas para proteger sistemas, redes y datos frente a amenazas digitales, garantizando su seguridad y privacidad." img={ciberseguridad}/>
        <TrackItem title="Fullstack" description="El desarrollo full-stack abarca el trabajo en todas las partes de una aplicación web, tanto en el front-end (interfaz) como en el back-end (servidor y base de datos)." img={fullstack}/>
        <TrackItem title="Robótica Lego" description="La robótica Lego utiliza kits de Lego para crear y programar robots, permitiendo aprender conceptos de ingeniería, programación y resolución de problemas de manera práctica y divertida." img={roboticalego}/>
        <TrackItem title="IoT (5g-6g)" description="El Internet de las Cosas (IoT) conecta dispositivos físicos a Internet, permitiéndoles recolectar y compartir datos para automatizar procesos y mejorar la interacción entre el mundo físico y digital." img={iot}/>
        <TrackItem title="Cloud Computing" description="El cloud computing permite almacenar y acceder a datos y aplicaciones a través de Internet, sin necesidad de tener infraestructura física propia, lo que ofrece flexibilidad y escalabilidad." img={cloudcomputing}/>
        <TrackItem title="Robótica Kondo" description="La robótica Kondo utiliza kits de robótica avanzados para crear robots programables, enfocados en el aprendizaje de técnicas de control, sensores y movimiento, ideal para proyectos educativos y de investigación." img={roboticakondo}/>
        <TrackItem title="Inteligencia Artificial Aplicada" description="La inteligencia artificial aplicada usa algoritmos y modelos para resolver problemas específicos, como reconocimiento de patrones, predicciones y automatización de tareas, mejorando procesos en áreas como salud, finanzas y comercio." img={inteligenciaartificial}/>
        <TrackItem title="Metaberso y Realidad Aumentada" description="El metaverso es un espacio virtual interactivo donde las personas pueden socializar, trabajar y jugar, mientras que la realidad aumentada superpone elementos digitales al mundo real, mejorando la experiencia visual e interactiva." img={metaversorealidadaumentada}/>
      </article>
    </section>
  )
}

export default Tracks
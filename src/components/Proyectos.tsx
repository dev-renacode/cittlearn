import project1 from "../assets/images/project1.webp";
import project2 from "../assets/images/project2.webp";
import project3 from "../assets/images/project3.webp";
import project4 from "../assets/images/project4.webp";
import ProyectoItem from "./ProyectoItem.tsx";

const Proyectos = () => {
  return (
    <section className="flex flex-col px-4 pt-16">
      <h2 className="text-4xl font-bold pb-7 text-center">
        Proyectos del CITT
      </h2>
      <article className="space-y-5">
        <ProyectoItem
          img={project1}
          description="Proyecto 1"
          title="Hola mundo como estam xdxd"
        />
        <ProyectoItem
          img={project2}
          description="Proyecto 2"
          title="Hola mundo como estam xdxd"
        />
        <ProyectoItem
          img={project3}
          description="Proyecto 3"
          title="Hola mundo como estam xdxd"
        />
        <ProyectoItem
          img={project4}
          description="Proyecto 4"
          title="Hola mundo como estam xdxd"
        />
      </article>
    </section>
  );
};

export default Proyectos;

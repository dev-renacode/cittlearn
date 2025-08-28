import TrackItem from "./TrackItem"

const Tracks = () => {
  return (
    <section className="flex flex-col px-4 pt-16">
      <h2 className="text-4xl font-bold pb-2">Tracks</h2>
      <p className="pb-5">
        Estos son los tracks que se han creado en el CITT
      </p>
      <article className="space-y-5">
        <TrackItem />
      </article>
    </section>
  )
}

export default Tracks
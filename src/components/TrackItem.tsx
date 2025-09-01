interface Props {
  img: string;
  title: string;
  description: string;
}

const TrackItem = ({ img, title, description }: Props) => {
  return (
    <section className="flex flex-col mt-2">
        <div className="flex bg-black/12 py-13 px-5 rounded-lg flex-col items-center text-pretty">
          <img className="w-auto h-30" src={img} />
          <h3 className="font-bold text-2xl pt-2 mb-2">{title}</h3>
          <p className="text-center">{description}</p>
        </div>
    </section>
  )
}

export default TrackItem
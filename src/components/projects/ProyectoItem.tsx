interface Props {
  img: string;
  description: string;
  title: string;
}

const ProyectoItem = ({ img, description, title }: Props) => {
  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg">
      <img
        src={img}
        alt={`${title} - ${description}`}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />

      <div className="absolute inset-0 flex flex-col justify-end pb-6 pl-4 bg-black/60 text-white text-xl font-semibold">
        <p className="font-bold text-3xl">{description}</p>
        <p className="font-medium text-lg">{title}</p>
      </div>
    </div>
  );
};

export default ProyectoItem;

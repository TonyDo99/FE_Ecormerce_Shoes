export const Project = ({ src, title, logo }) => {
  return (
    <figure className="relative w-full h-full">
      <img
        src={src}
        className="w-full h-full object-cover rounded-lg"
        alt="Restaurants"
      />
      <figcaption className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center text-white w-80 h-64 space-y-2">
        <span>{logo}</span>
        <p>{title}</p>
        <button className="border rounded-lg pl-1 pr-1 text-sm bg-green-400">
          48 Listings
        </button>
      </figcaption>
    </figure>
  );
};

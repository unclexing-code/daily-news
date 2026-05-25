export default function Card({title,description}:{title:string,description:string}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 ease-in-out" >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">
        {description}
      </p>
    </div>
  );
}   
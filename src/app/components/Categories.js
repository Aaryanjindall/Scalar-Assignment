export default function Categories() {
  const data = [
    "Mobiles",
    "Fashion",
    "Electronics",
    "Home",
    "Appliances",
    "Travel",
    "Beauty",
  ];

  return (
    <div className="bg-white flex gap-8 p-4 overflow-x-auto">
      {data.map((item, i) => (
        <div key={i} className="text-center cursor-pointer">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
          <p className="text-sm mt-2">{item}</p>
        </div>
      ))}
    </div>
  );
}
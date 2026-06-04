export default function Sidebar() {
  const cats = [
    "Automobiles",
    "Clothes and wear",
    "Home interiors",
    "Computer and tech",
    "Sports and outdoor",
    "Animal and pets",
  ];

  return (
    <div className="bg-white shadow p-4 w-64">
      {cats.map((c, i) => (
        <p key={i} className="py-2 hover:text-blue-600 cursor-pointer">
          {c}
        </p>
      ))}
    </div>
  );
}

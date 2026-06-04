export default function ExtraServices() {
  const services = [
    {
      title: "Source from Industry Hubs",
      img: "./t1.png",
      icon: "🔍",
    },
    {
      title: "Customize Your Products",
      img: "./t2.png",
      icon: "🧾",
    },
    {
      title: "Fast, reliable shipping by ocean or air",
      img: "./t3.png",
      icon: "✈️",
    },
    {
      title: "Product monitoring and inspection",
      img: "./t4.png",
      icon: "🛡️",
    },
  ];

  const suppliers = [
    {
      name: "Arabic Emirates",
      code: "shopname.ae",
      flag: "https://flagcdn.com/w20/ae.png",
    },
    {
      name: "Australia",
      code: "shopname.ae",
      flag: "https://flagcdn.com/w20/au.png",
    },
    {
      name: "United States",
      code: "shopname.ae",
      flag: "https://flagcdn.com/w20/us.png",
    },
    {
      name: "Russia",
      code: "shopname.ru",
      flag: "https://flagcdn.com/w20/ru.png",
    },
    {
      name: "Italy",
      code: "shopname.it",
      flag: "https://flagcdn.com/w20/it.png",
    },
    {
      name: "Denmark",
      code: "denmark.com.dk",
      flag: "https://flagcdn.com/w20/dk.png",
    },
    {
      name: "France",
      code: "shopname.com.fr",
      flag: "https://flagcdn.com/w20/fr.png",
    },
    {
      name: "Arabic Emirates",
      code: "shopname.ae",
      flag: "https://flagcdn.com/w20/ae.png",
    },
    {
      name: "China",
      code: "shopname.cn",
      flag: "https://flagcdn.com/w20/cn.png",
    },
    {
      name: "Great Britain",
      code: "shopname.co.uk",
      flag: "https://flagcdn.com/w20/gb.png",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Extra services */}
      <h2 className="text-xl font-bold mb-4">Our extra services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {services.map((item, i) => (
          <div
            key={i}
            className="border rounded-lg overflow-hidden  shadow-sm"
          >
            <div className="relative h-36">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute -bottom-4 right-4 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow">
                {item.icon}
              </div>
            </div>

            <div className="p-4 pt-6">
              <p className="text-sm  font-bold">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Suppliers by region */}
      <h2 className="text-xl font-bold mb-4">Suppliers by region</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-4">
        {suppliers.map((s, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            <img
              src={s.flag}
              alt={s.name}
              className="w-5 h-4 object-cover rounded-sm mt-1"
            />
            <div>
              <p className="font-medium leading-none ">{s.name}</p>
              <p className="text-gray-500 text-xs">{s.code}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

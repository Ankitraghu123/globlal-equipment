import { useState } from "react";
import { FiMenu } from "react-icons/fi";

const categories = [
    {
      name: "Hand Tools",
      subcategories: [
        {
          name: "Gas Equipment",
          items: ["Dust Collector", "Heat Guns", "Impact Drivers"],
        },
        {
          name: "Cordless Tools",
          items: ["Bare Tools", "Grinders", "Impact Drivers"],
        },
        {
          name: "Air Tools",
          items: ["Air Hoses", "Chipping Hammers", "Compressors"],
        },
      ],
    },
    {
      name: "Toolboxes",
      subcategories: [
        {
          name: "Types",
          items: ["Portable", "Stationary", "Rolling", "Jobsite"],
        },
        {
          name: "Brands",
          items: ["DeWalt", "Milwaukee", "Stanley", "Husky"],
        },
      ],
    },
    {
      name: "Power Tools",
      subcategories: [
        {
          name: "Corded",
          items: ["Drills", "Sanders", "Saws", "Planers"],
        },
        {
          name: "Cordless",
          items: ["Drills", "Impact Drivers", "Grinders", "Saws"],
        },
      ],
    },
    {
      name: "Woodworking",
      subcategories: [
        {
          name: "Cutting Tools",
          items: ["Saws", "Chisels", "Routers", "Planers"],
        },
        {
          name: "Measuring",
          items: ["Tapes", "Squares", "Levels", "Calipers"],
        },
      ],
    },
    "Measuring Tools",
    "Safety Equipment",
    "Outdoor Power Equipment",
    "Plumbing Tools",
  ];

const DropdownMenu = () => {
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <div className="relative">
      <button className="flex items-center gap-2 ">
        <FiMenu size={20} />
        <span className="font-bold">Shop by Categories</span>
      </button>

      <div className="absolute bg-white shadow-md mt-2 w-64">
        {categories.map((category, index) => (
          <div key={index} className="group">
            {typeof category === "string" ? (
              <div className="p-3 hover:bg-gray-100 cursor-pointer">{category}</div>
            ) : (
              <div
                onMouseEnter={() => setOpenCategory(index)}
                onMouseLeave={() => setOpenCategory(null)}
                className="relative p-3 hover:bg-gray-100 cursor-pointer flex justify-between"
              >
                <span className="text-blue-500">{category.name}</span>
                {openCategory === index && (
                  <div className="absolute left-full top-0 bg-white shadow-md w-64 flex">
                    {category.subcategories.map((sub, subIndex) => (
                      <div key={subIndex} className="p-3 border-r">
                        <h3 className="font-bold">{sub.name}</h3>
                        {sub.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="text-gray-600 text-sm hover:text-black cursor-pointer"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;

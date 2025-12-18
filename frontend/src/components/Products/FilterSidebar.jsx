import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];
  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];
  const genders = ["Men", "Women"];

  // read from URL
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100,
    });

    setPriceRange([0, Number(params.maxPrice) || 100]);
  }, [searchParams]);

  // update URL
  const updateParam = (key, value) => {
    const params = Object.fromEntries([...searchParams]);

    if (!value || (Array.isArray(value) && value.length === 0)) {
      delete params[key];
    } else {
      params[key] = Array.isArray(value) ? value.join(",") : value;
    }

    setSearchParams(params);
  };

  // handle all filters
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    console.log({ name, value, checked, type });

    let newFilters = { ...filters };
    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    console.log(newFilters);
    updateURLParams(newFilters);

    // if (type === "single") {
    //   updateParam(name, value);
    // }

    // if (type === "multi") {
    //   const current = filters[name];
    //   const updated = checked
    //     ? [...current, value]
    //     : current.filter((v) => v !== value);

    //   updateParam(name, updated);
    // }
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    // {cateory:"Top Waer", size:["xs","s","l"]}
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key] && newFilters[key].length > 0)) {
        params.append(key, newFilters[key].join(",")); // "XS, S"
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`); //?category=Bottom+wear&size=XS%2CS
  };

  const handlePriceRangeChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(filters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium mb-4">Filter</h3>

      {/* Category */}
      <div className="mb-6">
        <p className="font-medium mb-2">Category</p>
        {categories.map((category) => (
          <label key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {category}
          </label>
        ))}
      </div>

      {/* Gender */}
      <div className="mb-6">
        <p className="font-medium mb-2">Gender</p>
        {genders.map((gender) => (
          <label key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {gender}
          </label>
        ))}
      </div>

      {/* Color */}
      <div className="mb-6">
        <p className="font-medium mb-2">Color</p>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() =>
                handleFilterChange({ target: { name: "color", value: color } })
              } // ✅ fixed
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
                filters.color === color
                  ? "ring-2 ring-blue-500 border-black"
                  : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <p className="font-medium mb-2">Size</p>
        {sizes.map((size) => (
          <label key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              checked={filters.size.includes(size)}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {size}
          </label>
        ))}
      </div>

      {/* Material */}
      <div className="mb-6">
        <p className="font-medium mb-2">Material</p>
        {materials.map((material) => (
          <label key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={material}
              checked={filters.material.includes(material)}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {material}
          </label>
        ))}
      </div>

      {/* Brand */}
      <div className="mb-6">
        <p className="font-medium mb-2">Brand</p>
        {brands.map((brand) => (
          <label key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              checked={filters.brand.includes(brand)}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {brand}
          </label>
        ))}
      </div>

      {/* Price */}
      <div className="mb-8">
        <p className="font-medium mb-2">Price Range</p>
        <input
          type="range"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceRangeChange}
          className="w-full"
        />
        <div className="flex justify-between mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;

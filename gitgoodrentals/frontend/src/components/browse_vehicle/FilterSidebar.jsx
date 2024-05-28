// eslint-disable-next-line no-unused-vars
import React from "react";

import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";

const FilterSidebar = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handlePriceRangeChange = (priceRange) => {
    const updatedPriceRanges = selectedPriceRanges.includes(priceRange)
      ? selectedPriceRanges.filter((range) => range !== priceRange)
      : [...selectedPriceRanges, priceRange];
    setSelectedPriceRanges(updatedPriceRanges);
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
  };

  const handleFilterChange = () => {
    const filters = {
      priceRanges: selectedPriceRanges,
      categories: selectedCategories,
    };
    onFilterChange(filters);
  
    // Close the filter sidebar on mobile devices
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  const priceRanges = [
    { label: "$0 - $50", value: "0-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $150", value: "100-150" },
    { label: "$150 - $200", value: "150-200" },
    { label: "$200 +", value: "200+" },
  ];

  const categories = ["Car", "Truck", "SUV", "Van"];

  return (
    <div>
      <button
        className="md:hidden bg-primary text-white font-semibold py-3 px-6 rounded-lg focus:outline-none mb-6 transition duration-200 ease-in-out hover:bg-primary-dark"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close Filters" : "Open Filters"}
      </button>
      <motion.div
        className={`bg-white rounded-lg shadow-lg p-8 border border-gray-200 ${
          isOpen ? "block md:block" : "hidden md:block"
        }`}
        data-testid="filter-sidebar"
        variants={containerVariants}
        initial="hidden"
        animate={isOpen || window.innerWidth >= 768 ? "visible" : "hidden"}
      >
        {/* Filter options */}
        <h3 className="text-2xl font-bold mb-8 text-gray-800">Filter</h3>
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4 text-gray-700">
            Price per day
          </h4>
          <div className="grid gap-4">
            {priceRanges.map((range, index) => (
              <motion.div
                key={range.value}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <label className="flex items-center cursor-pointer">
                  <Checkbox
                    id={range.value}
                    checked={selectedPriceRanges.includes(range.value)}
                    onCheckedChange={() => handlePriceRangeChange(range.value)}
                    className="text-primary focus:ring-primary cursor-pointer"
                  />
                  <Label
                    htmlFor={range.value}
                    className="cursor-pointer ml-3 text-gray-700"
                  >
                    {range.label}
                  </Label>
                </label>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4 text-gray-700">Categories</h4>
          <div className="grid gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <label className="flex items-center cursor-pointer">
                  <Checkbox
                    id={category}
                    
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                    className="text-primary focus:ring-primary cursor-pointer"
                  />
                  <Label
                    htmlFor={category}
                    className="cursor-pointer ml-3 text-gray-700"
                  >
                    {category}
                  </Label>
                </label>
              </motion.div>
            ))}
          </div>
        </div>
        <Button
          onClick={handleFilterChange}
        
          className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg transition duration-200 focus:outline-none hover:bg-primary-dark active:scale-95 transform    "
        >
          Apply Filters
        </Button>
      </motion.div>
    </div>
  );
};

FilterSidebar.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterSidebar;

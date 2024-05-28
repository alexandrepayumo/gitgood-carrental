// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import VehicleCard from "../browse_vehicle/VehicleCard";
import { mockVehicles } from "../../lib/mockdata";
import FilterSidebar from "../browse_vehicle/FilterSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import {getVehiclesByBranch} from "../api/vehicles";

export function BrowseVehicles({data}) {
  const location = useLocation();
  const branch_id = location.state.branch.id;

  const [filters, setFilters] = useState({
    priceRanges: [],
    categories: [],
  });
  const [sort, setSort] = useState("price");

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (data && data.length > 0) {
        setVehicles(data);
      } else {
        try {
          const fetchedData = await getVehiclesByBranch(branch_id);
          setVehicles(fetchedData);
        } catch (error) {
          console.error('Error fetching vehicles:', error);
        }
      }
    };

    fetchData();
  }, [data]);

  // console.log("VEHICLES: " + vehicles)
  
  const filteredVehicles = vehicles.filter((vehicle) => {
    const { priceRanges, categories } = filters;

    // Check if the vehicle matches the selected price ranges
    if (priceRanges.length > 0) {
      const vehiclePrice = vehicle.price;
      const matchesPriceRange = priceRanges.some((range) => {
        const [minPrice, maxPrice] = range.split("-").map(Number);
        return (
          vehiclePrice >= minPrice &&
          (maxPrice === undefined || vehiclePrice <= maxPrice)
        );
      });
      if (!matchesPriceRange) {
        return false;
      }
    }

    // Check if the vehicle matches the selected categories
    if (categories.length > 0 && !categories.includes(vehicle.category)) {
      return false;
    }

    return true;
  });

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sort === "price") {
      return a.price - b.price;
    } else if (sort === "mileage") {
      return a.mileage - b.mileage;
    } else {
      return 0;
    }
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-12 bg-gray-100"
    >
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-1"
        >
          {/* inset-x-5 md:inset-y-0 md:left-28 md:bottom-32 md:top-24  */}
          <div className="fixed top-24 bg-white rounded-lg shadow-lg p-6">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:col-span-3"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 mt-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
              <div className="grid gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-800">
                  Available Vehicles
                </h1>
                <p className="text-gray-600">
                  Browse our selection of high-quality vehicles
                </p>
              </div>
              <SortFilter sort={sort} setSort={setSort} />
            </div>
            <AnimatePresence>
              <motion.div
                key={sort}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layout
                transition={{ duration: 0.7, staggerChildren: 0.1 }}
                className="grid gap-6"
              >
                <AnimatePresence>
                  {sortedVehicles.map((vehicle, index) => (
                    <motion.div
                      key={vehicle.id}
                      data-testid="vehicle-card"
                      layout
                      initial={{ opacity: 0, y: 50, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.35,
                          delay: index * 0.1,
                          ease: "easeOut",
                        },
                      }}
                      exit={{
                        opacity: 0,
                        y: 50,
                        scale: 0.8,
                        transition: {
                          duration: 0.35,
                          ease: "easeInOut",
                        },
                      }}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <VehicleCard vehicle={vehicle} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
export const SortFilter = ({ sort, setSort }) => {
  const handleSortChange = (sortOption) => {
    setSort(sortOption);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="ml-auto bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 focus:outline-none">
          <span>Sort by:</span>{" "}
          {sort === "price" ? "Price (lowest first)" : "Mileage (lowest first)"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white rounded-lg shadow-lg border border-gray-200">
        <DropdownMenuItem
          className="px-4 py-3 text-gray-700 hover:bg-gray-100 focus:outline-none"
          onSelect={() => handleSortChange("price")}
        >
          Price (lowest first)
        </DropdownMenuItem>
        <DropdownMenuItem
          className="px-4 py-3 text-gray-700 hover:bg-gray-100 focus:outline-none"
          onSelect={() => handleSortChange("mileage")}
        >
          Mileage (lowest first)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
import PropTypes from "prop-types";

BrowseVehicles.propTypes = {
  data: PropTypes.array, // Optional prop for providing data
};

SortFilter.propTypes = {
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
};
function SlidersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="4" y1="21" y2="14" />
      <line x1="4" x2="4" y1="10" y2="3" />
      <line x1="12" x2="12" y1="21" y2="12" />
      <line x1="12" x2="12" y1="8" y2="3" />
      <line x1="20" x2="20" y1="21" y2="16" />
      <line x1="20" x2="20" y1="12" y2="3" />
      <line x1="2" x2="6" y1="14" y2="14" />
      <line x1="10" x2="14" y1="8" y2="8" />
      <line x1="18" x2="22" y1="16" y2="16" />
    </svg>
  );
}

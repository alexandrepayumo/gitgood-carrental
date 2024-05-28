// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import { CardContent, Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import InspectModal from "./InspectModal";
import { BASE_URL } from "@/constants";

const VehicleCard = ({ vehicle, isLandingPage = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if the price is a valid number
  const price = parseFloat(vehicle.price);
  if (isNaN(price)) {
    throw new Error(`Invalid price: ${vehicle.price}`);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => !isLandingPage && setIsModalOpen(true)}
        data-testid="vehicle-card"
      >
        <Card>
          <div className="cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
            <img
              src={`${BASE_URL}images/${vehicle.model}.png` || "/placeholder.svg"}
              alt="Cover image"
              className="rounded-lg object-cover w-full sm:w-48 aspect-square overflow-hidden"
              height={120}
              width={120}
            />
            <CardContent className="grid gap-4 flex-1">
              <div className="grid gap-2">
                <h3 className="font-semibold tracking-tight text-xl">
                  {vehicle.brand} {vehicle.model}
                </h3>
                <p className="text-sm leading-none text-gray-600">
                  {vehicle.category}
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <CalendarCheckIcon className="w-5 h-5 text-primary" />
                  <small className="font-semibold">Year: {vehicle.year}</small>
                </div>
                <div className="flex items-center gap-2">
                  <GaugeIcon className="w-5 h-5 text-primary" />
                  <small className="font-semibold">
                    Mileage: {vehicle.mileage} mi
                  </small>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-2xl text-primary">
                  ${price}/day
                </h4>
                {!isLandingPage && (
                  <div
                    className="  cursor-pointer ml-auto flex items-center text-primary font-semibold hover:underline"
                    href="#"
                  >
                    View Details
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </div>
                )}
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
      <AnimatePresence> isLandingPage: PropTypes.bool,
        {!isLandingPage && isModalOpen && (
          <InspectModal
            vehicle={vehicle}
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

VehicleCard.propTypes = {
  vehicle: PropTypes.shape({
    id: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string,
    year: PropTypes.number.isRequired,
    mileage: PropTypes.number.isRequired,
   
  }).isRequired,
};
//add prop types for isLandingPage
VehicleCard.propTypes = {
  isLandingPage: PropTypes.bool,
};

export default VehicleCard;

function CalendarCheckIcon(props) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

function GaugeIcon(props) {
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
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function ArrowRightIcon(props) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

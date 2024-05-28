// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import RentCar from "../Pages/RentCar";
import { Link } from "react-router-dom";
import { Carousel } from "@/components/ui/carousel";
import { isLoggedIn } from "../api/authentication";
import ModelRender from "./ModelRender";
import { BASE_URL } from "@/constants";

const InspectModal = ({ vehicle, open, onClose }) => {
  const handleReservation = () => {
    console.log("Reservation started for", vehicle.brand, vehicle.model);
  };

  const loadTestDrive = () => {
    console.log("Test drive started for", vehicle.brand, vehicle.model);

    const url = `${BASE_URL}simulations/${vehicle.model}/index.html`;
    
    window.open(url, '_blank');
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1200px] sm:h-[700px] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full"
        >
          <div className="flex items-center justify-center">
            <ModelRender vehicle={vehicle} />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">
                  {vehicle.brand} {vehicle.model}
                </DialogTitle>
                <DialogDescription className="text-lg leading-none text-gray-600">
                  {vehicle.category}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-6">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <CalendarCheckIcon className="w-6 h-6 text-primary" />
                    <span className="font-semibold text-lg">
                      Year: {vehicle.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GaugeIcon className="w-6 h-6 text-primary" />
                    <span className="font-semibold text-lg">
                      Mileage: {vehicle.mileage} mi
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CurrencyDollarIcon className="w-6 h-6 text-primary" />
                    <span className="font-semibold text-lg">
                      Price: ${vehicle.price}/day
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
            {isLoggedIn ? (
              <>
                  <Button
                    onClick={loadTestDrive}
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300"
                  >
                    Test Drive
                  </Button>
                  <Link to='/reserve' state={{data: vehicle}}>
                    <Button
                      onClick={handleReservation}
                      className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300"
                    >
                      Start Reservation
                    </Button>
                 </Link>
              </>
             
              ) : (
                <p>Please login to reserve.</p>
              )}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};


InspectModal.propTypes = {
  vehicle: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InspectModal;

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

export function CurrencyDollarIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16.154 7.154c-.949-.949-2.619-1.608-4.154-1.65m-4.154 10.65c.893 1.19 2.552 1.868 4.154 1.926m0-12.576c-1.826-.049-3.461.778-3.461 3.034c0 4.154 7.615 2.077 7.615 6.231c0 2.37-2.027 3.387-4.154 3.31m0-12.575V3m0 15.08V21"
      ></path>
    </svg>
  );
}

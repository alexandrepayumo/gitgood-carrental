// LandingPage.jsx

import React from 'react';

import VehicleCard from "../browse_vehicle/VehicleCard";
import { motion } from "framer-motion";
import { mockVehicles, branches } from "../../lib/mockdata";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import CascadeCard from "../ui/CascadeCard";
import { isValidLocation, getMatchingBranches } from "../../lib/locationUtil";
import MapComponent from '../map/MapComponent';
import {getBranches} from '../api/branches';
import { getVehicles } from '../api/vehicles';

export default function LandingPage() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getVehicles().then(setVehicles);
  }, []);

  const [selectedBranch, setSelectedBranch] = useState(null);
  const selectedVehicles = useMemo(
    () => [...vehicles].sort(() => 0.5 - Math.random()).slice(0, 3),
    [vehicles]
  );
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [matchingBranches, setMatchingBranches] = useState([]);

  const [branches, setBranches] = useState([]);

  useEffect(() => {
    getBranches()
      .then(data => {
        setBranches(data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []); // Removed dependencies

  const updateLocation = (value) => {
    setLocation(value);
  };

  const handleLocationChange = (e) => {
    const inputLocation = e.target.value;
    setLocation(inputLocation);
    // Find matching branches based on input location
    setMatchingBranches(getMatchingBranches(inputLocation));
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setLocation(branch.name); // Set location input value to selected branch name
    setMatchingBranches([]); // Clear matching branches
  };

  const handleRentNow = () => {
    if (selectedBranch) {
      navigate("/browse", { state: { location: selectedBranch.name } });
    } else if (isValidLocation(location)) {
      navigate("/browse", { state: { location } });
    }
  };

  return (
    <motion.div
      data-testid="landingPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:order-2"
          >
            <motion.img
              alt="Car Image"
              className="w-full h-auto rounded-lg shadow-lg"
              height="400"
              src="/logo.jpeg"
              style={{ aspectRatio: "600/400", objectFit: "cover" }}
              width="600"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:order-1"
          >
            <motion.h1
              className="text-5xl font-bold mb-6 text-foreground"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Rent Cars Worldwide
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Discover the freedom of exploring the world with our top-notch
              rental cars. Whether you're embarking on a thrilling adventure or
              planning a relaxing getaway, we've got you covered.
            </motion.p>
            <div className="mb-8 relative">
              <MapComponent branches={branches} selectedBranch={selectedBranch} />
            </div>
            <div className="mb-8">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.3 }}
                className="w-[13.5vw]"
              >
              </motion.div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
            Featured Vehicles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedVehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <VehicleCard vehicle={vehicle} isLandingPage={true} />
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CascadeCard
              title="Wide Selection"
              description="Choose from a diverse fleet of vehicles to suit your needs and preferences."
            />
            <CascadeCard
              title="Competitive Prices"
              description="Enjoy affordable rates without compromising on quality or service."
            />
            <CascadeCard
              title="Excellent Customer Support"
              description="Our dedicated team is always ready to assist you throughout your rental journey."
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchReservation from "../CheckIn/SearchReservation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { motion } from "framer-motion";
import { mockReservations } from "../../lib/Reservation";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { branches, mockVehicles } from "../../lib/mockdata";
import { getAllReservations, createReservation } from "../api/reservations";
import { getVehicle } from "../api/vehicles";

export default function CheckIn() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [searchedReservation, setSearchedReservation] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Get reservations
  useEffect(() => {
    const fetchReservations = async () => {
        const allReservations = await getAllReservations();
        setReservations(allReservations);
    };

    fetchReservations();
  }, []);
  
  const handleSearch = (bookingId) => {
    const foundReservation = reservations.find(
      (reservation) => reservation.id == parseInt(bookingId)
    );
    if (foundReservation) {
      //console.log(foundReservation);
      setSearchedReservation(foundReservation);
    } else {
      setSearchedReservation(null);
    }
    setHasSearched(true);
  };

  const handleProceedToCheckIn = (reservation) => {
    navigate(`/CheckIn/${reservation.id}`, { state: reservation });
  };

  const handleProceedToCheckOut = (reservation) => {
    navigate(`/CheckOut/${reservation.id}`, { state: reservation });
  };

  const handleCreateReservation = async (reservationData) => {
    const newReservation = await createReservation(reservationData.user, reservationData.vehicle, reservationData.startDate, reservationData.endDate, reservationData.equipment);

    //console.log("Viewing new reservation details of reservation", newReservation);

    setReservations([...reservations, newReservation]);

    const vehicle = await getVehicle(newReservation.vehicle);
    //console.log(vehicle);

    newReservation.vehicle = vehicle;

    // Show the toast notification
    toast(`Reservation created successfully. Booking ID: ${newReservation.id}`, {
      description: `Pickup Date: ${newReservation.start_date}\nReturn Date: ${newReservation.end_date}`,
      action: {
        label: "View Details",
        onClick: () => handleViewDetails(newReservation),
      },
    });
  };

  const handleViewDetails = (reservation) => {
    //console.log("Viewing details of reservation", reservation);
    setSearchedReservation(reservation);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-background"
    >
      <Toaster />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <motion.h1
          className="text-5xl font-bold mb-8 text-foreground text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Reservation Management
        </motion.h1>
        <SearchReservation
          onSearch={handleSearch}
          onCreateReservation={handleCreateReservation}
        />
        {searchedReservation ? (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <Card className="bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Reservation Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    <span className="font-semibold">Booking ID:</span>{" "}
                    {searchedReservation.id}
                  </p>
                  {/* <p>
                    <span className="font-semibold">Location:</span>{" "}
                    {searchedReservation.location}
                  </p> */}
                  <p>
                    <span className="font-semibold">Branch:</span>{" "}
                    {searchedReservation.vehicle.branch}
                  </p>
                  <p>
                    <span className="font-semibold">Vehicle:</span>{" "}
                    {searchedReservation.vehicle && `${searchedReservation.vehicle.year} ${searchedReservation.vehicle.brand} ${searchedReservation.vehicle.model}`}
                  </p>
                  <p>
                    <span className="font-semibold">Pickup Date:</span>{" "}
                    {searchedReservation.start_date}
                  </p>
                  <p>
                    <span className="font-semibold">Return Date:</span>{" "}
                    {searchedReservation.end_date}
                  </p>
                  <p>
                    <span className="font-semibold">Extra Equipment:</span>{" "}
                    {searchedReservation.addEquipment ? "Yes" : "No"}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                {searchedReservation.cancelled && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-red-500 text-white rounded-md font-semibold"
                  >
                    Cancelled
                  </motion.div>
                )}

                {searchedReservation.checked_out && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-green-500 text-white rounded-md font-semibold"
                  >
                    Completed
                  </motion.div>
                )}

                {searchedReservation.checked_in && !searchedReservation.cancelled && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-blue-500 text-white rounded-md font-semibold"
                    onClick = {() => handleProceedToCheckOut(searchedReservation)}
                  >
                    Check Out
                  </motion.button>
                )}

                {!searchedReservation.checked_out && !searchedReservation.cancelled && !searchedReservation.checked_in && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-blue-500 text-white rounded-md font-semibold"
                    onClick={() => handleProceedToCheckIn(searchedReservation)}
                  >
                    Check In
                  </motion.button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          hasSearched && (
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 text-center text-xl text-muted-foreground"
            >
              No reservation found. Please search for a valid Booking ID.
            </motion.p>
          )
        )}
      </div>
    </motion.div>
  );
}

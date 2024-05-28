import React, { useState, useEffect } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { getReservations } from "../api/reservations";
import { ReservationViewModal } from "./ReservationViewModal";

function UserReservationManagement() {
  const [reservations, setReservations] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getReservations();
      setReservations(data);
    };
    fetchReservations();
  }, []);

  function getStatus(reservation) {
    if (reservation.checked_in) {
      return "Current";
    } else if (reservation.checked_out) {
      return "Completed";
    } else if (reservation.cancelled) {
      return "Cancelled";
    } else {
      return "Pending";
    }
  }

  const viewReservationDetail = (reservation) => {
    setCurrentReservation(reservation);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Reservation Management
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          View and manage your reservations.
        </p>
      </div>
      <div className="border-t border-gray-200">
        <ScrollArea speed={0.8} className="overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Reservation ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Created On
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Vehicle
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations &&
                reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {reservation.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reservation.created_on}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     {`${reservation.vehicle.year} ${reservation.vehicle.brand} ${reservation.vehicle.model}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getStatus(reservation)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => viewReservationDetail(reservation)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </ScrollArea>
      </div>
      {open && (
        <ReservationViewModal
          reservation={currentReservation}
          open={open}
          onClose={handleClose}
          status={getStatus(currentReservation)}
        />
      )}
    </div>
  );
}

export default UserReservationManagement;

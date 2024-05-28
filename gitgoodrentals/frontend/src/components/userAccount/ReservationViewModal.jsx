import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import moment from 'moment';
import { cancelReservation, updateReservation } from '../api/reservations';

const ReservationViewModal = ({ reservation, open, onClose, status }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [startDate, setStartDate] = useState(reservation.start_date);
  const [endDate, setEndDate] = useState(reservation.end_date);

  const onCancel = () => {
    cancelReservation(reservation.id);
    onClose();
    window.location.reload();
  };

  const onEdit = () => {
    setIsEditing(true);
  };

  const onSave = () => {
    updateReservation(reservation.id, { start_date: startDate, end_date: endDate });
    setIsEditing(false);
    window.location.reload();
  };

  const onEditCancel = () => {
    setIsEditing(false);
    setStartDate(reservation.start_date);
    setEndDate(reservation.end_date);
  };

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
          <div className="flex flex-col justify-between">
            <div>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">
                  Reservation Details
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-6">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">
                      Reservation ID: {reservation.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">
                      Vehicle ID: {reservation.vehicle.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">
                      Vehicle Name: {reservation.vehicle.brand} {reservation.vehicle.model}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">
                      Price: ${reservation.vehicle.price}/day
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">
                      Color: {reservation.vehicle.color}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">
                      Created On: {moment(reservation.vehicle.created_on).format('MMMM Do YYYY')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">
                      Start Date:{" "}
                      {isEditing ? (
                        <input
                          type="date"
                          value={startDate}
                          onChange={e => setStartDate(e.target.value)}
                          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        moment(startDate).format('MMMM Do YYYY')
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">
                      End Date:{" "}
                      {isEditing ? (
                        <input
                          type="date"
                          value={endDate}
                          onChange={e => setEndDate(e.target.value)}
                          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        moment(endDate).format('MMMM Do YYYY')
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">
                      Status: {status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              {!reservation.cancelled && (
                <>
                  {isEditing ? (
                    <>
                      <Button
                        onClick={onEditCancel}
                        className="bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={onSave}
                        className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={onCancel}
                        className="bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={onEdit}
                        className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

ReservationViewModal.propTypes = {
  reservation: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export { ReservationViewModal };

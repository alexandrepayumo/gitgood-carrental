import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import MultiStepProgressBar from "./ReservationIdcomponents/MultiStepProgressBar/MultiStepProgressBar";
import InspectionStep from "./ReservationIdcomponents/InspectionStep/InspectionStep";
import DriveAwayStep from "./ReservationIdcomponents/DriveAwayStep";
import DepositStep from "./ReservationIdcomponents/DepositStep";
import RentalAgreementStep from "./ReservationIdcomponents/RentalAgreementStep";
import CheckOut from "../CheckOut";
import Payment from "../CheckOut/Payment";
import DepositReturn from "../CheckOut/DepositReturn";
import { Toaster } from "@/components/ui/sonner";
export default function ReservationIdPage() {
  const location = useLocation();
  const [reservation, setReservation] = useState(location.state);
  const [currentStep, setCurrentStep] = useState(1);
  const [isCheckIn, setIsCheckIn] = useState(
    location.state?.checked_in || false
  );
  const [totalAmount, setTotalAmount] = useState(0);

  const handleTotalAmount = (totalAmount) => {
    setTotalAmount(totalAmount);
  };

  const nextStep = (renterName) => {
    if (renterName) {
      setReservation((prevReservation) => ({
          ...prevReservation,
          customer: {
            ...prevReservation.customer,
            name: renterName,
          },
      }));
    }
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const renderStepContent = () => {
    if (!isCheckIn){
      switch (currentStep) {
        case 1:
          return <InspectionStep onComplete={nextStep} />;
        case 2:
          return (
            <RentalAgreementStep
              onComplete={nextStep}
              reservation={reservation}
            />
          );
        case 3:
          return (
            <DepositStep onComplete={nextStep} reservation={reservation} />
          );
        case 4:
          return <DriveAwayStep reservation={reservation} />;
        default:
          return null;
      }
    } else {
      switch (currentStep) {
        case 1:
          return <InspectionStep onComplete={nextStep} />;
        case 2:
          return (
            <CheckOut
              onComplete={nextStep}
              onTotalAmount={handleTotalAmount}
              rentalFee={55}
              additionalCharges={44}
            />
          );
        case 3:
          return (
            <Payment
              onComplete={nextStep}
              reservation={reservation}
              amount={totalAmount}
            />
          );
        case 4:
          return <DepositReturn reservation={reservation}></DepositReturn>;
        default:
          return null;
      }
    }
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
        {reservation ? (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {!reservation.checked_in
                    ? `CheckIn: #${reservation.id}`
                    : `CheckOut: #${reservation.id}`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MultiStepProgressBar currentStep={currentStep} />
                {renderStepContent()}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 text-center text-xl text-muted-foreground"
          >
            Loading reservation...
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

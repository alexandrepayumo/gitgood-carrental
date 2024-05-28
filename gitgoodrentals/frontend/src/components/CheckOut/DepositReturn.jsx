import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster, toast } from 'sonner';
import { updateReservation } from '@/components/api/reservations';
import PropTypes from 'prop-types';

const DepositReturn = ({reservation}) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  console.log("Reservation: ", reservation);

  // checkin reservation
  useEffect(() => {
    const update = async () => {
      const fields = {
        'cancelled': false,
        'checked_in': false,
        'checked_out': true,
      };
      await updateReservation(reservation.id, fields);
      console.log("Called update");
    };
    update();
  }, [reservation]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      toast.success('Have a great rest of your day!');
      navigate('/CheckIn');
    }
  }, [countdown, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Toaster />
      <Card className="bg-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Deposit Return</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-40 w-40 mx-auto text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <h3 className="text-3xl font-bold mb-4">Deposit Returned Successfully!</h3>
            <p className="text-lg mb-8">
              We have returned your initial $500 deposit. We hope to see you again soon!
            </p>
            <p className="text-xl font-bold mb-4">
              Redirecting to Reservation Management Page page in {countdown} seconds...
            </p>
            <Button onClick={() => navigate('/CheckIn')}>
              Back to Reservation Management Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

DepositReturn.propTypes = {
  reservation: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default DepositReturn;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import PropTypes from 'prop-types';
import { Toaster } from "@/components/ui/sonner";
const DepositStep = ({ onComplete, reservation }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [creditCard, setCreditCard] = useState('');

  const handleDeposit = async () => {
    if (!creditCard) {
      toast.error('Please enter a credit card number.');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate a request to the bank system to take the deposit
      const response = await stubBankSystem(creditCard);

      if (response.status === 'success') {
        toast.success('Deposit successfully processed.');
        onComplete();
      } else {
        toast.error('Deposit failed. Please check your credit card information and try again.');
      }
    } catch (error) {
      console.error('Error processing deposit:', error);
      toast.error('An error occurred while processing the deposit. Please try again later.');
    }

    setIsProcessing(false);
  };

  return (
    
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Toaster/>
      <h2 className="text-2xl font-bold mb-4">Deposit</h2>
      <p className="mb-4">
        A deposit of 500 CAD will be charged to the credit card provided below.
      </p>
      <div className="mb-4">
        <p>Booking ID: {reservation.id}</p>
        <p>Vehicle: {`${reservation.vehicle.year} ${reservation.vehicle.brand} ${reservation.vehicle.model}`}</p>
      </div>
      <div className="mb-4">
        <Label htmlFor="creditCard">Credit Card Number</Label>
        <Input
          id="creditCard"
          type="text"
          value={creditCard}
          onChange={(e) => setCreditCard(e.target.value)}
          placeholder="Enter credit card number"
          required
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={handleDeposit} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Process Deposit'}
        </Button>
      </div>
    </motion.div>
  );
};

// Stub/mock the bank system
const stubBankSystem = async (creditCard) => {
  // Simulate a delay to mimic a real request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock the bank system response
  const isApproved = Math.random() < 1; // 80% chance of approval

  return {
    status: isApproved ? 'success' : 'failed',
    message: isApproved ? 'Deposit approved' : 'Deposit declined',
  };
};

DepositStep.propTypes = {
  onComplete: PropTypes.func.isRequired,
  reservation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    vehicle: PropTypes.shape({
      year: PropTypes.number.isRequired,
      brand: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
    }).isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
  }).isRequired,
};

export default DepositStep;
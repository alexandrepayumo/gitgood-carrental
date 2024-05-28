
import React from "react";
import "./MultiStepProgressBar.css";
import { motion } from "framer-motion";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = ({ currentStep }) => {
  const steps = ["Inspection", "Rental Agreement", "Deposit", "Drive Away"];
  const getStepPercentage = (step) => {
    switch (step) {
      case 1:
        return 0;
      case 2:
        return 33.33;
      case 3:
        return 66.66;
      case 4:
        return 100;
      default:
        return 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <ProgressBar percent={getStepPercentage(currentStep)}>
        {steps.map((step, index) => (
          <Step key={index}>
            {({ accomplished, index }) => (
              <motion.div
                className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
              >
                {index + 1}
              </motion.div>
            )}
          </Step>
        ))}
      </ProgressBar>
    </motion.div>
  );
};

export default MultiStepProgressBar;

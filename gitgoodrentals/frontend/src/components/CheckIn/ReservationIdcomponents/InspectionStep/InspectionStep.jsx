import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "./loading.css";

const InspectionStep = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInspectionStarted, setIsInspectionStarted] = useState(false);

  useEffect(() => {
    if (isInspectionStarted && isLoading) {
      // Simulate loading delay
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000); 
  
      return () => clearTimeout(timer);
    }
  }, [isInspectionStarted, isLoading]);

  const handleStartInspection = () => {
    setIsInspectionStarted(true);
    setIsLoading(true);
  };

  const handleInspectionComplete = () => {
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Inspect the Car</CardTitle>
        </CardHeader>
        <CardContent>
          {!isInspectionStarted ? (
            <div className="flex justify-center">
              <Button onClick={handleStartInspection}>Start Inspection</Button>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="boxes">
                <div className="box">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="box">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="box">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="box">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                The inspection is complete. No damages were found on the rented
                car.
              </p>
              <div className="flex justify-end">
                <Button onClick={handleInspectionComplete}>
                  Proceed to Next Step
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InspectionStep;


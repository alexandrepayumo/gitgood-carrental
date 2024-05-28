import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import * as Form from "@radix-ui/react-form";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { format } from "date-fns";
import { createReservation } from "../api/reservations";
import { motion } from "framer-motion";
import { getBranch } from "../api/branches";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/constants";

function CheckboxWrapper({ checked, onChange }) {
  return (
    <div onClick={() => onChange(!checked)}>
      <Checkbox />
    </div>
  );
}

function RentCar(props) {
  let { state } = useLocation();
  const navigate = useNavigate();
  const [area, setArea] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [addEquipment, setAddEquipment] = useState(false);
  const [branchData, setBranchData] = useState(null);

  useEffect(() => {
    getBranch(state?.data?.branch).then((data) => { setBranchData(data) });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createReservation(
      sessionStorage.getItem("user"),
      state.data.id,
      format(pickupDate, "yyyy-MM-dd"),
      format(returnDate, "yyyy-MM-dd"),
      addEquipment
    ).then(() => {
      navigate('/browse', { state: { branch: { id: branchData.id } } });
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 py-12 px-4 md:px-8"
    >
      <div className="container mx-auto">
        <Card className="w-full md:w-3/4 lg:w-1/2 mx-auto flex flex-col items-center space-y-6 p-6">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{state.data.year} {state.data.brand} {state.data.model}</CardTitle>
                <CardDescription>${state.data.price}/day</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.img
                  // src="../../../public/honda_civic.jpg"
                  src={`${BASE_URL}images/${state.data.model}.png` || "/placeholder.svg"}
                  alt="car image"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          </motion.div>
          <motion.form
            className="w-full flex flex-col items-center space-y-6"
            onSubmit={handleSubmit}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="w-full">
              {branchData && <Label className="mb-2">Branch: {branchData.name}</Label>}
            </div>
            <div className="w-full">
              <Label className="mb-2" htmlFor="pickupDate">
                Pickup Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !pickupDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {pickupDate ? (
                      format(pickupDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={pickupDate}
                    onSelect={setPickupDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-full">
              <Label className="mb-2">Return date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !returnDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? (
                      format(returnDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-full flex items-center justify-between">
              <Label className="mr-4">
                Extra equipment for an extra price of $500
              </Label>
              <CheckboxWrapper
                checked={addEquipment}
                onChange={setAddEquipment}
              />
            </div>
            <div className="w-full">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </motion.form>
        </Card>
      </div>
    </motion.div>
  );
}

export default RentCar;

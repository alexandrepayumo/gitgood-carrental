import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Card } from "../ui/card";
import { motion } from "framer-motion";
import { branches, mockVehicles } from "../../lib/mockdata";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
} from "../ui/select";
import { getVehiclesByBranch, getVehicle } from "../api/vehicles";
import { getBranches, getBranch } from "../api/branches";
import { getUsers, getUser } from "../api/users";
import { format } from 'date-fns';

function SearchReservation({ onSearch, onCreateReservation }) {
  const [branches, setBranches] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users
    getBranches()
      .then(data => {
        setBranches(data);
      })
      .catch(error => {
        console.error('Error fetching branches:', error);
      });
  }, []); // Empty dependency array means this effect runs once on mount
  
  useEffect(() => {
    // Fetch branches
    getUsers()
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  //console.log(branches)

  const [branchVehicles, setBranchVehicles] = useState([]);

  const [targetUser, setTargetUser] = useState(null);
  const [bookingId, setBookingId] = useState("");
  const [location, setLocation] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [addEquipment, setAddEquipment] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(bookingId.toUpperCase());
  };

  const handleCreateReservation = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!targetUser) {
      validationErrors.user = "Please select a user";
    }
    if (!selectedBranch) {
      validationErrors.branch = "Please select a branch";
    }
    if (!selectedVehicle) {
      validationErrors.vehicle = "Please select a vehicle";
    }
    if (!pickupDate) {
      validationErrors.pickupDate = "Please select a pickup date";
    }
    if (!returnDate) {
      validationErrors.returnDate = "Please select a return date";
    }
    if (pickupDate && pickupDate < new Date()) {
      validationErrors.pickupDate = "Pickup date cannot be in the past";
    }
    if (returnDate && returnDate < new Date()) {
      validationErrors.returnDate = "Return date cannot be in the past";
    }
    if (pickupDate && returnDate && returnDate < pickupDate) {
      validationErrors.returnDate =
        "Return date cannot be before the pickup date";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onCreateReservation({
      user: targetUser.id,
      vehicle: selectedVehicle.id,
      startDate: format(pickupDate, 'yyyy-MM-dd'),
      endDate: format(returnDate, 'yyyy-MM-dd'),
      equipment: addEquipment,
    });
    setErrors({});
  };

  //console.log("Users:", users);
  //console.log("Branches:", branches);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="w-3/4 mx-auto flex flex-col items-center space-x-3 space-y-6 p-6">
        <form className="flex space-x-4" onSubmit={handleSearch}>
          <Input
            type="text"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            placeholder="Booking ID"
            className="w-full"
            required
          />
          <Button type="submit">Search</Button>
        </form>
        <form
          className="w-3/4 flex flex-col items-center space-y-6"
          onSubmit={handleCreateReservation}
        >
          <div className="w-full">
            <Label className="mb-2">User</Label>
            <Select
              value={targetUser}
              onValueChange={(value) => {
                if (typeof value === "string") return;
                getUser(value)
                  .then(data => {
                    setTargetUser(data);
                  })
                  .catch(error => {
                    console.error('Error fetching user:', error);
                  });
              }}
              // required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a user">
                  {(targetUser && `${targetUser.first_name} ${targetUser.last_name} (${targetUser.email})`) || "Select a user"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>User</SelectLabel>
                  {users.map((user) => {
                    return (
                      <SelectItem key={user.id} value={user.id}>
                        {user.first_name} {user.last_name} ({user.email})
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.user && (
              <p className="text-red-500 text-sm mt-1">{errors.user}</p>
            )}
          </div>
          <div className="w-full">
            <Label className="mb-2">Branch</Label>
            <Select
              value={selectedBranch}
              onValueChange={(value) => {
                if (typeof value === "string") return;
  
                getBranch(value)
                  .then(dataBranch => {
                    setSelectedBranch(dataBranch);

                    console.log(dataBranch);
                    console.log(dataBranch.id, typeof dataBranch.id);

                    // Fetch vehicles for the selected branch
                    getVehiclesByBranch(dataBranch.id)
                      .then(dataVehicles => {
                        console.log(dataVehicles)
                        setBranchVehicles(dataVehicles); // Assuming you have a state for branch vehicles
                      })
                      .catch(error => {
                        console.error('Error fetching vehicles by branch:', error);
                      });
                  })
                  .catch(error => {
                    console.error('Error fetching branch:', error);
                  });

                setSelectedVehicle("");
              }}
              // required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a branch">
                  {selectedBranch.name}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                <SelectLabel>Branches</SelectLabel>
                {branches.map((branch) => {
                  return (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  );
                })}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.branch && (
              <p className="text-red-500 text-sm mt-1">{errors.branch}</p>
            )}
          </div>
          <div className="w-full">
            <Label className="mb-2">Vehicle</Label>
            <Select
              value={selectedVehicle}
              onValueChange={(value) => {
                  if (typeof value === "string") return;
                  getVehicle(value)
                  .then(data => {
                    setSelectedVehicle(data);
                  })
                  .catch(error => {
                    console.error('Error fetching vehicle:', error);
                  });
                }
              }
              // required
              disabled={!selectedBranch}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a vehicle">
                  {(selectedVehicle && `${selectedVehicle.brand} ${selectedVehicle.model}`) || "Select a vehicle"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Vehicles</SelectLabel>
                  {selectedBranch &&
                    branchVehicles.map((vehicle) => (
                      <SelectItem key={`vehicle-${vehicle.id}`} value={vehicle.id}>
                        {vehicle.brand} {vehicle.model}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.vehicle && (
              <p className="text-red-500 text-sm mt-1">{errors.vehicle}</p>
            )}
          </div>
          <div className="w-full">
            <Label className="mb-2">Pickup Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {pickupDate ? (
                    pickupDate.toDateString()
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
                  required
                  minDate={new Date()}
                />
              </PopoverContent>
            </Popover>
            {errors.pickupDate && (
              <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>
            )}
          </div>
          <div className="w-full">
            <Label className="mb-2">Return Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate ? (
                    returnDate.toDateString()
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
                  required
                  minDate={pickupDate || new Date()}
                />
              </PopoverContent>
            </Popover>
            {errors.returnDate && (
              <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>
            )}
          </div>
          <div className="w-full flex items-center justify-between">
            <Label className="mr-4">Extra Equipment ($500)</Label>
            <Checkbox
              checked={addEquipment}
              onCheckedChange={setAddEquipment}
            />
          </div>
          <div className="w-full">
            <Button type="submit" className="w-full">
              Create Reservation
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}

SearchReservation.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onCreateReservation: PropTypes.func.isRequired,
};

export default SearchReservation;

import React, {useState} from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PropTypes from "prop-types";

const RentalAgreementStep = ({ onComplete, reservation }) => {
  const [renterName, setRenterName] = useState("");
  const currentDate = new Date().toLocaleDateString();

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(renterName);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-4">Rental Agreement</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label>Introduction</Label>
          <Textarea
            rows={4}
            readOnly
            value={`This Rental Agreement ("Agreement") is entered into between [Car Rental Agency Name], located at [Address], hereinafter referred to as the "Rental Company," and the individual or entity identified below, hereinafter referred to as the "Renter."`}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="rentalAgreementNumber">Rental Agreement Number</Label>
          <Input
            id="rentalAgreementNumber"
            value={reservation.id}
            readOnly
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="pickupLocation">Pick-up Location</Label>
          <Input id="pickupLocation" value={reservation.vehicle.branch} readOnly />
        </div>
        <div className="mb-4">
          <Label htmlFor="rentalStartDate">Rental Start Date</Label>
          <Input
            id="rentalStartDate"
            value={reservation.start_date}
            readOnly
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="rentalEndDate">Rental End Date</Label>
          <Input
            id="rentalEndDate"
            value={reservation.end_date}
            readOnly
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="vehicleBrand">Vehicle Brand</Label>
          <Input
            id="vehicleBrand"
            value={reservation.vehicle.brand}
            readOnly
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="vehicleModel">Vehicle Model</Label>
          <Input
            id="vehicleModel"
            value={reservation.vehicle.model}
            readOnly
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="additionalServices">Additional Services</Label>
          <Input
            id="additionalServices"
            value={reservation.addEquipment ? "Extra Equipment" : "None"}
            readOnly
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="termsAndConditions">
            Terms and Conditions (Read-only)
          </Label>
          <Textarea
            id="termsAndConditions"
            rows={12}
            readOnly
            value={`1. The Renter acknowledges receiving the vehicle described above in good condition and agrees to return it to the Rental Company in the same condition, subject to normal wear and tear.
2. The Renter agrees to use the vehicle solely for personal or business purposes and not for any illegal activities.
3. The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental period. Additional charges may apply for exceeding the mileage limit, late returns, fuel refueling, or other damages.
4. The Renter agrees to bear all costs associated with traffic violations, tolls, and parking fines incurred during the rental period.
5. The Renter acknowledges that they are responsible for any loss or damage to the vehicle, including theft, vandalism, accidents, or negligence, and agrees to reimburse the Rental Company for all repair or replacement costs.
6. The Renter agrees to return the vehicle to the designated drop-off location at the agreed-upon date and time. Failure to do so may result in additional charges.
7. The Rental Company reserves the right to terminate this agreement and repossess the vehicle without prior notice if the Renter breaches any terms or conditions of this agreement.
8. The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance coverage and agrees to comply with all insurance requirements during the rental period.

5. Indemnification:
The Renter agrees to indemnify and hold harmless the Rental Company, its employees, agents, and affiliates from any claims, liabilities, damages, or expenses arising out of or related to the Renter's use of the vehicle.

6. Governing Law:
This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising under or related to this Agreement shall be resolved exclusively by the courts of [Jurisdiction].

7. Entire Agreement:
This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.

8. Signatures:
The parties hereto have executed this Agreement as of the date first written above.`}
          />
        </div>
        <div className="mb-4">
          <Label>Rental Company</Label>
          <Input value="Git Good Rentals" readOnly />
        </div>
        <div className="mb-4">
          <Label htmlFor="rentalCompanyName">Representative name</Label>
          <Input
            id="rentalCompanyName"
            placeholder="Type the rental company representative's name"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="renterName">Renter Name</Label>
          <Input
            id="renterName"
            placeholder="Type your name"
            value={renterName}
            onChange={(e) => setRenterName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label>Date</Label>
          <Input value={currentDate} readOnly />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Agree and Continue</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default RentalAgreementStep;

RentalAgreementStep.propTypes = {
  onComplete: PropTypes.func.isRequired,
  reservation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    vehicle: PropTypes.shape({
      brand: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      branch: PropTypes.number.isRequired,
    }).isRequired,
    addEquipment: PropTypes.bool,
  }).isRequired,
};

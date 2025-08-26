import React, { useState } from "react";
import CarDetailsForm from "../forms/CarDetailsForm";
import VehicleTypeSelector from "./VehicleTypeSelector";
import BikeDetailsForm from "../forms/BikeDetailsForm";

const AddVehicleFlow = ({ onSuccess }) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);

  const handleBack = () => {
    setSelectedVehicleType(null);
  };

  if (!selectedVehicleType) {
    return <VehicleTypeSelector onSelect={setSelectedVehicleType} />;
  }
  switch (selectedVehicleType) {
    case "car":
      return <CarDetailsForm onSuccess={onSuccess} onBack={handleBack} />;
    case "bike":
      return <BikeDetailsForm onSuccess={onSuccess} onBack={handleBack} />;
    case "caravan":
      return (
        <div>
          Caravan Form coming soon! <button onClick={handleBack}>Back</button>
        </div>
      );
    case "motorhomes":
      return (
        <div>
          Motorhomes Form coming soon!{" "}
          <button onClick={handleBack}>Back</button>
        </div>
      );
    default:
      return <button onClick={handleBack}>Invalid selection. Go Back</button>;
  }
};

export default AddVehicleFlow;

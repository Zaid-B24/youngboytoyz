import React, { useState } from "react";
import CarDetailsForm from "../forms/CarDetailsForm";
import VehicleTypeSelector from "./VehicleTypeSelector";
import BikeDetailsForm from "../forms/BikeDetailsForm";
import { useNavigate } from "react-router-dom";

const AddVehicleFlow = ({ onSuccess }) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (vehicleType) => {
    if (vehicleType === "car") {
      navigate("/admin/cars", { state: { openAddForm: true } });
    } else if (vehicleType === "bike") {
      navigate("/admin/bikes");
    }
  };

  const handleBack = () => {
    setSelectedVehicleType(null);
  };

  if (!selectedVehicleType) {
    return <VehicleTypeSelector onSelect={handleSelect} />;
  }
  switch (selectedVehicleType) {
    case "caravan":
      return (
        <div>
          Coming soon! <button onClick={handleBack}>Back</button>
        </div>
      );
    case "motorhomes":
      return (
        <div>
          Coming soon! <button onClick={handleBack}>Back</button>
        </div>
      );
    default:
      return <button onClick={handleBack}>Invalid selection. Go Back</button>;
  }
};

export default AddVehicleFlow;

import React, { useState } from "react";
import CarDetailsForm from "../forms/CarDetailsForm";
import VehicleTypeSelector from "./VehicleTypeSelector";

// Imagine you have these other forms created as well
// import BikeDetailsForm from './BikeDetailsForm';
// import CaravanDetailsForm from './CaravanDetailsForm';

// This component receives the `onSuccess` prop to close the entire modal
const AddVehicleFlow = ({ onSuccess }) => {
  // State to track which vehicle type is selected. Starts with null.
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);

  const handleBack = () => {
    setSelectedVehicleType(null); // Reset state to go back to the selection screen
  };

  // Conditionally render the correct component based on state
  if (!selectedVehicleType) {
    // If no type is selected, show the selector.
    // Pass the state setter function `setSelectedVehicleType` as a prop.
    return <VehicleTypeSelector onSelect={setSelectedVehicleType} />;
  }

  // If a type IS selected, show the corresponding form
  switch (selectedVehicleType) {
    case "car":
      return <CarDetailsForm onSuccess={onSuccess} onBack={handleBack} />;
    case "bike":
      // You would render your BikeDetailsForm here
      // return <BikeDetailsForm onSuccess={onSuccess} onBack={handleBack} />;
      return (
        <div>
          Bike Form coming soon! <button onClick={handleBack}>Back</button>
        </div>
      );
    case "caravan":
      // You would render your CaravanDetailsForm here
      // return <CaravanDetailsForm onSuccess={onSuccess} onBack={handleBack} />;
      return (
        <div>
          Caravan Form coming soon! <button onClick={handleBack}>Back</button>
        </div>
      );
    default:
      // Fallback in case something unexpected happens
      return <button onClick={handleBack}>Invalid selection. Go Back</button>;
  }
};

export default AddVehicleFlow;

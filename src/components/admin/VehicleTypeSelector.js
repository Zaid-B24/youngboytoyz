import styled from "styled-components";

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

const VehicleButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1rem;
  width: 100%;
  cursor: pointer;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

// This component receives a function `onSelect` via props
const VehicleTypeSelector = ({ onSelect }) => {
  return (
    <SelectorContainer>
      <h3>What type of vehicle do you want to add?</h3>
      <VehicleButton onClick={() => onSelect("car")}>🚗 Car</VehicleButton>
      <VehicleButton onClick={() => onSelect("bike")}>🏍️ Bike</VehicleButton>
      <VehicleButton onClick={() => onSelect("caravan")}>
        🚐 Caravan
      </VehicleButton>
    </SelectorContainer>
  );
};

export default VehicleTypeSelector;

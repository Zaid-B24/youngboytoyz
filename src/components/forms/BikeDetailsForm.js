import {
  Bike,
  Calendar,
  DollarSign,
  Fuel,
  Gauge,
  Hash,
  Image,
  Shield,
  Tag,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import styled from "styled-components";

const BikeDetailsForm = ({ onSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    title: "",
    listedBy: "",
    registrationYear: new Date().getFullYear(),
    kmsDriven: 0,
    ownerCount: 0,
    registrationNumber: "",
    description: "",
    badges: [],
    vipNumber: false,
    sellingPrice: 0.0,
    cutOffPrice: 0.0,
    ybtPrice: 0.0,
    insurance: "",
    bikeUSP: "",
    fuelType: "",
    brand: "",
    bikeImages: [],
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e, fieldName) => {
    if (fieldName === "bikeImages") {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        bikeImages: [...prev.bikeImages, ...files],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: e.target.files[0],
      }));
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      bikeImages: prev.bikeImages.filter((_, i) => i !== index),
    }));
  };

  const addBadge = () => {
    setFormData((prev) => ({
      ...prev,
      badges: [...prev.badges, ""],
    }));
  };

  const updateBadge = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      badges: prev.badges.map((badge, i) => (i === index ? value : badge)),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // This part for populating FormData remains the same
    Object.keys(formData).forEach((key) => {
      if (key !== "bikeImages" && key !== "badges") {
        data.append(key, formData[key]);
      }
    });
    if (formData.bikeImages && formData.bikeImages.length > 0) {
      formData.bikeImages.forEach((file) => {
        data.append("bikeImages", file);
      });
    }
    formData.badges.forEach((badge) => {
      if (badge.trim()) {
        data.append("badges", badge.trim());
      }
    });

    try {
      const response = await fetch("http://localhost:5001/api/bikes", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Car added", responseData);

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error uploading", error);
    }
  };

  const inputFields = [
    // Your inputFields array remains the same
    {
      key: "title",
      label: "Bike Name",
      placeholder: "Splender+",
      icon: Bike,
    },
    {
      key: "description",
      label: "Bike Description",
      placeholder: "e.g., Great Car",
      icon: Bike,
    },
    {
      key: "listedBy",
      label: "Listed By",
      placeholder: "Dealer/Owner name",
      icon: Users,
    },
    {
      key: "registrationYear",
      label: "Registration Year",
      placeholder: "e.g., 2001",
      type: "number",
      icon: Calendar,
    },
    {
      key: "kmsDriven",
      label: "Kilometers Driven",
      placeholder: "e.g., 45,000 km",
      icon: Gauge,
    },
    {
      key: "ownerCount",
      label: "Number of Owners",
      placeholder: "e.g., 1, 2, 3",
      icon: Users,
    },
    {
      key: "registrationNumber",
      label: "Registration Number",
      placeholder: "e.g., MH12AB1234",
      icon: Hash,
    },
    { key: "brand", label: "Brand", placeholder: "Hero", icon: Bike },
    { key: "insurance", label: "Insurance", placeholder: "Yes", icon: Shield },
    {
      key: "sellingPrice",
      label: "Selling Price",
      placeholder: "e.g., ₹8,50,000",
      icon: DollarSign,
    },
    {
      key: "cutOffPrice",
      label: "Cut Off Price",
      placeholder: "Minimum acceptable price",
      icon: DollarSign,
    },
    {
      key: "ybtPrice",
      label: "YBT Price",
      placeholder: "Your best offer price",
      icon: DollarSign,
    },
    {
      key: "bikeUSP",
      label: "Bike USP",
      placeholder: "Unique selling points",
      icon: Bike,
    },
    {
      key: "fuelType",
      label: "Fuel Type",
      placeholder: "Petrol/Diesel/CNG/Electric",
      icon: Fuel,
    },
  ];

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Enter Bike Details</Title>
      <Grid>
        {inputFields.map(
          ({ key, label, placeholder, type = "text", icon: Icon }) => (
            <Field key={key}>
              <Label>
                <Icon size={16} />
                <span>{label}</span>
              </Label>
              <Input
                type={type}
                placeholder={placeholder}
                value={formData[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            </Field>
          )
        )}
        <Field>
          <Label>
            <Tag size={16} />
            <span>Badges</span>
          </Label>
          {formData.badges.map((badge, index) => (
            <BadgeRow key={index}>
              <BadgeInput
                type="text"
                placeholder="e.g., Premium, Low Mileage"
                value={badge}
                onChange={(e) => updateBadge(index, e.target.value)}
              />
            </BadgeRow>
          ))}
          <AddBadgeButton type="button" onClick={addBadge}>
            + Add Badge
          </AddBadgeButton>
        </Field>
        <Field>
          <Label>
            <Hash size={16} />
            <span>VIP Number</span>
          </Label>
          <Select
            value={formData.vipNumber ? "yes" : "no"}
            onChange={(e) =>
              handleInputChange("vipNumber", e.target.value === "yes")
            }
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </Select>
        </Field>

        <FileInputContainer>
          <InputLabel>Bike Images</InputLabel>
          <FileInputWrapper
            className={formData.bikeImages.length > 0 ? "has-file" : ""}
          >
            <HiddenFileInput
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, "bikeImages")}
            />
            <FileInputContent>
              <FileInputIcon>
                {formData.bikeImages.length > 0 ? (
                  <Image size={24} />
                ) : (
                  <Upload size={24} />
                )}
              </FileInputIcon>
              <FileInputText>
                {formData.bikeImages.length > 0
                  ? `${formData.bikeImages.length} Images Selected`
                  : "Click to upload images"}
              </FileInputText>
              <FileInputSubtext>
                {formData.bikeImages.length > 0
                  ? "Click to add more images"
                  : "PNG, JPG up to 10MB each"}
              </FileInputSubtext>
            </FileInputContent>
          </FileInputWrapper>
          {formData.bikeImages.length > 0 && (
            <ImagePreviewContainer>
              {formData.bikeImages.map((image, index) => (
                <SelectedFile key={index}>
                  <FileInfo>
                    <Image size={16} />
                    <span>{image.name}</span>
                  </FileInfo>
                  <RemoveButton
                    type="button"
                    onClick={() => removeImage(index)}
                  >
                    <X size={16} />
                  </RemoveButton>
                </SelectedFile>
              ))}
            </ImagePreviewContainer>
          )}
        </FileInputContainer>
      </Grid>

      {/* ✨ FIX: Created a single actions container at the bottom of the form */}
      <FormActions>
        <BackButton type="button" onClick={onBack}>
          &larr; Back
        </BackButton>
        <SubmitButton type="submit">
          <Bike size={16} />
          <span>Add Bike</span>
        </SubmitButton>
      </FormActions>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  padding: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem; /* Increased gap for better spacing */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

// ✨ FIX: This new style will make the file input span both columns
const FileInputContainer = styled.div`
  grid-column: 1 / -1; /* This makes the element span all columns */
  margin-top: 1rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff5f5;
  font-size: 0.875rem; /* Adjusted for consistency */
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const inputStyles = `
  width: 100%;
  background: #000;
  border: 1px solid #7f1d1d;
  border-radius: 8px; /* Slightly less rounded */
  padding: 0.75rem;
  color: white;
  transition: border 0.2s, background 0.2s;

  &:focus {
    border-color: #ff0000;
    outline: none;
    background: #1a1a1a;
  }
`;

const Input = styled.input`
  ${inputStyles}
`;
const Select = styled.select`
  ${inputStyles}
`;
const BadgeInput = styled.input`
  ${inputStyles}
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const AddBadgeButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #fca5a5;
  background: transparent;
  border: 1px solid #7f1d1d;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  align-self: flex-start; /* Prevents button from stretching */

  &:hover {
    background-color: #7f1d1d;
    color: white;
  }
`;

const FileInputWrapper = styled.label`
  /* Styles remain the same */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  min-height: 120px;

  &:hover {
    border-color: rgba(255, 0, 0, 0.5);
    background: rgba(255, 0, 0, 0.05);
  }
  &.has-file {
    border-color: rgba(34, 197, 94, 0.5);
    background: rgba(34, 197, 94, 0.05);
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;
const FileInputContent = styled.div`
  /* Styles remain the same */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
`;
const FileInputIcon = styled.div`
  /* Styles remain the same */
  padding: 1rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;

  ${FileInputWrapper}:hover & {
    background: rgba(255, 0, 0, 0.2);
    color: #ff0000;
  }

  ${FileInputWrapper}.has-file & {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
  }
`;
const FileInputText = styled.div`
  /* Styles remain the same */
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  font-weight: 500;
`;
const FileInputSubtext = styled.div`
  /* Styles remain the same */
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
`;

const ImagePreviewContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SelectedFile = styled.div`
  /* Styles remain the same */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem; /* Adjusted padding */
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 8px;
  color: #22c55e;
  font-size: 0.875rem;
`;
const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const RemoveButton = styled.button`
  /* Styles remain the same */
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }
`;
const InputLabel = styled.label`
  /* Styles remain the same */
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  letter-spacing: 0.025em;
`;

// ✨ FIX: Renamed 'Actions' to 'FormActions' and updated styles
const FormActions = styled.div`
  display: flex;
  justify-content: space-between; /* This is the key change */
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  margin-top: 1.5rem; /* Added margin for separation */
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const BackButton = styled.button`
  padding: 0.75rem 1.5rem; /* Matched padding with submit */
  font-size: 0.9rem;
  font-weight: 600;
  background-color: transparent;
  color: #a0a0a0;
  border: 1px solid #555;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background: black;
  color: #ff4d4d;
  font-weight: 600;
  border: 1px solid #ff0000;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  transition: transform 0.2s, background 0.2s;

  &:hover {
    transform: scale(1.05);
    background: #111;
    color: white;
  }
`;

const Title = styled.h2`
  color: #ffffff;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 2rem 0;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -0.75rem;
    left: 0;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #1d4ed8);
    border-radius: 1px;
  }
`;

export default BikeDetailsForm;

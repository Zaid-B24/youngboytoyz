import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  ArrowLeft,
  CheckCircle,
  Fuel,
  Gauge,
  MapPin,
  Shield,
  Star,
  UserCircle,
  Users,
} from "lucide-react";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

const CarInfoPage = () => {
  // ----------------- Hooks & State -----------------
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // ----------------- Handlers -----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(
      "Thank you for reserving the car! We’ll notify you with details shortly."
    );
  };

  // ----------------- Static Vehicle Fallback -----------------
  const vehicle = {
    id: 1,
    title: "BMW M3 Competition",
    description:
      "Experience the thrill of German engineering with this high-performance sedan featuring twin-turbo power and precision handling. The BMW M3 Competition represents the pinnacle of sports sedan excellence, combining everyday usability with track-ready performance. Its aggressive styling, advanced aerodynamics, and meticulously tuned chassis deliver an uncompromising driving experience.",
    category: "Cars",
    brand: "BMW",
    location: "Mumbai",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    ],
    badges: ["LUXURY", "PERFORMANCE"],
    rating: 4.8,
    reviewCount: 127,
    dailyPrice: "₹15,000",
    monthlyPrice: "₹3,50,000",
    specs: {
      engine: "3.0L Twin-Turbo I6",
      power: "503 HP",
      transmission: "8-Speed Auto",
      drivetrain: "RWD",
      fuelType: "Petrol",
      seating: "4 Passengers",
    },
    features: [
      "Adaptive M Suspension",
      "M Performance Exhaust",
      "Carbon Fiber Interior",
      "Premium Sound System",
      "Advanced Driver Assistance",
      "Sport Seats with Memory",
      "Wireless Charging",
      "Premium Leather Interior",
      "Adaptive LED Headlights",
      "M Sport Brakes",
      "Launch Control",
      "Multiple Driving Modes",
    ],
  };

  // ----------------- API Fetch -----------------
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/cars/${id}`);
        if (!response.ok) throw new Error("Car not found");

        const data = await response.json();
        setCar(data);
        console.log("Car data from state:", data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  // ----------------- Conditional States -----------------
  if (loading) return <PageWrapper>Loading car details...</PageWrapper>;
  if (error) return <PageWrapper>Error: {error}</PageWrapper>;
  if (!car) return <PageWrapper>Car not found</PageWrapper>;

  // ----------------- Render -----------------
  return (
    <PageWrapper>
      <Container>
        <StyledToastContainer />

        {/* Back Button */}
        <BackButton to="/models">
          <ArrowLeft size={16} />
          Back to Models
        </BackButton>

        {/* Header Section */}
        <VehicleHeader>
          {/* Left: Images & Details */}
          <ImageSection>
            <MainImage image={car.carImages[selectedImage]}>
              <ImageBadges>
                {car.badges.map((badge, index) => (
                  <ImageBadge key={index}>{badge}</ImageBadge>
                ))}
              </ImageBadges>
            </MainImage>

            <ThumbnailGrid>
              {car.carImages.map((image, index) => (
                <Thumbnail
                  key={index}
                  image={image}
                  active={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </ThumbnailGrid>

            {/* Vehicle Description */}
            <DetailsSection>
              <SectionTitle>About This Vehicle</SectionTitle>
              <Description>{car.description}</Description>
            </DetailsSection>

            {/* Specifications */}
            <DetailsSection>
              <SectionTitle>Specifications</SectionTitle>
              <SpecsGrid>
                <SpecItem>
                  <SpecIcon>
                    <Fuel size={20} />
                  </SpecIcon>
                  <SpecLabel>Engine</SpecLabel>
                  <SpecValue>{vehicle.specs.engine}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecIcon>
                    <Gauge size={20} />
                  </SpecIcon>
                  <SpecLabel>Kms Driven</SpecLabel>
                  <SpecValue>{car.kmsDriven}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecIcon>
                    <Fuel size={20} />
                  </SpecIcon>
                  <SpecLabel>Power</SpecLabel>
                  <SpecValue>{vehicle.specs.power}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecIcon>
                    <Fuel size={20} />
                  </SpecIcon>
                  <SpecLabel>Transmission</SpecLabel>
                  <SpecValue>{vehicle.specs.transmission}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecIcon>
                    <Users size={20} />
                  </SpecIcon>
                  <SpecLabel>Seating</SpecLabel>
                  <SpecValue>{vehicle.specs.seating}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecIcon>
                    <Fuel size={20} />
                  </SpecIcon>
                  <SpecLabel>Fuel Type</SpecLabel>
                  <SpecValue>{car.fuelType}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecIcon>
                    <Fuel size={20} />
                  </SpecIcon>
                  <SpecLabel>Drivetrain</SpecLabel>
                  <SpecValue>{vehicle.specs.drivetrain}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecIcon>
                    <UserCircle />
                  </SpecIcon>
                  <SpecLabel>Listed By</SpecLabel>
                  <SpecValue>{car.listedBy}</SpecValue>
                </SpecItem>
              </SpecsGrid>
            </DetailsSection>
          </ImageSection>

          {/* Right: Booking Section */}
          <BookingSection>
            <VehicleTitle>{car.title}</VehicleTitle>

            <VehicleRating>
              <RatingStars>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={
                      i < Math.floor(vehicle.rating) ? "currentColor" : "none"
                    }
                    color="#fbbf24"
                  />
                ))}
              </RatingStars>
              <RatingText>
                {vehicle.rating} ({vehicle.reviewCount} reviews)
              </RatingText>
            </VehicleRating>

            <VehicleLocation>
              <MapPin size={16} />
              Available in {vehicle.location}
            </VehicleLocation>

            {/* Booking Form */}
            <BookingForm onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel>Name</FormLabel>
                <FormInput
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Phone Number *</FormLabel>
                <FormInput
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Address</FormLabel>
                <FormInput
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </FormGroup>
              <SubmitButton>Reserve Now</SubmitButton>
            </BookingForm>
          </BookingSection>
        </VehicleHeader>

        {/* Features & Policies */}
        <VehicleDetails>
          <DetailsContent>
            <DetailsSection>
              <SectionTitle>Features & Amenities</SectionTitle>
              <FeatureList>
                {vehicle.features.map((feature, index) => (
                  <FeatureItem key={index}>
                    <CheckCircle size={16} color="#22c55e" />
                    {feature}
                  </FeatureItem>
                ))}
              </FeatureList>
            </DetailsSection>
          </DetailsContent>

          <PolicySection>
            <PolicyTitle>
              <Shield size={20} style={{ marginRight: "0.5rem" }} />
              Reserving Policies
            </PolicyTitle>
            <PolicyList>
              <PolicyItem>Valid driving license required</PolicyItem>
              <PolicyItem>Minimum age: 25 years</PolicyItem>
              <PolicyItem>Security deposit: ₹50,000</PolicyItem>
              <PolicyItem>Fuel: Return with same level</PolicyItem>
              <PolicyItem>Insurance included</PolicyItem>
              <PolicyItem>24/7 roadside assistance</PolicyItem>
              <PolicyItem>Free cancellation up to 24 hours</PolicyItem>
              <PolicyItem>Additional driver: ₹500/day</PolicyItem>
              <PolicyItem>Late return: ₹500/hour</PolicyItem>
              <PolicyItem>Smoking prohibited</PolicyItem>
            </PolicyList>
          </PolicySection>
        </VehicleDetails>
      </Container>
    </PageWrapper>
  );
};

export default CarInfoPage;

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

// ========== Layout & Containers ==========
const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

// ========== Headings & Titles ==========
const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const VehicleTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #fff;
`;

const PolicyTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #fff;
`;

// ========== Vehicle Layout ==========
const VehicleHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const VehicleDetails = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const DetailsContent = styled.div``;

const DetailsSection = styled.section`
  margin-bottom: 2rem;

  &:first-child {
    margin-top: 0;
  }
`;

const Description = styled.p`
  color: #ccc;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

// ========== Image Section ==========
const ImageSection = styled.div``;

const MainImage = styled.div`
  height: 400px;
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  border-radius: 10px;
  margin-bottom: 1rem;
  position: relative;
`;

const ImageBadges = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ImageBadge = styled.span`
  background: rgba(34, 197, 94, 0.9);
  color: #fff;
  padding: 0.3rem 0.8rem;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 20px;
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
`;

const Thumbnail = styled.div`
  height: 80px;
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.active ? "#fff" : "transparent")};
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

// ========== Feature Section ==========
const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #2a2a2a;
`;

const FeatureItem = styled.div`
  background-color: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  & > svg {
    color: #00bfff;
    flex-shrink: 0;
  }

  & > div {
    display: flex;
    flex-direction: column;
  }

  & span {
    font-size: 0.8rem;
    color: #888;
    text-transform: uppercase;
  }

  & strong {
    font-size: 1rem;
    color: #e0e0e0;
  }
`;

// ========== Specs Section ==========
const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SpecItem = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 1rem;
  text-align: center;
`;

const SpecIcon = styled.div`
  color: #22c55e;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
`;

const SpecLabel = styled.div`
  font-size: 0.8rem;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.3rem;
`;

const SpecValue = styled.div`
  font-weight: 600;
  color: #fff;
`;

// ========== Booking Section ==========
const BookingSection = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 120px;
`;

const BookingForm = styled.form`
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: #fff;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

// ========== Buttons & Links ==========
const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: #fff;
  border: none;
  padding: 1.2rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 2rem 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
    background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  text-decoration: none;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

// ========== Policy Section ==========
const PolicySection = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
`;

const PolicyList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PolicyItem = styled.li`
  color: #ccc;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;

  &:before {
    content: "•";
    color: #22c55e;
    position: absolute;
    left: 0;
  }
`;

// ========== Rating & Location ==========
const VehicleRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const RatingStars = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const RatingText = styled.span`
  color: #ccc;
  font-size: 0.9rem;
`;

const VehicleLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  margin-bottom: 2rem;
`;

// ========== Toast Styles ==========
const StyledToastContainer = styled(ToastContainer).attrs({
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  CloseButton: false,
  pauseOnHover: true,
  draggable: true,
  transition: Slide,
})`
  .Toastify__toast {
    font-family: "Poppins", sans-serif;
    border-radius: 10px;
    padding: 16px;
    font-size: 0.95rem;
    box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
  }

  .Toastify__toast--error {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
  }

  .Toastify__toast--info {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
  }

  .Toastify__progress-bar {
    background: rgba(255, 255, 255, 0.7);
  }
`;

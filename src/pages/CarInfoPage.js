import {
  Calendar,
  Car,
  Crown,
  Disc3,
  Fingerprint,
  Fuel,
  Gauge,
  Image,
  Info,
  Phone,
  Podcast,
  ShieldCheck,
  Sparkles,
  UserCircle,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import BrandLogo from "../components/common/BrandLogo";

const NavigationTabs = styled.div`
  background: #111;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 2rem;
  position: sticky;
  top: 100px;
  z-index: 100;
  padding-bottom: 10px;
`;

const TabsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 3rem;
  overflow-x: auto;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const HeroButton = styled.button`
  background: ${(props) => (props.primary ? "#fff" : "transparent")};
  color: ${(props) => (props.primary ? "#000" : "#fff")};
  border: 1px solid
    ${(props) => (props.primary ? "#fff" : "rgba(255,255,255,0.5)")};
  padding: 0.8rem 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.primary ? "#f0f0f0" : "rgba(255,255,255,0.1)"};
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 8px;
  object-fit: cover; // This makes the image fill the space without stretching
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const TabActionButton = styled(Link)`
  margin-left: auto; /* This is the magic part! */
  align-self: center; /* Ensures it's vertically centered with the tabs */

  /* Styling to make it look good */
  background: #fff;
  color: #000;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.active ? "#fff" : "#666")};
  padding: 1rem 0;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;

  display: flex;
  align-items: center;
  gap: 8px;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${(props) => (props.active ? "100%" : "0")};
    height: 2px;
    background: #fff;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #fff;
  }
`;

const ContentSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  text-transform: uppercase;
`;

const DescriptionWrapper = styled.div`
  max-width: 80ch; // Optimal line-length for readability
  margin: 0 auto;
`;

const DescriptionHeader = styled.div`
  display: flex;
  justify-content: space-between; /* Pushes items to opposite ends */
  align-items: center; /* Vertically aligns them */
  margin-bottom: 2rem; /* Space below the header */
  gap: 2rem;
`;

// Tweak the subtitle to remove its bottom margin, as the header now handles it
const DescriptionSubTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 500;
  color: #e0e0e0;
  margin: 0; /* Remove margin from the subtitle itself */
`;

const DescriptionText = styled.p`
  font-size: 1.1rem;
  color: #b0b0b0; // Slightly softer than pure white for easier reading
  line-height: 1.8; // Generous line spacing is key for readability
  margin-bottom: 2rem;
`;

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
    color: #00bfff; // Match your other icon colors
    flex-shrink: 0; // Prevents the icon from shrinking
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

// --- Icon Grid Styles ---
const IconSpecGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
`;

const IconSpecItem = styled.div`
  background-color: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SpecIcon = styled.div`
  color: #00bfff;
  margin-bottom: 15px;
  & > svg {
    width: 36px;
    height: 36px;
  }
`;

const SpecLabel = styled.p`
  font-size: 0.85rem;
  color: #888;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`;

const SpecValue = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const VIPBadge = styled.span`
  background-color: #ffd700;
  color: #000;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

// --- You should already have these styles, but including them for completeness ---
const PageWrapper = styled.div`
  padding-top: 100px;
  background: #000;
  color: #fff;
  min-height: 100vh;
`;

const HeroSection = styled.section`
  position: relative;
  height: 80vh;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
    url("https://www.mansory.com/sites/default/files/styles/hero_large/public/2024-03/bmw-m5-hero.jpg")
      center center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const CarInfoPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("introduction");

  const tabs = [
    { id: "introduction", label: "Details", icon: <Info size={16} /> },
    { id: "gallery", label: "Gallery", icon: <Image size={16} /> },
    { id: "description", label: "Description", icon: <Podcast /> },
  ];

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/cars/${id}`);
        if (!response.ok) {
          throw new Error("Car not found");
        }
        const data = await response.json();
        setCar(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) return <PageWrapper>Loading car details...</PageWrapper>;
  if (error) return <PageWrapper>Error: {error}</PageWrapper>;
  if (!car) return <PageWrapper>Car not found</PageWrapper>;

  const specifications = [
    {
      label: "Registration Year",
      value: car.registrationYear,
      icon: <Calendar />,
    },
    {
      label: "KMs Driven",
      value: car.kmsDriven.toLocaleString(),
      icon: <Gauge />,
    },
    { label: "Fuel Type", value: car.fuelType, icon: <Fuel /> },
    {
      label: "No. of owners",
      value: `${car.ownerCount}`,
      icon: <Users />,
    },
    { label: "Insurance", value: car.insurance, icon: <ShieldCheck /> },
    { label: "Listed By", value: car.listedBy, icon: <UserCircle /> },
    { label: "Car USP", value: car.carUSP, icon: <Sparkles /> },
    {
      label: "Registration No.",
      value: car.registrationNumber,
      isVip: car.vipNumber,
      icon: <Fingerprint />,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "introduction":
        return (
          <ContentSection>
            <IconSpecGrid>
              {specifications.map((spec) => (
                <IconSpecItem key={spec.label}>
                  <SpecIcon>{spec.icon}</SpecIcon>
                  <SpecLabel>{spec.label}</SpecLabel>
                  <SpecValue>
                    {spec.value}
                    {spec.isVip && (
                      <VIPBadge>
                        <Crown size={12} /> VIP
                      </VIPBadge>
                    )}
                  </SpecValue>
                </IconSpecItem>
              ))}
            </IconSpecGrid>
          </ContentSection>
        );

      case "gallery":
        return (
          <ContentSection>
            <GalleryGrid>
              {car.carImages && car.carImages.length > 0 ? (
                car.carImages.map((imageUrl, index) => (
                  <GalleryImage
                    key={index}
                    src={imageUrl} // Use the URL string directly
                    alt={`${car.title} - Image ${index + 1}`}
                  />
                ))
              ) : (
                <p>No images available for this car.</p>
              )}
            </GalleryGrid>
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <HeroButton>Show More</HeroButton>
            </div>
          </ContentSection>
        );

      case "description":
        return (
          <ContentSection>
            <SectionTitle>Vehicle Description</SectionTitle>
            <DescriptionWrapper>
              <DescriptionHeader>
                <DescriptionSubTitle>
                  Engineered for the Edge: The BMW M5
                </DescriptionSubTitle>
                <BrandLogo brand={car.brand} />
              </DescriptionHeader>
              <DescriptionText>
                The BMW M5 is not just a sedan; it's a declaration of
                performance, a masterpiece of engineering where executive luxury
                collides with the raw, untamed spirit of a supercar. For
                decades, the M5 has been the benchmark for high-performance
                four-door vehicles, offering a dual personality that is equally
                at home on a serene commute as it is conquering the racetrack.
              </DescriptionText>
              <DescriptionText>
                At its heart lies a formidable 4.4-liter V8 engine with M
                TwinPower Turbo technology, delivering blistering acceleration
                and a visceral soundtrack that is pure adrenaline. Paired with
                the intelligent M xDrive all-wheel-drive system, the M5
                translates its immense power into breathtaking poise and
                command, offering both track-level precision and all-weather
                confidence.
              </DescriptionText>

              <FeatureList>
                <FeatureItem>
                  <Zap size={20} />
                  <div>
                    <span>Engine</span>
                    <strong>4.4L M TwinPower Turbo V8</strong>
                  </div>
                </FeatureItem>
                <FeatureItem>
                  <Gauge size={20} />
                  <div>
                    <span>Acceleration</span>
                    <strong>0-100 km/h in approx. 3.3s</strong>
                  </div>
                </FeatureItem>
                <FeatureItem>
                  <Users size={20} />
                  <div>
                    <span>Drivetrain</span>
                    <strong>M xDrive All-Wheel Drive</strong>
                  </div>
                </FeatureItem>
              </FeatureList>
            </DescriptionWrapper>
          </ContentSection>
        );

      default:
        return null;
    }
  };

  return (
    <PageWrapper>
      <HeroSection
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${
            car.carImages && car.carImages.length > 0
              ? car.carImages[0]
              : "/path/to/default-hero-image.jpg"
          })`,
        }}
      ></HeroSection>

      <NavigationTabs>
        <TabsContainer>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </Tab>
          ))}
          <TabActionButton to={`/reserve/${car.id}`}>
            <Phone size={14} />
            Enquire Now
          </TabActionButton>
        </TabsContainer>
      </NavigationTabs>

      {renderTabContent()}
    </PageWrapper>
  );
};

export default CarInfoPage;

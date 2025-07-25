import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const MainContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: ${props => props.filtersVisible ? '300px 1fr' : '1fr'};
  gap: ${props => props.filtersVisible ? '3rem' : '0'};
  transition: all 0.3s ease;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

// Sidebar Styles
const Sidebar = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0;
  height: fit-content;
  position: sticky;
  top: 120px;

  @media (max-width: 1200px) {
    position: static;
  }
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 55px;
`;

const FilterTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
`;

const FilterActionButton = styled.button`
  background: transparent;
  border: none;
  color: #ccc;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: #fff;
  }
`;

const ShowFiltersButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  padding: 0.75rem 1.5rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ResetButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: #fff;
  }
`;

const SearchContainer = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  font-size: 0.9rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: rgba(255, 255, 255, 0.5);
`;

const FilterSection = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const FilterSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`;

const FilterSectionTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
`;

const FilterOptions = styled.div`
  padding: 0 1.5rem 1.5rem;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

const FilterCheckbox = styled.input`
  width: 16px;
  height: 16px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
`;

const FilterLabel = styled.label`
  font-size: 0.9rem;
  color: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

// Main Content Styles
const MainContent = styled.div``;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ResultsCount = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  margin: 0;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SortSelect = styled.select`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;

  option {
    background: #333;
    color: #fff;
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CarCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-5px);
  }
`;

const CarCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const CarImage = styled.div`
  height: 250px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'} center center/cover no-repeat;
  position: relative;
`;

const CarBadges = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CarBadge = styled.span`
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.3rem 0.8rem;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
`;

const CarContent = styled.div`
  padding: 1.5rem;
`;

const CarTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const CarDescription = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const ModelsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filtersVisible, setFiltersVisible] = useState(true);
  
  // Filter states
  const [brandFilters, setBrandFilters] = useState({
    'Aston Martin': false,
    'Audi': false,
    'BMW': false,
    'BSTN GT XI': false,
    'Bentley': false,
    'Bugatti': false,
    'Ferrari': false,
    'Lamborghini': false,
    'Mercedes': false,
    'Porsche': false,
    'Tesla': false
  });

  const [modelFilters, setModelFilters] = useState({});
  const [brandSectionOpen, setBrandSectionOpen] = useState(true);
  const [modelSectionOpen, setModelSectionOpen] = useState(false);

  const models = [
    {
      id: "mansory-goes-art-collaboration",
      title: "YOUNG BOY TOYZ goes art – Collaboration with pop artist Alec Monopoly",
      description: "Exclusive artistic collaboration featuring unique design elements and limited edition styling.",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80",
      brand: "Mercedes",
      badges: ["WIDE BODY KIT", "LIMITED EDITION", "LATEST ADDITIONS", "ATELIER"]
    },
    {
      id: "bmw-m5-edition",
      title: "M5",
      description: "Ultimate performance sedan with carbon fiber aerodynamics and 850HP power upgrade.",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      brand: "BMW",
      badges: ["LATEST ADDITIONS"]
    },
    {
      id: "tesla-cybertruck-elongation",
      title: "Tesla Cybertruck Elongation EVO",
      description: "Revolutionary electric pickup with extended wheelbase and luxury interior.",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      brand: "Tesla",
      badges: ["ELECTRIC", "LATEST ADDITIONS"]
    },
    {
      id: "lamborghini-huracan-veneno",
      title: "Lamborghini Huracán Veneno",
      description: "Track-focused supercar with aggressive aerodynamics and lightweight construction.",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      brand: "Lamborghini",
      badges: ["ATELIER", "LATEST ADDITIONS", "ONE OF ONE", "WIDE BODY KIT"]
    },
    {
      id: "mercedes-g63-amg-gronos",
      title: "Mercedes G63 AMG Gronos",
      description: "Luxury SUV with wide body kit and performance enhancements.",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      brand: "Mercedes",
      badges: ["LUXURY", "WIDE BODY KIT"]
    },
    {
      id: "porsche-911-gt3-rs-stallion",
      title: "Porsche 911 GT3 RS Stallion",
      description: "Race-bred sports car with advanced aerodynamics and track-tuned suspension.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      brand: "Porsche",
      badges: ["TRACK", "PERFORMANCE"]
    },
    {
      id: "ferrari-f8-tributo-tempesta",
      title: "Ferrari F8 Tributo Tempesta",
      description: "Italian masterpiece with enhanced performance and bespoke styling.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      brand: "Ferrari",
      badges: ["EXOTIC", "ATELIER"]
    },
    {
      id: "audi-rs6-avant-carbon",
      title: "Audi RS6 Avant Carbon Edition",
      description: "High-performance wagon with carbon fiber enhancements and luxury appointments.",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      brand: "Audi",
      badges: ["CARBON", "PERFORMANCE"]
    }
  ];

  const handleBrandFilterChange = (brand) => {
    setBrandFilters(prev => ({
      ...prev,
      [brand]: !prev[brand]
    }));
  };

  const resetFilters = () => {
    setBrandFilters(Object.keys(brandFilters).reduce((acc, key) => ({ ...acc, [key]: false }), {}));
    setSearchTerm('');
  };

  const getActiveBrands = () => {
    return Object.keys(brandFilters).filter(brand => brandFilters[brand]);
  };

  const filteredModels = models.filter(model => {
    const matchesSearch = model.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const activeBrands = getActiveBrands();
    const matchesBrand = activeBrands.length === 0 || activeBrands.includes(model.brand);
    
    return matchesSearch && matchesBrand;
  });

  const sortedModels = [...filteredModels].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'brand':
        return a.brand.localeCompare(b.brand);
      default:
        return 0;
    }
  });

  return (
    <PageWrapper>
      <MainContainer filtersVisible={filtersVisible}>
        {filtersVisible && (
          <Sidebar>
            <FilterHeader>
              <FilterTitle>Filters</FilterTitle>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexShrink: 0 }}>
                <FilterActionButton onClick={() => setFiltersVisible(false)}>
                  HIDE FILTERS
                </FilterActionButton>
                <ResetButton onClick={resetFilters}>
                  RESET
                </ResetButton>
              </div>
            </FilterHeader>

            <SearchContainer>
              <SearchIcon />
              <SearchInput
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>

            <FilterSection>
              <FilterSectionHeader onClick={() => setBrandSectionOpen(!brandSectionOpen)}>
                <FilterSectionTitle>Brand</FilterSectionTitle>
                {brandSectionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </FilterSectionHeader>
              <FilterOptions isOpen={brandSectionOpen}>
                {Object.keys(brandFilters).map(brand => (
                  <FilterOption key={brand}>
                    <FilterCheckbox
                      type="checkbox"
                      id={brand}
                      checked={brandFilters[brand]}
                      onChange={() => handleBrandFilterChange(brand)}
                    />
                    <FilterLabel htmlFor={brand}>{brand}</FilterLabel>
                  </FilterOption>
                ))}
              </FilterOptions>
            </FilterSection>

            <FilterSection>
              <FilterSectionHeader onClick={() => setModelSectionOpen(!modelSectionOpen)}>
                <FilterSectionTitle>Model</FilterSectionTitle>
                {modelSectionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </FilterSectionHeader>
              <FilterOptions isOpen={modelSectionOpen}>
                <FilterOption>
                  <FilterCheckbox type="checkbox" id="model1" />
                  <FilterLabel htmlFor="model1">G-Class</FilterLabel>
                </FilterOption>
                <FilterOption>
                  <FilterCheckbox type="checkbox" id="model2" />
                  <FilterLabel htmlFor="model2">M5</FilterLabel>
                </FilterOption>
                <FilterOption>
                  <FilterCheckbox type="checkbox" id="model3" />
                  <FilterLabel htmlFor="model3">Huracán</FilterLabel>
                </FilterOption>
              </FilterOptions>
            </FilterSection>
          </Sidebar>
        )}

        <MainContent>
          {!filtersVisible && (
            <ShowFiltersButton onClick={() => setFiltersVisible(true)}>
              SHOW FILTERS
            </ShowFiltersButton>
          )}

          <ContentHeader>
            <ResultsCount>{sortedModels.length} results found</ResultsCount>
            <SortContainer>
              <span style={{ color: '#ccc', fontSize: '0.9rem' }}>Sort by</span>
              <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Name</option>
                <option value="brand">Brand</option>
                <option value="newest">Newest</option>
                <option value="price">Price</option>
              </SortSelect>
            </SortContainer>
          </ContentHeader>

          <CarsGrid>
            {sortedModels.map((model, index) => (
              <CarCardLink key={model.id} to={`/cars/${model.id}`}>
                <CarCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CarImage image={model.image}>
                    <CarBadges>
                      {model.badges.map((badge, badgeIndex) => (
                        <CarBadge key={badgeIndex}>{badge}</CarBadge>
                      ))}
                    </CarBadges>
                  </CarImage>
                  <CarContent>
                    <CarTitle>{model.title}</CarTitle>
                    <CarDescription>{model.description}</CarDescription>
                  </CarContent>
                </CarCard>
              </CarCardLink>
            ))}
          </CarsGrid>
        </MainContent>
      </MainContainer>
    </PageWrapper>
  );
};

export default ModelsPage; 
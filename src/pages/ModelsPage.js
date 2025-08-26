import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

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
  grid-template-columns: ${(props) =>
    props.filtersVisible ? "300px 1fr" : "1fr"};
  gap: ${(props) => (props.filtersVisible ? "3rem" : "0")};
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
  display: ${(props) => (props.isOpen ? "block" : "none")};
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

const CategoryTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CategoryTab = styled.button`
  background: ${(props) =>
    props.active ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }
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
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
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
  font-family: "Playfair Display", serif;
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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [allModels, setAllModels] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brandSectionOpen, setBrandSectionOpen] = useState(true);
  const [categorySectionOpen, setCategorySectionOpen] = useState(true);
  const [locationSectionOpen, setLocationSectionOpen] = useState(true);
  const [cachedData, setCachedData] = useState({});

  // Filter states
  const [brandFilters, setBrandFilters] = useState({
    "Aston Martin": false,
    Audi: false,
    BMW: false,
    "BSTN GT XI": false,
    Bentley: false,
    Bugatti: false,
    Ferrari: false,
    Lamborghini: false,
    Mercedes: false,
    Porsche: false,
    Tesla: false,
  });

  const [categoryFilters, setCategoryFilters] = useState({
    Cars: false,
    Bikes: false,
    Motorhomes: false,
  });

  const [locationFilters, setLocationFilters] = useState({
    Mumbai: false,
    Delhi: false,
    Bangalore: false,
    Chennai: false,
    Pune: false,
    Hyderabad: false,
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      if (cachedData[activeCategory]) {
        setAllModels(cachedData[activeCategory]);
        setLoading(false);
        return;
      }

      try {
        if (activeCategory === "all") {
          const carsPromise = cachedData.cars
            ? Promise.resolve(cachedData.cars)
            : fetch("http://localhost:5001/api/cars")
                .then((res) => res.json())
                .then((data) =>
                  data.map((c) => ({
                    ...c,
                    category: "Cars",
                    image: c.carImages?.[0] || "/path/to/placeholder-image.png", // <-- NEW
                  }))
                );

          const bikesPromise = cachedData.bikes
            ? Promise.resolve(cachedData.bikes)
            : fetch("http://localhost:5001/api/bikes")
                .then((res) => res.json())
                .then((data) =>
                  data.map((b) => ({
                    ...b,
                    category: "Bikes",

                    image:
                      b.bikeImages?.[0] || "/path/to/placeholder-image.png", // <-- NEW
                  }))
                );

          // ... (rest of the "all" logic is the same)
          const [carsData, bikesData] = await Promise.all([
            carsPromise,
            bikesPromise,
          ]);
          const allData = [...carsData, ...bikesData];
          setAllModels(allData);
          setCachedData((prev) => ({
            ...prev,
            all: allData,
            cars: carsData,
            bikes: bikesData,
          }));
        } else {
          const endpoint = `http://localhost:5001/api/${activeCategory}`;
          const response = await fetch(endpoint);
          if (!response.ok) throw new Error("Network response was not ok");

          const responseData = await response.json();
          const dataWithCategory = responseData.map((item) => {
            const isCar = activeCategory === "cars";
            const imageArray = isCar ? item.carImages : item.bikeImages; // <-- Use the correct array

            return {
              ...item,
              category:
                activeCategory.charAt(0).toUpperCase() +
                activeCategory.slice(1),
              image: imageArray?.[0] || "/path/to/placeholder-image.png", // <-- NEW
            };
          });

          setAllModels(dataWithCategory);
          setCachedData((prevCache) => ({
            ...prevCache,
            [activeCategory]: dataWithCategory,
          }));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeCategory, cachedData]);

  const handleCategoryFilterChange = (category) => {
    setCategoryFilters((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleBrandFilterChange = (brand) => {
    setBrandFilters((prev) => ({
      ...prev,
      [brand]: !prev[brand],
    }));
  };

  const handleLocationFilterChange = (location) => {
    setLocationFilters((prev) => ({
      ...prev,
      [location]: !prev[location],
    }));
  };

  const resetFilters = () => {
    setCategoryFilters(
      Object.keys(categoryFilters).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      )
    );
    setBrandFilters(
      Object.keys(brandFilters).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      )
    );
    setLocationFilters(
      Object.keys(locationFilters).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      )
    );
    setSearchTerm("");
    setActiveCategory("all");
  };

  const getActiveCategories = () => {
    return Object.keys(categoryFilters).filter(
      (category) => categoryFilters[category]
    );
  };

  const getActiveBrands = () => {
    return Object.keys(brandFilters).filter((brand) => brandFilters[brand]);
  };

  const getActiveLocations = () => {
    return Object.keys(locationFilters).filter(
      (location) => locationFilters[location]
    );
  };

  const filteredModels = allModels.filter((model) => {
    const matchesSearch =
      model.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.description.toLowerCase().includes(searchTerm.toLowerCase());

    const activeCategories = getActiveCategories();
    const matchesCategory =
      activeCategories.length === 0 ||
      activeCategories.includes(model.category);

    const activeBrands = getActiveBrands();
    const matchesBrand =
      activeBrands.length === 0 || activeBrands.includes(model.brand);

    const activeLocations = getActiveLocations();
    const matchesLocation =
      activeLocations.length === 0 || activeLocations.includes(model.location);

    const matchesTab =
      activeCategory === "all" ||
      (model.category || "").toLowerCase() === activeCategory;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesLocation &&
      matchesTab
    );
  });

  const sortedModels = [...filteredModels].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.title.localeCompare(b.title);
      case "brand":
        return a.brand.localeCompare(b.brand);
      case "price":
        const priceA = parseInt(a.dailyPrice.replace(/[₹,]/g, ""));
        const priceB = parseInt(b.dailyPrice.replace(/[₹,]/g, ""));
        return priceA - priceB;
      case "rating":
        return b.rating - a.rating;
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
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <FilterActionButton onClick={() => setFiltersVisible(false)}>
                  HIDE FILTERS
                </FilterActionButton>
                <ResetButton onClick={resetFilters}>RESET</ResetButton>
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
              <FilterSectionHeader
                onClick={() => setCategorySectionOpen(!categorySectionOpen)}
              >
                <FilterSectionTitle>Category</FilterSectionTitle>
                {categorySectionOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </FilterSectionHeader>
              <FilterOptions isOpen={categorySectionOpen}>
                {Object.keys(categoryFilters).map((category) => (
                  <FilterOption key={category}>
                    <FilterCheckbox
                      type="checkbox"
                      id={category}
                      checked={categoryFilters[category]}
                      onChange={() => handleCategoryFilterChange(category)}
                    />
                    <FilterLabel htmlFor={category}>{category}</FilterLabel>
                  </FilterOption>
                ))}
              </FilterOptions>
            </FilterSection>

            <FilterSection>
              <FilterSectionHeader
                onClick={() => setBrandSectionOpen(!brandSectionOpen)}
              >
                <FilterSectionTitle>Brand</FilterSectionTitle>
                {brandSectionOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </FilterSectionHeader>
              <FilterOptions isOpen={brandSectionOpen}>
                {Object.keys(brandFilters).map((brand) => (
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
              <FilterSectionHeader
                onClick={() => setLocationSectionOpen(!locationSectionOpen)}
              >
                <FilterSectionTitle>Location</FilterSectionTitle>
                {locationSectionOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </FilterSectionHeader>
              <FilterOptions isOpen={locationSectionOpen}>
                {Object.keys(locationFilters).map((location) => (
                  <FilterOption key={location}>
                    <FilterCheckbox
                      type="checkbox"
                      id={location}
                      checked={locationFilters[location]}
                      onChange={() => handleLocationFilterChange(location)}
                    />
                    <FilterLabel htmlFor={location}>{location}</FilterLabel>
                  </FilterOption>
                ))}
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

          <CategoryTabs>
            <CategoryTab
              active={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
            >
              All Vehicles
            </CategoryTab>
            <CategoryTab
              active={activeCategory === "cars"}
              onClick={() => setActiveCategory("cars")}
            >
              Cars
            </CategoryTab>
            <CategoryTab
              active={activeCategory === "bikes"}
              onClick={() => setActiveCategory("bikes")}
            >
              Bikes
            </CategoryTab>
            <CategoryTab
              active={activeCategory === "motorhomes"}
              onClick={() => setActiveCategory("motorhomes")}
            >
              Motorhomes
            </CategoryTab>
          </CategoryTabs>

          <ContentHeader>
            <ResultsCount>{sortedModels.length} results found</ResultsCount>
            <SortContainer>
              <span style={{ color: "#ccc", fontSize: "0.9rem" }}>Sort by</span>
              <SortSelect
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="brand">Brand</option>
                <option value="newest">Newest</option>
                <option value="price">Price</option>
              </SortSelect>
            </SortContainer>
          </ContentHeader>

          <CarsGrid>
            {sortedModels.map((model, index) => (
              <CarCardLink
                key={model.id}
                to={`/${model.category.toLowerCase()}/${model.id}`}
              >
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

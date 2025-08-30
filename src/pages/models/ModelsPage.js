import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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

const initializeFilters = (paramName, initialFilterObject, searchParams) => {
  const getActiveFiltersFromURL = (paramName, searchParams) => {
    return searchParams.get(paramName)?.split(",") || [];
  };
  const active = getActiveFiltersFromURL(paramName, searchParams);
  console.log("these are active params", active);

  return Object.keys(initialFilterObject).reduce((acc, key) => {
    acc[key] = active.includes(key);
    return acc;
  }, {});
};

const ModelsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "name");
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("tab") || "all"
  );
  const [allModels, setAllModels] = useState([]);
  const [cachedData, setCachedData] = useState({});
  const [loading, setLoading] = useState(true);

  // UI State
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [brandSectionOpen, setBrandSectionOpen] = useState(true);
  const [categorySectionOpen, setCategorySectionOpen] = useState(true);
  const [locationSectionOpen, setLocationSectionOpen] = useState(true);

  // --- Initial Filter Definitions ---
  const initialBrandFilters = {
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
  };
  const initialCategoryFilters = {
    Cars: false,
    Bikes: false,
    Motorhomes: false,
  };
  const initialLocationFilters = {
    Mumbai: false,
    Delhi: false,
    Bangalore: false,
    Chennai: false,
    Pune: false,
    Hyderabad: false,
  };

  // --- Filter States ---
  // <-- IMPROVEMENT: Using the helper function for cleaner initialization
  const [brandFilters, setBrandFilters] = useState(() =>
    initializeFilters("brands", initialBrandFilters, searchParams)
  );
  const [categoryFilters, setCategoryFilters] = useState(() =>
    initializeFilters("categories", initialCategoryFilters, searchParams)
  );
  const [locationFilters, setLocationFilters] = useState(() =>
    initializeFilters("locations", initialLocationFilters, searchParams)
  );

  // --- Memoized Getters for Active Filters ---
  const getActiveCategories = useCallback(
    () => Object.keys(categoryFilters).filter((key) => categoryFilters[key]),
    [categoryFilters]
  );
  const getActiveBrands = useCallback(
    () => Object.keys(brandFilters).filter((key) => brandFilters[key]),
    [brandFilters]
  );
  const getActiveLocations = useCallback(
    () => Object.keys(locationFilters).filter((key) => locationFilters[key]),
    [locationFilters]
  );

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (searchTerm) newSearchParams.set("search", searchTerm);
    if (sortBy !== "name") newSearchParams.set("sort", sortBy);
    if (activeCategory !== "all") newSearchParams.set("tab", activeCategory);

    const activeBrands = getActiveBrands();
    if (activeBrands.length > 0)
      newSearchParams.set("brands", activeBrands.join(","));

    const activeCategories = getActiveCategories();
    if (activeCategories.length > 0)
      newSearchParams.set("categories", activeCategories.join(","));

    const activeLocations = getActiveLocations();
    if (activeLocations.length > 0)
      newSearchParams.set("locations", activeLocations.join(","));

    setSearchParams(newSearchParams, { replace: true });
  }, [
    searchTerm,
    sortBy,
    activeCategory,
    brandFilters,
    categoryFilters,
    locationFilters,
    setSearchParams,
    getActiveBrands,
    getActiveCategories,
    getActiveLocations,
  ]);

  // --- EFFECT: Load Data on Category Change ---
  useEffect(() => {
    // Helper to fetch and transform data for a specific category
    const fetchDataFor = (category, imageProp) => {
      if (cachedData[category]) {
        return Promise.resolve(cachedData[category]);
      }
      return fetch(`http://localhost:5001/api/${category}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch ${category}`);
          return res.json();
        })
        .then((data) =>
          data.map((item) => ({
            ...item,
            category: category.charAt(0).toUpperCase() + category.slice(1),
            image: item[imageProp]?.[0] || "/path/to/placeholder-image.png",
          }))
        );
    };

    const loadData = async () => {
      setLoading(true);

      if (cachedData[activeCategory]) {
        setAllModels(cachedData[activeCategory]);
        setLoading(false);
        return;
      }

      try {
        let dataToSet;
        if (activeCategory === "all") {
          const results = await Promise.allSettled([
            fetchDataFor("cars", "carImages"),
            fetchDataFor("bikes", "bikeImages"),
            fetchDataFor("motorhomes", "motorhomeImages"),
          ]);

          const successfulPromises = results.filter(
            (p) => p.status === "fulfilled"
          );

          dataToSet = successfulPromises.flatMap((p) => p.value);

          results
            .filter((p) => p.status === "rejected")
            .forEach((p) => console.error(p.reason));

          setCachedData((prev) => ({
            ...prev,
            all: dataToSet,

            ...(successfulPromises.find(
              (p) => p.value[0]?.category === "Cars"
            ) && {
              cars: successfulPromises.find(
                (p) => p.value[0]?.category === "Cars"
              ).value,
            }),
            ...(successfulPromises.find(
              (p) => p.value[0]?.category === "Bikes"
            ) && {
              bikes: successfulPromises.find(
                (p) => p.value[0]?.category === "Bikes"
              ).value,
            }),
          }));
        } else {
          const getImageProp = (category) => {
            switch (category) {
              case "cars":
                return "carImages";
              case "bikes":
                return "bikeImages";
              case "motorhomes":
                return "motorhomeImages";
              default:
                return "";
            }
          };
          dataToSet = await fetchDataFor(
            activeCategory,
            getImageProp(activeCategory)
          );
          setCachedData((prev) => ({ ...prev, [activeCategory]: dataToSet }));
        }
        setAllModels(dataToSet);
      } catch (err) {
        console.log(err.message);
        setAllModels([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeCategory, cachedData]);

  const handleFilterChange = (setter, key) => {
    setter((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetFilters = () => {
    setCategoryFilters(initialCategoryFilters);
    setBrandFilters(initialBrandFilters);
    setLocationFilters(initialLocationFilters);
    setSearchTerm("");
    setActiveCategory("all");
    setSortBy("name");
  };

  const filteredModels = allModels.filter((model) => {
    const activeBrands = getActiveBrands();
    const activeCategories = getActiveCategories();
    const activeLocations = getActiveLocations();

    const matchesSearch =
      model.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory !== "all" ||
      activeCategories.length === 0 ||
      activeCategories.includes(model.category);
    const matchesBrand =
      activeBrands.length === 0 || activeBrands.includes(model.brand);
    const matchesLocation =
      activeLocations.length === 0 || activeLocations.includes(model.location);
    return matchesSearch && matchesCategory && matchesBrand && matchesLocation;
  });

  const sortedModels = [...filteredModels].sort((a, b) => {
    switch (sortBy) {
      case "brand":
        return a.brand.localeCompare(b.brand);
      case "price":
        const priceA = parseInt(a.dailyPrice?.replace(/[₹,]/g, "") ?? "0");
        const priceB = parseInt(b.dailyPrice?.replace(/[₹,]/g, "") ?? "0");
        return priceA - priceB;
      case "rating":
        return b.rating - a.rating;
      case "name":
      default:
        return a.title.localeCompare(b.title);
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
                      onChange={() =>
                        handleFilterChange(setCategoryFilters, category)
                      }
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
                      onChange={() =>
                        handleFilterChange(setBrandFilters, brand)
                      }
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
                      onChange={() =>
                        handleFilterChange(setLocationFilters, location)
                      }
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
            <ResultsCount>
              {loading ? "Loading..." : `${sortedModels.length} results found`}
            </ResultsCount>
            <SortContainer>
              <span style={{ color: "#ccc", fontSize: "0.9rem" }}>Sort by</span>
              <SortSelect
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="brand">Brand</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </SortSelect>
            </SortContainer>
          </ContentHeader>

          <CarsGrid>
            {sortedModels.length > 0 ? (
              // If there are models, map over them and display them as usual
              sortedModels.map((model, index) => (
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
                        {model.badges?.map((badge, badgeIndex) => (
                          <CarBadge key={badgeIndex}>{badge}</CarBadge>
                        ))}
                      </CarBadges>
                    </CarImage>
                    <CarContent>
                      <CarTitle>
                        {model.brand} {model.title}
                      </CarTitle>
                      <CarDescription>{model.description}</CarDescription>
                    </CarContent>
                  </CarCard>
                </CarCardLink>
              ))
            ) : activeCategory === "motorhomes" ? (
              // ELSE IF: The list is empty and the category is motorhomes
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  marginTop: "4rem",
                }}
              >
                <h2>Coming Soon! 🚐</h2>
                <p>
                  Sorry, motorhomes are not yet available. We'll update the list
                  soon!
                </p>
              </div>
            ) : (
              // ELSE: The list is empty for any other reason
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  marginTop: "4rem",
                }}
              >
                <h2>No Results Found</h2>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </CarsGrid>
        </MainContent>
      </MainContainer>
    </PageWrapper>
  );
};

export default ModelsPage;

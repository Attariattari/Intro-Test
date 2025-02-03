import React, { useState, useEffect, useRef, useContext } from "react";
import "./New.css";
import Navbar from "../Navbar/Navbar";
import SamallDipalyProducts from "../NewAllProducts/ProductsPages/SamallDipalyProducts";
import DetailsDisplayProduct from "../NewAllProducts/ProductsPages/DetailsDisplayProduct";
import { useParams } from "react-router-dom";
import axios from "axios";
import { userContext } from "./../../Context/UserContext";
import "react-range-slider-input/dist/style.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function New() {
  const [selectedComponent, setSelectedComponent] = useState(
    localStorage.getItem("selectedComponent") || "DetailsDisplay"
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [state, setState] = useState({
    data: [],
    loading: false,
  });
  const { token } = useContext(userContext);

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
    localStorage.setItem("selectedComponent", component);
  };
  const { cid, csid } = useParams();

  const fetchProducts = async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      let response;

      if (cid && csid) {
        // If both cid and csid exist, call Category API
        response = await axios.get(
          `http://localhost:1122/Product/Category/${cid}/${csid}`,
          {
            headers: {
              Authenticate: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        console.log(response.data, "Category data fetched");
      } else if (cid) {
        // If only cid exists, call New Products API
        response = await axios.get(
          `http://localhost:1122/Product/products/new/${cid}`,
          {
            headers: {
              Authenticate: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        console.log(response.data, "New products data fetched");
      } else {
        console.error("Error: Missing category or subcategory ID");
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: "Category or Subcategory ID is missing.",
        }));
        return; // Exit if no cid or csid
      }

      // Update state with the response data
      setState((prevState) => ({
        ...prevState,
        data: Array.isArray(response.data) ? response.data : [],
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: error.message,
      }));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    const storedComponent = localStorage.getItem("selectedComponent");
    if (storedComponent) {
      setSelectedComponent(storedComponent);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [activeFilter, setActiveFilter] = useState(null); // State to track active filter

  const toggleFilterBox = (filterName) => {
    setActiveFilter((prev) => (prev === filterName ? null : filterName));
  };
  const colors = [
    "red",
    "blue",
    "green",
    "black",
    "brown",
    "white",
    "yellow",
    "gray",
  ];

  const [isWrapped, setIsWrapped] = useState(false);

  useEffect(() => {
    // If the number of colors exceeds 6, make the container wrap the elements
    if (colors.length > 6) {
      setIsWrapped(true);
    } else {
      setIsWrapped(false);
    }
  }, [colors]);

  const [priceRange, setPriceRange] = useState([0, 100]); // Default range

  const handleChange = (newRange) => {
    setPriceRange(newRange);
  };

  const trackStyle = {
    backgroundColor: "#000", // Black track
  };

  const handleStyle = [
    {
      borderColor: "#000", // Black border for the thumb
      backgroundColor: "#000", // Black background for the thumb
      borderWidth: "2px",
      width: "15px",
      height: "15px",
    },
    {
      borderColor: "#000", // Black border for the thumb
      backgroundColor: "#000", // Black background for the thumb
      borderWidth: "2px",
      width: "15px",
      height: "15px",
    },
  ];

  const railStyle = {
    backgroundColor: "#333", // Dark grey rail
  };

  const containerStyle = {
    padding: "20px",
    backgroundColor: "#000", // Black background for the container
    color: "#fff", // White text color for contrast
  };

  const sliderStyle = {
    width: "100%",
    margin: "20px 0",
  };

  return (
    <div>
      <div
        className={`sticky top-0 z-10`}
        style={{
          backgroundColor: isScrolled ? "var(--bg-color)" : "transparent",
        }}
      >
        <div className="absolute w-full">
          <Navbar />
        </div>
        <div className="Productfilterveiw">
          <div className="Productfilterveiw__filter">
            {["SORT BY", "COLORS", "SIZE", "PRICE"].map((filter) => (
              <div
                key={filter}
                className={`Productfilterveiw__filter-item ${
                  activeFilter === filter ? "active" : ""
                }`}
                onClick={() => toggleFilterBox(filter)}
              >
                {filter}
              </div>
            ))}
          </div>

          {/* Conditional box rendering */}
          {activeFilter && (
            <div className="filter-box">
              <div className="filter-box__content">
                {activeFilter === "SORT BY" && (
                  <div className="sort-options">
                    <div>ASCENDING PRICE</div>
                    <div>DESCENDING PRICE</div>
                    <div>NEW</div>
                  </div>
                )}
                {activeFilter === "COLORS" && (
                  <div
                    className={`color-options ${isWrapped ? "flex-wrap" : ""}`}
                  >
                    {colors.map((color, index) => (
                      <div className="color-option" key={index}>
                        <div
                          className="color-box"
                          style={{ background: color }}
                        ></div>
                        <span className="color-name">
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {activeFilter === "SIZE" && (
                  <div className="size-options">
                    <div>XS</div>
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                  </div>
                )}
                {activeFilter === "PRICE" && (
                  <div
                    style={{
                      maxWidth: "95%",
                      margin: "0 auto",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    <div>
                      <p>
                        Selected Price Range: ${priceRange[0]} - $
                        {priceRange[1]}
                      </p>
                    </div>
                    <Slider
                      range
                      min={0}
                      max={100}
                      defaultValue={[0, 100]}
                      value={priceRange}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="filter-box__footer">
                  <div>CLEAR</div>
                  <div>VIEW RESULTS(00)</div>
                </div>
              </div>
            </div>
          )}
          <div className="view-option-selector">
            <div
              className={`view-option-selector__icon ${
                selectedComponent === "DetailsDisplay" ? "activeIcon" : ""
              }`}
              onClick={() => handleComponentChange("DetailsDisplay")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="var(--text-color)"
                stroke="inherit"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.6 4.6H10v14.8H4.6V4.6zm-1-1H11v16.8H3.6V3.6zm10.4 1h5.4v14.8H14V4.6zm-1-1h7.4v16.8H13V3.6z"
                ></path>
              </svg>
            </div>
            <div
              className={`view-option-selector__icon ${
                selectedComponent === "SamallDipaly" ? "activeIcon" : ""
              }`}
              onClick={() => handleComponentChange("SamallDipaly")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="var(--text-color)"
                stroke="inherit"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.6 4.6H10V10H4.6V4.6zm-1-1H11V11H3.6V3.6zm1 10.4H10v5.4H4.6V14zm-1-1H11v7.4H3.6V13zm15.8-8.4H14V10h5.4V4.6zm-5.4-1h-1V11h7.4V3.6H14zM14 14h5.4v5.4H14V14zm-1-1h7.4v7.4H13V13z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="New">
        {selectedComponent === "DetailsDisplay" && (
          <DetailsDisplayProduct data={state.data} loading={state.loading} />
        )}
        {selectedComponent === "SamallDipaly" && (
          <SamallDipalyProducts data={state.data} loading={state.loading} />
        )}
      </div>
    </div>
  );
}

export default New;

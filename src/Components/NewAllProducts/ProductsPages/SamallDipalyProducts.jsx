import React, { useEffect, useState } from "react";
import "./MainCss.css"; // Updated CSS file name for better clarity
import Footer from "../../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../../Spinner";
import { GoPlus } from "react-icons/go";
import Cartpopup from "./Cartpopup";

function SmallDisplayProducts({ data, loading }) {
  const [cartPopup, setCartPopup] = useState(false);
  const [selectproductid, setSelectproductid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigate = (product) => {
    navigate(`/SingleProduct/${product.Name}/${product._id}`);
  };

  const handleaddtocart = (productId) => {
    setSelectproductid(productId);
    setCartPopup(true);
  };

  const closePopup = () => {
    setCartPopup(false); // Hide popup
  };

  useEffect(() => {
    if (cartPopup) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Restore scroll
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [cartPopup]);

  return (
    <div className="product-grid-container">
      {loading && (
        <div className="w-full p-10 flex justify-center items-center">
          <Spinner />
        </div>
      )}
      <div className="product-grid">
        {data.map((product, index) => (
          <>
            {" "}
            <div
              className="product-card"
              key={index}
              title={product.Name}
              onClick={() => handleNavigate(product)}
            >
              <img src={product.MainImage} alt={`Product ${index}`} />
              <div
                className="CartSmallButtonArea"
                title="Add to Cart"
                onClick={(e) => {
                  e.stopPropagation(); // Parent click event prevent karne ke liye
                  handleNavigate(product); // Navigate bhi kar dega
                }}
              >
                <GoPlus />
              </div>
            </div>{" "}
          </>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default SmallDisplayProducts;

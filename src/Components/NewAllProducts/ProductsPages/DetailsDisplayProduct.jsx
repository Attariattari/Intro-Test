import React, { useContext, useEffect, useState } from "react";
import "./MainCss.css";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import Footer from "../../Footer/Footer";
import Spinner from "../../../Spinner";
import axios from "axios";
import { userContext } from "../../../Context/UserContext";
import Swal from "sweetalert2";
import Cartpopup from "./Cartpopup";

function DetailsDisplayProduct({ data, loading }) {
  const navigate = useNavigate();
  const { token } = useContext(userContext);
  const [wishlistStatus, setWishlistStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const initialWishlistStatus = data.map((product) => ({
      productId: product._id,
      isInWishlist: product.isInWishlist,
    }));

    setWishlistStatus(initialWishlistStatus);
  }, [data]);
  const updateWishlistStatus = (productId, status) => {
    setWishlistStatus((prevState) =>
      prevState.map((product) =>
        product.productId === productId
          ? { ...product, isInWishlist: status }
          : product
      )
    );
  };

  const addToWishlist = async (productId) => {
    setIsLoading(true); // Start loading for wishlist
    window.scrollTo(0, 0);
    try {
      const response = await axios.post(
        "http://localhost:1122/Wishlist/add",
        { productId: productId },
        {
          headers: {
            Authenticate: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        updateWishlistStatus(productId, true); // Update local state
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product added to wishlist successfully!",
        });
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to add product to wishlist. Please try again.",
      });
    } finally {
      setIsLoading(false); // Stop loading for wishlist
    }
  };

  const handleNavigate = (product) => {
    navigate(`/SingleProduct/${product.Name}/${product._id}`);
  };

  // const handleSizeSelect = (productId, size) => {
  //   setSelectedSizes((prev) => ({
  //     ...prev,
  //     [productId]: size, // Har product ka alag selected size store hoga
  //   }));
  //   setCartPopup(productId); // Popup open rakhne ke liye
  //   alert(`Product added to cart successfully! Size: ${size}`);
  // };

  // const closePopup = () => {
  //   setCartPopup(false);
  // };

  // useEffect(() => {
  //   if (cartPopup) {
  //     document.body.style.overflow = "hidden"; // Disable scroll
  //   } else {
  //     document.body.style.overflow = "auto"; // Restore scroll
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto"; // Cleanup on unmount
  //   };
  // }, [cartPopup]);

  return (
    <div className="DetailedProducts">
      {loading && (
        <div className="w-full p-10  flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {isLoading ? (
        <div className="w-full p-10  flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="ProductArea cursor-pointer">
          {data.map((product, index) => {
            const isInWishlist = wishlistStatus.find(
              (status) => status.productId === product._id
            )?.isInWishlist;

            return (
              <div
                className="ProductGridView"
                key={index}
                onClick={() => handleNavigate(product)}
                title={product.Name}
              >
                <div className="Productproductimage">
                  <img src={product.MainImage} alt="" />
                </div>
                <div className="CartButtonArea">
                  <div
                    className="AddToCartIcon"
                    title="Add to Cart"
                    onClick={() => handleNavigate(product)}
                  >
                    <GoPlus />
                  </div>

                  {/* {cartPopup === product._id && (

                  )} */}
                  {/* <div className="Size-Popup active">
                      <div className="Size-area">
                        {product.variations && product.variations.length > 0 ? (
                          product.variations
                            .flatMap((variation) => variation.size)
                            .map((size, index) => (
                              <button
                                key={index}
                                className={
                                  selectedSizes[product._id] === size
                                    ? "selected"
                                    : ""
                                }
                                onClick={() =>
                                  handleSizeSelect(product._id, size)
                                }
                              >
                                {size}
                              </button>
                            ))
                        ) : (
                          <p>No sizes available</p>
                        )}
                      </div>
                    </div> */}
                </div>
                <div className="Detailed">
                  <div className="DetailedTitleandSVG">
                    <h4 className="Detailedtitle">
                      {product.Name.length > 24
                        ? `${product.Name.substring(0, 24)}...`
                        : product.Name}
                    </h4>
                    {isInWishlist ? (
                      <svg
                        className="wishlist-icon wishlist-icon--productDetail"
                        preserveAspectRatio="xMidYMid slice"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="var(--text-color)"
                        stroke="inherit"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Product already in wishlist!");
                        }}
                      >
                        <title>Product already in wishlist</title>{" "}
                        {/* Adding title here for hover effect */}
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 15.238L17 20V4H7v16l5-4.762z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="wishlist-icon wishlist-icon--productDetail"
                        preserveAspectRatio="xMidYMid slice"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="var(--text-color)"
                        stroke="inherit"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToWishlist(product._id); // Trigger wishlist add action
                        }}
                      >
                        <title>Add to Wishlist</title>{" "}
                        {/* Adding title here for hover effect */}
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 15.238L17 20V4H7v16l5-4.762zm-4 2.429l4-3.81 4 3.81V5H8v12.667z"
                        ></path>
                      </svg>
                    )}
                  </div>
                  <div className="PriceSection space-x-3">
                    {product.variations.map((variation, index) => (
                      <React.Fragment key={index}>
                        <span>PKR={variation.price.real}</span>
                        <span>PKR={variation.price.discount}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* {cartPopup && (
        <Cartpopup
          cartPopup={cartPopup}
          closePopup={closePopup}
          productid={selectproductid}
        />
      )} */}
      <Footer />
    </div>
  );
}

export default DetailsDisplayProduct;

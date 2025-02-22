import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SHIPPING_AND_RETURNS from "../../Offcanvice/SHIPPING_AND_RETURNS";
import "../SingleProduct.css";
import Spinner from "../../../../Spinner";
import { useWishlist } from "../../../../Context/Wishlist";
import { useCart } from "../../../../Context/CartContext";

function AllProductDataView({ product, activeVariation, setActiveVariation }) {
  const [drawerType, setDrawerType] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart, Loading } = useCart();
  const { setProductId, wishlistStatus, checkProductInWishlist, isLoading } =
    useWishlist();

  useEffect(() => {
    if (product?._id) {
      checkProductInWishlist(product._id); // ✅ Auto-check on component mount
    }
  }, [product]);
  useEffect(() => {
    const handleOverflow = () => {
      const body = document.querySelector("body");
      if (drawerType) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    };
    handleOverflow();
    return () => {
      document.body.style.overflow = "auto"; // Ensure overflow is reset on unmount
    };
  }, [drawerType]);

  // const addtocart = async () => {
  //   setIsLoading(true);
  //   window.scrollTo(0, 0);
  //   const requestData = {
  //     product: product?._id, // ✅ Correct key names as per API
  //     variationId: activeVariation?._id,
  //     size: selectedSize || null,
  //   };
  //   console.log("🚀 Sending Data to API:", requestData); // ✅ Debugging
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:1122/CartProduct/add",
  //       requestData, // ✅ Data sent in body correctly
  //       {
  //         headers: {
  //           Authenticate: `Bearer ${token}`,
  //           "Content-Type": "application/json", // ✅ Ensure JSON format
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     console.log("✅ Response Data:", response?.data); // ✅ Debugging
  //     if (response.status === 200 || response.status === 201) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "🛍️ Success!",
  //         text: "Product added to cart successfully!",
  //         // timer: 5000,
  //         showConfirmButton: true,
  //       });
  //       // ✅ Drawer Open After Success
  //       openDrawer("AddToCart");
  //     } else {
  //       console.log("❌ Response Status:", response.status);
  //       Swal.fire({
  //         icon: "error",
  //         title: "❌ Failed",
  //         text: "Something went wrong! Try again.",
  //         timer: 5000,
  //         showConfirmButton: true,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("🚨 Error adding product to cart:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "❌ Error",
  //       text: "Unable to add product. Try again!",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //     console.log("🔄 Loading Stopped");
  //   }
  // };

  const openDrawer = (drawer) => {
    setDrawerType(drawer);
    setSelectedSize(null);
  };

  const closeDrawer = () => {
    setDrawerType(null);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize((prevSize) => (prevSize === size ? null : size));
  };

  const showErrorModal = () => {
    Swal.fire({
      title: "NO ADD ITEM!",
      text: "Please first select a size.",
      icon: "error",
      buttons: {
        confirm: {
          className: "swal-btn",
          text: "OK",
          value: true,
          button: true,
          closeModal: true,
        },
      },
      customClass: {
        popup: "custom-size",
        confirmButton: "custom-swal-btn",
      },
    }).then((value) => {
      if (value) {
        // Handle confirmation if needed
      }
    });
  };
  const handleColorClick = (variation) => {
    setActiveVariation(variation); // ✅ Yeh parent me state update karega
  };

  return (
    <div>
      {Loading && (
        <div className="cart-spinner">
          <Spinner />
        </div>
      )}

      {isLoading && (
        <div className="cart-spinner">
          <Spinner />
        </div>
      )}

      <div className="Productdetails">
        <span>
          <p>{product.Name.substring(0, 32)}</p>
          {wishlistStatus[product._id] ? (
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
              <title>Product already in wishlist</title>
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
                setProductId(product?._id);
              }}
            >
              <title>Add to Wishlist</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 15.238L17 20V4H7v16l5-4.762zm-4 2.429l4-3.81 4 3.81V5H8v12.667z"
              ></path>
            </svg>
          )}
        </span>
        <p className="price">
          {activeVariation?.price?.discount > 0 &&
          activeVariation?.price?.discount !== activeVariation?.price?.real ? (
            <div className="price flex gap-2">
              <span className="discount-price text-red-500 font-bold">
                Rs. {activeVariation.price.discount}
              </span>
              <span
                className="original-price line-through"
                style={{ color: "var(--text-color)" }}
              >
                Rs. {activeVariation.price.real}
              </span>
            </div>
          ) : (
            <span className="original-price font-bold">
              Rs. {activeVariation?.price?.real}
            </span>
          )}
        </p>

        <p>
          {product.Description.length > 180
            ? `${product.Description.substring(0, 180)}...`
            : product.Description}
        </p>
        <Link
          onClick={(e) => {
            e.preventDefault();
            openDrawer("avail");
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          CHECK IN-STORE AVAILABILITY
        </Link>
        <br />
        <Link
          onClick={(e) => {
            e.preventDefault();
            openDrawer("shipping");
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          SHIPPING AND RETURNS
        </Link>
      </div>
      <div className="productcolorsandsize">
        <div className="Colors">
          {product?.variations?.map((variation, index) => (
            <span
              key={index}
              className={`color-box cursor-pointer transition-all duration-300 relative
      ${
        activeVariation?.color?.name === variation?.color?.name
          ? "active scale-110"
          : ""
      }
    `}
              style={{
                backgroundColor: variation?.color?.code,
                pointerEvents:
                  activeVariation?.color?.name === variation?.color?.name
                    ? "none"
                    : "auto",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Shadow effect for better visibility
              }}
              onClick={() => handleColorClick(variation)}
              title={variation?.color?.name}
            >
              {/* ✅ Active Indicator Animation */}
              {activeVariation?.color?.name === variation?.color?.name && (
                <span className="absolute inset-0 border-2 border-white rounded-full animate-pulse" />
              )}

              {/* ✅ Hover Effect */}
              <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/20 rounded-full" />
            </span>
          ))}
        </div>
        <span className="product-sizes p-0 mb-[06px]">
          {activeVariation?.size?.map((size, index) => (
            <button
              key={index}
              className={selectedSize === size ? "Size selected" : ""}
              onClick={() => handleSizeSelect(size)}
            >
              {size}
            </button>
          ))}
        </span>
        <Link
          onClick={(e) => {
            e.preventDefault();
            openDrawer("measure");
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
          style={{ fontSize: "10px" }}
        >
          MEASUREMENT GUIDE
        </Link>
      </div>
      <button
        className={`AddButton ${selectedSize ? "selected" : ""}`}
        onClick={async (e) => {
          e.preventDefault();
          if (!selectedSize) {
            showErrorModal();
            return;
          }
          await addToCart(product, activeVariation, selectedSize); // ✅ API Call
          setSelectedSize(null); // ✅ Reset size after adding to cart
        }}
      >
        ADD TO CART
      </button>

      <div>
        <SHIPPING_AND_RETURNS
          drawerType={drawerType}
          closeDrawer={closeDrawer}
        />
      </div>
    </div>
  );
}

export default AllProductDataView;

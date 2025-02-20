// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import SHIPPING_AND_RETURNS from "../../Offcanvice/SHIPPING_AND_RETURNS";
// import "../SingleProduct.css";

// function AllProductDataView({ product, activeVariation, setActiveVariation }) {
//   const [drawerType, setDrawerType] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     document.body.style.overflow = drawerType ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [drawerType]);

//   const openDrawer = (drawer) => {
//     setDrawerType(drawer);
//     setSelectedSize(null);
//   };

//   const closeDrawer = () => setDrawerType(null);

//   const handleSizeSelect = (size) => {
//     setSelectedSize(size);
//     setError(false);
//   };

//   const showErrorModal = () => {
//     Swal.fire({
//       title: "NO ADD ITEM!",
//       text: "Please first select a size.",
//       icon: "error",
//       buttons: {
//         confirm: {
//           className: "swal-btn",
//           text: "OK",
//           value: true,
//           button: true,
//           closeModal: true,
//         },
//       },
//       customClass: {
//         popup: "custom-size",
//         confirmButton: "custom-swal-btn",
//       },
//     });
//   };

//   return (
//     <div>
//       <div className="Productdetails">
//         <span>
//           <p>{product.Name.substring(0, 32)}</p>
//           <svg
//             className="wishlist-icon wishlist-icon--productDetail"
//             preserveAspectRatio="xMidYMid slice"
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="var(--text-color)"
//             stroke="inherit"
//           >
//             <path
//               fillRule="evenodd"
//               clipRule="evenodd"
//               d="M12 15.238L17 20V4H7v16l5-4.762zm-4 2.429l4-3.81 4 3.81V5H8v12.667z"
//             ></path>
//           </svg>
//         </span>
//         {product.variations.map((variation, index) => (
//           <div key={index}>
//             <p>
//               {variation.price.discount !== "0" ? (
//                 <>
//                   <span
//                     style={{ textDecoration: "line-through", color: "red" }}
//                   >
//                     ${variation.price.real}
//                   </span>
//                   &nbsp;
//                   <span style={{ fontWeight: "bold" }}>
//                     ${variation.price.discount}
//                   </span>
//                 </>
//               ) : (
//                 <span style={{ fontWeight: "bold" }}>
//                   ${variation.price.real}
//                 </span>
//               )}
//             </p>
//           </div>
//         ))}

//         <Link
//           onClick={(e) => {
//             e.preventDefault();
//             openDrawer("avail");
//             window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//           }}
//         >
//           CHECK IN-STORE AVAILABILITY
//         </Link>
//         <br />
//         <Link
//           onClick={(e) => {
//             e.preventDefault();
//             openDrawer("shipping");
//             window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//           }}
//         >
//           SHIPPING AND RETURNS
//         </Link>
//       </div>

//       {/* ✅ COLOR & SIZE SELECTION */}
//       <div className="productcolorsandsize">
//         <div className="Colors">
//           {product?.variations?.map((variation, index) => (
//             <span
//               key={index}
//               className={`color-box ${
//                 activeVariation?.color?.name === variation?.color?.name
//                   ? "active"
//                   : ""
//               }`}
//               style={{ backgroundColor: variation?.color?.code }}
//               onClick={() => setActiveVariation(variation)}
//             />
//           ))}
//         </div>

//         <span className="product-sizes p-0">
//           {activeVariation?.size?.map((size, index) => (
//             <button
//               key={index}
//               className={selectedSize === size ? "Size selected" : ""}
//               onClick={() => handleSizeSelect(size)}
//             >
//               {size}
//             </button>
//           ))}
//         </span>
//         <Link
//           onClick={(e) => {
//             e.preventDefault();
//             openDrawer("measure");
//             window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//           }}
//         >
//           MEASUREMENT GUIDE
//         </Link>
//       </div>

//       {/* ✅ ADD TO CART */}
//       <button
//         className={`AddButton ${selectedSize ? "selected" : ""}`}
//         onClick={(e) => {
//           e.preventDefault();
//           selectedSize ? openDrawer("AddToCart") : showErrorModal();
//         }}
//       >
//         ADD
//       </button>

//       <div>
//         <SHIPPING_AND_RETURNS
//           drawerType={drawerType}
//           closeDrawer={closeDrawer}
//         />
//       </div>
//     </div>
//   );
// }

// export default AllProductDataView;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SHIPPING_AND_RETURNS from "../../Offcanvice/SHIPPING_AND_RETURNS";
import "../SingleProduct.css";

function AllProductDataView({
  womenProducts,
  product,
  activeVariation,
  setActiveVariation,
}) {
  const [drawerType, setDrawerType] = useState(null); // State to manage which drawer is open
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState(false);

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

  const openDrawer = (drawer) => {
    setDrawerType(drawer);
    setSelectedSize(null);
  };

  const closeDrawer = () => {
    setDrawerType(null);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size, () => {
      // Callback function to execute after state update
      setError(false); // Reset error when a size is selected
    });
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

  return (
    <div>
      <div className="Productdetails">
        <span>
          <p>{product.Name.substring(0, 32)}</p>
          <svg
            className="wishlist-icon wishlist-icon--productDetail"
            preserveAspectRatio="xMidYMid slice"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="var(--text-color)"
            stroke="inherit"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 15.238L17 20V4H7v16l5-4.762zm-4 2.429l4-3.81 4 3.81V5H8v12.667z"
            ></path>
          </svg>
        </span>
        <p className="price">
          {activeVariation?.price?.discount !== "0" ? (
            <>
              <span className="real-price">
                Rs. {activeVariation?.price?.discount}
              </span>
              <span className="original-price">
                Rs. {activeVariation?.price?.real}
              </span>
            </>
          ) : (
            <span className="original-price">
              Rs. {activeVariation?.price?.real}
            </span>
          )}
        </p>

        <p>
          {product.Description}
          {womenProducts[0].discription}
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
              className={`color-box  cursor-pointer ${
                activeVariation?.color?.name === variation?.color?.name
                  ? "active"
                  : ""
              }`}
              style={{ backgroundColor: variation?.color?.code }}
              onClick={() => setActiveVariation(variation)}
            />
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
        onClick={(e) => {
          e.preventDefault();
          if (selectedSize) {
            openDrawer("AddToCart");
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          } else {
            showErrorModal();
          }
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

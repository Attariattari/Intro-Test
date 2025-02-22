import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LikeSameWithProductData from "./LikeSameWithProductData";
import Footer from "../../../Footer/Footer";
import "../SingleProduct.css";
import { Drawer } from "@material-tailwind/react";
import SHIPPING_AND_RETURNS from "../../Offcanvice/SHIPPING_AND_RETURNS";
import LikeSomeproducts from "./LikeSomeproducts";
import { TbBleachOff, TbWashDrycleanOff, TbWashOff } from "react-icons/tb";
import { MdOutlineIron } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import Swal from "sweetalert2";
import { userContext } from "../../../../Context/UserContext";
import axios from "axios";
import Spinner from "../../../../Spinner";

function MobileDeviceDisplaydetails({
  womenProducts,
  activeVariation,
  product,
  setActiveVariation,
}) {
  const [ProductSizeBottom, setProductSizeBottom] = useState(false);
  const [Successaddtocart, setSuccessaddtocart] = useState(false);
  const [MEASUREPENS, setMEASUREPENS] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mobileDisplayRef = useRef(null);
  const Navigate = useNavigate();
  const { token } = useContext(userContext);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setProductSizeBottom(false); // Close the product size button
    setSelectedSize(null); // Reset the selected size
    addtocart(size); // ✅ Size select hote hi cart me add hoga
  };

  const addtocart = async (size) => {
    setIsLoading(true);
    window.scrollTo(0, 0);

    const requestData = {
      product: product?._id,
      variationId: activeVariation?._id,
      size: size || null, // ✅ Size parameter pass kiya
    };

    try {
      const response = await axios.post(
        "http://localhost:1122/CartProduct/add",
        requestData,
        {
          headers: {
            Authenticate: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "🛍️ Success!",
          text: "Product added to cart successfully!",
          showConfirmButton: true,
          timer: 5000,
        }).then(() => {
          openDrawers("AddtocartSucces");
        });
        setProductSizeBottom(false);
        setSuccessaddtocart(true);
      } else {
        console.log("❌ Response Status:", response.status);
        Swal.fire({
          icon: "error",
          title: "❌ Failed",
          text: "Something went wrong! Try again.",
          showConfirmButton: true,
          timer: 5000,
        });
      }
    } catch (error) {
      console.error("🚨 Error adding product to cart:", error);
      Swal.fire({
        icon: "error",
        title: "❌ Error",
        text: "Unable to add product. Try again!",
      });
    } finally {
      setIsLoading(false);
      console.log("🔄 Loading Stopped");
    }
  };

  const closedrawers = () => {
    setProductSizeBottom(false);
    setSuccessaddtocart(false);
  };

  const openDrawers = (drawerType) => {
    if (drawerType === "SizeDrawer") {
      setProductSizeBottom(true);
    } else if (drawerType === "AddtocartSucces") {
      setSuccessaddtocart(true);
    }
  };

  const Navigatetocart = () => {
    Navigate("/Shopping_Bag");
  };

  const toggleWishlist = () => {
    setIsInWishlist((prev) => !prev);
  };
  const handleColorClick = (variation) => {
    setActiveVariation(variation); // ✅ Yeh parent me state update karega
  };
  return (
    <div ref={mobileDisplayRef}>
      {isLoading && (
        <div className="cart-spinner">
          <Spinner />
        </div>
      )}
      <div className="NoExpendArea">
        <div className="NoExpendArea_Title">
          <div>
            <p>{product.Name.substring(0, 32)}</p>
            <p className="price">
              {activeVariation?.price?.discount > 0 &&
              activeVariation?.price?.discount !==
                activeVariation?.price?.real ? (
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
          </div>
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
        </div>
        <div className="NoExpendArea_Buttons">
          <button
            className="sticky top-0 z-10 bg-[var(--bg-color)] text-[var(--text-color)] NoExpendArea_Add"
            onClick={(e) => {
              e.preventDefault();
              openDrawers("SizeDrawer");
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
          >
            ADD
          </button>
          <button
            className="sticky top-0 z-10 bg-[var(--bg-color)] NoExpendArea_Wishlist"
            onClick={toggleWishlist}
          >
            {isInWishlist ? (
              <svg
                preserveAspectRatio="xMidYMid slice"
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
                  d="M12 15.238L17 20V4H7v16l5-4.762z"
                ></path>
              </svg>
            ) : (
              <svg
                className="wishlist-icon wishlist-icon--productDetail"
                preserveAspectRatio="xMidYMid slice"
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
                  d="M12 15.238L17 20V4H7v16l5-4.762zm-4 2.429l4-3.81 4 3.81V5H8v12.667z"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* {isexpanded && ( */}
      <div className="ExpendArea">
        <p className="Womendiscription">{product.discription}</p>
        <div className="compoinmobile">
          <p>COMPOSITION & CARE</p>
          <p>COMPOSITION</p>
          <span style={{ padding: "0px 0px 20px 0px" }}>
            We work with monitoring programmes to ensure compliance with our
            social, environmental and health and safety standards for our
            products. To assess compliance, we have developed a programme of
            audits and continuous improvement plans.
          </span>
          <span style={{ padding: "0px" }}>OUTER SHELL</span>
          <span style={{ padding: "0px" }}>100% cotton</span>
          <p>LINING</p>
          <p>100% acetate</p>
          <p>Which contains at least:</p>
          <p className="WomenOUTESHELL">OUTER SHELL</p>
          <p>100% RCS certified recycled cotton</p>
          <p>CERTIFIED MATERIALS</p>
          <p>
            RCS CERTIFIED RECYCLED COTTON This fibre is made from recycled
            cotton textile waste. Using recycled materials helps limit the
            consumption of raw materials. It is certified to the Recycled Claim
            Standard (RCS), which verifies the recycled content and tracks it
            from source to final product.
          </p>
          <p>Certified by Intertek 193341</p>
          <Link className="underline">More information</Link>
          <video autoPlay muted loop playsInline className="video">
            <source
              src="../../../../public/My Web Data/YouCut_20240324_154952515.mp4"
              type="video/mp4"
            />
          </video>

          <p>CARE</p>
          <p>Caring for your clothes is caring for the environment.</p>
          <p>
            To keep your jackets and coats clean, you only need to freshen them
            up and go over them with a cloth or a clothes brush. If you need to
            dry clean a garment, look for a dry cleaner that uses technologies
            that are respectful of the environment.{" "}
          </p>
          <Link className="underline">Clothing Care Guided</Link>
          <div className="space-x-5">
            <TbWashOff style={{ width: "60px", height: "20px" }} />
            <p>Do not wash</p>
          </div>
          <div className="space-x-5">
            <TbBleachOff style={{ width: "60px", height: "20px" }} />
            <p>Do not use bleach</p>
          </div>
          <div className="space-x-5">
            <MdOutlineIron style={{ width: "60px", height: "20px" }} />
            <p>Iron at a maximum of 110ºC/230ºF</p>
          </div>
          <div className="space-x-5">
            <CiCircleInfo style={{ width: "60px", height: "20px" }} />
            <p>Dry clean with tetrachloroethylene</p>
          </div>
          <div className="space-x-5">
            <TbWashDrycleanOff style={{ width: "60px", height: "20px" }} />
            <p>Do not tumble dry</p>
          </div>
        </div>
        <div className="LikeSameWithProductData">
          <LikeSameWithProductData product={product} />
        </div>
        <Footer />
      </div>

      {ProductSizeBottom && (
        <span className="JustmobileSize p-0 text=[11px]">
          <Drawer
            placement="bottom"
            open={ProductSizeBottom}
            size={360}
            onClose={closedrawers}
            className="BottomDraver p-0 bg-[var(--bg-color)]"
          >
            <div className="DrawerSizeData">
              <div className="Drawer_Size_Title">
                <div>SELECT A SIZE</div>
                <div>This product is longer than usual.</div>
              </div>
              <div className="Drawer_Size_Data" style={{ fontSize: "11px" }}>
                {activeVariation?.size?.map((size, index) => (
                  <button
                    key={index}
                    className={selectedSize === size ? "Size selected" : ""}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="Drawer_Size_Measure">
                <div
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setMEASUREPENS(true);
                    closeDrawerBottom(false);
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  }}
                >
                  MEASUREMENT GUIDE
                </div>

                <div></div>
              </div>
            </div>
          </Drawer>
        </span>
      )}
      {Successaddtocart && (
        <span className="JustmobileSize p-0">
          <Drawer
            placement="bottom"
            open={Successaddtocart}
            size={360}
            onClose={closedrawers}
            className="BottomDraver p-0 overflow-y-auto"
          >
            <div className="SucccessAddTocartArea">
              <div className="details">
                <div>SIZE EU 36 / US 4 ADDED TO YOUR SHOPPING BAG</div>
                <div onClick={Navigatetocart}>VIEW</div>
              </div>
              <div>
                <LikeSomeproducts />
              </div>
            </div>
          </Drawer>
        </span>
      )}
      <SHIPPING_AND_RETURNS
        MEASUREPENS={MEASUREPENS}
        setMEASUREPENS={setMEASUREPENS}
      />
    </div>
  );
}

export default MobileDeviceDisplaydetails;

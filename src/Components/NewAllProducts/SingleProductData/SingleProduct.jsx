import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";
import Footer from "../../Footer/Footer.jsx";
import "swiper/css/pagination";
import "./SingleProduct.css";
import "swiper/css";
import { Mousewheel, Autoplay } from "swiper/modules";
import MobileDeviceDisplaydetails from "./LikeSomeProductsDataView/MobileDeviceDisplaydetails";
import LikeSameWithProductData from "./LikeSomeProductsDataView/LikeSameWithProductData";
import AllProductDataView from "./AllProductDataView/AllProductDataView";
import Composetion from "./CompositionArea/Composetion";
import { ZaraProducts } from "../../DummyData/Data";
import axios from "axios";
import Spinner from "../../../Spinner.jsx";

function SingleProduct() {
  const womenProduct = [ZaraProducts.Women.SATINY_BLAZER];
  const [isexpanded, setIsexpanded] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showSidePopup, setShowSidePopup] = useState(false);
  const [showMobileDisplay, setShowMobileDisplay] = useState(true);
  const { id } = useParams();
  const [state, setState] = useState({
    data: null,
    loading: false,
    isexpanded: false,
    expanded: false,
    activeSlide: 0,
    showSidePopup: false,
    showMobileDisplay: true,
  });
  const fetchproduct = async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await axios.get(`http://localhost:1122/Product/${id}`);
      const data = response.data;
      setState({ data, loading: false });
      console.log(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setState({ data: null, loading: false });
    }
  };

  useEffect(() => {
    fetchproduct();
  }, []);
  const [activeVariation, setActiveVariation] = useState(null);
  const [displayImages, setDisplayImages] = useState([]);

  useEffect(() => {
    if (
      state.data &&
      state.data.variations &&
      state.data.variations.length > 0
    ) {
      const firstVariation = state.data.variations[0];
      setActiveVariation(firstVariation);

      // ✅ Default state me "Main Image + First Variation Images"
      setDisplayImages([state.data.MainImage, ...firstVariation.image]);
    }
  }, [state.data]);

  const handleVariationChange = (variation) => {
    setActiveVariation(variation);
    setDisplayImages(variation.image); // ✅ Sirf is variation ki images
  };
  const womenProducts = activeVariation ? [activeVariation] : [];
  console.log("Active Variation:", activeVariation);

  const swiperRef = useRef(null);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleIsexpanded = () => {
    setIsexpanded(!isexpanded);
  };

  const handleImageClick = (index) => {
    setActiveSlide(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSidePopup = () => {
    setShowSidePopup(!showSidePopup);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowMobileDisplay(!showSidePopup);
      } else {
        setShowMobileDisplay(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showSidePopup]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    toggleIsexpanded();
  };

  if (state.loading) return <Spinner />;
  if (!state.data) return <p>No Product Found</p>;

  return (
    <div>
      <div className="sticky top-0 z-10">
        <div
          className="absolute w-full"
          style={{
            backgroundColor: isScrolled ? "var(--bg-color)" : "transparent",
          }}
        >
          <Navbar
            showSidePopup={showSidePopup}
            toggleSidePopup={toggleSidePopup}
          />
        </div>
      </div>
      <div className="SingleProduct">
        <div className="Main_Area">
          <div
            className={`COMPOSITIONAREA ${
              expanded ? "expanded" : "compact overflow-auto"
            }`}
          >
            <Composetion expanded={expanded} toggleExpanded={toggleExpanded} />
          </div>
          <div className="ImagesCarusalall">
            <Swiper
              ref={swiperRef}
              direction="vertical"
              slidesPerView={1}
              spaceBetween={0}
              mousewheel={true}
              modules={[Mousewheel, Autoplay]}
              className="CarosualArea mySwiper"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              onSlideChange={(swiper) => {
                setActiveSlide(swiper.realIndex);
              }}
            >
              {/* ✅ Ab `displayImages` ka use ho raha hai */}
              {displayImages.map((imageUrl, index) => (
                <SwiperSlide key={index}>
                  <div className="ImagesCarosual">
                    <div className="imageWrapper">
                      <img src={imageUrl} alt={`Variation ${index}`} />
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* ✅ Thumbnail Images */}
              <div className="ImagesForCarsualUpdates">
                {displayImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className={`UpdaterImage ${
                      index === activeSlide ? "active" : ""
                    }`}
                    onClick={() => handleImageClick(index)}
                  >
                    <img src={imageUrl} alt={`Thumbnail ${index}`} />
                  </div>
                ))}
              </div>
            </Swiper>
          </div>
          <div className="AllProductDataView">
            <AllProductDataView
              product={state.data}
              activeVariation={activeVariation}
              setActiveVariation={setActiveVariation} // ✅ Ab ye bhi pass ho raha hai
              womenProducts={womenProduct}
            />
          </div>
        </div>
      </div>
      {showMobileDisplay && (
        <div
          className={`JUST_SHOW_MOBILE ${
            isexpanded ? "isexpanded" : "Noexpend"
          }`}
        >
          <div className="JUST_SHOW_MOBILE_Button_visible_hide">
            <div onClick={handleClick}>
              <svg
                class="layout-shop-footer__swipe-icon"
                width="80"
                height="3"
                viewBox="0 0 40 0.5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 0h40v1H0V0z"
                ></path>
              </svg>
            </div>
          </div>
          <MobileDeviceDisplaydetails
            womenProducts={womenProduct}
            isexpanded={isexpanded}
            toggleIsexpanded={toggleIsexpanded}
          />
        </div>
      )}
      <div className="LikeSameWithProductData LikeProduct">
        <LikeSameWithProductData />
      </div>
      <span className="One">
        <Footer />
      </span>
    </div>
  );
}

export default SingleProduct;

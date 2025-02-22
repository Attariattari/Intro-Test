import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ Import Toastify
import "react-toastify/dist/ReactToastify.css";
import { userContext } from "./UserContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistStatus, setWishlistStatus] = useState({});
  const { token } = useContext(userContext);

  const checkProductInWishlist = async (productId) => {
    if (!productId) return;

    try {
      const response = await axios.post(
        "http://localhost:1122/Wishlist/check-product",
        { productId },
        {
          headers: { Authenticate: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setWishlistStatus((prev) => ({
        ...prev,
        [productId]: response.data.isInWishlist, // ✅ API response
      }));

      toast.success("Wishlist status updated! ✅");
    } catch (error) {
      // 🔥 Backend se aaya error handle karo
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); // ✅ Backend error show karo
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("productId");

    if (productId) {
      checkProductInWishlist(productId); // ✅ Auto-check from URL param
    }
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlistStatus, checkProductInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

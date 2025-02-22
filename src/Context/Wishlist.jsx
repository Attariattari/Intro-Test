import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ Import Toastify
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2"; // ✅ Import SweetAlert
import { userContext } from "./UserContext";
import "sweetalert2/dist/sweetalert2.min.css";
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [productId, setProductId] = useState(null);
  const { token } = useContext(userContext);

  // ✅ Check if product is in wishlist
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
        [productId]: response.data.isInWishlist,
      }));

      toast.success("Wishlist status updated! ✅");
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong!");
    }
  };

  // ✅ Add product to wishlist
  useEffect(() => {
    if (!productId) return; // ✅ Agar koi product nahi hai to skip karo

    const addToWishlist = async () => {
      setIsLoading(true);

      try {
        const response = await axios.post(
          "http://localhost:1122/Wishlist/add",
          { productId },
          {
            headers: {
              Authenticate: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setWishlistStatus((prev) => ({
          ...prev,
          [productId]: true,
        }));

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product added to wishlist successfully!",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to add product to wishlist. Please try again.",
        });
      } finally {
        setIsLoading(false);
        setProductId(null); // ✅ Reset productId after completion
      }
    };

    addToWishlist();
  }, [productId]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("productId");

    if (productId) {
      checkProductInWishlist(productId);
    }
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistStatus,
        checkProductInWishlist,
        isLoading,
        setProductId,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

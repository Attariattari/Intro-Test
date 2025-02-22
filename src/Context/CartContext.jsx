import { createContext, useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { userContext } from "./UserContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [Loading, setLoading] = useState(false);
  const { token } = useContext(userContext);
  const addToCart = async (product, activeVariation, selectedSize) => {
    setLoading(true);
    window.scrollTo(0, 0);

    const requestData = {
      product: product?._id,
      variationId: activeVariation?._id,
      size: selectedSize || null,
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
        });

        // ✅ API Response se cart update karna
        setCart(response.data.cartItems || []);
      } else {
        Swal.fire({
          icon: "error",
          title: "❌ Failed",
          text: "Something went wrong! Try again.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "❌ Error",
        text: "Unable to add product. Try again!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, Loading }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = () => useContext(CartContext);

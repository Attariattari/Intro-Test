import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserContextWrapper from "./Context/UserContextWrapper.jsx";
import { MeasureProvider } from "./Context/Drawer_state_controller.jsx";
import { ThemeProvider } from "./Zara_Admin/Context/ThemeContext.jsx";
import { SidebarProvider } from "./Zara_Admin/Context/SidebarContext.jsx";
import { WishlistProvider } from "./Context/Wishlist.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./Context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextWrapper>
      <MeasureProvider>
        <ThemeProvider>
          <SidebarProvider>
            <WishlistProvider>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                closeButton={false} // ✅ Close button removed
                toastStyle={{
                  borderRadius: "10px",
                  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                  fontFamily: "Poppins, sans-serif",
                  padding: "10px",
                  background: "#000", // ✅ Black Background
                  color: "#fff", // ✅ White Text
                }}
                bodyStyle={{
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                style={{
                  zIndex: 9999,
                }}
              />
              <CartProvider>
                <App />
              </CartProvider>
            </WishlistProvider>
          </SidebarProvider>
        </ThemeProvider>
      </MeasureProvider>
    </UserContextWrapper>
  </React.StrictMode>
);

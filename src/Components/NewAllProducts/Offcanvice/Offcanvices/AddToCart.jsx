import { IconButton, Typography } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../Css.css";

function AddToCart({ closeDrawer }) {
  const navigate = useNavigate();

  const Navigate = () => {
    navigate("/Shopping_Bag");
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          Added to Cart
        </Typography>
        <IconButton variant="text" onClick={closeDrawer}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="var(--text-color)"
            stroke="inherit"
            className="zds-dialog-icon-button__icon zds-dialog-close-button__icon"
          >
            <path d="m12 12.707 6.846 6.846.708-.707L12.707 12l6.847-6.846-.707-.708L12 11.293 5.154 4.446l-.707.708L11.293 12l-6.846 6.846.707.707L12 12.707Z"></path>
          </svg>
        </IconButton>
      </div>

      <Typography className="mb-8 font-normal">
        <div>SIZE EU XS / US XS ADDED TO YOUR SHOPPING BAG</div>
        <div className="cartproductinfo">
          <img
            src="https://static.zara.net/assets/public/8d6e/88db/ca8c42fbaf5b/3a757794edb1/02764637712-p/02764637712-p.jpg?ts=1711113921879&w=128"
            alt="Product"
          />
          <div>
            <p>ROUND NECK PIQUÉ BLAZER</p>
            <span className="mt-3">ECRU | 2764/637</span>
          </div>
        </div>
        <button className="SEESHOPPINGBASKET" onClick={Navigate}>
          SEE SHOPPING BASKET
        </button>
      </Typography>
    </>
  );
}

export default AddToCart;

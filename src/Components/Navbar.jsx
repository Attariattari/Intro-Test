import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../Pages/Styles/Navbar.css";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="Navbar">
      <div className="Navbar-image">
        <img src="https://i.ibb.co/CM1yFNJ/Group-1000001666.png" alt="Logo" />
      </div>

      {isMobile && (
        <IconButton
          edge="end"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          className="menu-button"
          style={{
            fontSize: "14px",
            fontWeight: "600",
            padding: "8px 24px",
            color: "#000000",
            backgroundColor: "#F88125",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s, transform 0.2s",
            marginRight: "20px", // Right se 20px left taraf shift
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <div className="Navbar-ul-li">
        <ul className="desktop-nav">
          <li>Home</li>
          <span className="separator"></span>
          <li>Sales</li>
          <span className="separator"></span>
          <li>Rentals</li>
          <span className="separator"></span>
          <li className="highlighted">Sell or Rent Property</li>
          <span className="separator"></span>
          <li>Contact Us</li>
        </ul>
        <button>Login</button>

        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <div className="drawer-content">
            <List>
              <ListItem button>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Sales" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Rentals" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Sell or Rent Property" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Contact Us" />
              </ListItem>
            </List>
            <button>Login</button>
          </div>
        </Drawer>
      </div>
    </div>
  );
}

export default Navbar;
